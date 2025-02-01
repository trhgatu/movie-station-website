"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getMovieDetail } from '@/shared/api-services/tmdbApi';
import { getTVShowDetail } from '@/shared/api-services/tmdbApi';

export default function WatchPage() {
    const { type, id } = useParams();
    const [media, setMedia] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [selectedEpisode, setSelectedEpisode] = useState(1);

    useEffect(() => {
        async function fetchMediaDetail() {
            try {
                if (typeof id === 'string') {
                    if (type === 'movie') {
                        const data = await getMovieDetail(id);
                        setMedia(data);
                    } else if (type === 'tv') {
                        const data = await getTVShowDetail(id);
                        setMedia(data);
                    } else {
                        setError('Invalid media type');
                    }
                } else {
                    console.error('Invalid ID');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (type && id) fetchMediaDetail();
    }, [type, id]);

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

    if (!media) return null;

    let embedUrl = '';
    if (type === 'movie') {
        embedUrl = `https://www.2embed.cc/embed/${id}`;
    } else if (type === 'tv') {
        embedUrl = `https://www.2embed.cc/embedtv/${id}s=${selectedSeason}&e=${selectedEpisode}`;
    }

    return (
        <Box sx={{ p: 4, maxWidth: '900px', mx: 'auto' }}>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                {media.title || media.name} ({new Date(media.release_date || media.first_air_date).getFullYear()})
            </Typography>

            <Box sx={{ position: 'relative', marginBottom: 3 }}>
                <iframe
                    allowFullScreen
                    title="Watch"
                    width="100%"
                    height="500"
                    src={embedUrl}
                    style={{ borderRadius: 8 }}
                ></iframe>
            </Box>

            {type === 'tv' && media.seasons && (
                <Box mb={3}>
                    <FormControl fullWidth>
                        <InputLabel>Mùa</InputLabel>
                        <Select
                            value={selectedSeason}
                            onChange={(e) => setSelectedSeason(Number(e.target.value))}
                            label="Mùa"
                        >
                            {media.seasons.map((season: any) => (
                                <MenuItem key={season.id} value={season.season_number}>
                                    Mùa {season.season_number}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Tập</InputLabel>
                        <Select
                            value={selectedEpisode}
                            onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                            label="Tập"
                        >
                            {[...Array(media.seasons.find((s: any) => s.season_number === selectedSeason)?.episode_count || 0)].map((_, index) => (
                                <MenuItem key={index + 1} value={index + 1}>
                                    Tập {index + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            )}

            <Typography variant="body1" mb={2}>
                {media.overview}
            </Typography>
        </Box>
    );
}
