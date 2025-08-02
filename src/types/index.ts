import { SortDirection } from "@mui/material";
import { SearchTerm } from "../service/api";



// Exportar todos os tipos relacionados a planetas
export * from './planet';

// Tipos da API
export type { SortDirection, Endpoint, SearchTerm } from '../service/api';

// Tipos para paginação
export interface PaginationData {
  page: number;
  hasMore: boolean;
  total?: number;
}

// Tipos para estados de loading
export interface LoadingState {
  loading: boolean;
  error?: string;
}

// Tipos para hooks
export interface UseDataResult<T> extends LoadingState {
  data: T;
  refresh: () => void;
}

// Tipos para busca
export interface SearchState {
  searchTerm: SearchTerm;
  setSearchTerm: (term: SearchTerm) => void;
}

// Tipos para ordenação
export interface SortState {
  sortField: string;
  sortDirection: SortDirection;
  handleSort: (field: string) => void;
}

export interface Starship {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  films: string[];
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[];
  starship_class: string;
  url: string;
}
export interface Species {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: string;
  language: string;
  name: string;
  people: string[];
  films: string[];
  skin_colors: string;
  url: string;
}

export interface Vehicle {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[];
  films: string[];
  url: string;
  vehicle_class: string;
}