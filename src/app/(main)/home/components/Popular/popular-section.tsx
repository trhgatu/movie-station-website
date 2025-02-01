"use client";

import React, { useEffect, useState } from "react";
import { MovieCarousel } from "../MovieCarousel/movie-carousel";
import { getPopularListMovie } from "@/shared/api-services/tmdbApi";
import { TrendingUp } from "lucide-react";

export function PopularSection() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getPopularListMovie(1);
        setMovies(data.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return <MovieCarousel title="Popular Movies" movies={movies} isLoading={isLoading} error={error} icon={<TrendingUp />} />;
}
