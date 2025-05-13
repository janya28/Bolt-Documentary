import { Documentary, Album, ContentFilter, ApiResponse, Recommendation } from '../types';

// Mock data for documentaries
const mockDocumentaries: Documentary[] = [
  {
    id: '1',
    title: 'Planet Earth II',
    director: 'David Attenborough',
    year: 2016,
    runtime: 300,
    poster: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg',
    rating: 9.5,
    genres: ['Nature', 'Wildlife', 'Educational'],
    description: 'A stunning exploration of the planet\'s most remarkable habitats and their inhabitants.'
  },
  {
    id: '2',
    title: 'Free Solo',
    director: 'Elizabeth Chai Vasarhelyi, Jimmy Chin',
    year: 2018,
    runtime: 100,
    poster: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    rating: 8.2,
    genres: ['Sports', 'Adventure', 'Biography'],
    description: 'Follow Alex Honnold as he becomes the first person to ever free solo climb Yosemite\'s El Capitan.'
  },
  {
    id: '3',
    title: 'The Social Dilemma',
    director: 'Jeff Orlowski',
    year: 2020,
    runtime: 94,
    poster: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    rating: 7.6,
    genres: ['Technology', 'Society'],
    description: 'Explores the dangerous human impact of social networking, with tech experts sounding the alarm on their own creations.'
  },
  {
    id: '4',
    title: 'Blackfish',
    director: 'Gabriela Cowperthwaite',
    year: 2013,
    runtime: 83,
    poster: 'https://images.pexels.com/photos/1098764/pexels-photo-1098764.jpeg',
    rating: 8.1,
    genres: ['Nature', 'Animal Rights'],
    description: 'A documentary following the controversial captivity of killer whales, and its dangers for both humans and whales.'
  },
  {
    id: '5',
    title: 'Apollo 11',
    director: 'Todd Douglas Miller',
    year: 2019,
    runtime: 93,
    poster: 'https://images.pexels.com/photos/39896/space-station-moon-landing-apollo-15-james-irwin-39896.jpeg',
    rating: 8.2,
    genres: ['History', 'Space', 'Science'],
    description: 'A documentary film composed solely of archival footage of Apollo 11, the first mission to land humans on the Moon.'
  },
];

// Mock data for music albums
const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Kind of Blue',
    artist: 'Miles Davis',
    year: 1959,
    cover: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg',
    rating: 9.7,
    genres: ['Jazz', 'Modal Jazz'],
    tracks: [
      { id: '1-1', title: 'So What', duration: '9:22' },
      { id: '1-2', title: 'Freddie Freeloader', duration: '9:46' },
      { id: '1-3', title: 'Blue in Green', duration: '5:37' },
    ]
  },
  {
    id: '2',
    title: 'The Dark Side of the Moon',
    artist: 'Pink Floyd',
    year: 1973,
    cover: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg',
    rating: 9.5,
    genres: ['Progressive Rock', 'Psychedelic'],
    tracks: [
      { id: '2-1', title: 'Speak to Me/Breathe', duration: '3:58' },
      { id: '2-2', title: 'On the Run', duration: '3:35' },
      { id: '2-3', title: 'Time', duration: '7:06' },
    ]
  },
  {
    id: '3',
    title: 'Thriller',
    artist: 'Michael Jackson',
    year: 1982,
    cover: 'https://images.pexels.com/photos/73762/night-instrument-photography-drummer-73762.jpeg',
    rating: 9.2,
    genres: ['Pop', 'Dance', 'Funk'],
    tracks: [
      { id: '3-1', title: 'Wanna Be Startin\' Somethin\'', duration: '6:03' },
      { id: '3-2', title: 'Baby Be Mine', duration: '4:20' },
      { id: '3-3', title: 'The Girl is Mine', duration: '3:42' },
    ]
  },
];

// API function to fetch documentaries
export const fetchDocumentaries = async (
  filter: ContentFilter
): Promise<ApiResponse<Documentary>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filtered = [...mockDocumentaries];
  
  if (filter.genre) {
    filtered = filtered.filter(doc => doc.genres.includes(filter.genre as string));
  }
  
  if (filter.year) {
    filtered = filtered.filter(doc => doc.year === filter.year);
  }
  
  if (filter.decade) {
    const decadeStart = parseInt(filter.decade);
    filtered = filtered.filter(doc => doc.year >= decadeStart && doc.year < decadeStart + 10);
  }
  
  if (filter.rating) {
    filtered = filtered.filter(doc => doc.rating >= (filter.rating as number));
  }
  
  if (filter.query && filter.query.trim() !== '') {
    const query = filter.query.toLowerCase();
    filtered = filtered.filter(doc => 
      doc.title.toLowerCase().includes(query) || 
      doc.director.toLowerCase().includes(query) ||
      doc.description.toLowerCase().includes(query) ||
      doc.genres.some(g => g.toLowerCase().includes(query))
    );
  }
  
  return {
    data: filtered,
    totalCount: filtered.length,
    page: 1,
    totalPages: 1
  };
};

// API function to fetch music
export const fetchMusic = async (
  filter: ContentFilter
): Promise<ApiResponse<Album>> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filtered = [...mockAlbums];
  
  if (filter.genre) {
    filtered = filtered.filter(album => album.genres.includes(filter.genre as string));
  }
  
  if (filter.year) {
    filtered = filtered.filter(album => album.year === filter.year);
  }
  
  if (filter.decade) {
    const decadeStart = parseInt(filter.decade);
    filtered = filtered.filter(album => album.year >= decadeStart && album.year < decadeStart + 10);
  }
  
  if (filter.rating) {
    filtered = filtered.filter(album => album.rating >= (filter.rating as number));
  }
  
  if (filter.query && filter.query.trim() !== '') {
    const query = filter.query.toLowerCase();
    filtered = filtered.filter(album => 
      album.title.toLowerCase().includes(query) || 
      album.artist.toLowerCase().includes(query) ||
      album.genres.some(g => g.toLowerCase().includes(query))
    );
  }
  
  return {
    data: filtered,
    totalCount: filtered.length,
    page: 1,
    totalPages: 1
  };
};

// API function to generate recommendations
export const generateRecommendations = async (
  allContent: (Documentary | Album)[],
  favorites: (Documentary | Album)[]
): Promise<Recommendation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would use a sophisticated algorithm
  // For now, we'll use a simple approach
  
  if (favorites.length === 0) {
    // If no favorites, return random recommendations
    const randomItems = [...allContent]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
      
    return randomItems.map(item => ({
      title: `You might like: ${item.title}`,
      reason: 'Based on popular picks',
      item
    }));
  }
  
  // Get favorite genres
  const favoriteGenres = favorites
    .flatMap(item => 'genres' in item ? item.genres : [])
    .reduce((acc: Record<string, number>, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});
  
  // Find items that match favorite genres but aren't already in favorites
  const favoriteIds = favorites.map(item => item.id);
  const genreBasedRecs = allContent
    .filter(item => !favoriteIds.includes(item.id))
    .filter(item => 
      'genres' in item && item.genres.some(g => favoriteGenres[g])
    )
    .map(item => {
      const matchingGenre = 'genres' in item ? 
        item.genres.find(g => favoriteGenres[g]) || 'similar content' :
        'similar content';
        
      return {
        title: `Recommended: ${item.title}`,
        reason: `Because you like ${matchingGenre}`,
        item
      };
    });
    
  return genreBasedRecs.slice(0, 5);
};