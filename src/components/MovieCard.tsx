import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Clock, Star, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string[];
  year: number;
  rating: number;
  type: 'movie' | 'tv';
  watched: boolean;
  episodes?: {
    total: number;
    watched: number;
  };
}

interface MovieCardProps {
  movie: Movie;
  onToggleWatched: (id: string) => void;
}

export function MovieCard({ movie, onToggleWatched }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
      <div className="aspect-[2/3] relative overflow-hidden">
        {!imageError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Play className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        
        {/* Overlay with controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-white">{movie.rating}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onToggleWatched(movie.id)}
                className={cn(
                  "h-8 w-8 p-0 rounded-full",
                  movie.watched ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90"
                )}
              >
                {movie.watched ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Watched indicator */}
        {movie.watched && (
          <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
            <Check className="h-3 w-3 text-primary-foreground" />
          </div>
        )}

        {/* Type badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 bg-black/50 text-white border-0"
        >
          {movie.type === 'tv' ? 'TV' : 'Movie'}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-tight">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{movie.year}</span>
          {movie.type === 'tv' && movie.episodes && (
            <span>{movie.episodes.watched}/{movie.episodes.total} episodes</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {movie.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="outline" className="text-xs border-primary/30">
              {g}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}