import { Box, Skeleton, Typography } from "@mui/material";

export function SkeletonCard() {
  return (
    <Box
      className="w-full max-w-200 mx-auto"
      sx={{
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={267}
        animation="wave"
        sx={{ borderRadius: 2 }}
      />
      <Box mt={1}>
        <Skeleton
          variant="text"
          width="80%"
          height={20}
          animation="wave"
          sx={{ mx: "auto" }}
        />
      </Box>
    </Box>
  );
}
