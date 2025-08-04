
import { useEffect, useState } from "react";
import { fetchByUrl } from "../../service/api";
import './style.scss';
import Card from './index'

export default function PeopleCard(props: {name: string, homeworld: string, url: string, path: string}) {
  const [homeworld, setHomeworld] = useState<any>(null);

  useEffect(() => {  
    const fetchPeople = async () => {
      const data = await fetchByUrl(props.homeworld);
      setHomeworld(data);
      };
    fetchPeople();
  }, [props.homeworld]);

  return (
    <Card
      name={props.name}
      info={homeworld?.name || ''}
      url={props.url}
      path={props.path}
    />
  );
}
