import { useState } from 'react';
import Header from "../components/Header";
import SideBarList from "../components/SideBarList";
import Content from "../components/Content";
import { UilEstate, UilFavorite, UilPercentage, UilCoffee, UilBell, UilCog, UilSignout } from '@iconscout/react-unicons';
import Sidebar from '../components/Sidebar';

export default function Homepage() {
    // Initialize selectedIndex to 0 to set the default selection to the first sidebar item
    const [selectedIndex, setSelectedIndex] = useState(0);

    const list = [
        {
            name: "Home",
            icon: <UilEstate size={24} color="#B4D429" />,
        },
        {
            name: "Favorites",
            icon: <UilFavorite size={24} color="#B4D429" />,
        },
        {
            name: "Bonus",
            icon: <UilPercentage size={24} color="#B4D429" />,
        },
        {
            name: "Food and drink",
            icon: <UilCoffee size={24} color="#B4D429" />,
        },
        {
            name: "Notifications",
            icon: <UilBell size={24} color="#B4D429" />,
        },
        {
            name: "Settings",
            icon: <UilCog size={24} color="#B4D429" />,
        },

    ];

    const renderContent = () => {
        switch (selectedIndex) {
            case 0:
                return <Content />;
            case 1:
                return <div>Favorites Content</div>;
            case 2:
                return <div>Bonus Content</div>;
            case 3:
                return <div>Food and drink Content</div>;
            case 4:
                return <div>Notifications Content</div>;
            case 5:
                return <div>Settings Content</div>;
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
                    onSelect={setSelectedIndex}
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
