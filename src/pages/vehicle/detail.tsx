import React, { useState } from 'react';
import { useVehicleDetails } from "../../hooks";
import { 
  CircularProgress, 
  Button, 
  Typography,
  Box,
} from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';
import Header from "../../components/header";
import BulletLinkArray from "../../components/bulletLink";
import BaseDetailPage from '../../components/baseDetailPage';

export default function VehicleDetails({ id }: { id: string }) {
  const { 
    item,
    relatedData,
    error,
    loading,
  } = useVehicleDetails(id || '');

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" py={8}>
        <Box textAlign="center">
          <CircularProgress sx={{ color: '#FACC15', mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#D1D5DB' }}>
            Loading vehicle details from {relatedData?.name}
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
            Error loading vehicle details: {error}
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
      { value: 'model'},
      { value: 'manufacturer'},
      { value: 'cost_in_credits'},
      { value: 'length'},
      { value: 'max_atmosphering_speed'},
      { value: 'crew'},
      { value: 'passengers'},
      { value: 'cargo_capacity'},
      { value: 'consumables'},
      { value: 'vehicle_class'},
  ];

  return (
    <div className="space-y-6 universe">
      <Header
        title={item?.name || 'Vehicle Details'}
        description={`Get to know ${item?.name} From ${relatedData?.name}`}
        backButton={true}
        backButtonLink="/vehicles"
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
