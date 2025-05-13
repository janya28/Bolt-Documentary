import React, { useState } from 'react';
import { Heart, Play, Star, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Documentary, Album } from '../../types';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';

interface ContentCardProps {
  item: Documentary | Album;
  type: 'documentary' | 'music';
}

const ContentCard: React.FC<ContentCardProps> = ({ item, type }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites } = useContent();
  const { isAuthenticated } = useAuth();
  
  const isFavorite = favorites.some(fav => fav.id === item.id);
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Redirect to login or show a message
      alert('Please sign in to save favorites');
      return;
    }
    
    if (isFavorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };
  
  const getItemImage = () => {
    if (type === 'documentary') {
      return (item as Documentary).poster;
    } else {
      return (item as Album).cover;
    }
  };
  
  const getItemType = () => {
    return type === 'documentary' ? 'documentaries' : 'music';
  };
  
  return (
    <Link 
      to={`/${getItemType()}/${item.id}`} 
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-[#1A2238] shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img 
            src={getItemImage()} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 transition-opacity duration-300 ${isHovered ? 'opacity-80' : ''}`}></div>
          
          {/* Overlay content - only visible on hover */}
          <div className={`absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex justify-end">
              <button 
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full ${isFavorite ? 'bg-[#FF6B6B] text-white' : 'bg-gray-800 bg-opacity-70 text-white hover:bg-[#FF6B6B]'} transition`}
              >
                <Heart className="w-5 h-5" fill={isFavorite ? 'white' : 'none'} />
              </button>
            </div>
            
            <div className="mt-auto">
              {type === 'documentary' && (
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#FF6B6B] py-2 rounded-md text-white text-sm font-medium hover:bg-opacity-90 transition">
                    <Play className="w-4 h-4" />
                    Trailer
                  </button>
                  <button className="flex items-center justify-center bg-gray-800 bg-opacity-70 p-2 rounded-md text-white hover:bg-opacity-90 transition">
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {type === 'music' && (
                <button className="w-full flex items-center justify-center gap-2 bg-[#FF6B6B] py-2 rounded-md text-white text-sm font-medium hover:bg-opacity-90 transition">
                  <Play className="w-4 h-4" />
                  Preview
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-1 mb-2">
            <Star className="w-4 h-4 text-[#FFD700] fill-current" />
            <span className="text-xs text-gray-300">{item.rating.toFixed(1)}</span>
            <span className="mx-1 text-gray-500">•</span>
            <span className="text-xs text-gray-300">{item.year}</span>
          </div>
          
          <h3 className="font-medium text-white mb-1 line-clamp-1">{item.title}</h3>
          
          <p className="text-sm text-gray-400 mb-2 line-clamp-1">
            {type === 'documentary' ? (item as Documentary).director : (item as Album).artist}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {item.genres.slice(0, 2).map((genre, index) => (
              <span 
                key={index} 
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
              >
                {genre}
              </span>
            ))}
            {item.genres.length > 2 && (
              <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                +{item.genres.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;