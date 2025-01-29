import React from "react";
import { useSwiper } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@mui/material";

export const SwiperNavButtons = () => {
    const swiper = useSwiper();

    return (
        <div className="flex space-x-4 mt-4">
            <Button
                onClick={() => swiper.slidePrev()}
                className="dark:bg-white dark:text-black"
                sx={{
                    padding: "0.75rem",
                    backgroundColor: "black",
                    color: "white",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                        backgroundColor: "gray",
                    },
                }}
                aria-label="Previous Slide"
            >
                <ChevronLeft size={20} />
            </Button>
            <Button
                onClick={() => swiper.slideNext()}
                className="dark:bg-white dark:text-black"
                sx={{
                    padding: "0.6rem",
                    backgroundColor: "black",
                    color: "white",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                        backgroundColor: "gray",
                    },
                }}
                aria-label="Next Slide"
            >
                <ChevronRight size={20} />
            </Button>
        </div>
    );
};
