// src/components/EfficiencyTab/EfficiencyStats.jsx
import React from 'react';

const EfficiencyStats = ({ avgLeaguePayroll, avgLeagueWins, avgLeagueCostPerWin, sortedTeams }) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Avg Annual Payroll</p>
          <p className="text-xl font-bold">${avgLeaguePayroll.toFixed(1)}M</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Avg Wins</p>
          <p className="text-xl font-bold">{avgLeagueWins.toFixed(1)}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Avg Cost per Win</p>
          <p className="text-xl font-bold">${avgLeagueCostPerWin.toFixed(2)}M</p>
        </div>
      </div>
      <div className="p-3 bg-gray-50 rounded-lg">
        <h4 className="text-md font-semibold mb-2">Lowest Cost Per Win Teams</h4>
        <div className="space-y-2">
          {sortedTeams.slice(0, 3).map((team, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-mono bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2">
                  {index + 1}
                </span>
                <span>{team.team}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold">
                  ${(team.avgCostPerWin / 1000000).toFixed(2)}M/win
                </span>
                <span className="block text-xs text-gray-500">
                  {Math.round(team.avgWins)} wins/season
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EfficiencyStats;
