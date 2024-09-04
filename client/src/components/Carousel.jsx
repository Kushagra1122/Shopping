import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


function CarouselComponent() {
  return (
    <Carousel
      autoPlay
      navButtonsAlwaysVisible
      infiniteLoop
      showStatus={false}
      emulateTouch
      showThumbs={false}
    >
      <div className="relative ">
        <img src="/images/home.jpg" alt="img" />
        <div className=" absolute top-32  left-20 mt-10">
          <div className="flex flex-col items-start ">
            <span className="text-7xl text-red-500 font-bold ">10% off</span>

            <span className="text-5xl mt-5 text-black font-semibold ">
              on every product
            </span>

            <button className="mt-10 text-2xl bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-xl">
              Shop Now!!
            </button>
          </div>
        </div>
      </div>
      <div className="relative ">
        <img src="/images/home.jpg" alt="img" />
        <div className=" absolute top-32  left-20 mt-10">
          <div className="flex flex-col items-start ">
            <span className="text-7xl text-red-500 font-bold ">Fastest</span>

            <span className=" mt-5 text-5xl text-black font-semibold ">
              Home Delivery
            </span>

            <button className="mt-10 text-2xl bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-xl">
              Shop Now!!
            </button>
          </div>
        </div>
      </div>
      <div className="relative ">
        <img src="/images/home.jpg" alt="img" />
        <div className=" absolute top-32  left-20 mt-10">
          <div className="flex flex-col items-start ">
            <span className="text-7xl text-red-500 font-bold ">Best quality</span>

            <span className="mt-5 text-5xl text-black font-semibold ">
              and affordable
            </span>
            <span className="mt-5 text-5xl text-black font-semibold ">Products</span>

            <button className="mt-10 text-2xl bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-xl">
              Shop Now!!
            </button>
          </div>
        </div>
      </div>
     
    </Carousel>
  );
}

export default CarouselComponent;
