import { SortDirection } from "../types";

export  function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 50%)`;
}

// Utility functions for data processing
export const dataUtils = {
  // Sort array by a specific field
  sortBy(array: any[], field: string, direction: SortDirection = 'asc') {
    return [...array].sort((a, b) => {
      let aVal = a[field];
      let bVal = b[field];
      
      // Handle numeric values
      if (!isNaN(aVal) && !isNaN(bVal)) {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }
      
      // Handle "unknown" values
      if (aVal === 'unknown') aVal = direction === 'asc' ? Infinity : -Infinity;
      if (bVal === 'unknown') bVal = direction === 'asc' ? Infinity : -Infinity;
      
      if (direction === 'asc') {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
    });
  },
  
  // Filter array by search term
  filterBySearch(array: any[], searchTerm: string, searchFields: string[]) {
    if (!searchTerm) return array;
    
    const term = searchTerm.toLowerCase();
    return array.filter(item => 
      searchFields.some(field => 
        item[field] && item[field].toString().toLowerCase().includes(term)
      )
    );
  },
  formatDiameter(diameter: string): string {
    if (!diameter || diameter === 'unknown' || diameter === '0') return 'Unknown';
    const num = parseInt(diameter);
    return isNaN(num) ? diameter : `${num.toLocaleString()} km`;
  },

  // Função para formatar período
  formatPeriod(period: string, unit: string): string {
    if (!period || period === 'unknown') return 'Unknown';
    return `${period} ${unit}`;
  },
  
  // Format population numbers
  formatPopulation(population: string) {
    if (!population || population === 'unknown') return 'Unknown';
    
    const num = parseInt(population);
    if (isNaN(num)) return population;
    
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    
    return num.toLocaleString();
  }
};