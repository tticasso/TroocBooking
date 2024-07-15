// FilmSlider.js
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'tailwindcss/tailwind.css';
import Modal from 'react-modal';
import "../style/FilmModal.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UilPlay } from "@iconscout/react-unicons";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const FilmSlider = ({ movies, onBookNow }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const fetchMovieDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:9999/film/${id}`);
            const data = await response.json();
            setSelectedMovie(data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };
    console.log(selectedMovie);

    return (
        <div className='w-full'>
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                arrows={true}
                className="carousel-wrapper"
            >
                {movies.map(movie => (
                    <div key={movie.id} className="p-2">
                        <div className="rounded-[20px] overflow-hidden border-[#59595C] border-[1px] cursor-pointer">
                            <img src={movie.img} alt={movie.title} className="w-full h-48 object-cover" />
                            <div className="w-full text-white">
                                <h3 className="px-[1px] text-lg font-bold text-center truncate">{movie.title}</h3>
                                <p className="text-yellow-400 text-center">{'★'.repeat(movie.rate)}</p>
                                <div className='w-full flex flex-col justify-center px-[10px]'>
                                    <button
                                        className="mt-[5px] font-mono"
                                        onClick={() => fetchMovieDetails(movie.id)}
                                    >
                                        View Detail
                                    </button>
                                    <button
                                        className="my-2 px-5 py-2 bg-gradient-to-r from-[#B4D429] to-[#5D6E15] rounded-full font-mono"
                                        onClick={() => onBookNow(movie.id)}
                                    >
                                        Book now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            {selectedMovie && (
                <div className="overlay">
                    <div className="modal">
                        <div className="bg-[#1C1B21] rounded-lg p-4 flex w-full h-full mx-auto shadow-lg relative">
                            <div className="">
                                <button className="absolute top-1 right-2 text-white" onClick={closeModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[30px] w-[30px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="w-2/5 h-full">
                                <img src={selectedMovie.img} alt={selectedMovie.title} className="w-full h-full rounded-[20px]" />
                            </div>
                            <div className="w-3/5 text-white font-mono pl-[20px]">
                                <p className="text-[30px]">{selectedMovie.title}</p>
                                <p className="text-[14px] opacity-[0.5] italic">{selectedMovie.subtitle}</p>
                                <div className="mt-[10px]">
                                    {selectedMovie.genre.map((genre, index) => (
                                        <span key={index} className="text-[14px] py-[3px] px-[5px] rounded-[5px] bg-[#B4D429] mr-2">{genre}</span>
                                    ))}
                                </div>
                                <p className='mt-[10px]'>Duration: {selectedMovie.duration}</p>
                                <div className='w-full mt-[20px] flex gap-[20px]'>
                                    <div className='w-[60px] '>
                                        <CircularProgressbar
                                            styles={buildStyles({
                                                rotation: 0,
                                                strokeLinecap: 'round',
                                                textSize: '40px',
                                                textColor: "white",
                                                pathTransitionDuration: 0.5,
                                                trailColor: '#d6d6d6',
                                                backgroundColor: '#B4D429',
                                            })} value={selectedMovie.rate} maxValue={10} text={`${selectedMovie.rate.toFixed(1)}`} />
                                    </div>
                                    <div className=' flex items-center gap-[10px]'>
                                        <button className='w-[60px] h-[60px] flex justify-center items-center rounded-full border-[4px] border-white'>
                                            <UilPlay size='40'/>
                                        </button>
                                        <p>Watch Trailer</p>
                                    </div>
                                </div>
                                <p className='text-[24px] font-bold mt-[10px]'>Overview</p>
                                <p className='text-[14px] opacity-[0.5]'>{selectedMovie.overview}</p>
                                <div className='flex gap-[10px] mt-[10px]'>
                                    <p className='text-[24px] font-bold'>Distributer:</p>
                                    <p className='text-[24px] font-bold opacity-[0.6]'>{selectedMovie.distributer}</p>
                                </div>
                                <div className='w-4/5 h-[2px] bg-[#B4D429] mt-[10px]'></div>
                                <div className='flex gap-[10px] mt-[10px]'>
                                    <p className='text-[24px] font-bold'>Director:</p>
                                    <p className='text-[24px] font-bold opacity-[0.6]'>{selectedMovie.director}</p>
                                </div>
                                <div className='w-4/5 h-[2px] bg-[#B4D429] mt-[10px]'></div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default FilmSlider;

