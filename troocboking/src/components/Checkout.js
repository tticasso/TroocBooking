import React from 'react';

const Checkout = ({ selectedSeats }) => {
    const seatCount = selectedSeats.length;
    const ticketPrice = 75;
    const popcornPrice = 35;
    const pepsiPrice = 40;
    const totalPrice = seatCount * ticketPrice + popcornPrice + pepsiPrice;

    return (
        <div className="w-full p-6 bg-[#1C1B21] rounded-[20px] text-white">
            <h2 className="text-xl font-bold mb-4">Cart</h2>
            <hr className="border-t border-gray-600" />
            <div className="py-4">
                <div className="flex justify-between">
                    <div>
                        <p>The Mavka x{seatCount}</p>
                        <p className="text-sm text-gray-400">Seat: {selectedSeats.join(', ')}</p>
                    </div>
                    <p>${seatCount * ticketPrice}</p>
                </div>
                <div className="flex justify-between mt-2">
                    <p>Popcorn x2</p>
                    <p>${popcornPrice}</p>
                </div>
                <div className="flex justify-between mt-2">
                    <p>Pepsi x2</p>
                    <p>${pepsiPrice}</p>
                </div>
            </div>
            <hr className="border-t border-gray-600" />
            <div className="flex justify-between py-4">
                <p>Total:</p>
                <p>${totalPrice}</p>
            </div>
            <button className="w-full py-2 bg-gradient-to-r from-[#B4D429] to-[#5D6E15] rounded-lg font-bold">
                Checkout
            </button>
        </div>
    );
};

export default Checkout;
