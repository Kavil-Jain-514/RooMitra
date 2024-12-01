import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 bg-gray-200 relative" role="contentinfo">
      <div className="container mx-auto text-center">
        <p className="text-gray-700">
          © {new Date().getFullYear()} RooMitra. All rights reserved.
        </p>
        <nav className="mt-2" aria-label="Footer Navigation">
          <a
            href="/privacy-policy"
            className="mx-2 text-gray-700 hover:text-blue-600"
          >
            Privacy Policy
          </a>
          <span className="text-gray-700 mx-2">|</span>
          <a href="/terms" className="mx-2 text-gray-700 hover:text-blue-600">
            Terms of Service
          </a>
        </nav>
        <small className="absolute bottom-2 right-4 text-gray-500 italic">
          Kavil Rajendra Jain
        </small>
      </div>
    </footer>
  );
};

export default Footer;
