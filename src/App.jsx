// import { Outlet } from "react-router-dom";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Register />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      {/* <Header /> */}
      {/* <Books /> */}
      {/* <Outlet /> */}
      {/* <Footer /> */}
    </>
  );
}

export default App;
