import React from 'react';
import { usePersonDetails } from "../../hooks";
import { 
  CircularProgress, 
  Button, 
  Typography,
  Box,
} from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';
import Header from "../../components/header";
import BulletLinkArray from "../../components/bulletLink";
import BaseDetailPage from "../../components/ItemDetails";

export default function PersonDetails({ id }: { id: string }) {
  const { 
    item,
    relatedData,
    error,
    loading,
  } = usePersonDetails(id || '');

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" py={8}>
        <Box textAlign="center">
          <CircularProgress sx={{ color: '#FACC15', mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#D1D5DB' }}>
            Loading person details from {relatedData?.homeworld?.name}
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
    { key: 'height', render: (value: string) => `${value} cm` },
    { key: 'mass', render: (value: string) => `${value} kg` },
    { key: 'hair_color'},
    { key: 'skin_color'},
    { key: 'eye_color'},
    { key: 'birth_year', render: (value: string) => `${value} years` },
    { key: 'gender'},
  ];

  return (
    <div className="space-y-6 universe">
      <Header
        title={item?.name || 'Person Details'}
        description={`Get to know ${item?.name} From ${relatedData?.homeworld?.name}`}
      />
      <BaseDetailPage
        item={item}
        rows={rows}
        bulletLinks={
          <>
            <BulletLinkArray data={[{ title: relatedData?.homeworld?.name || '', url: relatedData?.homeworld?.url || '' }]} title="Homeworld" link={`/planet`} />
            <BulletLinkArray data={relatedData?.films} title="Films" link={`/film`} />
            <BulletLinkArray data={relatedData?.species} title="Species" link={`/species`} />
            <BulletLinkArray data={relatedData?.vehicles} title="Vehicles" link={`/vehicle`} />
            <BulletLinkArray data={relatedData?.starships} title="Starships" link={`/starship`} />
          </>
        }
      />  
    </div>
  );
}
