// src/components/MLBSpendingDashboard.jsx
import React, { useState } from 'react';
import TabSelector from './common/TabSelector';
import OverviewTab from './overviewTab/OverviewTab';
import EfficiencyTab from './efficiencyTab/EfficiencyTab';
import TeamDetailsTab from './teamDetailsTab/TeamDetailsTab';
import DashboardFooter from './common/DashboardFooter';
import DashboardHeader from './common/DashboardHeader';
import LoadingIndicator from './common/LoadingIndicator';
import useMLBData from '../hooks/useMLBData';

const MLBSpendingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [leagueFilter, setLeagueFilter] = useState('All');

  const { data, summaryData, yearlyData, availableYears, isLoading } = useMLBData();

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />

        <div className="mb-4 flex flex-col md:flex-row justify-between items-center bg-white p-3 rounded shadow-sm">
          <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="mb-6">
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              {activeTab === 'overview' && <OverviewTab yearlyData={yearlyData} />}
              {activeTab === 'efficiency' && (
                <EfficiencyTab summaryData={summaryData} data={data} />
              )}
              {activeTab === 'team' && (
                <TeamDetailsTab
                  summaryData={summaryData}
                  selectedTeam={selectedTeam}
                  setSelectedTeam={setSelectedTeam}
                  data={data}
                />
              )}
            </>
          )}
        </div>

        <DashboardFooter />
      </div>
    </div>
  );
};

export default MLBSpendingDashboard;
