"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getUpcomingListMovie } from "@/shared/api-services/tmdbApi";
import { Button } from "@/shared/components/ui/button";
import 'swiper/css';
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";

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
    opacity: 0
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
    transition: { duration: 0.5 }
  },
}

export function BannerSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch upcoming movies
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

  return (
    <section className="relative flex flex-wrap items-center justify-center text-white w-full overflow-hidden">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {movies.map((movie) => (
            <AnimatePresence key={movie.id}>
              <CarouselItem>
                <motion.div
                  className="relative h-[80vh] w-full"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    fill
                    className="h-full w-full brightness-[90%] object-cover object-center"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
                  <motion.div
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 h-full items-center"
                  >
                    <motion.div
                      variants={textVariants} className="flex flex-col justify-center space-y-6 p-6 pt-10 px-10 rounded-lg"
                    >
                      <motion.div
                        variants={textVariants}
                        className="text-3xl md:text-5xl font-bold text-slate-200 font-work"
                      >
                        {movie.title}
                      </motion.div>
                      <motion.p
                        variants={textVariants}
                        className="text-sm hidden md:block"
                      >
                        {movie.overview}
                      </motion.p>
                      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <Button
                          className="bg-red-800 rounded-md px-6 py-2"
                        >
                          Watch
                        </Button>
                        <Button className="bg-secondary text-white px-6 py-2">
                          Watch Trailer
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </CarouselItem>
            </AnimatePresence>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-3xl z-10 hidden md:flex" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-3xl z-10 hidden md:flex" />
      </Carousel>
    </section>
  );
}
