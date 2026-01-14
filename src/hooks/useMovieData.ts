import { useQuery } from '@tanstack/react-query';
import { movieService } from '../api/movieService';

// Hook for Trending Movies
export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: () => movieService.getTrending(),
  });
};

// Hook for Movie Details
export const useMovieDetails = (id: string) => {
  return useQuery({
    queryKey: ['movies', 'detail', id],
    queryFn: () => movieService.getMovieDetails(id),
    enabled: !!id, // Only run if ID is provided
  });
};

// Hook for Searching Movies
export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: () => movieService.searchMovies(query),
    enabled: query.length > 2, // Only search if more than 2 characters
  });
};

export const useHomeData = () => {
  return useQuery({
    queryKey: ['homeData'],
    queryFn: async () => {
      // Fetch all categories in parallel for better performance
      const [trending, popular, topRated, upcoming] = await Promise.all([
        movieService.getTrending(),
        movieService.getPopular(),
        movieService.getTopRated(),
        movieService.getUpcoming(),
      ]);
      return { trending, popular, topRated, upcoming };
    },
  });
};