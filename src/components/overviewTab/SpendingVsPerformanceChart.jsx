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

  // Colors based on the Sankey diagram
  const performanceCategories = {
    worldSeries: { name: 'Won World Series', color: '#9C755E' },
    wonLeague: { name: 'Won League', color: '#B079A1' },
    divisionWinner: { name: 'Division Winner', color: '#58A14E' },
    wildcard: { name: 'Wildcard', color: '#76B6B2' },
    noPlayoffs: { name: 'No Playoffs', color: '#E15759' },
  };

  // Process the data to determine the correct categories
  const processedData = data.map((team) => {
    // Determine the correct playoff category based on available fields
    let category = 'noPlayoffs';

    if (team['Won World Series (Yes/No)'] === 'Y') {
      category = 'worldSeries';
    } else if (team['Won League (Yes/No)'] === 'Y') {
      category = 'wonLeague';
    } else if (team['Made Postseason']) {
      // For teams that made the playoffs but didn't win the league/WS,
      // we need to determine if they were division winners or wildcards

      // If the specific fields exist, use them
      if (team['Division Winner (Yes/No)'] === 'Y') {
        category = 'divisionWinner';
      } else if (team['Wildcard (Yes/No)'] === 'Y') {
        category = 'wildcard';
      } else {
        // If these specific fields don't exist, we need to infer from other data
        // Division winners typically have the highest win count in their division
        // This is a simple inference that may need refinement
        const teamDivision = team['Divison'];
        const isHighestInDivision = data
          .filter((t) => t['Divison'] === teamDivision)
          .every((t) => t['Team'] === team['Team'] || t['Wins'] <= team['Wins']);

        if (isHighestInDivision) {
          category = 'divisionWinner';
        } else {
          category = 'wildcard';
        }
      }
    }

    return {
      ...team,
      performanceCategory: category,
    };
  });

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const team = payload[0].payload;

      return (
        <div className="custom-tooltip bg-white p-3 border border-gray-200 shadow-sm rounded">
          <p className="font-bold">{team['Team Name']}</p>
          <p className="text-sm">
            Payroll: ${(team['Total Payroll Allocation'] / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm">Wins: {team['Wins']}</p>
          <p className="text-sm">{performanceCategories[team.performanceCategory].name}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend that shows all categories
  const CustomLegend = () => {
    return (
      <div className="flex flex-wrap justify-center text-xs text-gray-500 mt-2">
        {Object.entries(performanceCategories).map(([key, { name, color }]) => (
          <span key={key} className="inline-block mx-2 mb-1">
            <span className="inline-block w-3 h-3 mr-1" style={{ backgroundColor: color }}></span>
            {name}
          </span>
        ))}
      </div>
    );
  };

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
            <Tooltip content={<CustomTooltip />} />
            <Scatter name="Teams" data={processedData} fill="#8884d8">
              {processedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={performanceCategories[entry.performanceCategory].color}
                  stroke="#000"
                  strokeWidth={entry.performanceCategory === 'worldSeries' ? 1.5 : 0}
                />
              ))}
              <LabelList dataKey="Team" position="top" style={{ fontSize: 10 }} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Custom legend that shows all categories */}
      <CustomLegend />
    </div>
  );
};

export default SpendingVsPerformanceChart;
