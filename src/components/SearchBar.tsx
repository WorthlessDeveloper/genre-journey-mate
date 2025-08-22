import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
  availableGenres: string[];
  showWatchedOnly: boolean;
  onWatchedToggle: (watched: boolean) => void;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  selectedGenres,
  onGenreToggle,
  availableGenres,
  showWatchedOnly,
  onWatchedToggle,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search movies and TV shows..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`pl-10 pr-4 h-12 bg-secondary/50 border-0 focus:bg-secondary transition-all duration-300 ${
            isFocused ? 'ring-2 ring-primary/50' : ''
          }`}
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {/* Genre Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Genres
              {selectedGenres.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {selectedGenres.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by Genre</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableGenres.map((genre) => (
              <DropdownMenuCheckboxItem
                key={genre}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={() => onGenreToggle(genre)}
              >
                {genre}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Watched Filter */}
        <Button
          variant={showWatchedOnly ? "default" : "outline"}
          size="sm"
          onClick={() => onWatchedToggle(!showWatchedOnly)}
          className="shrink-0"
        >
          Watched Only
        </Button>

        {/* Clear Filters */}
        {(selectedGenres.length > 0 || showWatchedOnly) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              selectedGenres.forEach(onGenreToggle);
              if (showWatchedOnly) onWatchedToggle(false);
            }}
            className="shrink-0"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {selectedGenres.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedGenres.map((genre) => (
            <Badge
              key={genre}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
              onClick={() => onGenreToggle(genre)}
            >
              {genre}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}