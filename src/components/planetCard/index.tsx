import { useEffect } from "react";
import { dataUtils, extractIdFromUrl } from "../../service/api";
import './style.scss';
import { getRandomColor } from "../../utils";
import { Link, useNavigate } from "react-router";

type PlanetCardProps = {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
};


export default function PlanetCard(props: PlanetCardProps) {
  useEffect(() => {
  document.querySelectorAll('.planet-card').forEach((element: any ) => {
    element.style.setProperty('--random-color', getRandomColor());
    element.style.setProperty('--random-color-2', getRandomColor());
  });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="planet-card" onClick={() => navigate(`/planet/${extractIdFromUrl(props.url || '')}`)}>
      <h1 className="planet-card-title">{props.name}</h1>
      <p className="planet-card-population">Population: {dataUtils.formatPopulation(props.population)}</p>
    </div>
  );
}
