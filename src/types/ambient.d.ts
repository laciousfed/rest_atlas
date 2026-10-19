declare module 'lucide-react';

declare module 'firebase/app' {
  export type FirebaseApp = any;
  export type FirebaseOptions = any;
  export const initializeApp: any;
  export const getApps: any;
  export const getApp: any;
}

declare module 'firebase/auth' {
  export type Auth = any;
  export type User = any;
  export type IdTokenResult = any;
  export const getAuth: any;
  export const onAuthStateChanged: any;
  export const signOut: any;
  export const signInWithEmailAndPassword: any;
}

declare module 'firebase/firestore' {
  export type Firestore = any;
  export const getFirestore: any;
  export const collection: any;
  export const doc: any;
  export const getDocs: any;
  export const getDoc: any;
  export const setDoc: any;
  export const addDoc: any;
  export const query: any;
  export const where: any;
}

declare module 'firebase/storage' {
  export type FirebaseStorage = any;
  export const getStorage: any;
  export const ref: any;
  export const uploadBytes: any;
  export const getDownloadURL: any;
}
