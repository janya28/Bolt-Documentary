import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Recommendation } from '../../types';
import ContentCard from './ContentCard';

interface RecommendationCarouselProps {
  title: string;
  recommendations: Recommendation[];
}

const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({ title, recommendations }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth * 0.8;
      
      if (direction === 'left') {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };
  
  // Skip rendering if no recommendations
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">{title}</h2>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        >
          {recommendations.map((recommendation, index) => (
            <div 
              key={index} 
              className="flex-none w-64 transition-transform duration-300"
            >
              <div className="mb-2">
                <h3 className="text-sm font-medium text-white">{recommendation.title}</h3>
                <p className="text-xs text-gray-400">{recommendation.reason}</p>
              </div>
              <ContentCard 
                item={recommendation.item} 
                type={'genres' in recommendation.item ? 'documentary' : 'music'} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCarousel;