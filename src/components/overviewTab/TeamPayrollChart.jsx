// src/components/OverviewTab/TeamPayrollChart.jsx
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { formatMoney } from '../../utils/formatters';

const TeamPayrollChart = ({ yearlyData, availableYears }) => {
  // Add local year state with default to latest year
  const [selectedYear, setSelectedYear] = useState(availableYears[availableYears.length - 1]);

  const data = yearlyData[selectedYear] || [];
  const sortedData = [...data].sort(
    (a, b) => b['Total Payroll Allocation'] - a['Total Payroll Allocation']
  );
  const chartData = sortedData.slice(0, 15); // Top 15 teams

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-gray-700">Team Payrolls</h3>
        <div>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              type="number"
              tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
              stroke="#666"
            />
            <YAxis
              type="category"
              dataKey="Team"
              tick={{ fontSize: 12 }}
              width={40}
              stroke="#666"
            />
            <Tooltip
              formatter={(value) => formatMoney(value)}
              labelFormatter={(value) => {
                const team = chartData.find((item) => item.Team === value);
                return team ? team['Team Name'] : value;
              }}
              contentStyle={{ backgroundColor: '#fff', borderColor: '#ddd' }}
            />
            <Bar dataKey="Total Payroll Allocation" name="Total Payroll">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry['League (National or American)'] === 'AL' ? '#4e79a7' : '#f28e2c'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-gray-500 mt-2">
        <span className="inline-block mr-3">
          <span className="inline-block w-3 h-3 mr-1" style={{ backgroundColor: '#4e79a7' }}></span>
          American League
        </span>
        <span className="inline-block">
          <span className="inline-block w-3 h-3 mr-1" style={{ backgroundColor: '#f28e2c' }}></span>
          National League
        </span>
      </div>
    </div>
  );
};

export default TeamPayrollChart;
