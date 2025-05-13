import React from 'react';
import { Film, Music, Mail, Twitter, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#121726] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Film className="w-6 h-6 text-[#FF6B6B]" />
              <span className="font-serif text-xl font-bold tracking-wide text-white">DocuVerse</span>
            </div>
            <p className="text-sm">
              Discover the best documentaries and music from around the world with personalized recommendations.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Content</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/documentaries" className="text-sm hover:text-white transition">Documentaries</Link>
              </li>
              <li>
                <Link to="/music" className="text-sm hover:text-white transition">Music</Link>
              </li>
              <li>
                <Link to="/discover" className="text-sm hover:text-white transition">Discover</Link>
              </li>
              <li>
                <Link to="/new-releases" className="text-sm hover:text-white transition">New Releases</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/documentary/nature" className="text-sm hover:text-white transition">Nature</Link>
              </li>
              <li>
                <Link to="/documentary/history" className="text-sm hover:text-white transition">History</Link>
              </li>
              <li>
                <Link to="/documentary/science" className="text-sm hover:text-white transition">Science</Link>
              </li>
              <li>
                <Link to="/music/jazz" className="text-sm hover:text-white transition">Jazz</Link>
              </li>
              <li>
                <Link to="/music/classical" className="text-sm hover:text-white transition">Classical</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm hover:text-white transition">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-white transition">Contact Us</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-white transition">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-white transition">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} DocuVerse. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2 md:mt-0">
            Designed with ❤️ for documentary and music enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;