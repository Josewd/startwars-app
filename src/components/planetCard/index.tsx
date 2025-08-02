import { useEffect } from "react";
import { extractIdFromUrl } from "../../service/api";
import './style.scss';
import { dataUtils, getRandomColor } from "../../utils";
import { useNavigate } from "react-router";
import { Planet } from "../../types";

export default function PlanetCard(props: Planet) {
  useEffect(() => {
  document.querySelectorAll('.planet-card').forEach((element: any ) => {
    element.style.setProperty('--random-color', getRandomColor());
    element.style.setProperty('--random-color-2', getRandomColor());
  });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="planet-card" onClick={() => navigate(`/planet/${extractIdFromUrl(props.url || '')}`)}>
      <div className="planet" />
      <div className="planet-card-content">
        <h1 className="planet-card-title">{props.name}</h1>
        <p className="planet-card-population">Population: {dataUtils.formatPopulation(props.population)}</p>
      </div>
    </div>
  );
}
