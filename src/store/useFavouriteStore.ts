import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../types/tmdb';

interface FavoritesState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (movie) => 
        set((state) => ({ 
          favorites: [...state.favorites, movie] 
        })),

      removeFavorite: (movieId) => 
        set((state) => ({ 
          favorites: state.favorites.filter((m) => m.id !== movieId) 
        })),

      isFavorite: (movieId) => {
        return get().favorites.some((m) => m.id === movieId);
      },
    }),
    {
      name: 'movie-favorites', // Unique name for storage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);