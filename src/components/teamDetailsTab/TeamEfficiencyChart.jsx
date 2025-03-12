// src/components/TeamDetailsTab/TeamEfficiencyChart.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const TeamEfficiencyChart = ({ teamData }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-medium mb-3 text-gray-700">Cost Efficiency Over Time</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={teamData.payrollHistory}
            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" stroke="#666" />
            <YAxis
              tickFormatter={(value) => `${value}M`}
              stroke="#666"
              label={{
                value: 'Cost per Win($)',
                angle: -90,
                position: 'insideLeft',
                fill: '#666',
              }}
            />
            <Tooltip
              formatter={(value) => `${value.toFixed(2)}M`}
              labelFormatter={(year) => `${year}`}
              contentStyle={{ backgroundColor: '#fff', borderColor: '#ddd' }}
            />
            <Line
              type="monotone"
              dataKey="costPerWin"
              name="Cost per Win"
              stroke="#e15759"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeamEfficiencyChart;
