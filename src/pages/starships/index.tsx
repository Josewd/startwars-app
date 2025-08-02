import React, { useEffect, useRef, useState, useTransition } from 'react';
import { usePeople, usePlanets, useStarships } from "../../hooks";
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
  UnfoldMore as UnfoldMoreIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import AutoFocusInput from "../../components/autoFocusInput";
import InfinityScroll from "../../components/infinityScroll";
import { useParams } from "react-router";
import Header from "../../components/header";
import StarshipCard from "../../components/card";

export default function StarshipsPage() {
  const { 
    data: starships, 
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
  } = useStarships();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

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
    console.log(id);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  useEffect(() => {
    if (!isPending) {
      setIsLoading(false);
    }
  }, [isPending]);

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

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <UnfoldMoreIcon sx={{ fontSize: 16 }} />;
    return sortDirection === 'asc' ? <KeyboardArrowUpIcon sx={{ fontSize: 16 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />;
  };

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
        borderRadius: 3,
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
            
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" sx={{ color: '#9CA3AF' }}>Sort by:</Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleSort('name')}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.3)'
                  }
                }}
                endIcon={getSortIcon('name')}
              >
                Name
              </Button>
            </Box>
          </Box>
          
          <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
            Showing {starships.length} starships
          </Typography>
        </CardContent>
      </Card>

      {/* Planets Grid */}
      <InfinityScroll
        hasMore={!!nextUrl}
        onLoadMore={fetchNextPage}
        loading={loading}
      >
        {starships.map((starship) => {
          return <StarshipCard key={starship.name} name={starship.name} info={starship?.model || ''} url={starship.url || ''} path="/starship" />;
        })}
      </InfinityScroll>

      {/* Empty State */}
      {starships.length === 0 && searchTerm && (
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
