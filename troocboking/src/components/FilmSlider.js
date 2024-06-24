// Carousel.js
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'tailwindcss/tailwind.css';

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

const FilmSlider = ({ movies }) => {
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
                            <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
                            <div className="w-full text-white">
                                <h3 className="px-[1px] text-lg font-bold text-center truncate">{movie.title}</h3>
                                <p className="text-sm text-center truncate">{movie.description}</p>
                                <p className="text-yellow-400 text-center">{'★'.repeat(movie.rating)}</p>
                                <div className='w-full flex justify-center'>
                                    <button className="my-2 px-5 py-2 bg-gradient-to-r from-[#B4D429] to-[#5D6E15] rounded-full font-mono">Book now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default FilmSlider;
