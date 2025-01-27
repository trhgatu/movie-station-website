"use client";

import React, { useEffect, useState } from "react";
import { getUpcomingListMovie } from "@/shared/api-services/tmdbApi";
import { CircleFadingArrowUp } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export function UpcomingSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUpcomingMovies() {
      try {
        const data = await getUpcomingListMovie(1);
        setMovies(data.results);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      }
    }
    fetchUpcomingMovies();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full py-8 container mx-auto px-4">
      <div className="flex items-center mb-6">
        <span className="text-xl sm:text-2xl font-bold">Upcoming Movies</span>
        <CircleFadingArrowUp className="ml-2" />
      </div>
      <Swiper
        loop={true}
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="w-full">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-auto object-cover rounded-lg transition duration-300 group-hover:brightness-75"
                placeholder="blur"
                blurDataURL="/placeholder.png"
              />
            </div>
            <div className="p-2 text-center">
              <h3 className="text-xs sm:text-sm md:text-base font-medium truncate group-hover:text-red-500 transition-colors duration-200">
                {movie.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
