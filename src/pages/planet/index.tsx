import React, { useState } from 'react';
import { usePlanetDetails } from "../../hooks";
import { 
  CircularProgress, 
  Button, 
  Typography,
  Box,
} from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';
import PlanetCard from "../../components/planetCard";
import { useParams } from "react-router";
import Header from "../../components/header";

export default function PlanetDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { 
    item,
    relatedData,
    error,
  } = usePlanetDetails(id || '');

  console.log({item, relatedData});

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
            Error loading planet details: {error}
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
      {/* Header */}
      <Header
        title={item?.name || 'Planet Details'}
        description={`Explore the ${item?.name} planet in the Star Wars galaxy.`}
      />
      <PlanetCard {...item} />
    </div>
  );
}
