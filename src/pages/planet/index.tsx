import React from 'react';
import { useParams } from "react-router";
import PlanetDetails from '../planet/detail';
import AllPlanets from "../planet/all";

export default function PlanetPage() {
  const { id } = useParams();
  if (id) {
    return <PlanetDetails id={id} />;
  }
  return <AllPlanets />;
}
