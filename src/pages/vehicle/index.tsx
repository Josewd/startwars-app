import React from 'react';
import { useParams } from "react-router";
import VehicleDetails from './detail';
import AllVehicles from './all';

export default function StarshipPage() {
  const { id } = useParams();
  if (id) {
    return <VehicleDetails id={id} />;
  }
  return <AllVehicles />;
}
