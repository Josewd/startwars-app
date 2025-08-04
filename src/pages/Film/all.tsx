import React, { useEffect } from 'react';
import { useFilms } from "../../hooks";
import {  
  Button, 
  Typography,
  Box,
} from '@mui/material';
import { 
  Error as ErrorIcon, 
  Public as PublicIcon,
} from '@mui/icons-material';
import Header from "../../components/header";
import FilmCard from "../../components/card"; 
import { Film } from '../../types';
import BaseAllPage from '../../components/baseAllPage';

export default function AllFilms() {
  const { 
    data: films, 
    loading, 
    error, 
  } = useFilms();
  console.log(films);

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
