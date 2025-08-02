// Interface para um planeta da Star Wars API
export interface Planet {
  climate: string;
  created: string; // ISO date string
  diameter: string;
  edited: string; // ISO date string
  films: string[]; // Array of film URLs
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[]; // Array of resident URLs
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

// Interface para dados relacionados resolvidos
export interface PlanetRelatedData {
  residents: Person[];
  films: Film[];
}

// Interface para um planeta com dados relacionados
export interface PlanetWithRelatedData extends Planet {
  relatedData?: PlanetRelatedData;
}

// Interface básica para uma pessoa
export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

// Interface básica para um filme
export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

// Tipos utilitários para trabalhar com planetas
export type PlanetClimate = string; // Ex: "temperate", "arid", "frozen", etc.
export type PlanetTerrain = string; // Ex: "cityscape, mountains", "desert", etc.
export type PlanetGravity = string; // Ex: "1 standard", "0.9 standard", etc.

// Interface para filtros de planeta
export interface PlanetFilters {
  climate?: string;
  terrain?: string;
  population?: {
    min?: number;
    max?: number;
  };
  diameter?: {
    min?: number;
    max?: number;
  };
}

// Interface para dados de busca de planetas
export interface PlanetSearchResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}

// Interface para estatísticas de planeta formatadas
export interface PlanetStats {
  formattedPopulation: string;
  formattedDiameter: string;
  formattedGravity: string;
  formattedOrbitalPeriod: string;
  formattedRotationPeriod: string;
}