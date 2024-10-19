import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div className="bg-gray-100">
            {/* Header */}
            <Header />

            {/* Why RooMitra */}
            <section className="text-center py-20">
                <h2 className="text-4xl font-bold mb-4">Why RooMitra?</h2>
                <p className="text-lg text-gray-600 mb-6">
                    RooMitra is your ultimate solution for finding the perfect roommate or room. 
                    Say goodbye to endless searching and hello to convenience!
                </p>
                <img src="path_to_your_image.jpg" alt="Visual representation" className="mx-auto w-2/3 rounded-lg shadow-lg" />
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                    <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
                        <h3 className="font-bold text-xl mb-2">Room Matching</h3>
                        <p className="text-gray-700">Find roommates that match your preferences easily.</p>
                    </div>
                    <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
                        <h3 className="font-bold text-xl mb-2">Secure Messaging</h3>
                        <p className="text-gray-700">Communicate safely with potential roommates.</p>
                    </div>
                    <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
                        <h3 className="font-bold text-xl mb-2">Easy Booking</h3>
                        <p className="text-gray-700">Send and manage booking requests seamlessly.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-gray-100">
                <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
                <div className="flex flex-col items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-4 w-1/2">
                        <p>"RooMitra made finding a roommate so easy! Highly recommend!"</p>
                        <span className="block text-right text-gray-500">- User A</span>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-4 w-1/2">
                        <p>"I found my perfect match in no time. Great experience!"</p>
                        <span className="block text-right text-gray-500">- User B</span>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-10 bg-blue-600 text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Roommate?</h2>
                <button className="bg-white text-blue-600 px-6 py-3 rounded">Sign Up Now</button>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;
