import React from 'react';
import { useVehicles } from "../../hooks";
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
import InfinityScroll from "../../components/infinityScroll";
import Header from "../../components/header";
import VehicleCard from "../../components/card";

export default function AllVehicles() {
  const { 
    data: vehicles, 
    loading, 
    error, 
    searchTerm, 
    fetchNextPage,
    nextUrl,
  } = useVehicles();



  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" py={8}>
        <Box textAlign="center">
          <CircularProgress sx={{ color: '#FACC15', mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#D1D5DB' }}>
            Loading vehicles from a galaxy far, far away...
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
            Error loading vehicles: {error}
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
        title="Vehicles"
        description="Explore the diverse vehicles of the Star Wars galaxy."
      />

      {/* Planets Grid */}
      <InfinityScroll
        hasMore={!!nextUrl}
        onLoadMore={fetchNextPage}
        loading={loading}
      >
        {vehicles.map((vehicle) => {
          return <VehicleCard key={vehicle.name} name={vehicle.name} info={vehicle?.model || ''} url={vehicle.url || ''} path="/vehicle" />;
        })}
      </InfinityScroll>

      {/* Empty State */}
      {vehicles.length === 0 && searchTerm && (
        <Box textAlign="center" py={8}>
          <PublicIcon sx={{ fontSize: 84, color: '#6B7280', mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'semibold', color: '#D1D5DB', mb: 1 }}>
            No vehicles found
          </Typography>
          <Typography variant="body1" sx={{ color: '#9CA3AF' }}>
            Try adjusting your search term to find vehicles.
          </Typography>
        </Box>
      )}
    </div>
  );
}
