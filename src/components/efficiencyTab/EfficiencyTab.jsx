// src/components/EfficiencyTab/EfficiencyTab.jsx
import React from 'react';
import LeagueFilter from './LeagueFilter';
import SpendingEfficiencyChart from './SpendingEfficiencyChart';
import PerformanceMatrixChart from './PerformanceMatrixChart';
import EfficiencyDistributionChart from './EfficiencyDistributionChart';
import EfficiencyStats from './EfficiencyStats';
import TableauViz from '../common/TableauViz';
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
    <div className="grid gap-6">
           <TableauViz
    vizUrl="https://public.tableau.com/views/MLBSpendingvsWinsEfficiencyMatrix/SpendvsWins"
    height={550}
    />
    
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
        
        {/* <PerformanceMatrixChart 
          filteredData={filteredData} 
          avgLeaguePayroll={avgLeaguePayroll} 
          avgLeagueWins={avgLeagueWins} 
        /> */}
        
        {/* <EfficiencyDistributionChart quadrantSummary={quadrantSummary} /> */}
        
        <EfficiencyStats 
          avgLeaguePayroll={avgLeaguePayroll}
          avgLeagueWins={avgLeagueWins}
          avgLeagueCostPerWin={avgLeagueCostPerWin}
          sortedTeams={sortedTeams}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
       <TableauViz
    vizUrl="https://public.tableau.com/views/MLBSpendingWARbyPosition2024/LeagueAvgPositionalSpendvs_WAR"
    height={500}
    />
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <p>
        <b>Wins Above Replacement (WAR)</b> is a comprehensive statistic that estimates a baseball player's total value to their team. It calculates how many more wins a player contributes compared to a replacement-level player, who represents the caliber of talent readily available, such as minor leaguers or bench players.
A higher WAR indicates a greater positive impact on the team's success.
There are multiple frameworks of WAR frequently used in baseball analytics and discussion. We have decided to use Baseball Reference's version, which is one of the most popular and reported by ESPN in their MLB content.
        </p>
    </div>
    </div>

      <div className="grid grid-cols-1 gap-6">
      <TableauViz
    vizUrl="https://public.tableau.com/views/MLBPayrollAllocationvsWins/PayrollAllocationvsWins"
    height={500}
    />
    </div>
    </div>
  );
};

export default EfficiencyTab;