import React from 'react';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
            <h1 className="text-2xl font-bold text-blue-600">RooMitra</h1>
            <nav>
                <a href="#features" className="mx-4 text-gray-700 hover:text-blue-600">Features</a>
                <a href="#testimonials" className="mx-4 text-gray-700 hover:text-blue-600">Testimonials</a>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Get Started</button>
            </nav>
        </header>
    );
};

export default Header;
