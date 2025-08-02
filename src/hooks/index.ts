import { useState, useEffect, useCallback } from 'react';
import { peopleAPI, planetsAPI, starshipsAPI, filmsAPI, resolveRelatedResources, extractIdFromUrl, fetchByUrl } from '../service/api';
import { SortDirection, SearchTerm } from '../service/api';
import { 
  Planet, 
  PlanetWithRelatedData, 
  Person, 
  Film,
  Starship
} from '../types';

// Generic hook for fetching and managing list data
function useListData<T = any>(apiService: any, searchFields: SearchTerm = '') {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<SearchTerm>(searchFields);
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const fetchNextPage = useCallback(async () => {
    if (nextUrl) {
      try {
        setLoading(true);
        setError(null);
        const nextData = await fetchByUrl(nextUrl);
        setData([...data, ...nextData.results]);
        setNextUrl(nextData.next);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        setError(err.message);
        console.error('Error fetching next page:', err);
      }
    }
  }, [nextUrl, data]);

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
    let aVal: any = (a as any)[sortField];
    let bVal: any = (b as any)[sortField];
    
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
    nextUrl,
    fetchNextPage
  };
}

// Hook for fetching individual item details
function useItemDetails<T = any>(apiService: any, id: string) {
  const [item, setItem] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedData, setRelatedData] = useState<any>({});

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

        // Fetch vehicles for people
        if (result.vehicles && result.vehicles.length > 0) {
          try {
            related.vehicles = await resolveRelatedResources(result.vehicles);
          } catch (err: any) {
            console.error('Error fetching vehicles:', err);
          }
        }

        // Fetch species for people
        if (result.species && result.species.length > 0) {
          try {
            related.species = await resolveRelatedResources(result.species);
          } catch (err: any) {
            console.error('Error fetching species:', err);
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
  return useListData<Person>(peopleAPI);
}

export function usePlanets() {
  return useListData<Planet>(planetsAPI);
}

export function useStarships() {
  return useListData<Starship>(starshipsAPI);
}

export function usePersonDetails(id: string) {
  return useItemDetails<Person>(peopleAPI, id);
}

export function usePlanetDetails(id: string) {
  return useItemDetails<PlanetWithRelatedData>(planetsAPI, id);
}

export function useFilmDetails(id: string) {
  return useItemDetails<Film>(filmsAPI, id);
}

export function useStarshipDetails(id: string) {
  return useItemDetails<Starship>(starshipsAPI, id);
}

// Hook for films data
export function useFilms() {
  const [films, setFilms] = useState<Film[]>([]);
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
