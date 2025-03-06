import React from 'react';
import { getTeamColor } from '../../utils/teamColors';

const TeamLogo = ({ teamCode }) => {
  return (
    <div 
      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
      style={{ backgroundColor: getTeamColor(teamCode) }}
    >
      {teamCode}
    </div>
  );
};

export default TeamLogo;