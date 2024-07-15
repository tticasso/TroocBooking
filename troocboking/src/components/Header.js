import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UilUser, UilSignOutAlt } from '@iconscout/react-unicons';
import dayjs from 'dayjs';
export default function Header() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleClick = () => {
        navigate('/login');
    };

    const handleMaintain = () => {
        alert('This feature is under maintenance');
    };

    const handleClick2 = () => {
        setShowModal(!showModal);
    };

    const handleProfile = () => {
        setShowProfile(!showProfile);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        const userId = JSON.parse(localStorage.getItem('user')).id;
        try {
            const response = await fetch(`http://localhost:9999/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dob: JSON.parse(localStorage.getItem('user')).dob,
                    email: JSON.parse(localStorage.getItem('user')).email,
                    fullName: JSON.parse(localStorage.getItem('user')).fullName,
                    password: newPassword,
                    role: JSON.parse(localStorage.getItem('user')).role,
                }),
            });

            if (response.ok) {
                setMessage("Password changed successfully");
            } else {
                setMessage("Error changing password");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            setMessage("Error changing password");
        }
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
                        <div className='w-auto h-auto absolute right-0 bg-[1C1B21]'>
                            <div className=" mt-2 w-[200px] bg-[#1C1B21] flex justify-center items-center rounded-[10px] border-[1px] border-[#605F64] shadow-lg">
                                <button onClick={handleProfile} className="h-[50px] flex justify-center items-center gap-[5px] text-white font-mono text-[16px]"> <UilUser color='#B4D429' />Profile</button>
                            </div>
                            <div className=" mt-2 w-[200px] bg-[#1C1B21] flex justify-center items-center rounded-[10px] border-[1px] border-[#605F64] shadow-lg">
                                <button onClick={handleLogout} className="h-[50px] flex justify-center items-center gap-[5px] text-white font-mono text-[16px]"> <UilSignOutAlt color='#B4D429' /> Log out</button>
                            </div>
                        </div>
                    )}
                    {showProfile && (
                        <div className='absolute right-[-100px] top-[-20px] w-screen h-screen bg-black bg-opacity-[0.5] flex justify-center items-center z-10'>
                            <div className='w-[800px] h-auto bg-[#1C1B21] rounded-[20px] p-[20px]'>
                                <div className='w-full h-[50px] flex justify-between items-center'>
                                    <p className='text-white font-mono text-[24px]'>Profile</p>
                                    <button onClick={handleProfile} className='text-white font-mono text-[24px]'>x</button>
                                </div>
                                <div className='w-full h-auto flex flex-col gap-[10px]'>
                                    <div className='flex flex-col'>
                                        <label className='text-white font-mono text-[20px]'>Full Name</label>
                                        <input
                                            type="text"
                                            value={user.fullName}
                                            disabled
                                            className='text-[#B4D429] font-mono text-[18px] bg-[#1C1B21] border-[1px] border-[#605F64] rounded-[10px] p-[10px]'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-white font-mono text-[20px]'>Email</label>
                                        <input
                                            type="text"
                                            value={user.email}
                                            disabled
                                            className='text-[#B4D429] font-mono text-[18px] bg-[#1C1B21] border-[1px] border-[#605F64] rounded-[10px] p-[10px]'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-white font-mono text-[20px]'>Date of Birth</label>
                                        <input
                                            type="text"
                                            value={dayjs(user.dob).format("DD/MM/YYYY")}
                                            disabled
                                            className='text-[#B4D429] font-mono text-[18px] bg-[#1C1B21] border-[1px] border-[#605F64] rounded-[10px] p-[10px]'
                                        />
                                    </div>
                                    <button
                                        onClick={() => setShowChangePassword(true)}
                                        className='w-[200px] h-[50px] mt-[20px] text-white font-mono text-[20px] bg-gradient-to-r from-[#B4D429] to-[#5D6E15] rounded-[10px]'>
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showChangePassword && (
                        <div className='absolute right-[-100px] top-[-20px] w-screen h-screen bg-black bg-opacity-[0.5] flex justify-center items-center z-20'>
                            <div className='w-[500px] h-auto bg-[#1C1B21] rounded-[20px] p-[20px]'>
                                <div className='w-full h-[50px] flex justify-between items-center'>
                                    <p className='text-white font-mono text-[24px]'>Change Password</p>
                                    <button onClick={() => setShowChangePassword(false)} className='text-white font-mono text-[24px]'>x</button>
                                </div>
                                <div className='w-full h-auto flex flex-col gap-[10px]'>
                                    <div className='flex flex-col'>
                                        <label className='text-white font-mono text-[20px]'>Current Password</label>
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className='text-[#B4D429] font-mono text-[18px] bg-[#1C1B21] border-[1px] border-[#605F64] rounded-[10px] p-[10px]'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-white font-mono text-[20px]'>New Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className='text-[#B4D429] font-mono text-[18px] bg-[#1C1B21] border-[1px] border-[#605F64] rounded-[10px] p-[10px]'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className='text-white font-mono text-[20px]'>Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className='text-[#B4D429] font-mono text-[18px] bg-[#1C1B21] border-[1px] border-[#605F64] rounded-[10px] p-[10px]'
                                        />
                                    </div>
                                    {message && <p className='text-red-500'>{message}</p>}
                                    <button
                                        onClick={handleChangePassword}
                                        className='w-[200px] h-[50px] mt-[20px] text-white font-mono text-[20px] bg-gradient-to-r from-[#B4D429] to-[#5D6E15] rounded-[10px]'>
                                        Save Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
}
