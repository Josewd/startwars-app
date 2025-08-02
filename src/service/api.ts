import { cache } from "react";

const BASE_URL = 'https://swapi.py4e.com/api';

export type SortDirection = 'asc' | 'desc';
export type Endpoint = 'people' | 'planets' | 'starships' | 'films';
export type SearchTerm = string | string[];

// Generic fetch function with error handling
const cachedFetch = cache(fetch);
async function fetchFromAPI(url: string) {
  try {
    const response = await cachedFetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error: any) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// Extract ID from URL (e.g., "https://swapi.py4e.com/api/people/1/" -> "1")
export function extractIdFromUrl(url: string) {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : null;
}

// Fetch all pages of a resource
async function fetchAllPages(endpoint: Endpoint, searchTerm = '') {
  const data = await fetchFromAPI(`${BASE_URL}/${endpoint}/${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`);
  
  return data;
}

// People/Characters API
export const peopleAPI = {
  // Get all people with optional search
  async getAll(searchTerm = '') {
    return await fetchAllPages('people', searchTerm);
  },
  
  // Get a specific person by ID
  async getById(id: string) {
    return await fetchFromAPI(`${BASE_URL}/people/${id}/`);
  },
  
  // Get people with pagination
  async getPage(page = 1, searchTerm = '') {
    const url = `${BASE_URL}/people/?page=${page}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;
    return await fetchFromAPI(url);
  }
};

// Planets API
export const planetsAPI = {
  // Get all planets with optional search
  async getAll(searchTerm = '') {
    return await fetchAllPages('planets', searchTerm);
  },
  
  // Get a specific planet by ID
  async getById(id: string) {
    return await fetchFromAPI(`${BASE_URL}/planets/${id}/`);
  },
  
  // Get planets with pagination
  async getPage(page = 1, searchTerm = '') {
    const url = `${BASE_URL}/planets/?page=${page}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;
    return await fetchFromAPI(url);
  }
};

// Starships API
export const starshipsAPI = {
  // Get all starships with optional search
  async getAll(searchTerm = '') {
    return await fetchAllPages('starships', searchTerm);
  },
  
  // Get a specific starship by ID
  async getById(id: string) {
    return await fetchFromAPI(`${BASE_URL}/starships/${id}/`);
  },
  
  // Get starships with pagination
  async getPage(page = 1, searchTerm = '') {
    const url = `${BASE_URL}/starships/?page=${page}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;
    return await fetchFromAPI(url);
  }
};

// Films API
export const filmsAPI = {
  // Get all films
  async getAll() {
    return await fetchAllPages('films');
  },
  
  // Get a specific film by ID
  async getById(id: string) {
    return await fetchFromAPI(`${BASE_URL}/films/${id}/`);
  }
};

// Generic function to fetch any resource by URL
export async function fetchByUrl(url: string) {
  return await fetchFromAPI(url);
}

// Helper function to resolve related resources
export async function resolveRelatedResources(urls: string[]) {
  if (!urls || urls.length === 0) return [];
  
  try {
    const promises = urls.map(url => fetchFromAPI(url));
    return await Promise.all(promises);
  } catch (error: any) {
    console.error('Error resolving related resources:', error);
    return [];
  }
}



