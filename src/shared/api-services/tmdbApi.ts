//environtment variable
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetchTMDB(endpoint: string, query = {}) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    url.searchParams.append("api_key", API_KEY!);

    Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
    });

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error("Failed to fetch data from TMDB API");
    }

    return response.json();
}

// Lấy danh sách phim sắp ra mắt
export async function getUpcomingListMovie(page: number = 1) {
    return await fetchTMDB('movie/upcoming', { language: 'en-US', page });
}

// Lấy danh sách phim tương tự
export async function getSimilarMovies(movieId: number, page: number = 1) {
    return await fetchTMDB(`movie/${movieId}/similar`, { language: 'en-US', page });
}

// Lấy danh sách phim tương tự
export async function getPopularListMovie(page: number = 1) {
    return await fetchTMDB(`movie/popular`, { language: 'en-US', page });
}
