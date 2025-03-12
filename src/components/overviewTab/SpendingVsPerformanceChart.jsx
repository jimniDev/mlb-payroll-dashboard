// src/components/OverviewTab/SpendingVsPerformanceChart.jsx
import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import { formatPayroll } from '../../utils/formatters';

const SpendingVsPerformanceChart = ({ yearlyData, availableYears }) => {
  // Add local year state
  const [selectedYear, setSelectedYear] = useState(availableYears[availableYears.length - 1]);

  const data = yearlyData[selectedYear] || [];

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-gray-700">Spending vs. Performance</h3>
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
          <ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              type="number"
              dataKey="Payroll (Millions)"
              name="Payroll"
              label={{ value: 'Payroll (Millions $)', position: 'bottom', offset: 0, fill: '#666' }}
              tickFormatter={(value) => `$${value.toFixed(0)}M`}
              stroke="#666"
            />
            <YAxis
              type="number"
              dataKey="Wins"
              name="Wins"
              label={{ value: 'Wins', angle: -90, position: 'left', fill: '#666' }}
              stroke="#666"
              domain={[60, 105]}
            />
            <ZAxis
              type="number"
              dataKey="Cost per Win (Millions)"
              range={[50, 400]}
              name="Cost per Win"
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'Payroll') return formatPayroll(value);
                return value;
              }}
              labelFormatter={(_, payload) => {
                if (payload && payload.length) {
                  return payload[0].payload['Team Name'];
                }
                return '';
              }}
              contentStyle={{ backgroundColor: '#fff', borderColor: '#ddd' }}
            />
            <Scatter name="Teams" data={data} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry['Made Postseason']
                      ? '#59a14f'
                      : entry['League (National or American)'] === 'AL'
                        ? '#4e79a7'
                        : '#f28e2c'
                  }
                  stroke={entry['Made Postseason'] ? '#ffffff' : 'none'}
                  strokeWidth={entry['Made Postseason'] ? 2 : 0}
                />
              ))}
              <LabelList dataKey="Team" position="top" style={{ fontSize: 10 }} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-gray-500 mt-2">
        <span className="inline-block mr-3">
          <span className="inline-block w-3 h-3 bg-green-600 mr-1"></span>
          Playoff Team
        </span>
        <span className="inline-block mr-3">
          <span className="inline-block w-3 h-3 mr-1" style={{ backgroundColor: '#4e79a7' }}></span>
          AL Team
        </span>
        <span className="inline-block">
          <span className="inline-block w-3 h-3 mr-1" style={{ backgroundColor: '#f28e2c' }}></span>
          NL Team
        </span>
      </div>
    </div>
  );
};

export default SpendingVsPerformanceChart;
