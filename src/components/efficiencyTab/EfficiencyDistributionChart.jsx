// src/components/EfficiencyTab/EfficiencyDistributionChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EfficiencyDistributionChart = ({ quadrantSummary }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-gray-700">Spending Efficiency Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={quadrantSummary}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({name, value, percent}) => `${name}: ${value} teams (${(percent * 100).toFixed(0)}%)`}
            >
              {quadrantSummary.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EfficiencyDistributionChart;