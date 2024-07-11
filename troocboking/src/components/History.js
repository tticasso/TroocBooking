import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style/History.css"
export default function History() {
    const [order, setOrder] = useState([])

    useEffect(() => {
        axios.get('http://localhost:9999/order')
            .then(response => {
                setOrder(response.data)
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }, [])

    return (
        <div className='container'>
            <div className='booking-history'>
                {order.map(order => (
                    <div className='detail' style={{color:"white", justifyContent:'space-between', display:'flex'}}>
                        <div className='name'>{order.filmName}</div>
                        <div className='seat'>
                            {Array.isArray(order.selectedSeats) ? order.selectedSeats.join(', ') : 'No seats selected'}
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}