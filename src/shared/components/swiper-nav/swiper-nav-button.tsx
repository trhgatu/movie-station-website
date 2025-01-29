import React from "react";
import { useSwiper } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SwiperNavButtons = () => {
    const swiper = useSwiper();

    return (
        <div className="flex space-x-4 mt-4">
            <button
                onClick={() => swiper.slidePrev()}
                className="p-3 bg-black text-white shadow-md hover:brightness-75 dark:bg-white dark:text-black transition-all duration-300"
                aria-label="Previous Slide"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={() => swiper.slideNext()}
                className="p-3 bg-black text-white shadow-md hover:brightness-75 dark:bg-white dark:text-black  transition-all duration-300"
                aria-label="Next Slide"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};
