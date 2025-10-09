import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FirebaseProvider } from "./context/firebase.jsx";
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements  } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home.jsx";
import Register from "./pages/Register.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='/login' element={<Register/>} />
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseProvider>
      <RouterProvider router={router} />
      {/* <App/> */}
    </FirebaseProvider>
  </StrictMode>
);
