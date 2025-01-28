"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import { getMovieDetail } from "@/shared/api-services/tmdbApi";

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMovieDetail() {
            try {
                if (typeof id === "string") {
                    const data = await getMovieDetail(id);
                    setMovie(data);
                } else {
                    console.error("Invalid ID");
                }
                setIsLoading(false);
            } catch (err: any) {
                setError(err.message);
                setIsLoading(false);
            }
        }
        if (id) fetchMovieDetail();
    }, [id]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" py={4}>
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Box>
        );
    }

    if (!movie) return null;

    return (
        <Box sx={{ p: 4, maxWidth: "800px", mx: "auto" }}>
            <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                style={{ borderRadius: 8, marginBottom: 16 }}
            />
            <Typography variant="h4" fontWeight="bold" mb={2}>
                {movie.title}
            </Typography>
            <Typography variant="body1" mb={4}>
                {movie.overview}
            </Typography>
            <Typography variant="subtitle1">
                Genres: {movie.genres.map((genre: any) => genre.name).join(", ")}
            </Typography>
        </Box>
    );
}
