// src/components/EfficiencyTab/PerformanceMatrixChart.jsx
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell, LabelList } from 'recharts';

const PerformanceMatrixChart = ({ filteredData, avgLeaguePayroll, avgLeagueWins }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-gray-700">Team Performance Matrix</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              type="number" 
              dataKey="avgPayroll" 
              name="Average Payroll" 
              tickFormatter={(value) => `$${(value/1000000).toFixed(0)}M`}
              domain={[0, 'dataMax']}
              stroke="#666"
              label={{ value: 'Avg Annual Payroll (Millions $)', position: 'bottom', offset: 0, fill: "#666" }}
            />
            <YAxis 
              type="number" 
              dataKey="avgWins" 
              name="Average Wins"
              domain={[65, 100]}
              stroke="#666"
              label={{ value: 'Avg Wins per Season', angle: -90, position: 'left', fill: "#666" }}
            />
            <ZAxis 
              type="number" 
              dataKey="postseasonAppearances" 
              range={[40, 400]} 
              name="Playoff Appearances"
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "Average Payroll") return `$${(value/1000000).toFixed(1)}M`;
                return value.toFixed(1);
              }}
              labelFormatter={(_, payload) => {
                if (payload && payload.length) {
                  return payload[0].payload.team;
                }
                return "";
              }}
              contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }}
            />
            
            {/* Reference lines for quadrants */}
            <CartesianGrid 
              horizontal={false} 
              vertical={false} 
            />
            <ReferenceLine 
              x={avgLeaguePayroll * 1000000} 
              stroke="#666" 
              strokeDasharray="3 3"
              label={{ 
                value: 'Avg Payroll', 
                position: 'insideTopLeft',
                fill: "#666",
                fontSize: 12
              }} 
            />
            <ReferenceLine 
              y={avgLeagueWins} 
              stroke="#666" 
              strokeDasharray="3 3"
              label={{ 
                value: 'Avg Wins', 
                position: 'insideLeft',
                fill: "#666",
                fontSize: 12
              }} 
            />
            
            <Scatter 
              name="Teams" 
              data={filteredData} 
              fill="#8884d8"
            >
              {filteredData.map((entry, index) => {
                let color;
                
                // Determine quadrant color
                if (entry.avgWins > avgLeagueWins) {
                  if (entry.avgPayroll > avgLeaguePayroll) {
                    color = "#59a14f"; // High spend, high wins
                  } else {
                    color = "#4e79a7"; // Low spend, high wins (most efficient)
                  }
                } else {
                  if (entry.avgPayroll > avgLeaguePayroll) {
                    color = "#e15759"; // High spend, low wins (least efficient)
                  } else {
                    color = "#f28e2c"; // Low spend, low wins
                  }
                }
                
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={color}
                    stroke={entry.worldSeriesWins > 0 ? "#000000" : "none"}
                    strokeWidth={entry.worldSeriesWins > 0 ? 2 : 0}
                  />
                );
              })}
              <LabelList dataKey="teamCode" position="top" style={{ fontSize: 10 }} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-gray-500 mt-2">
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
          <div className="bg-green-600 text-white p-1 rounded text-center">High Spend / High Wins</div>
          <div className="bg-blue-600 text-white p-1 rounded text-center">Low Spend / High Wins</div>
          <div className="bg-red-500 text-white p-1 rounded text-center">High Spend / Low Wins</div>
          <div className="bg-yellow-500 text-white p-1 rounded text-center">Low Spend / Low Wins</div>
        </div>
        <p className="mt-1">Teams with World Series wins have black borders</p>
      </div>
    </div>
  );
};

export default PerformanceMatrixChart;