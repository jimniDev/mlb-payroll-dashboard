// src/components/common/LoadingIndicator.jsx
import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center h-64 bg-white rounded shadow-sm">
      <p className="text-xl text-gray-500">Loading data...</p>
    </div>
  );
};

export default LoadingIndicator;