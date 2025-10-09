import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FirebaseProvider } from "./context/firebase.jsx";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
// ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseProvider>
      {/* <RouterProvider router={router} /> */}
      <App/>
    </FirebaseProvider>
  </StrictMode>
);
