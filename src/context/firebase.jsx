import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyA6_Ltey-IDE66WM9tVW9sl6e8ChSMpUZo",
  authDomain: "bookstore-d5de9.firebaseapp.com",
  projectId: "bookstore-d5de9",
  storageBucket: "bookstore-d5de9.firebasestorage.app",
  messagingSenderId: "678369725115",
  appId: "1:678369725115:web:47ce47e5c72c57f379f79e",
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      if (user) setUser(user)
      else setUser(null)
    })
  }, [] )

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUserWithEmailAndPassword = (email, password) =>
    firebaseSignInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);


  const isLoggedIn = user ? true: false

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        isLoggedIn
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
