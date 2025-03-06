// src/components/TeamDetailsTab/EfficiencySummary.jsx
import React from 'react';

const EfficiencySummary = ({ teamData, summaryData }) => {
  // Get efficiency rank
  const efficiencyRank = summaryData
    .sort((a, b) => a.avgCostPerWin - b.avgCostPerWin)
    .findIndex(team => team.teamCode === teamData.teamCode) + 1;
  
  // Determine efficiency assessment
  let efficiencyAssessment = '';
  if (efficiencyRank <= 10) {
    efficiencyAssessment = `The ${teamData.team} demonstrate excellent spending efficiency, ranking in the top third of MLB teams.`;
  } else if (efficiencyRank <= 20) {
    efficiencyAssessment = `The ${teamData.team} show average spending efficiency, ranking in the middle third of MLB teams.`;
  } else {
    efficiencyAssessment = `The ${teamData.team} have below-average spending efficiency, ranking in the bottom third of MLB teams.`;
  }
  
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-gray-700">Efficiency Summary</h3>
      <div className="p-4 rounded-lg" style={{ backgroundColor: '#f9f9f9' }}>
        <h4 className="font-semibold mb-2">Cost Analysis</h4>
        <p className="text-sm">
          Over the 2021-2024 period, the {teamData.team} spent an average of
          <span className="font-bold"> ${(teamData.avgPayroll/1000000).toFixed(1)}M </span>
          per season, resulting in an average of
          <span className="font-bold"> {teamData.avgWins.toFixed(1)} wins </span>
          per season.
        </p>
        
        <p className="text-sm mt-2">
          This translates to a cost of
          <span className="font-bold"> ${(teamData.avgCostPerWin/1000000).toFixed(2)}M </span>
          per win, which ranks
          <span className="font-bold"> #{efficiencyRank} </span>
          in MLB in spending efficiency.
        </p>
        
        <h4 className="font-semibold mt-4 mb-2">Performance Outcomes</h4>
        <p className="text-sm">
          During this period, the team made the playoffs in
          <span className="font-bold"> {teamData.postseasonAppearances} </span>
          out of 4 seasons
          {teamData.worldSeriesWins > 0 ? ` and won ${teamData.worldSeriesWins} World Series.` : '.'}
        </p>
        
        <p className="text-sm mt-4 italic">
          {efficiencyAssessment}
        </p>
      </div>
    </div>
  );
};

export default EfficiencySummary;