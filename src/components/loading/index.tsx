import { Box, CircularProgress, Typography } from "@mui/material";
import React from 'react';

type LoadingProps = {
  message: string;
}

export default function Loading({ message }: LoadingProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" py={8}>
    <Box textAlign="center">
      <CircularProgress sx={{ color: '#FACC15', mb: 2 }} />
      <Typography variant="body1" sx={{ color: '#D1D5DB' }}>
        {message}
      </Typography>
    </Box>
  </Box>
  );
}
