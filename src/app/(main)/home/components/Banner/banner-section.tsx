"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getUpcomingListMovie, getPopularListMovie } from "@/shared/api-services/tmdbApi";
import { Marquee } from "@/shared/components/ui/marquee";
import { IntroSection } from "./components/intro-section";
import { AnimatedGridPattern } from "@/shared/components/ui/animated-grid-pattern";
import { cn } from "@/shared/lib/utils";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

export function BannerSection() {
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const upcomingData = await getUpcomingListMovie(1);
                setUpcomingMovies(upcomingData.results);

                const popularData = await getPopularListMovie(1);
                setPopularMovies(popularData.results);
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

    const firstRow = popularMovies.slice(0, popularMovies.length / 2);
    const secondRow = popularMovies.slice(popularMovies.length / 2);

    return (
        <section className="relative flex container mx-auto">
            <IntroSection />
            <div className="w-1/2 p-6">
                <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
                    {/* Marquee */}
                    <Marquee pauseOnHover vertical className="[--duration:20s]">
                        {firstRow.map((movie) => (
                            <div key={movie.id} className="p-2">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    width={150}
                                    height={225}
                                    className="rounded-md"
                                />
                            </div>
                        ))}
                    </Marquee>

                    <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
                        {secondRow.map((movie) => (
                            <div key={movie.id} className="p-2">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    width={150}
                                    height={225}
                                    className="rounded-md"
                                />
                            </div>
                        ))}
                    </Marquee>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
                </div>

            </div>
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                )}
            />
        </section>

    );
}
