import React from 'react';

const TabSelector = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tab-selector mb-6 md:mb-0">
      <button
        className={`px-4 py-2 mr-2 rounded ${activeTab === 'overview' ? 'bg-[#041E42] text-white' : 'bg-gray-50 text-gray-700'}`}
        onClick={() => setActiveTab('overview')}
      >
        Overview
      </button>
      <button
        className={`px-4 py-2 mr-2 rounded ${activeTab === 'efficiency' ? 'bg-[#041E42] text-white' : 'bg-gray-50 text-gray-700'}`}
        onClick={() => setActiveTab('efficiency')}
      >
        Efficiency Analysis
      </button>
      <button
        className={`px-4 py-2 rounded ${activeTab === 'team' ? 'bg-[#041E42] text-white' : 'bg-gray-50 text-gray-700'}`}
        onClick={() => setActiveTab('team')}
      >
        Team Details
      </button>
    </div>
  );
};

export default TabSelector;
