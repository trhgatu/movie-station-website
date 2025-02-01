import { Box, Typography, CircularProgress, Chip, Stack, Button, Grid, Card, CardContent } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface MediaDetailProps {
  media: any;
  type: "movie" | "tv";
  isLoading: boolean;
  error: string | null;
}

const MediaDetail: React.FC<MediaDetailProps> = ({ media, type, isLoading, error }) => {
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

  const isTVShow = media.first_air_date;

  return (
    <Box sx={{ p: 4, maxWidth: "900px", mx: "auto", display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
      <Box>
        <Image
          src={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
          alt={media.title || media.name}
          width={350}
          height={500}
          style={{ borderRadius: 8 }}
        />
      </Box>
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          {media.title || media.name}{" "}
          <Typography component="span" variant="h6">
            ({new Date(media.release_date || media.first_air_date).getFullYear()})
          </Typography>
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" mb={2}>
          Tagline: <i>{media.tagline || "No tagline available"}</i>
        </Typography>
        <Typography variant="body1" mb={3}>
          {media.overview}
        </Typography>

        <Stack direction="row" spacing={1} mb={3}>
          {media.genres.map((genre: any) => (
            <Chip key={genre.id} label={genre.name} variant="outlined" />
          ))}
        </Stack>

        {/* Hiển thị thông tin TV Show nếu là TV Show */}
        {isTVShow && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1" mb={1}>
                  <strong>First Air Date:</strong> {new Date(media.first_air_date).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" mb={1}>
                  <strong>Last Air Date:</strong> {new Date(media.last_air_date).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" mb={1}>
                  <strong>Number of Seasons:</strong> {media.number_of_seasons}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" mb={1}>
                  <strong>Number of Episodes:</strong> {media.number_of_episodes}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" mb={1}>
                  <strong>Episode Runtime:</strong> {media.episode_run_time[0]} minutes
                </Typography>
              </Grid>
            </Grid>
            <Box mt={4}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Seasons
              </Typography>
              <Grid container spacing={3}>
                {media.seasons.map((season: any) => (
                  <Grid item xs={12} sm={6} md={4} key={season.id}>
                    <Card>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`}
                        alt={season.name}
                        width={500}
                        height={750}
                        style={{ borderRadius: 8 }}
                      />
                      <CardContent>
                        <Typography variant="h6">{season.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {season.overview || "No overview available."}
                        </Typography>
                        <Typography variant="body2" mt={2}>
                          <strong>Number of Episodes:</strong> {season.episode_count}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Air Date:</strong> {new Date(season.air_date).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}

        {/* Hiển thị thông tin Movie nếu là Movie */}
        {!isTVShow && (
          <Typography variant="body1" mb={3}>
            <strong>Release Date:</strong> {new Date(media.release_date).toLocaleDateString()}
          </Typography>
        )}

        <Typography variant="body1" mb={1}>
          <strong>Language:</strong> {media.spoken_languages?.map((lang: any) => lang.english_name).join(", ")}
        </Typography>

        {media.homepage && (
          <Typography variant="body1" mb={1}>
            <a href={media.homepage} target="_blank" rel="noopener noreferrer" style={{ color: "#1976d2" }}>
              Official Website
            </a>
          </Typography>
        )}

        <Link href={`/watch/${type}/${media.id}`} passHref>
          <Button variant="contained" color="primary" sx={{ mt: 3 }}>
            Watch Now
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default MediaDetail;
