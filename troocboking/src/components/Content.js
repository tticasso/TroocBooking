import React from 'react';
import CustomCarousel from './Carousel';
import FilmSlider from './FilmSlider';
import FoodSlider from './FoodSlider';
import Booking from './Booking';

const images = [
    { id: 1, link: 'https://www.awn.com/sites/default/files/styles/original/public/image/attached/1057586-theforestcreatures-1280.jpg?itok=FjjqCntx' },
    { id: 2, link: 'https://resizing.flixster.com/IJsd_ffZ0nE_ZKofCKqv3J1ogfA=/fit-in/1152x864/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p26836820_k_h10_aa.jpg' },
    { id: 3, link: 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2023/06/inside-out-2-pixar.jpg' },
];
const movies = [
    { id: 1, title: 'Inside out 2', image: 'https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster--dark-mode.png/0/images/masterrepository/Fandango/234178/insideout2-posterart.jpg', description: 'Imax Films', rating: 5 },
    { id: 2, title: 'Doraemon: Nobita Earth Symphony', image: 'https://static.kinoafisha.info/k/movie_posters/canvas/800x1200/upload/movie_posters/8/2/2/8377228/567632451718018019.jpg', description: 'Lionsgate Films', rating: 4 },
    { id: 3, title: 'The Watchers', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7lLVZugWMD7gXHkxwFt3axKIwIbLyrckVWg&s', description: 'Lionsgate Films', rating: 5 },
    { id: 4, title: 'Civil War', image: 'https://resizing.flixster.com/ETuDz44d0NgZuwQlOfh0NxJai1U=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2I5MTQ2Y2ExLWU3MTItNDExYy04ODkyLTI1NmY3NjZiYjRlNC5qcGc=', description: 'Lionsgate Films', rating: 4 },
    { id: 5, title: 'Avatar', image: 'https://i1-vnexpress.vnecdn.net/2022/12/15/avatar-the-way-of-water-1671069183.jpg?w=330&h=495&q=100&dpr=1&fit=crop&s=YmqMRdbpi9-enYuczh3XiA', description: 'Lionsgate Films', rating: 4 },
];

export default function Content() {
    return (
        <div className="w-full flex">
            <div className="w-3/5 mt-[40px] gap-[25px]">
                <div>
                    <CustomCarousel images={images} />
                </div>
                <div className='w-full mt-[20px] mb-[20px]'>
                    <div className='w-full flex justify-between items-center'>
                        <p className='font-mono font-bold text-[20px] text-white'>Showing now</p>
                        <a href='/#' className='font-mono text-[#B4D429] text-[16px]'>View all</a>
                    </div>
                    <FilmSlider movies={movies} />
                </div>
                <div className='w-full mt-[20px] mb-[20px]'>
                    <div className='w-full flex justify-between items-center'>
                        <p className='font-mono font-bold text-[20px] text-white'>Food and drink</p>
                        <a href='/#' className='font-mono text-[#B4D429] text-[16px]'>View all</a>
                    </div>
                    <FoodSlider />
                </div>
            </div>
            <div className='w-2/5 mt-[40px] px-[25px]'>
                <Booking />
            </div>
        </div>
    );
}