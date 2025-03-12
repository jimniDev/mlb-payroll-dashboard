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
  const [selectedTeam, setSelectedTeam] = useState(null);

  const { data, summaryData, yearlyData, isLoading } = useMLBData();

  return (
    <div className="bg-[#FAFAFA] p-4 min-h-screen">
      <div className="max-w-7xl mx-auto ">
        {/* Pass activeTab and setActiveTab to the header */}
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        <div
          className={`mt-6 mb-4 flex flex-col md:flex-row justify-center items-center p-3 transition-all duration-500 ease-in-out
                        opacity-100 max-h-20`}
        >
          <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="mt-12 mb-6">
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
