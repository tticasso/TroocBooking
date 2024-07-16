import React from 'react';

function Footer() {
    return (
        <footer className="w-full h-[150px] bg-[#A5C226] text-black flex justify-center items-center">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between px-[100px] items-center">
                    <div className="mb-4 md:mb-0">
                        <h4 className="text-xl font-bold">TroocBooking</h4>
                        <p>&copy; 2024 TroocBooking. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="/about" className="hover:text-yellow-500">About Us</a>
                        <a href="/contact" className="hover:text-yellow-500">Contact</a>
                        <a href="/privacy" className="hover:text-yellow-500">Privacy Policy</a>
                        <a href="/terms" className="hover:text-yellow-500">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
