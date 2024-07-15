// Content.js
import React, { useState, useEffect } from 'react';
import CustomCarousel from './Carousel';
import FilmSlider from './FilmSlider';
import FoodSlider from './FoodSlider';
import Booking from './Booking';

export default function Content() {
    const [films, setFilms] = useState([]);
    const [sliders, setSliders] = useState([]);
    const [selectedFilmId, setSelectedFilmId] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9999/film')
            .then(response => response.json())
            .then(data => setFilms(data))
            .catch(error => console.error(error));

        fetch('http://localhost:9999/slider')
            .then(response => response.json())
            .then(data => setSliders(data))
            .catch(error => console.error(error));
    }, []);

    const handleBookNow = (id) => {
        setSelectedFilmId(id);
    };

    const addToCart = (item) => {
        setCartItems((prevCart) => {
            const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
            if (existingItemIndex !== -1) {
                // If item exists, create a new array with the updated item
                const newCart = [...prevCart];
                newCart[existingItemIndex] = {
                    ...newCart[existingItemIndex],
                    quantity: newCart[existingItemIndex].quantity + 1
                };
                return newCart;
            } else {
                // If item doesn't exist, add it with quantity 1
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    return (
        <div className="w-full flex">
            <div className="w-3/5 mt-[40px] gap-[25px]">
                <div>
                    <CustomCarousel images={sliders} />
                </div>
                <div className='w-full mt-[20px] mb-[20px]'>
                    <div className='w-full flex justify-between items-center'>
                        <p className='font-mono font-bold text-[20px] text-white'>Showing now</p>
                        <a href='/#' className='font-mono text-[#B4D429] text-[16px]'></a>
                    </div>
                    <FilmSlider movies={films} onBookNow={handleBookNow} />
                </div>
                <div className='w-full mt-[20px] mb-[20px]'>
                    <div className='w-full flex justify-between items-center'>
                        <p className='font-mono font-bold text-[20px] text-white'>Food and drink</p>
                        <a href='/#' className='font-mono text-[#B4D429] text-[16px]'>View all</a>
                    </div>
                    <div className="w-full flex justify-center items-center mt-[20px]">
                        <FoodSlider addToCart={addToCart} cartItems={cartItems} />
                    </div>
                </div>
            </div>
            <div className='w-2/5 mt-[40px] px-[25px]'>
                <Booking id={selectedFilmId} cartItems={cartItems} />
            </div>
        </div>
    );
}