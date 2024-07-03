import React, { useState } from 'react';
import { UilSchedule } from '@iconscout/react-unicons';
import Checkout from './Checkout';

export default function Booking() {
    const [seats, setSeats] = useState([
        { id: 1, status: 'booked' },
        { id: 2, status: 'available' },
        { id: 3, status: 'available' },
        { id: 4, status: 'available' },
        { id: 5, status: 'booked' },
        { id: 6, status: 'available' },
        { id: 7, status: 'available' },
        { id: 8, status: 'available' },
        { id: 9, status: 'available' },
        { id: 10, status: 'available' },
        { id: 11, status: 'booked' },
        { id: 12, status: 'available' },
        { id: 13, status: 'available' },
        { id: 14, status: 'available' },
        { id: 15, status: 'booked' },
        { id: 16, status: 'available' },
        { id: 17, status: 'available' },
        { id: 18, status: 'available' },
        { id: 19, status: 'booked' },
        { id: 20, status: 'available' },
        { id: 21, status: 'available' },
        { id: 22, status: 'booked' },
        { id: 23, status: 'available' },
        { id: 24, status: 'available' },
        { id: 25, status: 'available' },
        { id: 26, status: 'available' },
        { id: 27, status: 'booked' },
        { id: 28, status: 'available' },
        { id: 29, status: 'booked' },
        { id: 30, status: 'available' },
        { id: 31, status: 'available' },
        { id: 32, status: 'booked' },
        { id: 33, status: 'available' },
        { id: 34, status: 'available' },
        { id: 35, status: 'available' }
    ]);

    const handleSeatClick = (id) => {
        setSeats((prevSeats) =>
            prevSeats.map((seat) =>
                seat.id === id
                    ? { ...seat, status: seat.status === 'available' ? 'your_choice' : 'available' }
                    : seat
            )
        );
    };

    const getFillColor = (status) => {
        switch (status) {
            case 'booked':
                return '#4D4D4D';
            case 'available':
                return '#7F924A';
            case 'your_choice':
                return '#BBFC44';
            default:
                return '#D9D9D9';
        }
    };

    const selectedSeats = seats
        .filter(seat => seat.status === 'your_choice')
        .map(seat => `A${seat.id}`);

    return (
        <div className='w-full'>
            <div className="w-full h-[462px] bg-[#1C1B21] rounded-[20px] p-[20px]">
                <div className="w-full flex justify-between">
                    <div>
                        <p className="font-bold font-mono text-[16px] text-white">The Mavka</p>
                        <p className="font-bold font-mono text-[12px] text-[#A4A4A6]">20 seats available</p>
                    </div>
                    <div className='flex gap-[5px]'>
                        <button className="px-2 py-2 bg-gradient-to-r from-[#B4D429] to-[#5D6E15] rounded-[5px] font-mono">
                            <UilSchedule color="#ffffff" />
                        </button>
                        <div>
                            <p className="font-bold font-mono text-[16px] text-white">10:30 AM</p>
                            <p className="font-bold font-mono text-[12px] text-[#A4A4A6]">12 Mar</p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center mt-[30px]'>
                    <div className='w-auto flex flex-col'>
                        <svg width="302" height="46" viewBox="0 0 302 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 43.267C121.522 -13.0877 187.048 -10.4073 301 43.267" stroke="#B4D429" strokeWidth="4" />
                        </svg>
                        <p className='text-center font-mono font-bold text-[11px] text-white mt-[-10px]'>Main screen</p>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center mt-[20px]'>
                    <div className='grid grid-cols-7 gap-2'>
                        {seats.map((seat) => (
                            <div key={seat.id} className="flex justify-center items-center w-8 h-8 rounded-[5px]" onClick={() => handleSeatClick(seat.id)}>
                                <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.25 5.4375V2.75C4.25 1.375 5.375 0.25 6.75 0.25H19.25C20.625 0.25 21.75 1.375 21.75 2.75V5.45C20.3 5.9625 19.25 7.3375 19.25 8.9625V11.5H6.75V8.95C6.75 7.3375 5.7 5.95 4.25 5.4375ZM23 6.5C21.625 6.5 20.5 7.625 20.5 9V12.75H5.5V9C5.5 8.33696 5.23661 7.70107 4.76777 7.23223C4.29893 6.76339 3.66304 6.5 3 6.5C2.33696 6.5 1.70107 6.76339 1.23223 7.23223C0.763392 7.70107 0.5 8.33696 0.5 9V15.25C0.5 16.625 1.625 17.75 3 17.75V20.25H5.5V17.75H20.5V20.25H23V17.75C24.375 17.75 25.5 16.625 25.5 15.25V9C25.5 7.625 24.375 6.5 23 6.5Z"
                                        fill={getFillColor(seat.status)}
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full flex justify-center gap-[25px] mt-[20px]'>
                    <div className='flex items-center gap-[5px]'>
                        <div className='w-[15px] h-[15px] rounded-full bg-[#2F2E34]'>
                        </div>
                        <p className='font-mono font-bold text-[13px] text-white'>Booked</p>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                        <div className='w-[15px] h-[15px] rounded-full bg-[#4B5524]'>
                        </div>
                        <p className='font-mono font-bold text-[13px] text-white'>Available</p>
                    </div>
                    <div className='flex items-center gap-[5px]'>
                        <div className='w-[15px] h-[15px] rounded-full bg-[#B4D429]'>
                        </div>
                        <p className='font-mono font-bold text-[13px] text-white'>Your choice</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center mt-[20px]">
                <Checkout selectedSeats={selectedSeats} />
            </div>
        </div>
    );
}
