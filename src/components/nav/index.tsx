import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { UnfoldMore as UnfoldMoreIcon, KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';

type NavigationProps = {
  handleSort: (field: string) => void;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  links: {
    name: string;
    onClick: () => void;
  }[];
}

export default function Navigation({ handleSort, sortField, sortDirection, links }: NavigationProps) {
  const getSortIcon = (field: string) => {
    if (sortField !== field) return <UnfoldMoreIcon sx={{ fontSize: 16 }} />;
    return sortDirection === 'asc' ? <KeyboardArrowUpIcon sx={{ fontSize: 16 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />;
  };
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body2" sx={{ color: '#9CA3AF' }}>Sort by:</Typography>
      {links.map((link) => (
        <Button
          variant="outlined"
          size="small"
          onClick={link.onClick}
          endIcon={getSortIcon(link.name)}
        >
          {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
        </Button>
      ))}
    </Box>
  );
}
