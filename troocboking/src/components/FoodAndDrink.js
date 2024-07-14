import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style/Foodndrink.css"
import { UilShoppingCartAlt } from '@iconscout/react-unicons'

const Foodndrink = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9999/food')
            .then(response => {
                setFoods(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    
    return (
        <div className='w-full h-screen'>
            <div className='w-full flex'>
                <div className='w-3/5'>
                    <div className="product-list">
                        {foods.map(food => (
                            <div className="food" key={food.id}>
                                <img src={food.icon} alt={food.name} />
                                <div className="details">
                                    <div className="name font-mono">{food.name}</div>
                                    <div className="info">
                                        <div className="price font-mono">${food.price}</div>
                                        <button className="buy-button">
                                            <i className="fas fa-shopping-cart"><UilShoppingCartAlt /></i>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-2/5 p-[40px]'>
                    <div className='w-full p-[20px] h-[300px] bg-[#1C1B21] rounded-[20px] text-white'>
                        <p className='text-center font-mono'>Choose Film to check the seats</p>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Foodndrink;
