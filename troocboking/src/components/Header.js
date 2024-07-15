import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UilUser, UilSignOutAlt } from '@iconscout/react-unicons';

export default function Header() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        navigate('/login');
    };

    const handleMaintain = () => {
        alert('This feature is under maintenance');
    };

    const handleClick2 = () => {
        setShowModal(!showModal);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        navigate('/');
    };

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const user = JSON.parse(localStorage.getItem('user'));

    const button = [
        {
            name: "Movies"
        },
        {
            name: "Series"
        },
        {
            name: "Drama"
        },
        {
            name: "Comedy"
        }
    ];

    return (
        <div className="w-full flex pt-[20px] gap-[29px] relative">
            <input type="text" placeholder="Type to search" className="w-[400px] h-[50px] rounded-[20px] font-mono pl-[20px] bg-[#1C1B21] border-[1px] border-[#605F64] outline-none text-white" />
            <div className="flex gap-[29px]">
                {button.map((item, index) => (
                    <button onClick={handleMaintain} key={index} className="h-[50px] w-[100px] rounded-[20px] pl-[20px] pr-[20px] font-mono font-bold text-[16px] text-[#ffffff] bg-[#1C1B21] border-[1px] border-[#605F64] outline-none">{item.name}</button>
                ))}
            </div>
            {(!isLoggedIn) ? (
                (<button
                    onClick={handleClick}
                    className="h-[70px] w-[200px] rounded-[20px] font-mono font-bold text-[24px] text-white bg-gradient-to-r from-[#B4D429] to-[#5D6E15] border-[1px] border-[#605F64] outline-none">
                    Login
                </button>)
            ) : null}
            {(isLoggedIn) ? (
                <div className="relative">
                    <button className="h-[70px] w-[200px] flex items-center rounded-[20px] gap-[10px] font-mono font-bold text-[24px] text-white bg-[#1C1B21] border-[1px] border-[#605F64] outline-none px-[20px]"
                        onClick={handleClick2}
                    >
                        <div className="w-[35px] h-[35px] rounded-full border border-[#605F64] flex justify-center items-center">
                            <UilUser size="20" />
                        </div>
                        <div style={{ cursor: 'pointer' }}>
                            <p className="text-[11px] font-mono font-bold">{user.fullName}</p>
                            <p className="text-[9px] font-mono text-[#605F64] text-left">{user.email}</p>
                        </div>
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.3496 1.39497e-06L0.649276 1.39497e-06C0.530816 0.000459276 0.4147 0.0407416 0.313427 0.116512C0.212154 0.192282 0.12956 0.300669 0.0745329 0.43001C0.0195063 0.559351 -0.00586819 0.704746 0.00114102 0.850545C0.00815023 0.996343 0.0472773 1.13702 0.114311 1.25744L5.96448 11.676C6.20693 12.108 6.79065 12.108 7.03376 11.676L12.8839 1.25744C12.9516 1.13727 12.9913 0.996523 12.9987 0.850482C13.0061 0.704441 12.9809 0.558695 12.9258 0.429081C12.8708 0.299466 12.7879 0.190939 12.6863 0.115292C12.5848 0.0396448 12.4683 -0.000229083 12.3496 1.39497e-06Z" fill="white" />
                        </svg>
                    </button>
                    {showModal && (
                        <div className="absolute right-0 mt-2 w-[200px] bg-[#1C1B21] flex justify-center items-center rounded-[10px] border-[1px] border-[#605F64] shadow-lg">
                            <button onClick={handleLogout} className="h-[50px] flex justify-center items-center gap-[5px] text-white font-mono text-[16px]"> <UilSignOutAlt color='#B4D429' /> Log out</button>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
}
