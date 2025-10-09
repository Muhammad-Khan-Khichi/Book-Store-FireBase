import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";


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


export const useFirebase = () => useContext(FirebaseContext);


export const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={app}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
