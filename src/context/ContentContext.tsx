import React, { createContext, useContext, useState, useEffect } from 'react';
import { Documentary, Album, ContentFilter, ApiResponse, Recommendation } from '../types';
import { fetchDocumentaries, fetchMusic, generateRecommendations } from '../services/api';

interface ContentContextType {
  documentaries: Documentary[];
  music: Album[];
  recommendations: Recommendation[];
  isLoading: boolean;
  error: string | null;
  currentFilter: ContentFilter;
  setFilter: (filter: Partial<ContentFilter>) => void;
  favorites: (Documentary | Album)[];
  addToFavorites: (item: Documentary | Album) => void;
  removeFromFavorites: (itemId: string) => void;
  refreshRecommendations: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documentaries, setDocumentaries] = useState<Documentary[]>([]);
  const [music, setMusic] = useState<Album[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<(Documentary | Album)[]>([]);
  const [currentFilter, setCurrentFilter] = useState<ContentFilter>({
    type: 'all',
    query: '',
  });

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [currentFilter]);

  const loadContent = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (currentFilter.type === 'documentary' || currentFilter.type === 'all') {
        const docResponse = await fetchDocumentaries(currentFilter);
        setDocumentaries(docResponse.data);
      }
      
      if (currentFilter.type === 'music' || currentFilter.type === 'all') {
        const musicResponse = await fetchMusic(currentFilter);
        setMusic(musicResponse.data);
      }
      
      // Generate recommendations based on current filter
      await refreshRecommendations();
    } catch (err) {
      setError('Failed to load content. Please try again later.');
      console.error('Content loading error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshRecommendations = async () => {
    try {
      const recs = await generateRecommendations([...documentaries, ...music], favorites);
      setRecommendations(recs);
    } catch (err) {
      console.error('Failed to generate recommendations:', err);
    }
  };

  const setFilter = (filter: Partial<ContentFilter>) => {
    setCurrentFilter(prev => ({ ...prev, ...filter }));
  };

  const addToFavorites = (item: Documentary | Album) => {
    const updatedFavorites = [...favorites, item];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (itemId: string) => {
    const updatedFavorites = favorites.filter(item => item.id !== itemId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <ContentContext.Provider
      value={{
        documentaries,
        music,
        recommendations,
        isLoading,
        error,
        currentFilter,
        setFilter,
        favorites,
        addToFavorites,
        removeFromFavorites,
        refreshRecommendations
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};