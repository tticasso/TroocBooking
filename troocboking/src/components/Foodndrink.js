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
        <div className=''>
            <div className='row'>
                <div className='col-8'>
                    <div className="product-list">
                        {foods.map(food => (
                            <div className="food" key={food.id}>
                                <img src={food.icon} alt={food.name} />
                                <div className="details">
                                    <div className="name ">{food.name}</div>
                                    <div className="info">
                                        <div className="price">${food.price}</div>
                                        <button className="buy-button">
                                            <i className="fas fa-shopping-cart"><UilShoppingCartAlt /></i>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col-4'>
                    <></>
                </div>
            </div>

        </div>

    );
}

export default Foodndrink;
