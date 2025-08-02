import React from 'react';
import { usePlanetDetails } from "../../hooks";
import { 
  CircularProgress, 
  Button, 
  Typography,
  Box,
} from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';
import Header from "../../components/header";
import { dataUtils } from "../../utils";
import BulletLinkArray from "../../components/bulletLink";
import BaseDetailPage from "../../components/baseDetailPage";

export default function PlanetDetails({ id }: { id: string }) {
  const { 
    item,
    relatedData,
    error,
    loading,
  } = usePlanetDetails(id || '');

  if (loading) {
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

  const rows = [
    { value: 'climate'},
    { value: 'terrain'},
    { value: 'population', render: (value: string) => dataUtils.formatPopulation(value) },
    { value: 'diameter', render: (value: string) => dataUtils.formatDiameter(value) },
    { value: 'gravity'},
    { value: 'orbital_period', render: (value: string) => dataUtils.formatPeriod(value, 'days') },
    { value: 'rotation_period', render: (value: string) => dataUtils.formatPeriod(value, 'hours') },
    { value: 'surface_water', render: (value: string) => value ? `${value}%` : 'N/A'}
  ];

  return (
    <div className="space-y-6 universe">
      <Header
        title={item?.name || 'Planet Details'}
        description={`Explore the ${item?.name} planet in the Star Wars galaxy.`}
        backButton={true}
        backButtonLink="/planets"
      />
      <BaseDetailPage
        item={item}
        rows={rows}
        bulletLinks={
          <>
            <BulletLinkArray data={relatedData?.residents} title="Residents" link={`/person`} />
            <BulletLinkArray data={relatedData?.films} title="Films" link={`/film`} />
          </>
        }
      />
    </div>
  );
}
