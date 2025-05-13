import React, { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const GENRES = [
  'Nature', 'History', 'Science', 'Technology', 'Space', 
  'Society', 'Biography', 'Sports', 'Music', 'Art', 'Food',
  'Travel', 'Jazz', 'Classical', 'Rock', 'Pop', 'Electronic'
];

const DECADES = [
  '2020s', '2010s', '2000s', '1990s', '1980s', '1970s', '1960s', '1950s'
];

const RATINGS = [
  { label: '9+', value: 9 },
  { label: '8+', value: 8 },
  { label: '7+', value: 7 },
  { label: '6+', value: 6 }
];

interface FilterBarProps {
  type?: 'documentary' | 'music' | 'all';
}

const FilterBar: React.FC<FilterBarProps> = ({ type = 'all' }) => {
  const { currentFilter, setFilter } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  
  const hasActiveFilters = currentFilter.genre || currentFilter.decade || currentFilter.rating;
  
  const handleTypeChange = (newType: 'documentary' | 'music' | 'all') => {
    setFilter({ type: newType });
  };
  
  const handleGenreSelect = (genre: string) => {
    setFilter({ genre: currentFilter.genre === genre ? undefined : genre });
  };
  
  const handleDecadeSelect = (decade: string) => {
    const decadeValue = decade === currentFilter.decade ? undefined : decade;
    setFilter({ decade: decadeValue });
  };
  
  const handleRatingSelect = (rating: number) => {
    setFilter({ rating: currentFilter.rating === rating ? undefined : rating });
  };
  
  const clearFilters = () => {
    setFilter({
      genre: undefined,
      decade: undefined,
      rating: undefined,
      query: currentFilter.query,
      type: currentFilter.type
    });
  };
  
  const toggleFilters = () => setIsOpen(!isOpen);
  
  return (
    <div className="bg-[#1A2238] py-4 px-4 md:px-0 sticky top-16 z-30 shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2 flex-1">
            <button 
              onClick={() => handleTypeChange('all')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
                currentFilter.type === 'all' ? 'bg-[#FF6B6B] text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Content
            </button>
            
            <button 
              onClick={() => handleTypeChange('documentary')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
                currentFilter.type === 'documentary' ? 'bg-[#FF6B6B] text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Documentaries
            </button>
            
            <button 
              onClick={() => handleTypeChange('music')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
                currentFilter.type === 'music' ? 'bg-[#FF6B6B] text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Music
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white transition"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
            
            <button 
              onClick={toggleFilters}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                isOpen ? 'bg-[#FF6B6B] text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              <ChevronDown className={`w-4 h-4 transform transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="mt-4 bg-gray-900 rounded-md p-4 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <div>
              <h3 className="font-medium text-white mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreSelect(genre)}
                    className={`px-3 py-1 rounded-full text-xs transition ${
                      currentFilter.genre === genre 
                        ? 'bg-[#FF6B6B] text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-3">Decades</h3>
              <div className="flex flex-wrap gap-2">
                {DECADES.map((decade) => (
                  <button
                    key={decade}
                    onClick={() => handleDecadeSelect(decade)}
                    className={`px-3 py-1 rounded-full text-xs transition ${
                      currentFilter.decade === decade 
                        ? 'bg-[#FF6B6B] text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {decade}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-3">Rating</h3>
              <div className="flex flex-wrap gap-2">
                {RATINGS.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => handleRatingSelect(value)}
                    className={`px-3 py-1 rounded-full text-xs transition ${
                      currentFilter.rating === value 
                        ? 'bg-[#FF6B6B] text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;