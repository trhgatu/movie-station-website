"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Box, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

type Movie = {
    id: number;
    title: string;
    poster_path: string;
};

type MovieCarouselProps = {
    title: string;
    movies: Movie[];
    isLoading: boolean;
    error: string | null;
    icon: React.ReactNode;
};

export function MovieCarousel({ title, movies, isLoading, error, icon }: MovieCarouselProps) {
    const swiperRef = useRef<any>(null);

    if (error) {
        return (
            <Box textAlign="center" py={4}>
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 4, px: 2, maxWidth: "1200px", mx: "auto" }}>
            <Box display="flex" alignItems="center" mb={4}>
                <Typography variant="h5" fontWeight="bold" mr={1}>
                    {title}
                </Typography>
                {icon}
            </Box>

            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <Swiper
                    loop={true}
                    modules={[Navigation]}
                    spaceBetween={20}
                    navigation={true}
                    slidesPerView={6}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 10 },
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 4, spaceBetween: 40 },
                        1024: { slidesPerView: 6, spaceBetween: 25 },
                    }}
                    className="mySwiper"
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Link href={`/movies/${movie.id}`} passHref>
                                <Box
                                    className="hover:brightness-[60%] transition-all duration-200 cursor-pointer"
                                    sx={{ borderRadius: 2, overflow: "hidden" }}
                                >
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt={movie.title}
                                        width={500}
                                        height={750}
                                        loading="lazy"
                                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                    />
                                </Box>
                            </Link>
                            <Typography textAlign="center" mt={1} noWrap sx={{ fontWeight: "medium" }}>
                                {movie.title}
                            </Typography>
                        </SwiperSlide>

                    ))}
                </Swiper>
            )
            }
        </Box >
    );
}
