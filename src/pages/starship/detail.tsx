import React, { useState } from 'react';
import { useStarshipDetails } from "../../hooks";
import { 
  CircularProgress, 
  Button, 
  Typography,
  Box,
} from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';
import Header from "../../components/header";
import BulletLinkArray from "../../components/bulletLink";
import BaseDetailPage from '../../components/ItemDetails';

export default function StarshipDetails({ id }: { id: string }) {
  const { 
    item,
    relatedData,
    error,
    loading,
  } = useStarshipDetails(id || '');

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" py={8}>
        <Box textAlign="center">
          <CircularProgress sx={{ color: '#FACC15', mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#D1D5DB' }}>
            Loading starship details from {relatedData?.name}
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

  const rows = [
    { key: 'model'},
    { key: 'manufacturer'},
    { key: 'cost_in_credits'},
    { key: 'length'},
    { key: 'max_atmosphering_speed'},
    { key: 'crew'},
    { key: 'passengers'},
    { key: 'cargo_capacity'},
    { key: 'consumables'},
    { key: 'hyperdrive_rating'},
    { key: 'MGLT'},
    { key: 'starship_class'},
  ];

  return (
    <div className="space-y-6 universe">
      <Header
        title={item?.name || 'Starship Details'}
        description={`Get to know ${item?.name} From ${relatedData?.name}`}
      />
      <BaseDetailPage
        item={item}
        rows={rows}
        bulletLinks={
          <>
            <BulletLinkArray data={relatedData?.films} title="Films" link={`/film`} />
            <BulletLinkArray data={relatedData?.pilots} title="Pilots" link={`/person`} />
          </>
        }
      />
    </div>
  );
}
