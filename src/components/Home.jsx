import React from "react";
import Register from "../pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowBooks from "../pages/ShowBooks";

function Home() {
  return (
    <div>
      {/* <Register /> */}
      Home
      <ShowBooks/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Home;
