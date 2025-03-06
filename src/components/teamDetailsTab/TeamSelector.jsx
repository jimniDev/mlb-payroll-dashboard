// src/components/TeamDetailsTab/TeamSelector.jsx
import React from 'react';
import { getTeamColor } from '../../utils/teamColors';

const TeamSelector = ({ summaryData, selectedTeam, setSelectedTeam }) => {
  const teamOptions = summaryData
    .sort((a, b) => a.team.localeCompare(b.team))
    .map(team => ({
      code: team.teamCode,
      name: team.team,
      color: getTeamColor(team.teamCode)
    }));
  
  return (
    <div className="flex justify-center mb-4">
      <select 
        className="border rounded px-4 py-2 bg-white"
        value={selectedTeam || ''}
        onChange={(e) => setSelectedTeam(e.target.value)}
        style={{ minWidth: "250px" }}
      >
        <option value="">Select a team</option>
        {teamOptions.map(team => (
          <option 
            key={team.code} 
            value={team.code} 
            style={{ color: team.color, fontWeight: "bold" }}
          >
            {team.code} - {team.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamSelector;