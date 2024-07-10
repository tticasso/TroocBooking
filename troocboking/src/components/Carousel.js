import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'tailwindcss/tailwind.css';

const CustomCarousel = ({ images }) => {
    return (
        <div className='w-full rounded-[20px]'>
            <Carousel
                showArrows={false}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                className="carousel-wrapper"
                renderThumbs={() => null} // Ẩn các thumbnail
            >
                {images.map(image => (
                    <div key={image.id} className="h-[350px] flex items-center justify-center overflow-hidden">
                        <img src={image.link} alt={`Slide ${image.id}`} className="object-cover w-full h-full rounded-[20px]" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CustomCarousel;
