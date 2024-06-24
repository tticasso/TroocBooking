import React from 'react';
import { UilShoppingCart } from '@iconscout/react-unicons'

const FoodSlider = () => {
    return (
        <div className="w-full flex flex-col items-center text-white py-8">
            <div className="flex space-x-4 w-full">
                {Array(3).fill().map((_, index) => (
                    <div key={index} className="border-[#59595C] w-1/3 border-[1px] p-4 rounded-lg flex flex-col items-center">
                        <img
                            src="https://i.pinimg.com/originals/3c/1a/e7/3c1ae797efafc7257699de4234d9f508.png"
                            alt="Popcorn"
                            className="w-24 h-24 mb-2"
                        />
                        <h2 className="text-lg mb-1">Popcorn</h2>
                        <span className="text-xl font-bold mb-2">$15</span>
                        <button className="bg-gradient-to-r from-[#B4D429] to-[#5D6E15] font-bold font-mono flex justify-center items-center text-white px-4 py-2 rounded-full">
                            <UilShoppingCart size="25" className="mr-2" />
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoodSlider;
