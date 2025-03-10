// src/components/OverviewTab/OverviewTab.jsx
import React from 'react';
import TeamPayrollChart from './TeamPayrollChart';
import SpendingVsPerformanceChart from './SpendingVsPerformanceChart';
import DivisionComparisonChart from './DivisionComparisonChart';
import LeagueSpendingChart from './LeagueSpendingChart';
import TableauViz from '../common/TableauViz';
import _ from 'lodash';

const OverviewTab = ({ yearlyData, selectedYear }) => {
  if (!yearlyData[selectedYear]) return <div>No data available for selected year</div>;
  
  const currentYearData = yearlyData[selectedYear];
  
  // Calculate league spending
  const alTeams = currentYearData.filter(team => team["League (National or American)"] === "AL");
  const nlTeams = currentYearData.filter(team => team["League (National or American)"] === "NL");
  
  const alTotalSpending = _.sumBy(alTeams, "Total Payroll Allocation") / 1000000;
  const nlTotalSpending = _.sumBy(nlTeams, "Total Payroll Allocation") / 1000000;
  
  const leagueSpendingData = [
    { name: "American League", value: alTotalSpending, color: "#4e79a7" },
    { name: "National League", value: nlTotalSpending, color: "#f28e2c" },
  ];
  
  // Group teams by division for the bar chart
  const divisionData = _(currentYearData)
    .groupBy('Divison')
    .map((teams, division) => ({
      division: division,
      avgPayroll: _.meanBy(teams, "Total Payroll Allocation") / 1000000,
      avgWins: _.meanBy(teams, "Wins"),
    }))
    .value()
    .sort((a, b) => a.division.localeCompare(b.division));
  
  const sortedData = [...currentYearData].sort((a, b) => 
    b["Total Payroll Allocation"] - a["Total Payroll Allocation"]
  );
  
  return (
    <div>
    <TableauViz
    vizUrl="https://public.tableau.com/views/TeamSuccessSankeyChart/Sheet1"
    title="MLB Team Performance Metrics"
    height={650}
    />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 
      <TeamPayrollChart data={sortedData} />
      <SpendingVsPerformanceChart data={currentYearData} />
      {/* <DivisionComparisonChart data={divisionData} /> */}
      {/* <LeagueSpendingChart 
        data={leagueSpendingData} 
        totalSpending={alTotalSpending + nlTotalSpending} 
      /> */}
    </div>
    <TableauViz
    vizUrl="https://public.tableau.com/views/ParallelCoordinatesVisualization/Sheet1"
    title="MLB Team Performance Metrics"
    height={500}
    />
    </div>

  );
};

export default OverviewTab;