"use client";

import React, { useEffect, useState } from "react";
import { getPopularListMovie } from "@/shared/api-services/tmdbApi";
import { TrendingUp } from "lucide-react";
type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export function PopularSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const data = await getPopularListMovie(1);
        setMovies(data.results);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      }
    }
    fetchPopularMovies();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full py-8 container mx-auto max-w-5xl">
      <div className="flex items-center mb-4">
        <span className="text-2xl font-bold">Popular Movies</span>
        <TrendingUp className="ml-2" />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="border hover:opacity-40 transition-all duration-200 cursor-pointer rounded-xl overflow-hidden shadow-md"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto"
            />
            <div className="p-2">
              <h3 className="text-sm font-medium">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
