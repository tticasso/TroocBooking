import React, { useState, useEffect } from "react";
import { UilSchedule } from "@iconscout/react-unicons";
import Checkout from "./Checkout";
import FoodSlider from "./FoodSlider";

export default function Booking({ id, cartItems }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:9999/film/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const movie = data; // Assuming the API response structure
          if (movie) {
            setMovieDetails(movie);
            setSelectedSlot(movie.slot[0]); // Select the first slot by default
            setSeats(movie.slot[0].seats); // Set the seats for the first slot
          }
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSlotChange = (slot) => {
    setSelectedSlot(slot);
    setSeats(slot.seats);
  };

  const handleSeatClick = (seatId) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.seat === seatId
          ? {
            ...seat,
            status: seat.status === "available" ? "your_choice" : "available",
          }
          : seat
      )
    );
  };


  const getFillColor = (status) => {
    switch (status) {
      case 'booked':
        return '#4D4D4D';
      case 'available':
        return '#7F924A';
      case 'your_choice':
        return '#BBFC44';
      default:
        return '#D9D9D9';
    }
  };

  const selectedSeats = seats
    .filter((seat) => seat.status === "your_choice")
    .map((seat) => `A${seat.seat}`);

  if (!movieDetails) {
    return (
      <div className="w-full h-[462px] flex justify-center bg-[#1C1B21] rounded-[20px] p-[20px] text-white">
        Choose Film to check the seats
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full h-[462px] bg-[#1C1B21] rounded-[20px] p-[20px]">
        <div className="w-full flex justify-between">
          <div>
            <p className="font-bold font-mono text-[16px] text-white">
              {movieDetails.title}
            </p>
          </div>
          <div className="flex gap-[5px]">
            <div>
              <select
                className="px-2 py-2 bg-[#1C1B21] text-white font-mono"
                value={selectedSlot?.time || ""}
                onChange={(e) =>
                  handleSlotChange(
                    movieDetails.slot.find(
                      (slot) => slot.time === e.target.value
                    )
                  )
                }
              >
                {movieDetails.slot.map((slot) => (
                  <option key={slot.time} value={slot.time}>
                    {slot.date} - {slot.time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-[30px]">
          <div className="w-auto flex flex-col">
            <svg
              width="302"
              height="46"
              viewBox="0 0 302 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 43.267C121.522 -13.0877 187.048 -10.4073 301 43.267"
                stroke="#B4D429"
                strokeWidth="4"
              />
            </svg>
            <p className="text-center font-mono font-bold text-[11px] text-white mt-[-10px]">
              Main screen
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-[20px]">
          <div className="grid grid-cols-7 gap-2">
            {seats.map((seat) => (
              <div
                key={seat.seat}
                className="flex justify-center items-center w-8 h-8 rounded-[5px]"
                onClick={() => handleSeatClick(seat.seat)}
              >
                <svg
                  width="26"
                  height="21"
                  viewBox="0 0 26 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.25 5.4375V2.75C4.25 1.375 5.375 0.25 6.75 0.25H19.25C20.625 0.25 21.75 1.375 21.75 2.75V5.45C20.3 5.9625 19.25 7.3375 19.25 8.9625V11.5H6.75V8.95C6.75 7.3375 5.7 5.95 4.25 5.4375ZM23 6.5C21.625 6.5 20.5 7.625 20.5 9V12.75H5.5V9C5.5 8.33696 5.23661 7.70107 4.76777 7.23223C4.29893 6.76339 3.66304 6.5 3 6.5C2.33696 6.5 1.70107 6.76339 1.23223 7.23223C0.763392 7.70107 0.5 8.33696 0.5 9V15.25C0.5 16.625 1.625 17.75 3 17.75V20.25H5.5V17.75H20.5V20.25H23V17.75C24.375 17.75 25.5 16.625 25.5 15.25V9C25.5 7.625 24.375 6.5 23 6.5Z"
                    fill={getFillColor(seat.status)}
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center gap-[25px] mt-[20px]">
          <div className="flex items-center gap-[5px]">
            <div className="w-[15px] h-[15px] rounded-full bg-[#2F2E34]"></div>
            <p className="font-mono font-bold text-[13px] text-white">Booked</p>
          </div>
          <div className="flex items-center gap-[5px]">
            <div className="w-[15px] h-[15px] rounded-full bg-[#4B5524]"></div>
            <p className="font-mono font-bold text-[13px] text-white">
              Available
            </p>
          </div>
          <div className="flex items-center gap-[5px]">
            <div className="w-[15px] h-[15px] rounded-full bg-[#B4D429]"></div>
            <p className="font-mono font-bold text-[13px] text-white">
              Your choice
            </p>
          </div>
        </div>
      </div>
      {/* <div className="w-full flex justify-center items-center mt-[20px]">
        <FoodSlider addToCart={addToCart} />
      </div> */}
      <div className="w-full flex justify-center items-center mt-[20px]">
        <Checkout
          selectedSeats={selectedSeats}
          selectedDate={selectedSlot.date}
          filmName={movieDetails.title}
          cartItems={cartItems}
          filmId={id}
        />
      </div>
    </div>
  );
}
