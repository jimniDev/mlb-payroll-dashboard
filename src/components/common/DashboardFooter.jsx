// src/components/common/DashboardFooter.jsx
import React from 'react';

const DashboardFooter = () => {
  return (
    <footer className="bg-white p-4 rounded shadow-sm text-sm text-gray-500">
      <p className="mb-1">Data source: MLB team statistics 2021-2024</p>
      <p className="font-medium">User Guide:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
        <div className="p-2 bg-gray-50 rounded">
          <p className="font-medium">Casual Fans</p>
          <p>Overview tab shows team payrolls and basic performance comparisons</p>
        </div>
        <div className="p-2 bg-gray-50 rounded">
          <p className="font-medium">Engaged Fans</p>
          <p>Efficiency Analysis tab compares spending efficiency across teams</p>
        </div>
        <div className="p-2 bg-gray-50 rounded">
          <p className="font-medium">Analytics-Driven Fans</p>
          <p>Team Details tab offers deep insights into individual team spending patterns</p>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;