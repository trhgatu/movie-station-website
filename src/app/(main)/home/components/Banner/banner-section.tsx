"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getNowPlayingMovies } from "@/shared/api-services/tmdbApi";
import { Button } from "@/shared/components/ui/button";
import { SwiperNavButtons } from "@/shared/components/swiper-nav/swiper-nav-button";
import { Box, Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Play, SquarePlay } from "lucide-react";

import { TVShowSection } from "../TV/tv-section";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
}

const textVariants = {
  initial: { x: 100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.1 },
  },
  exit: { x: -100, opacity: 0, transition: { duration: 0.5 } },
};

export function BannerSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getNowPlayingMovies(1);
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
          <Box display="flex" alignItems="center" mb={4}>
            <Typography variant="h5" fontWeight="bold" mr={1}>
              Now Playing Movies
            </Typography>
            <SquarePlay />
          </Box>
          <Swiper
            modules={[Navigation]}
            loop
            spaceBetween={10}
            slidesPerView={1}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
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
                      <div className="flex space-x-4 items-center">
                        <Link href={`/movies/${movie.id}`} passHref>
                          <Button
                            className="bg-red-700 rounded-full w-12 h-12 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-200"
                          >
                            <Play className="text-white" size={20} />
                          </Button>
                        </Link>
                        <Button className="px-6 py-2 bg-white text-black hover:bg-gray-100 hover:shadow-lg hover:shadow-gray-400/50 transition-all duration-200">
                          Watch Trailer
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                </Box>
              </SwiperSlide>
            ))}
            <SwiperNavButtons />
          </Swiper>
        </div>
        <div className="md:col-span-1">
          <TVShowSection />
        </div>
      </div>
    </Box>
  );
}
