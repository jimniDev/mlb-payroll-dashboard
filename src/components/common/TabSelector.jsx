import React from 'react';

const TabSelector = ({ activeTab, setActiveTab }) => {
  return (
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
  );
};

export default TabSelector;