import React, { useState } from 'react';
import { UilPadlock, UilEnvelopeMinus } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
        repeatPassword: ''
    });
    const [error, setError] = useState('');

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+$/;
        const gmailRegex = /^[^\s@]+@gmail\.com$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        const { email, password, repeatPassword } = formData;

        if (!emailRegex.test(email) || !gmailRegex.test(email)) {
            return "Invalid email address. Please use a valid Gmail address.";
        }
        if (!passwordRegex.test(password)) {
            return "Password must be at least 6 characters long and include both letters and numbers.";
        }
        if (password !== repeatPassword) {
            return "Passwords do not match.";
        }
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        // Prepare data for API call
        const postData = {
            email: formData.email,
            fullName: formData.fullName,
            password: formData.password,
            role: "user",
            status: true
        };

        // Example fetch call to post data to API
        fetch('http://localhost:9999/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                // Optionally handle success response
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors
            });
        alert("Sign up successfully!");
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 rounded-lg shadow-lg flex w-3/4 max-w-4xl">
                <div className="w-1/2">
                    <img
                        src="https://th.bing.com/th/id/R.8047173487fae27e020e3416b25bea55?rik=YSzEALV6hH%2fTcQ&pid=ImgRaw&r=0"
                        alt="Mavka Movie Poster"
                        className="rounded-l-lg object-cover"
                    />
                </div>
                <div className="w-1/2 p-8 mt-20">
                    <div className="flex justify-center mb-4">
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.7812 4.04126C17.7094 4.04126 15.2344 6.51626 15.2344 9.58814C15.2344 12.66 17.7094 15.1352 20.7812 15.1352C23.8531 15.1352 26.3281 12.6599 26.3281 9.58814C26.3281 6.51626 23.8531 4.04126 20.7812 4.04126ZM9.53125 6.54126C7.14977 6.54126 5.23438 8.45665 5.23438 10.8381C5.23438 13.2195 7.14977 15.1352 9.53125 15.1352C11.9127 15.1352 13.8281 13.2195 13.8281 10.8381C13.8281 8.45673 11.9127 6.54126 9.53125 6.54126ZM7.73438 16.5413V25.1352H26.3281V16.5413H7.73438ZM35.0781 16.9044L27.7344 20.0517V21.6245L35.0781 24.7718V16.9044ZM4.92188 17.0881V19.5881H6.32812V17.0881H4.92188ZM13.75 26.5414V27.9475H14.7666L10.7726 38.594H12.2743L16.2983 27.9475L16.3281 38.594H17.7344L17.7642 27.9475L21.7882 38.594H23.2899L19.2959 27.9475H20.3125V26.5414C18.1248 26.5412 15.9377 26.5414 13.75 26.5414Z"
                                fill="#B4D429"
                            />
                        </svg>
                        <p className="font-mono font-bold text-[20px] text-[#B4D429]">
                            TroocBooking
                        </p>
                    </div>

                    <form className="flex flex-col items-center" onSubmit={handleSubmit}>

                        <div className="mb-4 w-full">
                            <label className='block text-sm text-white'>Email: </label>
                            <div className="w-full flex justify-center">
                                <div className="flex items-center border-2 border-[#3499AF] rounded-2xl w-full h-[36px] bg-[white]" >
                                    <UilEnvelopeMinus size={20} color="#B4D429" className="ml-2" />
                                    <input
                                        type="text"
                                        placeholder="example@gmail.com"
                                        className="w-[80%] h-full pl-2 border-none outline-none"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 w-full">
                            <label className='block text-sm text-white'>Full name: </label>
                            <div className="w-full flex justify-center">
                                <div className="flex items-center border-2 border-[#3499AF] rounded-2xl w-full h-[36px] bg-[white]" >
                                    <UilEnvelopeMinus size={20} color="#B4D429" className="ml-2" />
                                    <input
                                        type="text"
                                        placeholder="Nguyen Van A"
                                        className="w-[80%] h-full pl-2 border-none outline-none"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 w-full">
                            <label className='block text-sm text-white'>Password: </label>
                            <div className="w-full flex justify-center">
                                <div className="flex items-center border-2 border-[#3499AF] rounded-2xl w-full h-[36px] bg-[white]" >
                                    <UilPadlock size={20} color="#B4D429" className="ml-2" />
                                    <input
                                        type="password"
                                        placeholder="********"
                                        className="w-[80%] h-full pl-2 border-none outline-none"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 w-full">
                            <label className='block text-sm text-white'>Repeat Password: </label>
                            <div className="w-full flex justify-center">
                                <div className="flex items-center border-2 border-[#3499AF] rounded-2xl w-full h-[36px] bg-[white]" >
                                    <UilPadlock size={20} color="#B4D429" className="ml-2" />
                                    <input
                                        type="password"
                                        placeholder="********"
                                        className="w-[80%] h-full pl-2 border-none outline-none"
                                        value={formData.repeatPassword}
                                        onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}

                        <div className="flex justify-center items-center mb-4 w-full mt-10">
                            <button
                                type="submit"
                                className="w-full max-w-[200px] py-1 px-2 bg-[#B4D429] text-white rounded-lg hover:bg-green-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#B4D429] focus:ring-opacity-50"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-gray-400 mt-4 italic">
                        Already have an account ?{' '}
                        <Link
                            to="/login"
                            className="text-green-400 italic"
                            style={{ color: '#B4D429' }}
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
