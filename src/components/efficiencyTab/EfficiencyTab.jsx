// src/components/EfficiencyTab/EfficiencyTab.jsx
import React, { useState } from 'react';
import EfficiencyChartsContainer from './EfficiencyChartsContainer';
import TableauViz from '../common/TableauViz';
import _ from 'lodash';

const EfficiencyTab = ({ summaryData, data }) => {
  return (
    <div className="grid gap-6">
      <TableauViz
        vizUrl="https://public.tableau.com/views/MLBSpendingvsWinsEfficiencyMatrix/SpendvsWins"
        height={550}
      />

      {/* Efficiency charts with their own filter in a separate component */}
      <EfficiencyChartsContainer summaryData={summaryData} />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <TableauViz
          vizUrl="https://public.tableau.com/views/MLBSpendingWARbyPosition2024/LeagueAvgPositionalSpendvs_WAR"
          height={500}
        />
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <p>
            <b>Wins Above Replacement (WAR)</b> is a comprehensive statistic that estimates a
            baseball player's total value to their team. It calculates how many more wins a player
            contributes compared to a replacement-level player, who represents the caliber of talent
            readily available, such as minor leaguers or bench players. A higher WAR indicates a
            greater positive impact on the team's success. There are multiple frameworks of WAR
            frequently used in baseball analytics and discussion. We have decided to use Baseball
            Reference's version, which is one of the most popular and reported by ESPN in their MLB
            content.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <TableauViz
            vizUrl="https://public.tableau.com/views/MLBPayrollAllocationvsWins/PayrollAllocationvsWins"
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default EfficiencyTab;
