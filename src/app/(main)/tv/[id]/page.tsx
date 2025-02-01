"use client";

import { useParams } from "next/navigation";
import { getTVShowDetail } from "@/shared/api-services/tmdbApi";
import MediaDetail from "../../components/MediaDetail";
import { useFetchMediaDetail } from "@/shared/hooks/useFetchMediaDetail";

export default function TVDetailPage() {
  const { id } = useParams();
  const { media, isLoading, error } = useFetchMediaDetail(id as string, getTVShowDetail);

  return <MediaDetail media={media} type="tv" isLoading={isLoading} error={error} />;
}
