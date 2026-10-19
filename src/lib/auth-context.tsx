'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AdminRole, AdminUser } from '@/types/admin';
import { auth, isFirebaseConfigured } from '@/lib/firebase/client';
import { onAuthStateChanged, signOut as fbSignOut, User } from 'firebase/auth';

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  loginAsDemoAssessor: (role?: AdminRole) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  canEditScores: boolean;
  canEditHotels: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginAsDemoAssessor: () => {},
  logout: async () => {},
  isAuthenticated: false,
  canEditScores: false,
  canEditHotels: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent demo/assessor session in local development
    const storedDemoUser = typeof window !== 'undefined' ? localStorage.getItem('rest_atlas_demo_admin') : null;
    if (storedDemoUser) {
      try {
        setUser(JSON.parse(storedDemoUser));
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('rest_atlas_demo_admin');
      }
    }

    // If Firebase Auth is configured, listen to real Firebase Auth state
    if (isFirebaseConfigured() && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser: User | null) => {
        if (fbUser) {
          const tokenResult = await fbUser.getIdTokenResult();
          const role = (tokenResult.claims.role as AdminRole) || 'super_admin';

          setUser({
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || 'Authorized Assessor',
            role,
            status: 'active',
            createdAt: fbUser.metadata.creationTime || new Date().toISOString(),
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const loginAsDemoAssessor = (role: AdminRole = 'super_admin') => {
    const demoAdmin: AdminUser = {
      uid: 'assessor-demo-001',
      email: 'dr.elena.vane@restatlas.com',
      displayName: 'Dr. Elena Vane (Lead Sleep Acoustician)',
      role,
      status: 'active',
      createdAt: '2026-01-01T00:00:00Z',
      lastLoginAt: new Date().toISOString(),
    };
    setUser(demoAdmin);
    if (typeof window !== 'undefined') {
      localStorage.setItem('rest_atlas_demo_admin', JSON.stringify(demoAdmin));
    }
  };

  const logout = async () => {
    if (auth) {
      try {
        await fbSignOut(auth);
      } catch (e) {
        // ignore
      }
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rest_atlas_demo_admin');
    }
    setUser(null);
  };

  const isAuthenticated = Boolean(user);
  const canEditScores = Boolean(user && ['super_admin', 'sleep_assessor'].includes(user.role));
  const canEditHotels = Boolean(user && ['super_admin', 'hotel_editor'].includes(user.role));

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginAsDemoAssessor,
        logout,
        isAuthenticated,
        canEditScores,
        canEditHotels,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
