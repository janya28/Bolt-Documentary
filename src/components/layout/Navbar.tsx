import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Music, User, Menu, X, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../common/SearchBar';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <nav className="bg-gradient-to-r from-[#1A2238] to-[#121726] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-[#FF6B6B]" />
              <span className="font-serif text-xl font-bold tracking-wide">DocuVerse</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/documentaries" 
              className={`font-medium text-sm ${isActive('/documentaries') ? 'text-[#FFD700]' : 'text-gray-200 hover:text-white'} transition duration-150 ease-in-out`}
            >
              Documentaries
            </Link>
            <Link 
              to="/music" 
              className={`font-medium text-sm ${isActive('/music') ? 'text-[#FFD700]' : 'text-gray-200 hover:text-white'} transition duration-150 ease-in-out`}
            >
              Music
            </Link>
            <Link 
              to="/discover" 
              className={`font-medium text-sm ${isActive('/discover') ? 'text-[#FFD700]' : 'text-gray-200 hover:text-white'} transition duration-150 ease-in-out`}
            >
              Discover
            </Link>
            
            <button 
              onClick={toggleSearch}
              className="text-gray-200 hover:text-white p-1 rounded-full hover:bg-gray-800 focus:outline-none transition"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {isAuthenticated ? (
              <div className="relative group">
                <Link to="/profile" className="flex items-center space-x-1">
                  <div className="h-8 w-8 rounded-full bg-[#FF6B6B] flex items-center justify-center overflow-hidden">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm">{user?.username}</span>
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-[#1A2238] rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">Profile</Link>
                  <Link to="/favorites" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">Favorites</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">Sign out</button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-sm font-medium px-4 py-2 rounded-md bg-[#FF6B6B] hover:bg-opacity-90 transition duration-150 ease-in-out"
              >
                Sign In
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="text-gray-200 hover:text-white p-1 rounded-full hover:bg-gray-800 focus:outline-none transition"
            >
              <Search className="h-5 w-5" />
            </button>
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#121726]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/documentaries" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/documentaries') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Documentaries
            </Link>
            <Link 
              to="/music" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/music') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Music
            </Link>
            <Link 
              to="/discover" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/discover') ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Discover
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/favorites" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favorites
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium bg-[#FF6B6B] text-white hover:bg-opacity-90"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
      
      {/* Search panel */}
      {isSearchOpen && (
        <div className="absolute top-16 inset-x-0 bg-[#121726] shadow-lg p-4 z-50 transform origin-top transition">
          <SearchBar onClose={toggleSearch} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;