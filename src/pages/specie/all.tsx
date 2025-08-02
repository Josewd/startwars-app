import React from 'react';
import { useSpecies } from "../../hooks";
import { 
  CircularProgress, 
  Button, 
  Typography,
  Box,
} from '@mui/material';
import { 
  Error as ErrorIcon,
  Public as PublicIcon, 
} from '@mui/icons-material';
import Header from "../../components/header";
import SpecieCard from "../../components/card";
import { Species } from '../../types';

export default function AllSpecies() {
  const { 
    data: species, 
    loading, 
    error, 
  } = useSpecies();

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" py={8}>
        <Box textAlign="center">
          <CircularProgress sx={{ color: '#FACC15', mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#D1D5DB' }}>
            Loading species from a galaxy far, far away...
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
        title="Species"
        description="Explore the diverse species of the Star Wars galaxy."
      />
 
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        { species && species.map((specie: Species) => {
          return <SpecieCard key={specie.name} name={specie.name} info={specie?.classification || ''} url={specie.url || ''} path="/specie" />;
        })}
      </div>

      {/* Empty State */}
      {species.length === 0 && (
        <Box textAlign="center" py={8}>
          <PublicIcon sx={{ fontSize: 84, color: '#6B7280', mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'semibold', color: '#D1D5DB', mb: 1 }}>
            No species found
          </Typography>
          <Typography variant="body1" sx={{ color: '#9CA3AF' }}>
            Try adjusting your search term to find species.
          </Typography>
        </Box>
      )}
    </div>
  );
}
