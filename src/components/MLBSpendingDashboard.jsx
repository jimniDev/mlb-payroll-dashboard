import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, LabelList, Cell, ReferenceLine,
  LineChart, Line, PieChart, Pie
} from 'recharts';
import * as XLSX from 'xlsx';
import _ from 'lodash';
import mlbData from '../data/mlb_data.json';

const MLBSpendingDashboard = () => {
  const [data, setData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [yearlyData, setYearlyData] = useState({});
  const [selectedYear, setSelectedYear] = useState(2024);
  const [availableYears, setAvailableYears] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [leagueFilter, setLeagueFilter] = useState('All');

  useEffect(() => {
    try {
      // Process the imported data directly
      const processedData = mlbData.map(row => ({
        ...row,
        "Cost per Win": row["Total Payroll Allocation"] / row["Wins"],
        "Payroll (Millions)": row["Total Payroll Allocation"] / 1000000,
        "Cost per Win (Millions)": (row["Total Payroll Allocation"] / row["Wins"]) / 1000000,
        "Made Postseason": row["Postseason (Yes/No)"] === "Y",
        "Won World Series": row["Won World Series (Yes/No)"] === "Y"
      }));
      
      // Get available years
      const years = [...new Set(processedData.map(row => row.Year))].sort();
      setAvailableYears(years);
      
      // Group data by year
      const dataByYear = _.groupBy(processedData, 'Year');
      setYearlyData(dataByYear);
      
      // Calculate team averages across years
      const teams = [...new Set(processedData.map(row => row["Team Name"]))];
      const teamSummaries = teams.map(team => {
        const teamData = processedData.filter(row => row["Team Name"] === team);
        const latestYear = Math.max(...teamData.map(row => row.Year));
        const latestData = teamData.find(row => row.Year === latestYear);
        
        return {
          team: team,
          teamCode: latestData.Team,
          league: latestData["League (National or American)"],
          division: latestData.Divison,
          latestYear: latestYear,
          latestPayroll: latestData["Total Payroll Allocation"],
          latestWins: latestData.Wins,
          latestCostPerWin: latestData["Cost per Win"],
          avgPayroll: _.meanBy(teamData, "Total Payroll Allocation"),
          avgWins: _.meanBy(teamData, "Wins"),
          avgCostPerWin: _.meanBy(teamData, "Cost per Win"),
          postseasonAppearances: teamData.filter(row => row["Made Postseason"]).length,
          worldSeriesWins: teamData.filter(row => row["Won World Series"]).length,
          avgOPS: _.meanBy(teamData, "On-Base+Slugging Percentage"),
          avgERA: _.meanBy(teamData, "Earned Run Average"),
          payrollHistory: teamData.map(row => ({
            year: row.Year,
            payroll: row["Total Payroll Allocation"] / 1000000,
            wins: row.Wins,
            costPerWin: row["Cost per Win"] / 1000000,
            madePostseason: row["Made Postseason"]
          })).sort((a, b) => a.year - b.year)
        };
      });
      
      setSummaryData(teamSummaries);
      setData(processedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error processing data:", error);
      setIsLoading(false);
    }
  }, []);

  // Tableau-inspired color palette
  const tableauColors = [
    "#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f",
    "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"
  ];

  const getTeamColor = (teamCode) => {
    // MLB team colors (approximate)
    const teamColors = {
      ARI: "#A71930", ATL: "#CE1141", BAL: "#DF4601", BOS: "#BD3039",
      CHC: "#0E3386", CWS: "#27251F", CIN: "#C6011F", CLE: "#00385D",
      COL: "#333366", DET: "#0C2340", HOU: "#EB6E1F", KC: "#004687",
      LAA: "#BA0021", LAD: "#005A9C", MIA: "#00A3E0", MIL: "#0A2351",
      MIN: "#002B5C", NYM: "#FF5910", NYY: "#0C2340", OAK: "#003831",
      PHI: "#E81828", PIT: "#FDB827", SD: "#2F241D", SF: "#FD5A1E",
      SEA: "#0C2C56", STL: "#C41E3A", TB: "#092C5C", TEX: "#003278",
      TOR: "#134A8E", WSH: "#AB0003"
    };
    
    return teamColors[teamCode] || "#999999";
  };
  
  const getTeamLogo = (teamCode) => {
    return (
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
        style={{ backgroundColor: getTeamColor(teamCode) }}
      >
        {teamCode}
      </div>
    );
  };
  
  const formatMoney = (value) => {
    return `$${Math.round(value).toLocaleString()}`;
  };
  
  const formatPayroll = (value) => {
    return `$${value.toFixed(1)}M`;
  };

  const filteredSummaryData = leagueFilter === 'All' 
    ? summaryData 
    : summaryData.filter(team => team.league === leagueFilter);

  const renderOverviewTab = () => {
    if (isLoading || !yearlyData[selectedYear]) return <div>Loading data...</div>;
    
    const currentYearData = yearlyData[selectedYear];
    const sortedData = [...currentYearData].sort((a, b) => b["Total Payroll Allocation"] - a["Total Payroll Allocation"]);
    
    // Calculate league spending
    const alTeams = currentYearData.filter(team => team["League (National or American)"] === "AL");
    const nlTeams = currentYearData.filter(team => team["League (National or American)"] === "NL");
    
    const alTotalSpending = _.sumBy(alTeams, "Total Payroll Allocation") / 1000000;
    const nlTotalSpending = _.sumBy(nlTeams, "Total Payroll Allocation") / 1000000;
    
    const leagueSpendingData = [
      { name: "American League", value: alTotalSpending, color: "#4e79a7" },
      { name: "National League", value: nlTotalSpending, color: "#f28e2c" },
    ];
    
    // Group teams by division for the bar chart
    const divisionData = _(currentYearData)
      .groupBy('Divison')
      .map((teams, division) => ({
        division: division,
        avgPayroll: _.meanBy(teams, "Total Payroll Allocation") / 1000000,
        avgWins: _.meanBy(teams, "Wins"),
      }))
      .value()
      .sort((a, b) => a.division.localeCompare(b.division));
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-700">Team Payrolls ({selectedYear})</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedData.slice(0, 15)}
                margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  tickFormatter={(value) => `$${(value/1000000).toFixed(0)}M`}
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
                    const team = sortedData.find(item => item.Team === value);
                    return team ? team["Team Name"] : value;
                  }}
                  contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }}
                />
                <Bar 
                  dataKey="Total Payroll Allocation" 
                  name="Total Payroll"
                >
                  {sortedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry["League (National or American)"] === "AL" ? "#4e79a7" : "#f28e2c"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">
            <span className="inline-block mr-3"><span className="inline-block w-3 h-3 mr-1" style={{backgroundColor: "#4e79a7"}}></span>American League</span>
            <span className="inline-block"><span className="inline-block w-3 h-3 mr-1" style={{backgroundColor: "#f28e2c"}}></span>National League</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-700">Spending vs. Performance ({selectedYear})</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 30, bottom: 30, left: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  dataKey="Payroll (Millions)" 
                  name="Payroll" 
                  label={{ value: 'Payroll (Millions $)', position: 'bottom', offset: 0, fill: "#666" }}
                  tickFormatter={(value) => `$${value.toFixed(0)}M`}
                  stroke="#666"
                />
                <YAxis 
                  type="number" 
                  dataKey="Wins" 
                  name="Wins"
                  label={{ value: 'Wins', angle: -90, position: 'left', fill: "#666" }}
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
                    if (name === "Payroll") return formatPayroll(value);
                    return value;
                  }}
                  labelFormatter={(_, payload) => {
                    if (payload && payload.length) {
                      return payload[0].payload["Team Name"];
                    }
                    return "";
                  }}
                  contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }}
                />
                <Legend />
                <Scatter 
                  name="Teams" 
                  data={currentYearData} 
                  fill="#8884d8"
                >
                  {currentYearData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry["Made Postseason"] ? "#59a14f" : (entry["League (National or American)"] === "AL" ? "#4e79a7" : "#f28e2c")}
                      stroke={entry["Made Postseason"] ? "#ffffff" : "none"}
                      strokeWidth={entry["Made Postseason"] ? 2 : 0}
                    />
                  ))}
                  <LabelList dataKey="Team" position="top" style={{ fontSize: 10 }} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">
            <span className="inline-block mr-3"><span className="inline-block w-3 h-3 bg-green-600 mr-1"></span>Playoff Team</span>
            <span className="inline-block mr-3"><span className="inline-block w-3 h-3 mr-1" style={{backgroundColor: "#4e79a7"}}></span>AL Team</span>
            <span className="inline-block"><span className="inline-block w-3 h-3 mr-1" style={{backgroundColor: "#f28e2c"}}></span>NL Team</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-700">Division Comparison ({selectedYear})</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={divisionData}
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
                <Legend />
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

        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-700">League Spending Distribution ({selectedYear})</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leagueSpendingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({name, value, percent}) => `${name}: $${Math.round(value).toLocaleString()}M (${(percent * 100).toFixed(0)}%)`}
                >
                  {leagueSpendingData.map((entry, index) => (
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
            <p>Total MLB Spending: ${Math.round(alTotalSpending + nlTotalSpending).toLocaleString()}M</p>
          </div>
        </div>
      </div>
    );
  };
  
  const renderEfficiencyTab = () => {
    if (isLoading) return <div>Loading data...</div>;
    
    // Filter by league if needed
    const filteredData = leagueFilter === 'All' 
      ? summaryData 
      : summaryData.filter(team => team.league === leagueFilter);
    
    // Sort by cost efficiency
    const sortedTeams = [...filteredData].sort((a, b) => a.avgCostPerWin - b.avgCostPerWin);
    
    // Calculate efficiency stats
    const avgLeaguePayroll = _.meanBy(filteredData, 'avgPayroll') / 1000000;
    const avgLeagueWins = _.meanBy(filteredData, 'avgWins');
    const avgLeagueCostPerWin = _.meanBy(filteredData, 'avgCostPerWin') / 1000000;
    
    // Create quadrant data
    const quadrantData = filteredData.map(team => {
      let quadrant = '';
      
      if (team.avgWins > avgLeagueWins) {
        if (team.avgPayroll / 1000000 > avgLeaguePayroll) {
          quadrant = 'High Spend / High Wins';
        } else {
          quadrant = 'Low Spend / High Wins';
        }
      } else {
        if (team.avgPayroll / 1000000 > avgLeaguePayroll) {
          quadrant = 'High Spend / Low Wins';
        } else {
          quadrant = 'Low Spend / Low Wins';
        }
      }
      
      return {
        ...team,
        quadrant
      };
    });
    
    // Count teams in each quadrant
    const quadrantCounts = _.countBy(quadrantData, 'quadrant');
    
    const quadrantSummary = [
      { name: 'High Spend / High Wins', value: quadrantCounts['High Spend / High Wins'] || 0, color: '#59a14f' },
      { name: 'Low Spend / High Wins', value: quadrantCounts['Low Spend / High Wins'] || 0, color: '#4e79a7' },
      { name: 'High Spend / Low Wins', value: quadrantCounts['High Spend / Low Wins'] || 0, color: '#e15759' },
      { name: 'Low Spend / Low Wins', value: quadrantCounts['Low Spend / Low Wins'] || 0, color: '#f28e2c' }
    ];
    
    return (
      <div>
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded ${leagueFilter === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setLeagueFilter('All')}
            >
              All Teams
            </button>
            <button
              className={`px-3 py-1 rounded ${leagueFilter === 'AL' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setLeagueFilter('AL')}
            >
              American League
            </button>
            <button
              className={`px-3 py-1 rounded ${leagueFilter === 'NL' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setLeagueFilter('NL')}
            >
              National League
            </button>
          </div>
          <div className="text-sm text-gray-500">
            Showing {filteredData.length} teams
          </div>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <Legend />
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
                  <Legend />
                  
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
          
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="text-lg font-medium mb-3 text-gray-700">Efficiency Stats</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg Annual Payroll</p>
                <p className="text-xl font-bold">${avgLeaguePayroll.toFixed(1)}M</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg Wins</p>
                <p className="text-xl font-bold">{avgLeagueWins.toFixed(1)}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg Cost per Win</p>
                <p className="text-xl font-bold">${avgLeagueCostPerWin.toFixed(2)}M</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="text-md font-semibold mb-2">Most Efficient Teams</h4>
              <div className="space-y-2">
                {sortedTeams.slice(0, 3).map((team, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-mono bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2">{index + 1}</span>
                      <span>{team.team}</span>
                    </div>
                    <span className="font-semibold">${(team.avgCostPerWin/1000000).toFixed(2)}M/win</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderTeamDetailsTab = () => {
    if (isLoading) return <div>Loading data...</div>;
    
    const teamOptions = summaryData
      .sort((a, b) => a.team.localeCompare(b.team))
      .map(team => ({
        code: team.teamCode,
        name: team.team,
        color: getTeamColor(team.teamCode)
      }));
    
    const selectedTeamData = selectedTeam 
      ? summaryData.find(team => team.teamCode === selectedTeam)
      : null;
      
    return (
      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <select 
            className="border rounded px-4 py-2 bg-white"
            value={selectedTeam || ''}
            onChange={(e) => setSelectedTeam(e.target.value)}
            style={{ minWidth: "250px" }}
          >
            <option value="">Select a team</option>
            {teamOptions.map(team => (
              <option 
                key={team.code} 
                value={team.code} 
                style={{ color: team.color, fontWeight: "bold" }}
              >
                {team.code} - {team.name}
              </option>
            ))}
          </select>
        </div>
        
        {selectedTeamData ? (
          <div>
            <div className="bg-white p-6 rounded shadow-sm mb-6">
              <div className="flex items-center mb-4">
                {getTeamLogo(selectedTeamData.teamCode)}
                <div className="ml-4">
                  <h3 className="text-xl font-bold" style={{ color: getTeamColor(selectedTeamData.teamCode) }}>
                    {selectedTeamData.team}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-1">📅</span>
                    <span>Data from 2021-2024</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-600">League/Division</p>
                  <p className="font-semibold">{selectedTeamData.league} {selectedTeamData.division.split(' ')[1]}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Annual Payroll</p>
                  <p className="font-semibold">${(selectedTeamData.avgPayroll/1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Wins</p>
                  <p className="font-semibold">{selectedTeamData.avgWins.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Cost per Win</p>
                  <p className="font-semibold">${(selectedTeamData.avgCostPerWin/1000000).toFixed(2)}M</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="mr-1">📊</span> Playoff Appearances
                  </p>
                  <p className="font-semibold">{selectedTeamData.postseasonAppearances} of 4 seasons</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="mr-1">🏆</span> World Series Wins
                  </p>
                  <p className="font-semibold">{selectedTeamData.worldSeriesWins}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="text-lg font-medium mb-3 text-gray-700">Payroll & Performance (2021-2024)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={selectedTeamData.payrollHistory}
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
                        stroke={getTeamColor(selectedTeamData.teamCode)} 
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
              
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="text-lg font-medium mb-3 text-gray-700">Cost Efficiency Over Time</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={selectedTeamData.payrollHistory}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="year" 
                        stroke="#666"
                      />
                      <YAxis 
                        tickFormatter={(value) => `${value}M`}
                        stroke="#666"
                        label={{ value: 'Cost per Win (Millions $)', angle: -90, position: 'insideLeft', fill: "#666" }}
                      />
                      <Tooltip 
                        formatter={(value) => `${value.toFixed(2)}M`}
                        labelFormatter={(year) => `${year}`}
                        contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }}
                      />
                      <Legend />
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
              
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="text-lg font-medium mb-3 text-gray-700">Spending Rank by Year</h3>
                <div className="h-48">
                  <div className="grid grid-cols-4 gap-2 h-full">
                    {selectedTeamData.payrollHistory.map((yearData, index) => {
                      // Get all teams for that year
                      const yearTeams = data.filter(team => team.Year === yearData.year);
                      // Sort by payroll
                      const sortedYearTeams = yearTeams.sort((a, b) => b["Total Payroll Allocation"] - a["Total Payroll Allocation"]);
                      // Find rank
                      const rank = sortedYearTeams.findIndex(team => team.Team === selectedTeamData.teamCode) + 1;
                      const percentile = Math.round((30 - rank) / 30 * 100);
                      
                      return (
                        <div key={index} className="flex flex-col items-center justify-center h-full">
                          <div className="text-lg font-bold">{yearData.year}</div>
                          <div className="text-3xl font-bold mt-2">#{rank}</div>
                          <div 
                            className="text-sm font-semibold mt-1 px-2 py-1 rounded"
                            style={{ 
                              backgroundColor: percentile > 66 ? '#59a14f' : percentile > 33 ? '#edc949' : '#e15759',
                              color: 'white'
                            }}
                          >
                            {percentile > 66 ? 'Top' : percentile > 33 ? 'Mid' : 'Bottom'} Tier
                          </div>
                          <div className="text-xs text-gray-500 mt-1">${Math.round(yearData.payroll)}M</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="text-lg font-medium mb-3 text-gray-700">Efficiency Summary</h3>
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f9f9f9' }}>
                  <h4 className="font-semibold mb-2">Cost Analysis</h4>
                  <p className="text-sm">
                    Over the 2021-2024 period, the {selectedTeamData.team} spent an average of
                    <span className="font-bold"> ${(selectedTeamData.avgPayroll/1000000).toFixed(1)}M </span>
                    per season, resulting in an average of
                    <span className="font-bold"> {selectedTeamData.avgWins.toFixed(1)} wins </span>
                    per season.
                  </p>
                  
                  <p className="text-sm mt-2">
                    This translates to a cost of
                    <span className="font-bold"> ${(selectedTeamData.avgCostPerWin/1000000).toFixed(2)}M </span>
                    per win, which ranks
                    <span className="font-bold"> #{summaryData.sort((a, b) => a.avgCostPerWin - b.avgCostPerWin).findIndex(team => team.teamCode === selectedTeamData.teamCode) + 1} </span>
                    in MLB in spending efficiency.
                  </p>
                  
                  <h4 className="font-semibold mt-4 mb-2">Performance Outcomes</h4>
                  <p className="text-sm">
                    During this period, the team made the playoffs in
                    <span className="font-bold"> {selectedTeamData.postseasonAppearances} </span>
                    out of 4 seasons
                    {selectedTeamData.worldSeriesWins > 0 ? ` and won ${selectedTeamData.worldSeriesWins} World Series.` : '.'}
                  </p>
                  
                  <p className="text-sm mt-4 italic">
                    {(() => {
                      // Get efficiency rank
                      const efficiencyRank = summaryData.sort((a, b) => a.avgCostPerWin - b.avgCostPerWin).findIndex(team => team.teamCode === selectedTeamData.teamCode) + 1;
                      
                      if (efficiencyRank <= 10) {
                        return `The ${selectedTeamData.team} demonstrate excellent spending efficiency, ranking in the top third of MLB teams.`;
                      } else if (efficiencyRank <= 20) {
                        return `The ${selectedTeamData.team} show average spending efficiency, ranking in the middle third of MLB teams.`;
                      } else {
                        return `The ${selectedTeamData.team} have below-average spending efficiency, ranking in the bottom third of MLB teams.`;
                      }
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 bg-white p-12 rounded shadow-sm">
            <p className="text-xl mb-4">Please select a team to view detailed information</p>
            <p>The team details dashboard provides in-depth analysis of spending patterns, efficiency metrics, and performance outcomes for individual teams.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">MLB Team Spending Efficiency Dashboard</h1>
          <p className="text-gray-600">Analyzing the relationship between payroll allocation and team performance (2021-2024)</p>
        </header>
        
        {/* Controls Bar */}
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center bg-white p-3 rounded shadow-sm">
          <div className="tab-selector mb-3 md:mb-0">
            <button 
              className={`px-4 py-2 mr-2 rounded ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 mr-2 rounded ${activeTab === 'efficiency' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('efficiency')}
            >
              Efficiency Analysis
            </button>
            <button 
              className={`px-4 py-2 rounded ${activeTab === 'team' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('team')}
            >
              Team Details
            </button>
          </div>
          
          {activeTab === 'overview' && (
            <div>
              <label className="mr-2 text-gray-700">Select Year:</label>
              <select 
                className="border rounded px-2 py-1" 
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {/* Main Content Area */}
        <div className="mb-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 bg-white rounded shadow-sm">
              <p className="text-xl text-gray-500">Loading data...</p>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && renderOverviewTab()}
              {activeTab === 'efficiency' && renderEfficiencyTab()}
              {activeTab === 'team' && renderTeamDetailsTab()}
            </>
          )}
        </div>
        
        {/* Footer */}
        <footer className="bg-white p-4 rounded shadow-sm text-sm text-gray-500">
          <p className="mb-1">Data source: MLB team statistics 2021-2024</p>
          <p className="font-medium">User Guide:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <div className="p-2 bg-gray-50 rounded">
              <p className="font-medium">Casual Fans</p>
              <p>Overview tab shows team payrolls and basic performance comparisons</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="font-medium">Engaged Fans</p>
              <p>Efficiency Analysis tab compares spending efficiency across teams</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <p className="font-medium">Analytics-Driven Fans</p>
              <p>Team Details tab offers deep insights into individual team spending patterns</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MLBSpendingDashboard;