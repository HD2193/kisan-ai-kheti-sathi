import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// TODO: Replace with your Firebase config when available
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your actual API key
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // Replace with your project ID
  projectId: "YOUR_PROJECT_ID", // Replace with your project ID
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // Replace with your project ID
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your sender ID
  appId: "YOUR_APP_ID" // Replace with your app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;