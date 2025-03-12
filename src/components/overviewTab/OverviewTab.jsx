// src/components/OverviewTab/OverviewTab.jsx
import React from 'react';
import TeamPayrollChart from './TeamPayrollChart';
import SpendingVsPerformanceChart from './SpendingVsPerformanceChart';
// import DivisionComparisonChart from './DivisionComparisonChart';
// import LeagueSpendingChart from './LeagueSpendingChart';
import TableauViz from '../common/TableauViz';
import _ from 'lodash';
import BaseballFieldDiagram from './BaseballFieldDiagram';

const OverviewTab = ({ yearlyData }) => {
  // Get available years for filters
  const availableYears = Object.keys(yearlyData)
    .map((year) => parseInt(year))
    .sort();

  if (availableYears.length === 0) return <div>No data available</div>;

  return (
    <div className="grid gap-6">
      <TableauViz
        vizUrl="https://public.tableau.com/views/TeamSuccessSankeyChart/Sheet1"
        height={650}
      />
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-4">
        <div className="bg-white p-4 rounded shadow-sm lg:col-span-3">
          <BaseballFieldDiagram />
        </div>
        <div className="lg:col-span-7">
          <TableauViz
            vizUrl="https://public.tableau.com/views/ParallelCoordinatesVisualization/Sheet1"
            height={500}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamPayrollChart yearlyData={yearlyData} availableYears={availableYears} />
        <SpendingVsPerformanceChart yearlyData={yearlyData} availableYears={availableYears} />
      </div>
    </div>
  );
};

export default OverviewTab;
