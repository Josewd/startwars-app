import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Box, useMediaQuery, useTheme } from '@mui/material';
import PlanetPage from "./pages/planet";
import PeoplePage from "./pages/people";
import FilmDetails from "./pages/Film";
import SpecieDetails from "./pages/specie";
import StarshipPage from "./pages/starship";
import Sidebar from "./components/sidebar";
import MenuButton from "./components/menuButton";
import AllFilms from './pages/Film/all';
import AllSpecies from './pages/specie/all';
import AllVehicles from "./pages/vehicle/all";
import VehicleDetails from "./pages/vehicle";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (  
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        {isMobile && <MenuButton onClick={toggleSidebar} />}
        <Sidebar 
          isOpen={isMobile ? isSidebarOpen : true} 
          onClose={closeSidebar} 
        />
        <Box 
          component="main" 
          sx={{ 
            marginLeft: { xs: 0, md: '280px' }, 
            width: { xs: '100%', md: 'calc(100% - 280px)' },
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/planets" replace />} />
            <Route path="/planets" element={<PlanetPage />} />  
            <Route path="/planet/:id" element={<PlanetPage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/person/:id" element={<PeoplePage />} />
            <Route path="/film/:id" element={<FilmDetails />} />
            <Route path="/films" element={<AllFilms />} />
            <Route path="/starships" element={<StarshipPage />} />
            <Route path="/starship/:id" element={<StarshipPage />} />
            <Route path="/species/:id" element={<SpecieDetails />} />
            <Route path="/species" element={<AllSpecies />} />
            <Route path="/specie/:id" element={<SpecieDetails />} />
            <Route path="/vehicles" element={<AllVehicles />} />
            <Route path="/vehicle/:id" element={<VehicleDetails />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
