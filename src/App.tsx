import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router";
import PlanetsPage from "./pages/planets";
import PlanetDetails from "./pages/planet";
import PersonDetails from "./pages/person";
import PeoplePage from "./pages/people";
import FilmDetails from "./pages/Film";
import StarshipsPage from "./pages/starships";
import StarshipDetails from "./pages/starship";

export default function App() {
  return (  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlanetsPage />} />
        <Route path="/planet/:id" element={<PlanetDetails />} />
        <Route path="/person/:id" element={<PersonDetails />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/film/:id" element={<FilmDetails />} />
        <Route path="/starships" element={<StarshipsPage />} />
        <Route path="/starship/:id" element={<StarshipDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
