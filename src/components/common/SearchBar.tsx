import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

interface SearchBarProps {
  onClose?: () => void;
  compact?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose, compact = false }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { setFilter, documentaries, music } = useContent();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      // Generate suggestions from documentaries and music titles
      const docTitles = documentaries.map(doc => doc.title);
      const musicTitles = music.map(album => album.title);
      const allGenres = [...new Set([
        ...documentaries.flatMap(doc => doc.genres),
        ...music.flatMap(album => album.genres)
      ])];
      
      const allTitles = [...docTitles, ...musicTitles, ...allGenres];
      
      const filtered = allTitles
        .filter(title => title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, documentaries, music]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (query.trim()) {
      setFilter({ query: query.trim() });
      navigate('/search');
      if (onClose) onClose();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch();
  };

  return (
    <div className={`w-full ${compact ? 'max-w-md' : 'max-w-2xl'} mx-auto`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center border-b-2 border-gray-700 focus-within:border-[#FF6B6B] transition">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentaries, music, and genres..."
            className="w-full py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-[#1A2238] shadow-lg rounded-md py-1 text-sm">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-800 text-gray-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;