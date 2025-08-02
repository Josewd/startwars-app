import { Link } from 'react-router';
import './style.scss';
import { extractIdFromUrl } from "../../service/api";

export function BulletLink({ title, link }: { title: string, link: string }) {
  return (
    <Link key={title} to={link} className="bullet-link">
      <div>{title}</div>
    </Link>
  );
}

export default function BulletLinkArray({ data, title, link }: {data: { name?: string, title: string, url?: string }[], title: string, link?: string}) {
  return (
    <>
      {data && (
        <>
          <h2>{title}</h2>
          <div className="bullet-link-array">
            {data.map((item) => (
              <BulletLink key={item.name || item.title || ''} title={item.name || item.title || ''} link={`${link}/${extractIdFromUrl(item.url || '')}`} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
