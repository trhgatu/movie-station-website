// environment variable
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const TMDB_BEARER_TOKEN = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

export async function fetchTMDB(endpoint: string, query = {}) {
    const url = new URL(`${BASE_URL}/${endpoint}`);

    Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
    });

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        },
    };

    const response = await fetch(url.toString(), options);
    if (!response.ok) {
        throw new Error("Failed to fetch data from TMDB API");
    }

    return response.json();
}

export async function getUpcomingListMovie(page: number = 1) {
    return await fetchTMDB('movie/upcoming', { language: 'en-US', page });
}

export async function getSimilarMovies(movieId: number, page: number = 1) {
    return await fetchTMDB(`movie/${movieId}/similar`, { language: 'en-US', page });
}

export async function getPopularListMovie(page: number = 1) {
    return await fetchTMDB(`movie/popular`, { language: 'en-US', page });
}

export async function getMovieDetail(id: string) {
    return await fetchTMDB(`movie/${id}`, { language: 'en-US' });
}

export async function getTopRatedMovies(page: number = 1) {
    return await fetchTMDB('movie/top_rated', { language: 'en-US', page });
}

export async function getTrendingTVShows(page: number = 1) {
    return await fetchTMDB('trending/tv/day', { language: 'en-US', page });
}