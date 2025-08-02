import { useParams } from "react-router";
import PeopleDetails from './detail';
import AllPeople from './all';

export default function PeoplePage() {
  const { id } = useParams();
  if (id) {
    return <PeopleDetails id={id} />;
  }
  return <AllPeople />;
}
    