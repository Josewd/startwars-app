import React from 'react';
import './style.scss';

export default function Table({ data, rows }: { data: any, rows: { value: string, render?: (value: string) => string }[] }) {
  return (
    <>
      {rows.map((row) => (
        <div key={row.value}>
          <span className="table-label">{row.value}:</span>
          <span className="table-value">{row.render ? row.render(data[row.value]) : data[row.value]}</span>
        </div>
      ))}
    </>
  );
}
