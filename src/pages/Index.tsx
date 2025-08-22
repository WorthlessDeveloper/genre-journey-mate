import { useState, useMemo } from 'react';
import { MovieCard, type Movie } from '@/components/MovieCard';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Film, Tv, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data - in a real app this would come from a database
const sampleMovies: Movie[] = [
  {
    id: '1',
    title: 'The Dark Knight',
    poster: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=450&fit=crop',
    genre: ['Action', 'Crime', 'Drama'],
    year: 2008,
    rating: 9.0,
    type: 'movie',
    watched: true,
  },
  {
    id: '2',
    title: 'Stranger Things',
    poster: 'https://images.unsplash.com/photo-1489599004927-87bf3f8329d5?w=300&h=450&fit=crop',
    genre: ['Drama', 'Fantasy', 'Horror'],
    year: 2016,
    rating: 8.7,
    type: 'tv',
    watched: false,
    episodes: { total: 42, watched: 25 },
  },
  {
    id: '3',
    title: 'Inception',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    year: 2010,
    rating: 8.8,
    type: 'movie',
    watched: true,
  },
  {
    id: '4',
    title: 'Breaking Bad',
    poster: 'https://images.unsplash.com/photo-1489599004927-87bf3f8329d5?w=300&h=450&fit=crop',
    genre: ['Crime', 'Drama', 'Thriller'],
    year: 2008,
    rating: 9.5,
    type: 'tv',
    watched: true,
    episodes: { total: 62, watched: 62 },
  },
  {
    id: '5',
    title: 'The Matrix',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    genre: ['Action', 'Sci-Fi'],
    year: 1999,
    rating: 8.7,
    type: 'movie',
    watched: false,
  },
  {
    id: '6',
    title: 'Game of Thrones',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
    genre: ['Adventure', 'Drama', 'Fantasy'],
    year: 2011,
    rating: 9.2,
    type: 'tv',
    watched: false,
    episodes: { total: 73, watched: 15 },
  },
];

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>(sampleMovies);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showWatchedOnly, setShowWatchedOnly] = useState(false);
  const { toast } = useToast();

  // Get all available genres
  const availableGenres = useMemo(() => {
    const genres = new Set<string>();
    movies.forEach(movie => {
      movie.genre.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort();
  }, [movies]);

  // Filter movies based on search and filters
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenres = selectedGenres.length === 0 || 
        selectedGenres.some(genre => movie.genre.includes(genre));
      const matchesWatched = !showWatchedOnly || movie.watched;
      
      return matchesSearch && matchesGenres && matchesWatched;
    });
  }, [movies, searchQuery, selectedGenres, showWatchedOnly]);

  // Toggle watched status
  const handleToggleWatched = (id: string) => {
    setMovies(prev => prev.map(movie => 
      movie.id === id 
        ? { ...movie, watched: !movie.watched }
        : movie
    ));
    
    const movie = movies.find(m => m.id === id);
    if (movie) {
      toast({
        title: movie.watched ? "Removed from watched" : "Added to watched",
        description: `${movie.title} ${movie.watched ? 'unmarked' : 'marked'} as watched`,
      });
    }
  };

  // Toggle genre filter
  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  // Get stats
  const watchedCount = movies.filter(m => m.watched).length;
  const movieCount = movies.filter(m => m.type === 'movie').length;
  const tvCount = movies.filter(m => m.type === 'tv').length;

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            My Watchlist
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your movies and TV shows, discover new favorites
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{watchedCount}</p>
                <p className="text-sm text-muted-foreground">Watched</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Film className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{movieCount}</p>
                <p className="text-sm text-muted-foreground">Movies</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Tv className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tvCount}</p>
                <p className="text-sm text-muted-foreground">TV Shows</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedGenres={selectedGenres}
          onGenreToggle={handleGenreToggle}
          availableGenres={availableGenres}
          showWatchedOnly={showWatchedOnly}
          onWatchedToggle={setShowWatchedOnly}
        />

        {/* Add New Button */}
        <div className="flex justify-end mb-6">
          <Button 
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
            onClick={() => toast({ title: "Feature coming soon!", description: "Add new movies and TV shows functionality will be available soon." })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleWatched={handleToggleWatched}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <Film className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedGenres([]);
              setShowWatchedOnly(false);
            }}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;