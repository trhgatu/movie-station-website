"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUpcomingListMovie } from "@/shared/api-services/tmdbApi";
import { Button } from "@/shared/components/ui/button";
import { Box } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
}

const textVariants = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export function BannerSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUpcomingListMovie(1);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <Box sx={{ py: 4, px: 2, maxWidth: "1200px", mx: "auto" }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-md">
          <Swiper
            modules={[Navigation]}
            navigation
            loop
            spaceBetween={10}
            slidesPerView={1}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    className="relative w-full"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title}
                      layout="intrinsic"
                      width={1280}
                      height={720}
                      className="h-full w-full object-cover"
                      priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
                    <motion.div
                      variants={textVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute bottom-8 left-8 text-white space-y-4"
                    >
                      <motion.h2
                        variants={textVariants}
                        className="text-xl md:text-2xl font-bold"
                      >
                        {movie.title}
                      </motion.h2>
                      <motion.p
                        variants={textVariants}
                        className="text-sm hidden md:block"
                      >
                        {movie.overview}
                      </motion.p>
                      <div className="flex space-x-4">
                        <Button className="bg-red-800 rounded-md px-6 py-2">
                          Watch
                        </Button>
                        <Button className="bg-secondary text-white px-6 py-2">
                          Watch Trailer
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <div className=" bg-gray-100 h-full rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Component khác</span>
          </div>
        </div>
      </div>
    </Box>
  );
}
