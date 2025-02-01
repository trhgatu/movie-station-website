import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
  },
});

export async function fetchTMDB(endpoint: string, query = {}) {
  try {
    const response = await api.get(endpoint, { params: query });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data from TMDB API");
  }
}

export async function getUpcomingListMovie(page: number = 1) {
  return await fetchTMDB("movie/upcoming", { language: "en-US", page });
}

export async function getSimilarMovies(movieId: number, page: number = 1) {
  return await fetchTMDB(`movie/${movieId}/similar`, { language: "en-US", page });
}

export async function getPopularListMovie(page: number = 1) {
  return await fetchTMDB("movie/popular", { language: "en-US", page });
}

export async function getMovieDetail(id: string) {
  return await fetchTMDB(`movie/${id}`, { language: "en-US" });
}

export async function getTopRatedMovies(page: number = 1) {
  return await fetchTMDB("movie/top_rated", { language: "en-US", page });
}

export async function getTrendingTVShows(page: number = 1) {
  return await fetchTMDB("trending/tv/day", { language: "en-US", page });
}
