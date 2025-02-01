"use client";

import { useParams } from "next/navigation";
import { getMovieDetail } from "@/shared/api-services/tmdbApi";
import MediaDetail from "../../components/MediaDetail";
import { useFetchMediaDetail } from "@/shared/hooks/useFetchMediaDetail";

export default function MovieDetailPage() {
  const { id } = useParams();
  const { media, isLoading, error } = useFetchMediaDetail(id as string, getMovieDetail);

  return <MediaDetail media={media} type="movie" isLoading={isLoading} error={error} />;
}
