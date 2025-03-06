// src/components/TeamDetailsTab/TeamPerformanceChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getTeamColor } from '../../utils/teamColors';

const TeamPerformanceChart = ({ teamData }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-gray-700">Payroll & Performance (2021-2024)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={teamData.payrollHistory}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              tickFormatter={(value) => value.toString()}
              stroke="#666"
            />
            <YAxis 
              yAxisId="left"
              tickFormatter={(value) => `${value}M`}
              stroke="#666"
              label={{ value: 'Payroll (Millions $)', angle: -90, position: 'insideLeft', fill: "#666" }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#666"
              label={{ value: 'Wins', angle: 90, position: 'insideRight', fill: "#666" }}
              domain={[0, 110]}
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "Payroll") return `${value.toFixed(1)}M`;
                if (name === "Cost per Win") return `${value.toFixed(2)}M`;
                return value;
              }}
              contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }}
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="payroll" 
              name="Payroll" 
              stroke={getTeamColor(teamData.teamCode)} 
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="wins" 
              name="Wins" 
              stroke="#4e79a7" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeamPerformanceChart;