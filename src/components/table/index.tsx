import React from 'react';
import './style.scss';

export default function Table({ data, rows }: { data: any, rows: { key: string, render?: (value: string) => string }[] }) {
  const getLabel = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
  };
  return (
    <>
      {rows.map((row) => (
        <div key={row.key}>
          <span className="table-label">{getLabel(row.key)}:</span>
          <span className="table-value">{row.render ? row.render(data[row.key]) : data[row.key]}</span>
        </div>
      ))}
    </>
  );
}
