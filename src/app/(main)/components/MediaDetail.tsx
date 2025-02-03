import { Box, Typography, CircularProgress, Stack, Grid } from "@mui/material";
import { Card, CardContent } from "@/shared/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

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
    <Box sx={{ py: 4, px: 2, maxWidth: "1200px", mx: "auto" }}>
      <Box sx={{ position: "relative", width: "100%", height: { xs: "30vh", md: "45vh" } }}>
        <Image
          src={`https://image.tmdb.org/t/p/original/${media.backdrop_path || media.poster_path}`}
          alt={media.title || media.name}
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: 8, filter: "brightness(0.5)" }}
        />
      </Box>

      <Box
        className="relative"
        sx={{
          display: { xs: "block", md: "flex" },
          pl: { xs: 0, md: 9 },
          mt: { xs: 2, md: -2 }
        }}
      >
        <Box className="h-full" sx={{ width: { xs: "100%", md: "auto" }, textAlign: "center", mb: { xs: 2, md: 0 } }}>
          <Image
            className="h-full rounded-md"
            src={`https://image.tmdb.org/t/p/original/${media.poster_path || media.backdrop_path}`}
            alt={media.title || media.name}
            width={200}
            height={225}
            style={{
              border: "10px solid white",
              marginTop: "-125px",
              borderRadius: "20px"
            }}
          />
          <Box className="flex justify-between mt-4" sx={{ flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
            <Link href={`/watch/${type}/${media.id}`} passHref>
              <Button>
                Watch Now
              </Button>
            </Link>
            <Link href={`/watch/${type}/${media.id}`} passHref>
              <Button>
                Trailer
              </Button>
            </Link>
          </Box>
        </Box>

        <Box sx={{ flex: 1, p: { xs: 0, md: 5 } }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            {media.title || media.name}{" "}
            <Typography component="span" variant="h6">
              ({new Date(media.release_date || media.first_air_date).getFullYear()})
            </Typography>
          </Typography>
          <Typography variant="body1" mb={3}>
            {media.overview}
          </Typography>

          <Stack direction="row" spacing={1} mb={3} sx={{ flexWrap: "wrap" }}>
            {media.genres.map((genre: any) => (
              <span className="border-2 border-black dark:border-white rounded-full px-4" key={genre.id}>{genre.name}</span>
            ))}
          </Stack>
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
            </>
          )}
          {!isTVShow && (
            <Typography variant="body1" mb={3}>
              <strong>Release Date:</strong> {new Date(media.release_date).toLocaleDateString()}
            </Typography>
          )}

          <Typography variant="body1" mb={1}>
            <strong>Language:</strong> {media.spoken_languages?.map((lang: any) => lang.english_name).join(", ")}
          </Typography>
        </Box>
      </Box>
      {isTVShow && (
        <Box mt={4}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Seasons
          </Typography>
          <Grid container spacing={3}>
            {media.seasons.map((season: any) => (
              <Grid item xs={6} sm={4} md={2.4} key={season.id}>
                <Card className="h-full flex flex-col">
                  <div className="relative h-72">
                    <Image
                      src={
                        season.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${season.poster_path}`
                          : "/placeholder.jpg"
                      }
                      alt={season.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg object-top"
                    />
                  </div>
                  <CardContent className="flex-1 flex flex-col justify-between p-4">
                    <Typography variant="h6" className="line-clamp-1 mb-2">
                      {season.name}
                    </Typography>
                    <div>
                      <Typography variant="body2">
                        <strong>Episodes:</strong> {season.episode_count}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Air Date:</strong> {new Date(season.air_date).toLocaleDateString()}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>


        </Box>
      )}

    </Box>
  );
};

export default MediaDetail;
