import { TMDB_CONFIG } from './constants';

/**
 * Converts a partial TMDB path to a full Image URL
 * @param path - e.g. "/p8H0.jpg"
 */
export const getPosterImage = (path: string | null) => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  // TMDB images require the full URL prefix
  return `https://image.tmdb.org/t/p/w500${path}`;
};

/**
 * Formats a date string (2024-12-01) to a year (2024)
 */
export const formatYear = (dateString: string) => {
  if (!dateString) return 'N/A';
  return dateString.split('-')[0];
};

/**
 * Formats runtime from minutes to "1h 45m"
 */
export const formatRuntime = (minutes: number) => {
  if (!minutes) return '0m';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

/**
 * Formats vote average to one decimal place
 */
export const formatRating = (rating: number) => {
  return rating ? rating.toFixed(1) : '0.0';
};