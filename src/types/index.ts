// Core type definitions for the application

export interface User {
  id: string;
  username: string;
  email: string;
  preferences: {
    favoriteGenres: string[];
    favoriteDecades: string[];
  };
}

export interface Documentary {
  id: string;
  title: string;
  director: string;
  year: number;
  runtime: number;
  poster: string;
  rating: number;
  genres: string[];
  description: string;
  trailerUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  cover: string;
  rating: number;
  genres: string[];
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  duration: string;
}

export interface ContentFilter {
  type: 'documentary' | 'music' | 'all';
  genre?: string;
  year?: number | null;
  decade?: string;
  rating?: number | null;
  query?: string;
}

export interface ApiResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  totalPages: number;
}

export interface Recommendation {
  title: string;
  reason: string;
  item: Documentary | Album;
}