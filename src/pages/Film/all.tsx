import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useFilms } from "../../hooks";
import { 
  CircularProgress, 
  Button, 
  Typography,
  Box,
  Card,
  CardContent
} from '@mui/material';
import { 
  Error as ErrorIcon,
  UnfoldMore as UnfoldMoreIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import AutoFocusInput from "../../components/autoFocusInput";
import InfinityScroll from "../../components/infinityScroll";
import Header from "../../components/header";
import FilmCard from "../../components/card";
import { Film } from '../../types';
import Table from "../../components/table";

export default function AllFilms() {
  const { 
    data: films, 
    loading, 
    error, 
  } = useFilms();
  console.log(films);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  useEffect(() => {
    if (!isPending) {
      setIsLoading(false);
    }
  }, [isPending]);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" py={8}>
        <Box textAlign="center">
          <CircularProgress sx={{ color: '#FACC15', mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#D1D5DB' }}>
            Loading planets from a galaxy far, far away...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" py={8}>
        <Box textAlign="center">
          <ErrorIcon sx={{ fontSize: 32, color: '#F87171', mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#D1D5DB', mb: 3 }}>
            Error loading planets: {error}
          </Typography>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outlined"
            sx={{ 
              color: 'white', 
              borderColor: 'rgba(255,255,255,0.2)',
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            Try Again
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <div className="space-y-6 universe">
     <Header
        title="Planets"
        description="Explore the diverse worlds of the Star Wars galaxy, from desert planets to ice worlds."
      />

      {/* Planets Grid */}
 
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        { films && films.map((film: Film) => {
          return <FilmCard key={film.title} name={film.title} info={film?.release_date || ''} url={film.url || ''} path="/film" />;
        })}
      </div>

      {/* Empty State */}
      {films.length === 0 && (
        <Box textAlign="center" py={8}>
          <PublicIcon sx={{ fontSize: 84, color: '#6B7280', mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'semibold', color: '#D1D5DB', mb: 1 }}>
            No planets found
          </Typography>
          <Typography variant="body1" sx={{ color: '#9CA3AF' }}>
            Try adjusting your search term to find planets.
          </Typography>
        </Box>
      )}
    </div>
  );
}
