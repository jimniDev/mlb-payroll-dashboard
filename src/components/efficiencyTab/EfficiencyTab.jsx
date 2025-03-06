// src/components/EfficiencyTab/EfficiencyTab.jsx
import React from 'react';
import LeagueFilter from './LeagueFilter';
import SpendingEfficiencyChart from './SpendingEfficiencyChart';
import PerformanceMatrixChart from './PerformanceMatrixChart';
import EfficiencyDistributionChart from './EfficiencyDistributionChart';
import EfficiencyStats from './EfficiencyStats';
import _ from 'lodash';

const EfficiencyTab = ({ summaryData, leagueFilter, setLeagueFilter, data }) => {
  // Filter by league if needed
  const filteredData = leagueFilter === 'All' 
    ? summaryData 
    : summaryData.filter(team => team.league === leagueFilter);
  
  // Sort by cost efficiency
  const sortedTeams = [...filteredData].sort((a, b) => a.avgCostPerWin - b.avgCostPerWin);
  
  // Calculate efficiency stats
  const avgLeaguePayroll = _.meanBy(filteredData, 'avgPayroll') / 1000000;
  const avgLeagueWins = _.meanBy(filteredData, 'avgWins');
  const avgLeagueCostPerWin = _.meanBy(filteredData, 'avgCostPerWin') / 1000000;
  
  // Create quadrant data
  const quadrantData = filteredData.map(team => {
    let quadrant = '';
    
    if (team.avgWins > avgLeagueWins) {
      if (team.avgPayroll / 1000000 > avgLeaguePayroll) {
        quadrant = 'High Spend / High Wins';
      } else {
        quadrant = 'Low Spend / High Wins';
      }
    } else {
      if (team.avgPayroll / 1000000 > avgLeaguePayroll) {
        quadrant = 'High Spend / Low Wins';
      } else {
        quadrant = 'Low Spend / Low Wins';
      }
    }
    
    return {
      ...team,
      quadrant
    };
  });
  
  // Count teams in each quadrant
  const quadrantCounts = _.countBy(quadrantData, 'quadrant');
  
  const quadrantSummary = [
    { name: 'High Spend / High Wins', value: quadrantCounts['High Spend / High Wins'] || 0, color: '#59a14f' },
    { name: 'Low Spend / High Wins', value: quadrantCounts['Low Spend / High Wins'] || 0, color: '#4e79a7' },
    { name: 'High Spend / Low Wins', value: quadrantCounts['High Spend / Low Wins'] || 0, color: '#e15759' },
    { name: 'Low Spend / Low Wins', value: quadrantCounts['Low Spend / Low Wins'] || 0, color: '#f28e2c' }
  ];
  
  return (
    <div>
      <LeagueFilter 
        leagueFilter={leagueFilter} 
        setLeagueFilter={setLeagueFilter}
        filteredCount={filteredData.length}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingEfficiencyChart 
          sortedTeams={sortedTeams} 
          avgLeagueCostPerWin={avgLeagueCostPerWin} 
        />
        
        <PerformanceMatrixChart 
          filteredData={filteredData} 
          avgLeaguePayroll={avgLeaguePayroll} 
          avgLeagueWins={avgLeagueWins} 
        />
        
        <EfficiencyDistributionChart quadrantSummary={quadrantSummary} />
        
        <EfficiencyStats 
          avgLeaguePayroll={avgLeaguePayroll}
          avgLeagueWins={avgLeagueWins}
          avgLeagueCostPerWin={avgLeagueCostPerWin}
          sortedTeams={sortedTeams}
        />
      </div>
    </div>
  );
};

export default EfficiencyTab;