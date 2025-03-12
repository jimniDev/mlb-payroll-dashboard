// src/components/EfficiencyTab/SpendingEfficiencyChart.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';

const SpendingEfficiencyChart = ({ sortedTeams, avgLeagueCostPerWin }) => {
  // Enhance the data to include win information
  const enhancedData = sortedTeams.map((team) => ({
    ...team,
    // Display win totals along with team code for more context
    displayName: `${team.teamCode}`,
  }));

  // Custom tooltip to format exactly as requested
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const team = enhancedData.find((item) => item.displayName === label);

      return (
        <div className="custom-tooltip bg-white p-3 border border-gray-200 shadow-sm rounded">
          <p className="font-bold">{team?.team}</p>
          <p className="text-sm">Cost per win: ${(team?.avgCostPerWin / 1000000).toFixed(2)}M</p>
          <p className="text-sm">{Math.round(team?.avgWins)} wins/season</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={enhancedData}
          margin={{ top: 5, right: 20, left: 20, bottom: 20 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            type="number"
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            label={{
              value: 'Cost per Win (Millions $)',
              position: 'bottom',
              offset: 0,
              fill: '#666',
            }}
            stroke="#666"
          />
          <YAxis
            type="category"
            dataKey="displayName"
            tick={{ fontSize: 12 }}
            width={70}
            stroke="#666"
          />
          <Tooltip content={<CustomTooltip />} />

          {/* Add Reference Line for League Average */}
          <ReferenceLine
            x={avgLeagueCostPerWin * 1000000}
            stroke="#666"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            label={{
              value: 'League Avg',
              position: 'insideTopLeft',
              fill: '#666',
              fontSize: 11,
            }}
          />

          <Bar dataKey="avgCostPerWin" name="Cost per Win" fill="#4e79a7">
            {enhancedData.map((entry, index) => {
              // Calculate team's cost in same units as avgLeagueCostPerWin (millions)
              const teamCostInMillions = entry.avgCostPerWin / 1000000;

              // Determine color based on efficiency
              let color;

              if (teamCostInMillions < avgLeagueCostPerWin * 0.8)
                color = '#59a14f'; // Low cost per win
              else if (teamCostInMillions > avgLeagueCostPerWin * 1.2)
                color = '#e15759'; // High cost per win
              else color = '#4e79a7'; // Average cost per win

              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center text-xs text-gray-500 mt-2">
        <span className="inline-block mr-3">
          <span className="inline-block w-3 h-3 bg-green-600 mr-1"></span>Low Cost per Win
        </span>
        <span className="inline-block mr-3">
          <span className="inline-block w-3 h-3 mr-1" style={{ backgroundColor: '#4e79a7' }}></span>
          Average Cost per Win
        </span>
        <span className="inline-block">
          <span className="inline-block w-3 h-3 bg-red-500 mr-1"></span>High Cost per Win
        </span>
      </div>
    </div>
  );
};

export default SpendingEfficiencyChart;
