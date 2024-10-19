import React from 'react';

const Footer = () => {
    return (
        <footer className="py-6 text-center bg-gray-200">
            <p className="text-gray-700">© 2024 RooMitra. All rights reserved.</p>
            <div className="flex justify-center mt-2">
                <a href="/privacy-policy" className="mx-2 text-gray-700 hover:text-blue-600">Privacy Policy</a>
                <span className="text-gray-700">|</span>
                <a href="/terms" className="mx-2 text-gray-700 hover:text-blue-600">Terms of Service</a>
            </div>
        </footer>
    );
};

export default Footer;
