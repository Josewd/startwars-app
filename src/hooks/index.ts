import { useState, useEffect, useCallback } from 'react';
import { peopleAPI, planetsAPI, starshipsAPI, filmsAPI, resolveRelatedResources, extractIdFromUrl } from '../service/api';
import { SortDirection } from '../service/api';

// Generic hook for fetching and managing list data
function  useListData(apiService: any, searchFields: string | string[] = '') {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | string[]>(searchFields);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAll(searchTerm);
      setData(data.results);
      setNextUrl(data.next);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [apiService, searchTerm]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];
    
    // Handle numeric values
    if (!isNaN(aVal) && !isNaN(bVal)) {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
    }
    
    // Handle "unknown" values
    if (aVal === 'unknown') aVal = sortDirection === 'asc' ? Infinity : -Infinity;
    if (bVal === 'unknown') bVal = sortDirection === 'asc' ? Infinity : -Infinity;
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    }
  });

  // Handle sort change
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {
    data: sortedData,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    handleSort,
    refetch: fetchData,
    nextUrl
  };
}

// Hook for fetching individual item details
function useItemDetails(apiService: any, id: string) {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedData, setRelatedData] = useState({});

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getById(id);
        setItem(result);

        // Fetch related data based on item type
        const related: { [key: string]: any } = {};
        
        // Fetch homeworld for people
        if (result.homeworld) {
          try {
            related.homeworld = await fetch(result.homeworld).then(res => res.json());
          } catch (err: any) {
            console.error('Error fetching homeworld:', err);
          }
        }

        // Fetch residents for planets
        if (result.residents && result.residents.length > 0) {
          try {
            related.residents = await resolveRelatedResources(result.residents);
          } catch (err: any) {
            console.error('Error fetching residents:', err);
          }
        }

        // Fetch starships for people
        if (result.starships && result.starships.length > 0) {
          try {
            related.starships = await resolveRelatedResources(result.starships);
          } catch (err: any) {
            console.error('Error fetching starships:', err);
          }
        }

        // Fetch films for all entities
        if (result.films && result.films.length > 0) {
          try {
            related.films = await resolveRelatedResources(result.films);
          } catch (err: any) {
            console.error('Error fetching films:', err);
          }
        }

        setRelatedData(related);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching item details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [apiService, id]);

  return { item, relatedData, loading, error };
}

// Specific hooks for each entity type
export function usePeople() {
  return useListData(peopleAPI, ['name']);
}

export function usePlanets() {
  return useListData(planetsAPI, 'name');
}

export function useStarships() {
  return useListData(starshipsAPI, ['name', 'model']);
}

export function usePersonDetails(id: string) {
  return useItemDetails(peopleAPI, id);
}

export function usePlanetDetails(id: string) {
  return useItemDetails(planetsAPI, id);
}

export function useStarshipDetails(id: string) {
  return useItemDetails(starshipsAPI, id);
}

// Hook for films data
export function useFilms() {
  const [films, setFilms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const result = await filmsAPI.getAll();
        setFilms(result);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching films:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return { films, loading, error };
}

// Utility hook for extracting IDs from URLs
export function useUrlId(url: string) {
  return extractIdFromUrl(url);
}
