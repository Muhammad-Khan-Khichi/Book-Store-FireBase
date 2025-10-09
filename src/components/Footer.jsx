import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white shadow mt-10">
      <div className="max-w-screen-xl mx-auto px-4 py-6 lg:py-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-6 mb-6">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              alt="Logo"
              className="h-10 mr-3"
            />
            <span className="text-xl font-semibold text-gray-800">BookStore</span>
          </Link>

          {/* Navigation links */}
          <ul className="flex flex-wrap justify-center md:justify-end space-x-6 font-medium text-gray-600">
            <li><Link to="/" className="hover:text-orange-700">Home</Link></li>
            <li><Link to="/about" className="hover:text-orange-700">About</Link></li>
            <li><Link to="/contact" className="hover:text-orange-700">Contact</Link></li>
            <li><Link to="/github" className="hover:text-orange-700">Github</Link></li>
          </ul>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <span className="text-sm text-gray-500 text-center sm:text-left mb-3 sm:mb-0">
            © {new Date().getFullYear()} <Link to="/" className="hover:underline">BookStore</Link>. All Rights Reserved.
          </span>

          {/* Social icons */}
          <div className="flex space-x-5 text-gray-500 text-xl">
            <a href="#" className="hover:text-orange-700"><FaFacebook /></a>
            <a href="#" className="hover:text-orange-700"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-700"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-700"><FaGithub /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
