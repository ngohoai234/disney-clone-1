// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDpBcv8WyAWqIr9E2--jpiMXAWHTnYCY_A",
  authDomain: "disney-clone-30d57.firebaseapp.com",
  projectId: "disney-clone-30d57",
  storageBucket: "disney-clone-30d57.appspot.com",
  messagingSenderId: "984973650418",
  appId: "1:984973650418:web:f0222cdb0b9796e917a36b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// keep track of db in firebase
const auth = getAuth(app);

// provider
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

const storage = getStorage(app);

export { auth, provider, storage, db };
