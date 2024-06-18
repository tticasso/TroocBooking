import React, { useState } from 'react';

export default function SideBarList({ list, onSelect }) {
    const [selected, setSelected] = useState(null);

    const handleSelect = (index) => {
        setSelected(index);
        onSelect(index);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-4/5 flex flex-col">
                {list.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelect(index)}
                        className={`h-[40px] rounded-[10px] pl-[10px] flex items-center mt-[20px] gap-[10px] ${selected === index ? 'bg-gradient-to-r from-[#B4D429] to-[#5D6E15]' : ''}`}
                    >
                        {React.cloneElement(item.icon, { color: selected === index ? '#ffffff' : '#B4D429' })}
                        <p className="font-mono font-bold text-[16px] text-[#ffffff]">{item.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
