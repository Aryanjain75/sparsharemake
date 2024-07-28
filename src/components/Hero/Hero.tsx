"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import emblaCarousel from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import image1 from "../utils/birthdayhall.png";
import { FlipWords } from "./flip-words";
import { Button } from "./moving-borders";
import Link from "next/link";
const Hero = () => {
  const emblaRef = useRef(null);
  const autoplay = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  ).current;

  const words = ["Eats ", "Watch ", "Enjoy "];
  const words1 = ["Good ", "Great ", "Amazing "];
  const words2 = ["Feel ", "Experience ", "Embrace "];
  const words3 = ["Good ", "Wonderful ", "Incredible "];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (emblaRef.current) {
      const embla = emblaCarousel(emblaRef.current, { loop: true }, [autoplay]);
      return () => embla.destroy();
    }
  }, [autoplay]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2200); // Change duration as needed

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="w-full h-[100vh]">
      <div className="embla w-full h-screen overflow-hidden z-1 absolute" ref={emblaRef}>
        <div className="embla__container flex">
          <div className="embla__slide relative w-full h-screen flex-shrink-0">
            <Image
              alt="birthday hall"
              src={image1}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="embla__slide relative w-full h-screen flex-shrink-0">
            <Image
              alt="another image"
              src="https://th.bing.com/th/id/OIP.JJ9Sal9zGh3EjpsWyENBcgHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="embla__slide relative w-full h-screen flex-shrink-0">
            <Image
              alt="placeholder image"
              src="https://www.historictheatrephotos.com/Resources/Theatre-Photos/Hollywood-Entertainment-District-Los-Angeles/Photos/Events/Auditorium_during_Open_House_event.jpg"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <div className="z-3 relative " style={{top:"33vw"}}>
        <div className="flex flex-col mx-[5rem] flex items-center px-4 top-[6rem] gap-8">
          <div className="lg:text-2xl md:text-[4vw] font-normal text-neutral-600 dark:text-neutral-400 gap-1">
            <FlipWords words={words} />
            <FlipWords words={words1} />
            <FlipWords words={words2} />
            <FlipWords words={words3} />
            <br />
          </div>
          <div className="lg:text-7xl md:text-3xl text-[#ff4e00fa] font-extrabold">Cafe Sparsha in House!</div>
          <div className="md:flex flex-col md:w-[80vw] sm:w-[80vw]">
          <Link className="w-12 md:w-auto sm:w-[auto] m-2 border-[#ff4e00fa] p-4  text-xl  border-2  rounded-full text-white hover:bg-[#ff4e00fa]" href="/birthdayhallbooking">Birthday Hall Booking</Link>
          <Link className="w-12 md:w-auto sm:w-[auto] m-2 border-[#ff4e00fa] p-4  text-xl  border-2  rounded-full text-white hover:bg-[#ff4e00fa]" href="/resturent">Resturent Seat Booking</Link>
          <Link className="w-12 md:w-auto sm:w-[auto] m-2 border-[#ff4e00fa] p-4  text-xl  border-2  rounded-full text-white hover:bg-[#ff4e00fa]" href="/theater-booking">Private theater booking</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
