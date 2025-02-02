"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { Box, CircularProgress, Typography, List, ListItem, ListItemButton } from "@mui/material";
import { getMovieDetail, getTVShowDetail } from "@/shared/api-services/tmdbApi";

export default function WatchPage() {
    const { type, id } = useParams();
    const [media, setMedia] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
    const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

    useEffect(() => {
        async function fetchMediaDetail() {
            try {
                if (typeof id === "string") {
                    let data;
                    if (type === "movie") {
                        data = await getMovieDetail(id);
                    } else if (type === "tv") {
                        data = await getTVShowDetail(id);
                    } else {
                        setError("Invalid media type");
                        return;
                    }
                    setMedia(data);

                    // Chọn mặc định Season 1 - Episode 1
                    if (data?.seasons?.length > 0) {
                        setSelectedSeason(1);
                        setSelectedEpisode(1);
                    }
                } else {
                    console.error("Invalid ID");
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (type && id) fetchMediaDetail();
    }, [type, id]);

    const embedUrl = useMemo(() => {
        if (type === "movie") return `https://www.2embed.cc/embed/${id}`;
        if (type === "tv" && selectedSeason !== null && selectedEpisode !== null) {
            return `https://www.2embed.cc/embedtv/${id}s=${selectedSeason}&e=${selectedEpisode}`;
        }
        return "";
    }, [type, id, selectedSeason, selectedEpisode]);

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

    return (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, height: "100vh", overflow: "hidden" }}>
            <Box sx={{ flex: 2, p: { xs: 2, md: 4 }, maxWidth: { xs: "100%", md: "calc(100vw - 280px)" } }}>
                <Typography variant="h4" fontWeight="bold" mb={3}>
                    {media.title || media.name} ({new Date(media.release_date || media.first_air_date).getFullYear()})
                </Typography>
                <iframe
                    allowFullScreen
                    title="Watch"
                    width="100%"
                    height="500"
                    src={embedUrl}
                    style={{ borderRadius: 8 }}
                ></iframe>
                <Typography variant="body1" mt={3}>
                    {media.overview}
                </Typography>
            </Box>
            {type === "tv" && media.seasons && (
                <Box
                    sx={{
                        flex: 1,
                        width: { xs: "100%", md: 280 },
                        bgcolor: "background.paper",
                        p: { xs: 2, md: 2 },
                        borderLeft: { md: "1px solid #ddd" },
                        height: "100vh",
                        overflowY: "auto",
                    }}
                >
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select Season:</label>
                        <select
                            className="w-full p-2 border rounded-md"
                            value={selectedSeason ?? ""}
                            onChange={(e) => setSelectedSeason(Number(e.target.value))}
                        >
                            {media.seasons.map((season: any) => (
                                <option key={season.id} value={season.season_number}>
                                    {season.name || `Season ${season.season_number}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedSeason !== null && (
                        <div className="mb-4">
                            {media.seasons.map(
                                (season: any) =>
                                    season.season_number === selectedSeason && (
                                        <Image
                                            width={200}
                                            height={200}
                                            style={{
                                                objectFit: "cover"
                                            }}
                                            layout="intrinsic"
                                            key={season.id}
                                            src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                                            alt={`Season ${season.season_number}`}
                                            className="rounded-lg shadow-md"
                                        />
                                    )
                            )}
                        </div>
                    )}

                    {selectedSeason !== null &&
                        media.seasons
                            .find((s: any) => s.season_number === selectedSeason)
                            ?.episode_count > 0 && (
                            <List sx={{ mt: 1 }}>
                                {[...Array(media.seasons.find((s: any) => s.season_number === selectedSeason)?.episode_count)].map(
                                    (_, index) => (
                                        <ListItem key={index + 1} disablePadding>
                                            <ListItemButton
                                                selected={selectedEpisode === index + 1}
                                                onClick={() => setSelectedEpisode(index + 1)}
                                            >
                                                Episode {index + 1}
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                )}
                            </List>
                        )}
                </Box>
            )}
        </Box>
    );
}
