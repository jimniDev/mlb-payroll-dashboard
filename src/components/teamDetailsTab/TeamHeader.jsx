// src/components/TeamDetailsTab/TeamHeader.jsx
import React from 'react';
import TeamLogo from '../common/TeamLogo';
import { getTeamColor } from '../../utils/teamColors';

const TeamHeader = ({ teamData }) => {
  return (
    <div className="bg-white p-6 rounded shadow-sm mb-6">
      <div className="flex items-center mb-4">
        <TeamLogo teamCode={teamData.teamCode} />
        <div className="ml-4">
          <h3 className="text-xl font-bold" style={{ color: getTeamColor(teamData.teamCode) }}>
            {teamData.team}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-1">📅</span>
            <span>Data from 2021-2024</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
        <div>
          <p className="text-sm text-gray-600">League/Division</p>
          <p className="font-semibold">{teamData.league} {teamData.division.split(' ')[1]}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Avg Annual Payroll</p>
          <p className="font-semibold">${(teamData.avgPayroll/1000000).toFixed(1)}M</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Avg Wins</p>
          <p className="font-semibold">{teamData.avgWins.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Avg Cost per Win</p>
          <p className="font-semibold">${(teamData.avgCostPerWin/1000000).toFixed(2)}M</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 flex items-center">
            <span className="mr-1">📊</span> Playoff Appearances
          </p>
          <p className="font-semibold">{teamData.postseasonAppearances} of 4 seasons</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 flex items-center">
            <span className="mr-1">🏆</span> World Series Wins
          </p>
          <p className="font-semibold">{teamData.worldSeriesWins}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;