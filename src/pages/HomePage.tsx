import React, { useEffect } from 'react';
import { ArrowRight, Film, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/common/SearchBar';
import ContentCard from '../components/common/ContentCard';
import RecommendationCarousel from '../components/common/RecommendationCarousel';

const HomePage: React.FC = () => {
  const { documentaries, music, recommendations, isLoading, refreshRecommendations } = useContent();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    refreshRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A2238] to-[#121726] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg" 
          alt="Documentary" 
          className="absolute w-full h-full object-cover object-center"
        />
        <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 max-w-3xl">
            Discover Award-Winning Documentaries and Music
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            Explore a curated collection of thought-provoking documentaries and iconic music. Save your favorites and get personalized recommendations.
          </p>
          <div className="max-w-md">
            <SearchBar compact={true} />
          </div>
        </div>
      </section>

      {/* Welcome Back section for authenticated users */}
      {isAuthenticated && (
        <section className="py-8 bg-gradient-to-r from-[#1A2238] to-[#121726]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-semibold mb-6">
              Welcome back, {user?.username}
            </h2>
            
            <RecommendationCarousel 
              title="Recommended For You" 
              recommendations={recommendations}
            />
          </div>
        </section>
      )}

      {/* Featured Documentaries Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Film className="w-6 h-6 text-[#FF6B6B]" />
              <h2 className="text-2xl font-serif font-semibold">Featured Documentaries</h2>
            </div>
            <Link 
              to="/documentaries" 
              className="flex items-center text-sm text-[#FF6B6B] hover:text-[#ff8f8f] transition"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {documentaries.slice(0, 5).map((documentary) => (
              <ContentCard 
                key={documentary.id} 
                item={documentary} 
                type="documentary" 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Music Section */}
      <section className="py-12 bg-gradient-to-r from-[#1A2238] to-[#121726]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Music className="w-6 h-6 text-[#FF6B6B]" />
              <h2 className="text-2xl font-serif font-semibold">Featured Music</h2>
            </div>
            <Link 
              to="/music" 
              className="flex items-center text-sm text-[#FF6B6B] hover:text-[#ff8f8f] transition"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {music.map((album) => (
              <ContentCard 
                key={album.id} 
                item={album} 
                type="music" 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Genres Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-semibold mb-8">Popular Genres</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Nature', 'History', 'Science', 'Jazz', 'Classical', 'Technology'].map((genre) => (
              <Link 
                key={genre}
                to={`/search?genre=${genre}`}
                className="relative h-32 rounded-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity duration-300"></div>
                <img 
                  src={`https://images.pexels.com/photos/${getGenreImage(genre)}`} 
                  alt={genre} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">{genre}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#FF6B6B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Join DocuVerse Today</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Create an account to save your favorite documentaries and music, get personalized recommendations, and more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="px-6 py-3 bg-white text-[#1A2238] font-medium rounded-md hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
            <Link 
              to="/discover" 
              className="px-6 py-3 bg-transparent border-2 border-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition"
            >
              Explore Content
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to get genre-specific images
function getGenreImage(genre: string): string {
  const genreImages: Record<string, string> = {
    'Nature': '1287667/pexels-photo-1287667.jpeg',
    'History': '3610351/pexels-photo-3610351.jpeg',
    'Science': '2098428/pexels-photo-2098428.jpeg',
    'Jazz': '4087445/pexels-photo-4087445.jpeg',
    'Classical': '2378209/pexels-photo-2378209.jpeg',
    'Technology': '1714208/pexels-photo-1714208.jpeg'
  };
  
  return genreImages[genre] || '1287667/pexels-photo-1287667.jpeg';
}

export default HomePage;