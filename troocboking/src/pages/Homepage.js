import { useState } from 'react';
import Header from "../components/Header";
import Content from "../components/Content";
import { UilEstate, UilCoffee, UilHistory } from '@iconscout/react-unicons';
import Sidebar from '../components/Sidebar';
import Foodndrink from '../components/FoodAndDrink';
import History from '../components/History';

export default function Homepage() {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const isLogged = localStorage.getItem('isLoggedIn');

    const list = [
        {
            name: "Home",
            icon: <UilEstate size={24} color="#B4D429" />,
        },
        {
            name: "Food and drink",
            icon: <UilCoffee size={24} color="#B4D429" />,
        },
        {
            name: "History",
            icon: <UilHistory size={24} color="#B4D429" />
        }
    ];

    const handleSelect = (index) => {
        if (index === 2 && !isLogged) {
            alert('Bạn cần phải đăng nhập');
            window.location.href = '/login';
        } else {
            setSelectedIndex(index);
        }
    };

    const renderContent = () => {
        switch (selectedIndex) {
            case 0:
                return <Content />;
            case 1:
                return <Foodndrink />;
            case 2:
                return <History />;
            default:
                return <div>Select an item</div>;
        }
    };

    return (
        <div className="w-full h-full flex">
            <div className="w-1/6">
                <Sidebar
                    list={list}
                    selectedIndex={selectedIndex}
                    onSelect={handleSelect} // sử dụng handleSelect thay cho setSelectedIndex
                />
            </div>
            <div className="w-5/6 pl-[23px]">
                <Header />
                <div className='w-full'>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
