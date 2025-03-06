// src/components/common/DashboardHeader.jsx
import React from 'react';

const DashboardHeader = () => {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">MLB Team Spending Efficiency Dashboard</h1>
      <p className="text-gray-600">Analyzing the relationship between payroll allocation and team performance (2021-2024)</p>
    </header>
  );
};

export default DashboardHeader;