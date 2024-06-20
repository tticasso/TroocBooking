import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

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
    ]

    
        return (
            <div className="w-full flex pt-[20px] gap-[29px]">
                <input type="text" placeholder="Type to search" className="w-[400px] h-[50px] rounded-[20px] font-mono pl-[20px] bg-[#1C1B21] border-[1px] border-[#605F64] outline-none text-white" />
                <div className="flex gap-[29px]">
                    {button.map((item, index) => (
                        <button key={index} className="h-[50px] w-[100px] rounded-[20px] pl-[20px] pr-[20px] font-mono font-bold text-[16px] text-[#B4D429] bg-[#1C1B21] border-[1px] border-[#605F64] outline-none">{item.name}</button>
                    ))}
                </div>
                <button className="hidden h-[70px] w-[200px] rounded-[20px] font-mono font-bold text-[24px] text-white bg-gradient-to-r from-[#B4D429] to-[#5D6E15] border-[1px] border-[#605F64] outline-none">
                    Login
                </button>
                <button className="h-[70px] w-[200px] flex items-center rounded-[20px] gap-[10px] font-mono font-bold text-[24px] text-white bg-[#1C1B21] border-[1px] border-[#605F64] outline-none px-[20px]"
                        onClick={handleClick}
                >
                    <img src="https://cdn.britannica.com/73/234573-050-8EE03E16/Cristiano-Ronaldo-ceremony-rename-airport-Santa-Cruz-Madeira-Portugal-March-29-2017.jpg" alt="user" className="w-[30px] h-[30px] rounded-full" />
                    <div  style={{ cursor: 'pointer' }}>
                        <p className="text-[11px] font-mono font-bold">Cristiano Ronaldo</p>
                        <p className="text-[9px] font-mono text-[#605F64] text-left">cr7@gmail.com</p>
                    </div>
                </button>
            </div>
        );
    }