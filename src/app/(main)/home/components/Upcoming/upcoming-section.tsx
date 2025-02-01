"use client";

import React, { useEffect, useState } from "react";
import { MovieCarousel } from "../MovieCarousel/movie-carousel";
import { getUpcomingListMovie } from "@/shared/api-services/tmdbApi";
import { CircleFadingArrowUp } from "lucide-react";

export function UpcomingSection() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getUpcomingListMovie(1);
        setMovies(data.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return <MovieCarousel title="Upcoming Movies" movies={movies} isLoading={isLoading} error={error} icon={<CircleFadingArrowUp />} />;
}
