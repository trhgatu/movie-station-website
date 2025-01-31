"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { getMovieDetail } from '@/shared/api-services/tmdbApi';


export default function WatchPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMovieDetail() {
            try {
                if (typeof id === 'string') {
                    const data = await getMovieDetail(id);
                    setMovie(data);
                } else {
                    console.error('Invalid ID');
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
        <Box sx={{ p: 4, maxWidth: '900px', mx: 'auto' }}>

            <Typography variant="h4" fontWeight="bold" mb={3}>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
            </Typography>

            <Box sx={{ position: 'relative', marginBottom: 3 }}>
                <iframe
                    allowFullScreen
                    title="Watch"
                    width="100%"
                    height="500"
                    src={`https://www.2embed.cc/embed/${id}`}
                    style={{ borderRadius: 8 }}
                ></iframe>
            </Box>

            <Typography variant="body1" mb={2}>
                {movie.overview}
            </Typography>
        </Box>
    );
}
