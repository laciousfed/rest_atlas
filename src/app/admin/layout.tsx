'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  Building,
  Sliders,
  History,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Moon,
  Sparkles,
} from 'lucide-react';

function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login' || pathname === '/admin/bootstrap') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-100 text-xs text-charcoal-500">
        Verifying administrator authentication claims...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-sand-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-sand-200 shadow-soft text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-forest-900 text-sand-50 flex items-center justify-center mx-auto">
            <Moon className="w-6 h-6 text-gold-400" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-forest-950">
              Rest Atlas Assessor Portal
            </h2>
            <p className="text-xs text-charcoal-600">
              This area is restricted to authenticated sleep acousticians, editors, and administrators.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/admin/login"
              className="w-full inline-flex items-center justify-center px-5 py-3 bg-forest-800 hover:bg-forest-900 text-sand-50 font-semibold rounded-xl text-xs transition-all shadow-soft"
            >
              Access Assessor Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/hotels', label: 'Hotel Directory', icon: Building },
    { href: '/admin/audit', label: 'Audit Trail', icon: History },
  ];

  return (
    <div className="min-h-screen bg-sand-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-forest-950 text-sand-200 border-r border-forest-900 flex-shrink-0 flex flex-col justify-between">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-forest-900 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-forest-800 text-sand-50 flex items-center justify-center border border-forest-700">
              <Moon className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-sand-50 block leading-tight">
                Rest Atlas
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block">
                Assessor Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs font-medium">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                    active
                      ? 'bg-forest-800 text-sand-50 font-semibold'
                      : 'text-sand-300 hover:bg-forest-900 hover:text-sand-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-forest-900 space-y-3">
          <div className="bg-forest-900/80 rounded-xl p-3 border border-forest-800">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400 block mb-0.5">
              Active Assessor
            </span>
            <span className="text-xs font-semibold text-sand-50 block truncate">
              {user?.displayName}
            </span>
            <span className="text-[11px] text-sand-400 block truncate">
              Role: {user?.role.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 bg-forest-900 hover:bg-forest-800 text-sand-300 hover:text-sand-50 rounded-lg text-xs transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              type="button"
              onClick={() => logout()}
              title="Sign Out"
              className="p-2 bg-forest-900 hover:bg-red-950 text-sand-300 hover:text-red-400 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
