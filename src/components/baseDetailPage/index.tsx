import React from 'react';
import Table from "../table";
import './style.scss';

type BaseDetailPageProps = {  
  item: any;
  rows: any;
  bulletLinks: any;
}

export default function BaseDetailPage({ item, rows, bulletLinks }: BaseDetailPageProps) {
  return (
    <div className="details-container">
    <div className="details-content">
      <div className="details-details">
        <h2>Details</h2>
        {item && (
          <Table
            data={item}
            rows={rows}
          />)}
      </div>
    </div>
      <div className="details-related">
        {bulletLinks}
      </div>
  </div>
  );
}
