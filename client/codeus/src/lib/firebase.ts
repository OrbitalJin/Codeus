import { initializeApp, getApps, getApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyDKku3aX6BpSD9IIzO6LQkeMaSvqaQmGr4",
  authDomain: "codeus-59218.firebaseapp.com",
  projectId: "codeus-59218",
  storageBucket: "codeus-59218.appspot.com",
  messagingSenderId: "728883985853",
  appId: "1:728883985853:web:91f07874d79996db1a66d4",
  measurementId: "G-WS3NR3KY1E",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
