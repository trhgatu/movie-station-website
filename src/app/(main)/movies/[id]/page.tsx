"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, CircularProgress, Chip, Stack, Button } from "@mui/material";
import Image from "next/image";
import { getMovieDetail } from "@/shared/api-services/tmdbApi";
import Link from "next/link";

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
            } catch (err: any) {
                setError(err.message);
            } finally {
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
        <Box sx={{ p: 4, maxWidth: "900px", mx: "auto", display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
            <Box>
                <Image
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                    width={350}
                    height={500}
                    style={{ borderRadius: 8 }}
                />
            </Box>
            <Box>
                <Typography variant="h4" fontWeight="bold" mb={2}>
                    {movie.title} <Typography component="span" variant="h6">({new Date(movie.release_date).getFullYear()})</Typography>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" mb={2}>
                    Tagline: <i>{movie.tagline || "No tagline available"}</i>
                </Typography>
                <Typography variant="body1" mb={3}>
                    {movie.overview}
                </Typography>

                <Stack direction="row" spacing={1} mb={3}>
                    {movie.genres.map((genre: any) => (
                        <Chip key={genre.id} label={genre.name} variant="outlined" />
                    ))}
                </Stack>

                <Typography variant="body1" mb={1}>
                    <strong>Runtime:</strong> {movie.runtime} minutes
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Language:</strong> {movie.spoken_languages.map((lang: any) => lang.english_name).join(", ")}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                </Typography>
                <Typography variant="body1" mb={1}>
                    <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                </Typography>
                <Typography variant="body1" mb={3}>
                    <strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)
                </Typography>
                {movie.homepage && (
                    <Typography variant="body1" mb={1}>
                        <a href={movie.homepage} target="_blank" rel="noopener noreferrer" style={{ color: "#1976d2" }}>
                            Official Website
                        </a>
                    </Typography>
                )}
                <Link href={`/watch/${id}`}>
                    <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                        Watch Now
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}
