"use client";

import { Carousel, createTheme } from "flowbite-react";
import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const crslitem = [
  { src: "/images/company profile-1.jpg", alt: "Slide 1" },
  { src: "/images/company profile-2.jpg", alt: "Slide 2" },
  { src: "/images/company profile-3.jpg", alt: "Slide 3" },
];

const carouselTheme = createTheme({
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth scrollbar-hide rounded-none",
    snap: "snap-x",
  },

  indicators: {
    active: {
      off: "bg-white/90 hover:bg-white/60",
      on: "bg-white/50",
    },
  },
});

function CarouselSection() {
  return (
    // bissa min h-screen
    <section className="relative">
      <Carousel
        slideInterval={1500}
        leftControl={
          <IoIosArrowBack className="text-white opacity-60 size-10 hidden" />
        }
        rightControl={
          <IoIosArrowForward className="text-white opacity-60 size-10 hidden" />
        }
        className="h-screen"
        theme={carouselTheme}
      >
        {crslitem.map((item, index) => (
          <div key={index} className="w-full h-full relative">
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
          </div>
        ))}
      </Carousel>

      <div className="flex flex-col absolute top-1/2 -translate-y-1/2 md:mx-20 text-white text-center px-4 items-start font-display md:w-[30vw] w-[80vw]">
        <h3 className="text-xl md:text-5xl font-bold text-start">
          MAKE LIVING SIMPLE
        </h3>
        <span className="text-sm md:text-xl text-start">
          Bersama INOTEK, wujudkan bangunan modern dengan material berkualitas
        </span>
      </div>
    </section>
  );
}

export default CarouselSection;
