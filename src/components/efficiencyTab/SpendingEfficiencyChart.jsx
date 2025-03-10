// src/components/EfficiencyTab/SpendingEfficiencyChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SpendingEfficiencyChart = ({ sortedTeams, avgLeagueCostPerWin }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-gray-700">Team Spending Efficiency (2021-2024)</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedTeams}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              type="number" 
              tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`} 
              label={{ value: 'Avg Cost per Win', position: 'bottom', offset: 0, fill: "#666" }}
              stroke="#666"
            />
            <YAxis 
              type="category" 
              dataKey="teamCode" 
              tick={{ fontSize: 12 }}
              width={40}
              stroke="#666"
            />
            <Tooltip 
              formatter={(value) => `$${(value/1000000).toFixed(2)}M`}
              labelFormatter={(value) => {
                const team = sortedTeams.find(item => item.teamCode === value);
                return team ? team.team : value;
              }}
              contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }}
            />
            <Bar 
              dataKey="avgCostPerWin" 
              name="Average Cost per Win"
              fill="#4e79a7"
            >
              {sortedTeams.map((entry, index) => {
                // Color based on efficiency
                let color;
                if (entry.avgCostPerWin < avgLeagueCostPerWin * 0.8) color = "#59a14f"; // Very efficient
                else if (entry.avgCostPerWin > avgLeagueCostPerWin * 1.2) color = "#e15759"; // Very inefficient
                else color = "#4e79a7"; // Average
                
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-gray-500 mt-2">
        <span className="inline-block mr-3"><span className="inline-block w-3 h-3 bg-green-600 mr-1"></span>Very Efficient</span>
        <span className="inline-block mr-3"><span className="inline-block w-3 h-3 mr-1" style={{backgroundColor: "#4e79a7"}}></span>Average</span>
        <span className="inline-block"><span className="inline-block w-3 h-3 bg-red-500 mr-1"></span>Inefficient</span>
      </div>
    </div>
  );
};

export default SpendingEfficiencyChart;