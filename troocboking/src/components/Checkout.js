import React, { useState, useEffect } from 'react';
import { UilPlus, UilMinus } from '@iconscout/react-unicons';

const Checkout = ({ selectedSeats, filmName, cartItems }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Initialize items state with cartItems and quantity initialized to 1
        const initialItems = cartItems.map(item => ({ ...item, quantity: 1 }));
        setItems(initialItems);
    }, [cartItems]);

    const handleIncreaseQuantity = (id) => {
        setItems(prevItems => {
            return prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        });
    };

    const handleDecreaseQuantity = (id) => {
        setItems(prevItems => {
            return prevItems.map(item => {
                if (item.id === id && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
        });
    };

    const calculateSubtotal = () => {
        const seatsTotal = selectedSeats.length * 75;
        const foodTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
        return seatsTotal + foodTotal;
    };

    const handleSubmit = () => {
        // Prepare data to send to the API endpoint
        const orderData = {
            filmName: filmName,
            selectedSeats: selectedSeats,
            items: items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: calculateSubtotal()
        };

        // Call API endpoint (replace with actual API call)
        fetch('http://localhost:9999/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            // Handle response if needed
            console.log('Order placed successfully:', data);
            // Optionally, reset cart items after successful order
            setItems([]);
        })
        .catch(error => {
            console.error('Error placing order:', error);
        });
    };

    // Function to consolidate items by name and sum their quantities
    const consolidateItems = () => {
        const consolidatedItems = [];
        items.forEach(item => {
            const existingItem = consolidatedItems.find(ci => ci.name === item.name);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                consolidatedItems.push({ ...item });
            }
        });
        return consolidatedItems;
    };

    return (
        <div className="w-full p-6 bg-[#1C1B21] rounded-[20px] text-white">
            <h2 className="text-xl font-bold mb-4">Cart</h2>
            <hr className="border-t border-gray-600" />
            <div className="py-4">
                <div className="mb-4">
                    <p className="font-bold">Selected Seats:</p>
                    <ul className="list-disc ml-6">
                        {selectedSeats.map((seat, index) => (
                            <li key={index}>{seat}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <p className="font-bold">Food and Drinks:</p>
                    {consolidateItems().map((item, index) => (
                        <div key={item.id} className="flex justify-between mt-2">
                            <div>
                                <p>{item.name} x {item.quantity}</p>
                                <p className="text-sm text-gray-400">Price per item: ${item.price}</p>
                            </div>
                            <div className="flex items-center">
                                <button className="bg-[#B4D429] rounded-full px-2 py-1" onClick={() => handleDecreaseQuantity(item.id)}>
                                    <UilMinus size="18" />
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button className="bg-[#B4D429] rounded-full px-2 py-1" onClick={() => handleIncreaseQuantity(item.id)}>
                                    <UilPlus size="18" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <hr className="border-t border-gray-600" />
            <div className="flex justify-between py-4">
                <p>Total:</p>
                <p>${calculateSubtotal()}</p>
            </div>
            <button className="w-full py-2 bg-gradient-to-r from-[#B4D429] to-[#5D6E15] rounded-lg font-bold" onClick={handleSubmit}>
                Checkout
            </button>
        </div>
    );
};

export default Checkout;
