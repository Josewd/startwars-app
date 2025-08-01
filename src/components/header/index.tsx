import { Public } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from 'react';

type HeaderProps = {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <Box textAlign="center" py={2}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
          <Public sx={{ fontSize: 32, color: '#60A5FA' }} />
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Orbitron' }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#D1D5DB', maxWidth: '768px', mx: 'auto', fontFamily: 'Orbitron' }}>
          {description}
        </Typography>
      </Box>
  );
}
