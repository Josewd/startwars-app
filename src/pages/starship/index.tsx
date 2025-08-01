import React from 'react';
import { useParams } from "react-router";
import StarshipDetails from './detail';
import AllStarships from './all';

export default function StarshipPage() {
  const { id } = useParams();
  if (id) {
    return <StarshipDetails id={id} />;
  }
  return <AllStarships />;
}
