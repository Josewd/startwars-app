import React, { useEffect, useRef, useState, useTransition } from 'react';
import { usePlanets } from "../../hooks";
import { 
  CircularProgress, 
  Button, 
  Typography,
  Box,
  Card,
  CardContent
} from '@mui/material';
import { 
  Error as ErrorIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import Navigation from "../../components/nav";
import PlanetCard from "../../components/planetCard";
import AutoFocusInput from "../../components/autoFocusInput";
import InfinityScroll from "../../components/infinityScroll";
import Header from "../../components/header";
import Loading from "../../components/loading";

export default function AllPlanets() {
  const { 
    data: planets, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    sortField, 
    sortDirection, 
    handleSort,
    fetchNextPage,
    nextUrl,
    refetch,
  } = usePlanets();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.trim() === '') {
        refetch();
      }
      setSearchValue(value);
      startTransition(() => {
        setIsLoading(true);
        setSearchTerm(value);
      });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  useEffect(() => {
    if (!isPending) {
      setIsLoading(false);
    }
  }, [isPending]);

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

      {/* Search and Controls */}
      <Card sx={{ 
        backgroundColor: 'rgba(255,255,255,0.05)', 
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        width: '100%',
        margin: '20px auto'
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center" justifyContent="space-between" mb={2}>
           <AutoFocusInput
            searchTerm={searchValue as string}
            handleSearch={handleSearch}
            placeholder="Search planets..."
           />
           <Navigation
            handleSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
            links={[{ name: 'name', onClick: () => handleSort('name') }, { name: 'population', onClick: () => handleSort('population') }]}
           /> 
          </Box>
          
          <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
            Showing {planets.length} planets
          </Typography>
        </CardContent>
      </Card>

      {
        loading ? (
        <Loading message="Loading planets from a galaxy far, far away..." />
      ) : (
        <InfinityScroll
          hasMore={!!nextUrl}
          onLoadMore={fetchNextPage}
          loading={isLoading}
        >
          {planets.map((planet) => {
            return <PlanetCard key={planet.name} {...planet} />;
          })}
        </InfinityScroll>
      )}
      
      {planets.length === 0 && searchTerm && (
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
