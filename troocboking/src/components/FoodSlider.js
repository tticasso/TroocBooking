import React, { useState, useEffect } from 'react';
import { UilShoppingCart } from '@iconscout/react-unicons';

const FoodSlider = ({ addToCart, cartItems }) => {
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9999/food')
            .then(response => response.json())
            .then(data => setFoodItems(data))
            .catch(error => console.error('Error fetching food data:', error));
    }, []);

    const handleAddToCart = (item) => {
        addToCart(item);
        alert(`${item.name} added to cart`);
    };

    return (
        <div className="w-full flex flex-col items-center text-white py-8">
            <div className="flex space-x-4 w-full">
                {foodItems.map((item) => (
                    <div key={item.id} className="border-[#59595C] w-1/3 border-[1px] p-4 rounded-lg flex flex-col items-center">
                        <img
                            src={item.icon}
                            alt={item.name}
                            className="w-24 h-24 mb-2"
                        />
                        <h2 className="text-lg mb-1">{item.name}</h2>
                        <span className="text-xl font-bold mb-2">${item.price}</span>
                        <button className="bg-gradient-to-r from-[#B4D429] to-[#5D6E15] font-bold font-mono flex justify-center items-center text-white px-[40px] py-2 rounded-full"
                            onClick={() => handleAddToCart(item)}>
                            <UilShoppingCart size="25" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoodSlider;