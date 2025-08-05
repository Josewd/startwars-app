import React, { useState } from 'react';
import { useFilmDetails } from "../../hooks";
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
import BaseDetailPage from "../../components/ItemDetails";

export default function FilmDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { 
    item,
    error,
    relatedData,
    } = useFilmDetails(id || '');

  console.log(relatedData, item);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" py={8}>
        <Box textAlign="center">
          <CircularProgress sx={{ color: '#FACC15', mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#D1D5DB' }}>
            Loading film details
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
            Error loading film details: {error}
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
    { key: 'title' },
    { key: 'episode_id' },
    { key: 'release_date' },
    { key: 'director' },
    { key: 'producer' },
  ];

  return (
    <div className="space-y-6 universe">
      <Header
        title={item?.title || 'Film Details'}
        description={item?.opening_crawl || ''}
      />
      <BaseDetailPage
        item={item}
        rows={rows}
        bulletLinks={
          <>
            <BulletLinkArray data={relatedData?.characters} title="Characters" link={`/person`} />
            <BulletLinkArray data={relatedData?.planets} title="Planets" link={`/planet`} />
            <BulletLinkArray data={relatedData?.starships} title="Starships" link={`/starship`} />
            <BulletLinkArray data={relatedData?.vehicles} title="Vehicles" link={`/vehicle`} />
            <BulletLinkArray data={relatedData?.species} title="Species" link={`/species`} />
          </>
        }
      />
    </div>
  );
}
