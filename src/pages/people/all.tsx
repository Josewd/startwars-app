import React, { useEffect, useRef, useState, useTransition } from 'react';
import { usePeople } from "../../hooks";
import { 
  CircularProgress, 
  Button, 
  Typography,
  Box,
} from '@mui/material';
import { 
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useParams } from "react-router";
import BaseAllPage from '../../components/baseAllPage';

export default function PeoplePage() {
  const { 
    data: people, 
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
  } = usePeople();

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
  return (  
    <BaseAllPage
      title="People"
      description="Explore the diverse people of the Star Wars galaxy."
      searchValue={searchValue}
      handleSearch={handleSearch}
      handleSort={handleSort}
      sortField={sortField}
      sortDirection={sortDirection}
      data={people}
      nextUrl={nextUrl || ''}
      fetchNextPage={fetchNextPage}
      loading={loading}
      path="/person"
      sortLinks={[{ name: 'name', onClick: () => handleSort('name') }, { name: 'homeworld', onClick: () => handleSort('homeworld') }]}
    />
  );
}
