import React, { useEffect, useRef, useTransition } from 'react';
import './App.css';
import { usePlanets } from "./hooks";
import { 
  CircularProgress, 
  Button, 
  TextField, 
  InputAdornment,
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
  Search as SearchIcon,
} from '@mui/icons-material';
import PlanetCard from "./components/planetCard";
import AutoFocusInput from "./components/autoFocusInput";

function App() {
  const { 
    data: planets, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    sortField, 
    sortDirection, 
    handleSort 
  } = usePlanets();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      startTransition(() => {
         setSearchTerm(value);
      });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  if (loading || isPending) {
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
    <div className="space-y-6">
      {/* Header */}
      <Box textAlign="center" py={2}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
          <PublicIcon sx={{ fontSize: 32, color: '#60A5FA' }} />
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', color: 'white' }}>
            Planets
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#D1D5DB', maxWidth: '768px', mx: 'auto' }}>
          Explore the diverse worlds of the Star Wars galaxy, from desert planets to ice worlds.
        </Typography>
      </Box>

      {/* Search and Controls */}
      <Card sx={{ 
        backgroundColor: 'rgba(255,255,255,0.05)', 
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center" justifyContent="space-between" mb={2}>
           <AutoFocusInput
           searchTerm={searchTerm as string}
           handleSearch={handleSearch}
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
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleSort('population')}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.3)'
                  }
                }}
                endIcon={getSortIcon('population')}
              >
                Population
              </Button>
            </Box>
          </Box>
          
          <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
            Showing {planets.length} planets
          </Typography>
        </CardContent>
      </Card>

      {/* Planets Grid */}
      <div>
        {planets.map((planet) => {
          return <PlanetCard key={planet.name} {...planet} />;
        })}
      </div>

      {/* Empty State */}
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

export default App;
