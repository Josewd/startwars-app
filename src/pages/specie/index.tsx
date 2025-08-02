import React from 'react';
import { useSpeciesDetails } from "../../hooks";
import { 
  CircularProgress, 
  Button, 
  Typography,
  Box,
} from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';
import { useParams } from "react-router";
import Header from "../../components/header";
import BulletLinkArray from "../../components/bulletLink";
import BaseDetailPage from "../../components/baseDetailPage";

export default function SpecieDetails() {
  const { id } = useParams();
  console.log(id);
  const { 
    item,
    relatedData,
    error,
    loading,
  } = useSpeciesDetails(id || '');

  console.log({item});

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
            Error loading species details: {error}
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

  const rows = [
    { value: 'classification'},
    { value: 'designation'},
    { value: 'average_height', render: (value: string) => (value && value !== 'n/a') ? `${value} cm` : 'N/A' },
    { value: 'average_lifespan', render: (value: string) => value ? `${value} years` : 'N/A' },
    { value: 'language'},
    { value: 'homeworld', render: (value: string) => value ? `${value}` : 'N/A' },
    { value: 'eye_colors'},
    { value: 'hair_colors'},
    { value: 'skin_colors'},
  ];

  return (
    <div className="space-y-6 universe">
      <Header
        title={item?.name || 'Specie Details'}
        description={`Explore the ${item?.name} species in the Star Wars galaxy.`}
        backButton={true}
        backButtonLink="/species"
      />
      <BaseDetailPage
        item={item}
        rows={rows}
        bulletLinks={
          <>
            <BulletLinkArray data={relatedData?.people} title="People" link={`/person`} />
            <BulletLinkArray data={relatedData?.films} title="Films" link={`/film`} />
          </>
        }
      />
    </div>
  );
}
