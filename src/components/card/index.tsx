
import { extractIdFromUrl } from "../../service/api";
import './style.scss';
import { useNavigate } from "react-router";

export default function Card(props: {name: string, info: string, url: string, path: string}) {

  const navigate = useNavigate();

  return (
      <div className="card" onClick={() => navigate(`${props.path}/${extractIdFromUrl(props.url || '')}`)}>
        <div className="card-title">{props.name}</div>
        <div className="card-info">{props.info}</div>
      </div>
  );
}
