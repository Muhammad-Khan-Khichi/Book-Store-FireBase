import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useFirebase } from "../context/firebase";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const firebase = useFirebase();


  const navLinks = [
    { name: "Home", path: "/" },
    ...(firebase.isLoggedIn ? [{ name: "Add Listing", path: "/addListing" }] : []),
    { name: "Contact", path: "/contact" },
    { name: "Github", path: "/github" },
  ];

  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          

          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-700">Golden Chapter</span>
          </Link>

          <ul className="hidden lg:flex space-x-8 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } hover:text-blue-700`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center lg:order-2">
            {!firebase.isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="hidden lg:inline text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="hidden lg:inline text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Get started
                </Link>
              </>
            ) : (
              <button
                onClick={firebase.handleLogOut}
                className="hidden lg:inline text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log out
              </button>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-gray-700 focus:outline-none ml-2 z-50 relative"
            >
              {menuOpen ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
            </button>
          </div>
        </div>

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}
        >
          <ul className="flex flex-col mt-16 font-medium space-y-4 px-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-2 rounded duration-200 ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } hover:bg-gray-100`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {!firebase.isLoggedIn ? (
              <li className="mt-4">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-sm px-4 py-2 mb-2"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg font-medium text-sm px-4 py-2"
                >
                  Get started
                </Link>
              </li>
            ) : (
              <li className="mt-4">
                <button
                  onClick={() => {
                    firebase.handleLogOut();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-center text-white bg-blue-700 hover:bg-blue-800 rounded-lg font-medium text-sm px-4 py-2"
                >
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
