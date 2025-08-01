import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router";
import PlanetsPage from "./pages/planets";
import PlanetDetails from "./pages/planet";

export default function App() {
  return (  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlanetsPage />} />
        <Route path="/planet/:id" element={<PlanetDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
