// src/components/OverviewTab/LeagueSpendingChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const LeagueSpendingChart = ({ data, totalSpending }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-gray-700">League Spending Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({name, value, percent}) => 
                `${name}: $${Math.round(value).toLocaleString()}M (${(percent * 100).toFixed(0)}%)`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `$${Math.round(value).toLocaleString()}M`}
              contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-gray-500 mt-4">
        <p>Total MLB Spending: ${Math.round(totalSpending).toLocaleString()}M</p>
      </div>
    </div>
  );
};

export default LeagueSpendingChart;