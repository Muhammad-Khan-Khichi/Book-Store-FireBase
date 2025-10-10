import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut 
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// import { Firestore } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const firestore = getFirestore(app);
// const storage = getStorage(app)

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  // const navigate = useNavigate()

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUserWithEmailAndPassword = (email, password) =>
    firebaseSignInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const handleLogOut = async () =>{
    await signOut(firebaseAuth)
    // navigate("/login")
  } 
  const handleCreateNewListing = async (
    title,
    isbn,
    price,
    author,
    imageUrl
  ) => {
    // const imageRef = ref(storage, `uploads/images${Date.now()}-${image.name}`)
    // const uploadResult = await uploadBytes(imageRef, image)
    // const imageURL = await getDownloadURL(uploadResult.ref);
    return await addDoc(collection(firestore, "books"), {
      title,
      isbn,
      price,
      author,
      imageURL: imageUrl,
      userID: user.uid,
      userEmail: user.email,
      // displayName: user.displayName,
    });
  };

  const listAllBooks = async () => {
    const booksCol = collection(firestore, "books");
    const booksSnapshot = await getDocs(booksCol);
    return booksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        handleCreateNewListing,
        listAllBooks,
        isLoggedIn,
        handleLogOut
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
