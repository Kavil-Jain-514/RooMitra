import React from 'react';
import logo from '../assets/RooMitra-logo.svg';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-6 bg-white shadow-md">
            <div className="flex items-center">
                <img src={logo} alt="RooMitra Logo" className="h-20 w-auto" />
            </div>
            <nav>
                <a href="#features" className="mx-4 text-gray-700 hover:text-blue-600">Features</a>
                <a href="#testimonials" className="mx-4 text-gray-700 hover:text-blue-600">Testimonials</a>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Get Started</button>
            </nav>
        </header>
    );
};

export default Header;

