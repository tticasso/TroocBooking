import React, { useEffect, useState } from 'react';

export default function History() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    console.log(orders);
    useEffect(() => {
        fetch('http://localhost:9999/order')
            .then(response => response.json())
            .then(data => {
                const userOrders = data.filter(order => order.userId === userId);
                setOrders(userOrders);
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, [userId]);

    return (
        <div className="w-full h-screen flex gap-[20px]">
            <div className="w-5/6 mt-[40px] gap-[25px] flex rounded-[20px] bg-[#1C1B21] mr-[40px]">
                <div className="w-2/5 p-[10px]">
                    <p className="font-bold font-mono text-[24px] text-[#B4D429]">Booking History</p>
                    {orders.map(order => (
                        <div
                            key={order.id}
                            className="w-full mt-[20px] mb-[20px] h-[80px] border-[2px] border-[#3E3D42] rounded-[20px] flex justify-between items-center px-[20px] text-white font-mono text-[20px] cursor-pointer"
                            onClick={() => setSelectedOrder(order)}
                        >
                            <div className='w-2/3'>
                                <p className='truncate'>{order.filmName}</p>
                                <p className='truncate'>{Array.isArray(order.selectedSeats) ? order.selectedSeats.join(', ') : ''}</p>
                            </div>
                            <div>
                                {order.selectedDate}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-[2px] h-full my-[20px] bg-[#3E3D42]"></div>
                <div className="w-3/5 pt-[10px] flex justify-center">
                    {selectedOrder ? (
                        <div className="w-4/5">
                            <p className="font-bold font-mono text-[24px] text-[#B4D429]">Booking ID: {selectedOrder.id}</p>
                            <div className="flex w-full justify-between font-mono text-white text-[20px] mt-[20px]">
                                <div className="">
                                    <p>{selectedOrder.filmName}</p>
                                    <p className='text-[18px]'>{Array.isArray(selectedOrder.selectedSeats) ? selectedOrder.selectedSeats.join(', ') : ''}</p>
                                </div>
                                <p>{(selectedOrder.selectedSeats.length) * 75}$</p>
                            </div>
                            {selectedOrder.items.map((item, index) => (
                                <div key={index} className="flex w-full justify-between font-mono text-white text-[20px] mt-[20px]">
                                    <div>
                                        <p>{item.name} x{item.quantity}</p>
                                    </div>
                                    <p>{item.price * item.quantity}$</p>
                                </div>
                            ))}
                            <div className="w-full h-[2px] bg-white mt-[20px]"></div>
                            <div className="flex w-full justify-between font-mono text-white text-[20px] mt-[20px]">
                                <p>Total</p>
                                <p>{selectedOrder.totalAmount}$</p>
                            </div>
                        </div>
                    ) : (
                        <p className="font-mono text-white text-[20px]">Select an order to see details</p>
                    )}
                </div>
            </div>
        </div>
    );
}
