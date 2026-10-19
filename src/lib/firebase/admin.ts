import * as admin from 'firebase-admin';

export const isAdminConfigured = (): boolean => {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY &&
    !process.env.FIREBASE_CLIENT_EMAIL.includes('xxxxx')
  );
};

export function getAdminApp(): admin.app.App | null {
  if (!isAdminConfigured()) {
    return null;
  }

  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }

  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error) {
    console.error('[Rest Atlas Firebase Admin] Initialization error:', error);
    return null;
  }
}

export function getAdminFirestore(): admin.firestore.Firestore | null {
  const app = getAdminApp();
  return app ? app.firestore() : null;
}

export function getAdminAuth(): admin.auth.Auth | null {
  const app = getAdminApp();
  return app ? app.auth() : null;
}
