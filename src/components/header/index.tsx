import { ArrowLeft, Public } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";
import React from 'react';

type HeaderProps = {
  title: string;
  description: string;
  backButton?: boolean;
  backButtonLink?: string;
}

export default function Header({ title, description, backButton = false, backButtonLink = '/planets' }: HeaderProps) {
  return (
    <Box textAlign="center" py={2}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
          <Public sx={{ fontSize: 32, color: 'white' }} />
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold',  fontFamily: 'Orbitron',
            color: 'black',
             '-webkit-text-stroke': '2px white',
             textShadow: '0 0 10px white'
          }}>
            {title.toUpperCase()}
          </Typography>
          <Public sx={{ fontSize: 32, color: 'white' }} />
        </Box>
        <Typography variant="h5" sx={{ color: 'yellow',
           maxWidth: '95%', mx: 'auto', fontFamily: 'Orbitron', }}>
          {description}
        </Typography>
        {backButton && (
          <Link to={backButtonLink}>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' } }}>
              <ArrowLeft sx={{ color: 'white' }} />
              Back to {backButtonLink.split('/')[1].charAt(0).toUpperCase() + backButtonLink.split('/')[1].slice(1)}
            </Button>
          </Link>
        )}
      </Box>
  );
}
