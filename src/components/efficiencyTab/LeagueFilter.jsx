// src/components/EfficiencyTab/LeagueFilter.jsx
import React from 'react';

const LeagueFilter = ({ leagueFilter, setLeagueFilter, filteredCount }) => {
  return (
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
        Showing {filteredCount} teams
      </div>
    </div>
  );
};

export default LeagueFilter;