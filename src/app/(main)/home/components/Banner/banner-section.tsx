"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getUpcomingListMovie } from "@/shared/api-services/tmdbApi";
import { Button } from "@/shared/components/ui/button";
import 'swiper/css';
import { motion } from "framer-motion";
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
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
    }
  }
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <section className="relative flex items-center justify-center text-white h-screen w-full overflow-hidden">
      <Carousel
        opts={{ loop: true }}>
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id}>
              <div
                className="relative h-screen w-full"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover object-center -z-10"
                  priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />

                <motion.div
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  className="container mx-auto grid grid-cols-2 gap-8 relative z-10 h-full items-center">
                  <motion.div
                    variants={textVariants} className="flex flex-col justify-center space-y-6 p-6 px-10 rounded-lg">
                    <motion.div
                      variants={textVariants}
                      className="text-5xl font-bold"
                    >
                      {movie.title}
                    </motion.div>
                    <motion.p
                      variants={textVariants}
                      className="text-lg text-gray-300"
                    >
                      {movie.overview}
                    </motion.p>
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        className="bg-red-800 rounded-md px-6 py-2">
                        Watch
                      </motion.button>
                      <Button className="bg-secondary text-white px-6 py-2">
                        Watch Trailer
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-3xl z-10" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white text-3xl z-10" />
      </Carousel>
    </section>
  );
}
