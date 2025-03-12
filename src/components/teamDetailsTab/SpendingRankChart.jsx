// src/components/TeamDetailsTab/SpendingRankChart.jsx
import React from 'react';

const SpendingRankChart = ({ teamData, allData }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-gray-700">Spending Rank by Year</h3>

      <div className="h-48 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-2 w-full">
          {teamData.payrollHistory.map((yearData, index) => {
            // Get all teams for that year
            const yearTeams = allData.filter((team) => team.Year === yearData.year);
            // Sort by payroll
            const sortedYearTeams = yearTeams.sort(
              (a, b) => b['Total Payroll Allocation'] - a['Total Payroll Allocation']
            );
            // Find rank
            const rank = sortedYearTeams.findIndex((team) => team.Team === teamData.teamCode) + 1;

            // Determine tier color based on rank
            let tierColor, tierLabel;
            if (rank <= 10) {
              tierColor = '#59a14f'; // green
              tierLabel = 'Top Tier';
            } else if (rank <= 20) {
              tierColor = '#edc949'; // yellow
              tierLabel = 'Mid Tier';
            } else {
              tierColor = '#e15759'; // red
              tierLabel = 'Bottom Tier';
            }

            return (
              <div key={index} className="flex flex-col items-center justify-center">
                <div className="text-lg font-bold">{yearData.year}</div>
                <div className="text-3xl font-bold mt-2">#{rank}</div>
                <div
                  className="text-sm font-semibold mt-1 px-2 py-1 rounded text-white"
                  style={{ backgroundColor: tierColor }}
                >
                  {tierLabel}
                </div>
                <div className="text-xs text-gray-500 mt-1">${Math.round(yearData.payroll)}M</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend at the bottom */}
      <div className="flex justify-center mt-4 text-sm">
        <div className="flex items-center mx-2">
          <div className="w-3 h-3 rounded-full bg-green-600 mr-1"></div>
          <span>Top Tier (1-10)</span>
        </div>
        <div className="flex items-center mx-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
          <span>Mid Tier (11-20)</span>
        </div>
        <div className="flex items-center mx-2">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
          <span>Bottom Tier (21-30)</span>
        </div>
      </div>
    </div>
  );
};

export default SpendingRankChart;
