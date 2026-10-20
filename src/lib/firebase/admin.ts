// IMPORTANT: Do NOT use a top-level static import for firebase-admin.
// firebase-admin depends on Node.js built-ins (stream, crypto, net, tls)
// which are unavailable in the Cloudflare Edge Runtime.
// Dynamic imports below are excluded from the edge bundle by webpack,
// and are only executed at runtime when isAdminConfigured() returns true
// (i.e. real Firebase credentials are present, which never happens on Cloudflare
// without explicitly setting them in the dashboard).

export const isAdminConfigured = (): boolean => {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || '';
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
    !process.env.FIREBASE_PROJECT_ID.includes('REPLACE_WITH') &&
    clientEmail.includes('@') &&
    !clientEmail.includes('REPLACE_WITH') &&
    privateKey.includes('BEGIN PRIVATE KEY')
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAdminApp(): Promise<any | null> {
  if (!isAdminConfigured()) return null;

  try {
    // Dynamic import keeps firebase-admin OUT of the edge bundle
    const admin = await import('firebase-admin');

    if (admin.apps.length > 0) {
      return admin.apps[0];
    }

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAdminFirestore(): Promise<any | null> {
  const app = await getAdminApp();
  if (!app) return null;
  try {
    const admin = await import('firebase-admin');
    return admin.firestore(app);
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAdminAuth(): Promise<any | null> {
  const app = await getAdminApp();
  if (!app) return null;
  try {
    const admin = await import('firebase-admin');
    return admin.auth(app);
  } catch {
    return null;
  }
}
