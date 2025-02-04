"use client";

import React, { useEffect, useState } from "react";
import { getTrendingTVShows } from "@/shared/api-services/tmdbApi";
import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay } from "swiper/modules";
import Link from "next/link";
import { Tv } from "lucide-react";
import "swiper/css";
import "swiper/css/grid";

interface TVShow {
    id: number;
    name: string;
    poster_path: string;
}

export function TVShowSection() {
    const [tvShows, setTvShows] = useState<TVShow[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getTrendingTVShows(1);
                setTvShows(data.results);
            } catch (error) {
                console.error("Error fetching TV shows:", error);
                setError("Failed to load TV shows. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (error)
        return (
            <Typography variant="h6" color="error" align="center">
                {error}
            </Typography>
        );
    if (isLoading)
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );

    return (
        <Box className="hidden md:flex">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="md:col-span-1 rounded-md">
                    <Box display="flex" alignItems="center" mb={4}>
                        <Typography variant="h5" fontWeight="bold" mr={1}>
                            Trending TV Show
                        </Typography>
                        <Tv />
                    </Box>
                    <Swiper
                        modules={[Grid, Autoplay]}
                        grid={{ rows: 2 }}
                        spaceBetween={20}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{ delay: 5000 }}
                        breakpoints={{
                            320: { slidesPerView: 1, grid: { rows: 1 } },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="h-[480px]"
                    >
                        {tvShows.map((show) => (
                            <SwiperSlide key={show.id}>
                                <Link href={`/tv/${show.id}`} passHref>
                                    <div className="p-0 h-full overflow-hidden hover:brightness-[60%] transition-all duration-200 cursor-pointer">
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            className="h-full"
                                            justifyContent="space-between"
                                        >
                                            <div className="relative w-full h-[186px] rounded-md overflow-hidden">
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                                                    alt={show.name}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <p className="text-center mt-3 px-2 text-sm font-medium line-clamp-1">
                                                {show.name}
                                            </p>

                                        </Box>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </Box>
    );
}
