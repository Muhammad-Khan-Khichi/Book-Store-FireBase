import React, {  useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useFirebase } from "../context/firebase";
import Lottie from "lottie-react";
import loader from "../loader.json";
import { FcGoogle } from "react-icons/fc";

import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

function Register() {
  const firebase = useFirebase();

  // const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if(firebase.isLoggedIn){
  //     // navigate to home
  //     navigate('/')
  //   }
  // }, [firebase, navigate])
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true)
  //   await firebase.signupUserWithEmailAndPassword(
  //     formData.email,
  //     formData.password
  //   );
  //   setFormData({
  //     name: "",
  //     email: "",
  //     password: "",
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await firebase.signinUserWithEmailAndPassword(
          formData.email,
          formData.password
        );
        toast.success("Logged in successfully 🎉");
      } else {
        await firebase.signinUserWithEmailAndPassword(
          formData.email,
          formData.password
        );

        toast.success("Account created successfully 🚀");
      }

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error during auth:", error);
      toast.error(error.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Login to continue" : "Sign up to get started"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your Name"
                  required
                  className="w-full  px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <IoEyeOffOutline size={20} />
              ) : (
                <IoEyeOutline size={20} />
              )}
            </button>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300"
                />
                Remember me
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className={`w-full flex cursor-pointer items-center justify-center bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <Lottie
                animationData={loader}
                loop
                className="w-8 h-8" // Adjust size to fit the button height
              />
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        {/* //hr line */}

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={firebase.signinWithGoogle}
          type="button"
          className="w-full cursor-pointer flex  items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 py-2 rounded-lg font-semibold shadow-sm hover:bg-gray-50 transition duration-300"
        >
          <FcGoogle size={22} />
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a
            onClick={() => setIsLogin((prev) => !prev)}
            href="#"
            className="text-blue-600 font-medium hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
