import React from 'react';
import { getTeamColor, getTeamLogo } from '../../utils/teamColors';

const TeamLogo = ({ teamCode }) => {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: getTeamColor(teamCode) }}
    >
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
        <img
          src={getTeamLogo(teamCode)}
          alt={`${teamCode} logo`}
          className="w-9 h-9 object-contain"
        />
      </div>
    </div>
  );
};

export default TeamLogo;
