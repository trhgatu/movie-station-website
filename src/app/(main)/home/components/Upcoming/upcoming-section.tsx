"use client";

import React, { useEffect, useState } from "react";
import { getUpcomingListMovie } from "@/shared/api-services/tmdbApi";
import { CircleFadingArrowUp } from "lucide-react";
import Image from "next/image";

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
    <div className="w-full py-8 container mx-auto max-w-5xl">
      <div className="flex items-center mb-4">
        <span className="text-2xl font-bold">Upcoming Movies</span>
        <CircleFadingArrowUp className="ml-2" />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group cursor-pointer hover:scale-105 transition-all duration-200 "
          >
            <div className="w-full">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-auto object-cover hover:opacity-80 rounded-lg"
                placeholder="blur"
                blurDataURL="/placeholder.png"
              />
            </div>
            <div className="p-2 text-center">
              <h3 className="text-sm font-medium truncate group-hover:text-red-500  transition-colors duration-200">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
