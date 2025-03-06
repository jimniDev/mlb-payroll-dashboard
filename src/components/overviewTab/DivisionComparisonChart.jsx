// src/components/OverviewTab/DivisionComparisonChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer } from 'recharts';

const DivisionComparisonChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-gray-700">Division Comparison</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="division" 
              stroke="#666" 
            />
            <YAxis 
              yAxisId="left"
              tickFormatter={(value) => `$${value.toFixed(0)}M`}
              stroke="#666"
              label={{ value: 'Avg Payroll (Millions $)', angle: -90, position: 'insideLeft', fill: "#666" }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#666"
              domain={[70, 95]}
              label={{ value: 'Avg Wins', angle: 90, position: 'insideRight', fill: "#666" }}
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "avgPayroll") return `$${value.toFixed(1)}M`;
                return value.toFixed(1);
              }}
              labelFormatter={(value) => `${value}`}
              contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }}
            />
            <Bar 
              yAxisId="left"
              dataKey="avgPayroll" 
              fill="#4e79a7" 
              name="Avg Payroll"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgWins"
              stroke="#e15759"
              name="Avg Wins"
              strokeWidth={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DivisionComparisonChart;