import { dataUtils } from "../../service/api";

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
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Population: {dataUtils.formatPopulation(props.population)}</p>
    </div>
  );
}
