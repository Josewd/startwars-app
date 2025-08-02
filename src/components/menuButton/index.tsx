import React from 'react';
import { IconButton, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';

type MenuButtonProps = {
  onClick: () => void;
}

export default function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        left: 16,
        zIndex: 1300,
        display: { xs: 'block', md: 'none' }
      }}
    >
      <IconButton
        onClick={onClick}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }
        }}
      >
        <Menu />
      </IconButton>
    </Box>
  );
}