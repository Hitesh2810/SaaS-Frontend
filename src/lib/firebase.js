"use client";

import { getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const requiredFirebaseKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId"
];

export const missingFirebaseConfig = requiredFirebaseKeys.filter((key) => !firebaseConfig[key]);
export const isFirebaseConfigured = missingFirebaseConfig.length === 0;

export const firebaseApp = isFirebaseConfigured
  ? (getApps().length ? getApps()[0] : initializeApp(firebaseConfig))
  : null;

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;
export const googleProvider = firebaseApp ? new GoogleAuthProvider() : null;
