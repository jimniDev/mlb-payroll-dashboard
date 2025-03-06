// src/components/TeamDetailsTab/SpendingRankChart.jsx
import React from 'react';

const SpendingRankChart = ({ teamData, allData }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-gray-700">Spending Rank by Year</h3>
      <div className="h-48">
        <div className="grid grid-cols-4 gap-2 h-full">
          {teamData.payrollHistory.map((yearData, index) => {
            // Get all teams for that year
            const yearTeams = allData.filter(team => team.Year === yearData.year);
            // Sort by payroll
            const sortedYearTeams = yearTeams.sort((a, b) => b["Total Payroll Allocation"] - a["Total Payroll Allocation"]);
            // Find rank
            const rank = sortedYearTeams.findIndex(team => team.Team === teamData.teamCode) + 1;
            const percentile = Math.round((30 - rank) / 30 * 100);
            
            return (
              <div key={index} className="flex flex-col items-center justify-center h-full">
                <div className="text-lg font-bold">{yearData.year}</div>
                <div className="text-3xl font-bold mt-2">#{rank}</div>
                <div 
                  className="text-sm font-semibold mt-1 px-2 py-1 rounded"
                  style={{ 
                    backgroundColor: percentile > 66 ? '#59a14f' : percentile > 33 ? '#edc949' : '#e15759',
                    color: 'white'
                  }}
                >
                  {percentile > 66 ? 'Top' : percentile > 33 ? 'Mid' : 'Bottom'} Tier
                </div>
                <div className="text-xs text-gray-500 mt-1">${Math.round(yearData.payroll)}M</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpendingRankChart;