import React from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography,
  Divider,
  Drawer,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Public, 
  Person, 
  RocketLaunch, 
  Pets,
  Movie,
  CarRental
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router';

const routes = [
  {
    path: '/planets',
    label: 'Planets',
    icon: <Public />
  },
  {
    path: '/people',
    label: 'People',
    icon: <Person />
  },
  {
    path: '/starships',
    label: 'Starships',
    icon: <RocketLaunch />
  }
];

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sidebarContent = (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRight: '2px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header do Sidebar */}
      <Box 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: 'Orbitron',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            mb: 1
          }}
        >
          STAR WARS
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'yellow',
            fontFamily: 'Orbitron',
            textTransform: 'uppercase',
            letterSpacing: 1
          }}
        >
          Explorer
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, py: 2 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            px: 3, 
            pb: 1, 
            color: '#9CA3AF',
            fontFamily: 'Orbitron',
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontSize: '0.75rem'
          }}
        >
          Navigation
        </Typography>
        
        <List sx={{ px: 1 }}>
          {routes.map((route) => {
            const isActive = location.pathname === route.path;
            
            return (
              <ListItem key={route.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={route.path}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    backgroundColor: isActive ? 'rgba(255, 255, 0, 0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(255, 255, 0, 0.3)' : '1px solid transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      color: isActive ? 'yellow' : 'white',
                      minWidth: 40
                    }}
                  >
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={route.label}
                    primaryTypographyProps={{
                      fontFamily: 'Orbitron',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 'bold' : 'normal',
                      color: isActive ? 'yellow' : 'white'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Seção de Extras */}
        <Typography 
          variant="subtitle2" 
          sx={{ 
            px: 3, 
            pb: 1, 
            color: '#9CA3AF',
            fontFamily: 'Orbitron',
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontSize: '0.75rem'
          }}
        >
          Recursos
        </Typography>

        <List sx={{ px: 1 }}>
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to="/films"
              sx={{
                borderRadius: 2,
                mx: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <Movie />
              </ListItemIcon>
              <ListItemText 
                primary="Films"
                primaryTypographyProps={{
                  fontFamily: 'Orbitron',
                  fontSize: '0.9rem',
                  color: 'white'
                }}
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to="/species"
              sx={{
                borderRadius: 2,
                mx: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <Pets />
              </ListItemIcon>
              <ListItemText 
                primary="Species"
                primaryTypographyProps={{
                  fontFamily: 'Orbitron',
                  fontSize: '0.9rem',
                  color: 'white'
                }}
              />
            </ListItemButton>
          </ListItem>
                 
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to="/vehicles"
              sx={{
                borderRadius: 2,
                mx: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <CarRental />
              </ListItemIcon>
              <ListItemText 
                primary="Vehicles"
                primaryTypographyProps={{
                  fontFamily: 'Orbitron',
                  fontSize: '0.9rem',
                  color: 'white'
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Footer */}
      <Box 
        sx={{ 
          p: 2, 
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}
      >
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#6B7280',
            fontFamily: 'Orbitron',
            fontSize: '0.7rem'
          }}
        >
          Que a Força esteja com você
        </Typography>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            backgroundColor: 'transparent',
            border: 'none'
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      {sidebarContent}
    </Box>
  );
}