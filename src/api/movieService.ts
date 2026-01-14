import axiosInstance from './axiosInstance';
import { Movie, MovieDetails, TMDBResponse, Cast } from '../types/tmdb';

export const movieService = {
  // 1. Get Trending Movies (Home Screen Hero & Row 1)
  getTrending: async (page = 1): Promise<Movie[]> => {
    const { data } = await axiosInstance.get<TMDBResponse>(
      `/trending/movie/day?page=${page}`
    );
    return data.results;
  },

  // 2. Get Popular Movies (Home Screen Row 2)
  getPopular: async (page = 1): Promise<Movie[]> => {
    const { data } = await axiosInstance.get<TMDBResponse>(
      `/movie/popular?page=${page}`
    );
    return data.results;
  },

  // 3. Get Top Rated Movies (Home Screen Row 3)
  getTopRated: async (page = 1): Promise<Movie[]> => {
    const { data } = await axiosInstance.get<TMDBResponse>(
      `/movie/top_rated?page=${page}`
    );
    return data.results;
  },

  // 4. Get Upcoming Movies (Home Screen Row 4)
  getUpcoming: async (page = 1): Promise<Movie[]> => {
    const { data } = await axiosInstance.get<TMDBResponse>(
      `/movie/upcoming?page=${page}`
    );
    return data.results;
  },

  // 5. Search Movies (Search Screen)
  searchMovies: async (query: string): Promise<Movie[]> => {
    if (!query.trim()) return [];
    const { data } = await axiosInstance.get<TMDBResponse>(
      `/search/movie?query=${encodeURIComponent(query)}`
    );
    return data.results;
  },

  // 6. Get Movie Details (Details Screen)
  getMovieDetails: async (id: string): Promise<MovieDetails> => {
    const { data } = await axiosInstance.get<MovieDetails>(`/movie/${id}`);
    return data;
  },

  // 7. Get Cast/Actors
  getMovieCredits: async (id: string): Promise<Cast[]> => {
    const { data } = await axiosInstance.get(`/movie/${id}/credits`);
    return data.cast;
  },

  // 8. Get Similar Movies
  getSimilarMovies: async (id: string): Promise<Movie[]> => {
    const { data } = await axiosInstance.get<TMDBResponse>(`/movie/${id}/similar`);
    return data.results;
  }
};

