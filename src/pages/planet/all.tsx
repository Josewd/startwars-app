import React, { useEffect, useRef, useState, useTransition } from 'react';
import { usePlanets } from "../../hooks";
import { 
  Button, 
  Typography,
  Box,
} from '@mui/material';
import { 
  Error as ErrorIcon,
} from '@mui/icons-material';
import ListItems from '../../components/listItems';

export default function AllPlanets() {
  const { 
    data: planets,
    error, 
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.trim() === '') {
        refetch();
      }
      setSearchValue(value);
      startTransition(() => {
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
      setSearchTerm(searchValue);
    }
  }, [isPending, searchValue, setSearchTerm]);


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
    <ListItems
      title="Planets"
      description="Explore the diverse worlds of the Star Wars galaxy, from desert planets to ice worlds."
      searchValue={searchValue}
      handleSearch={handleSearch}
      handleSort={handleSort}
      sortField={sortField}
      sortDirection={sortDirection}
      data={planets}
      nextUrl={nextUrl || ''}
      fetchNextPage={fetchNextPage}
      loading={false}
      path="/planet"
      sortLinks={[{ name: 'name', onClick: () => handleSort('name') }, { name: 'population', onClick: () => handleSort('population') }]}
    />
  );
}
