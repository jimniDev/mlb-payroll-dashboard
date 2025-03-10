// src/components/common/TableauViz.jsx
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const TableauViz = ({ 
  vizUrl, 
  title,
  height = 600, 
  hideTabs = true, 
  hideToolbar = true,
  className = '',
  filters = {} 
}) => {
  const vizRef = useRef(null);
  const vizInstance = useRef(null);

  useEffect(() => {
    // Only proceed if we have the tableau API available
    if (!window.tableau || !vizRef.current) return;

    // Function to initialize or re-initialize the viz
    const initViz = () => {
      // Clean up existing viz if it exists
      if (vizInstance.current) {
        vizInstance.current.dispose();
      }

      // Clear the container
      while (vizRef.current.firstChild) {
        vizRef.current.removeChild(vizRef.current.firstChild);
      }

      // Options for the visualization
      const options = {
        hideTabs: hideTabs,
        hideToolbar: hideToolbar,
        width: '100%',
        height: `${height}px`,
        onFirstInteractive: function () {
          // Apply any filters once the viz is interactive
          const viz = vizInstance.current;
          const workbook = viz.getWorkbook();
          const activeSheet = workbook.getActiveSheet();

          // Apply filters if any are provided
          if (Object.keys(filters).length > 0) {
            Object.entries(filters).forEach(([field, value]) => {
              activeSheet.applyFilterAsync(field, value, window.tableau.FilterUpdateType.REPLACE);
            });
          }
        }
      };

      // Create the new viz
      vizInstance.current = new window.tableau.Viz(vizRef.current, vizUrl, options);
    };

    // Initialize the visualization
    initViz();

    // Clean up when the component unmounts
    return () => {
      if (vizInstance.current) {
        vizInstance.current.dispose();
      }
    };
  }, [vizUrl, height, hideTabs, hideToolbar, filters]);

  return (
    <div className={`bg-white p-4 rounded shadow-sm ${className}`}>
      {title && <h3 className="text-lg font-medium mb-3 text-gray-700">{title}</h3>}
      <div 
        ref={vizRef} 
        className="w-full overflow-hidden" 
        style={{ height: `${height}px` }}
      ></div>
    </div>
  );
};

TableauViz.propTypes = {
  vizUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  height: PropTypes.number,
  hideTabs: PropTypes.bool,
  hideToolbar: PropTypes.bool,
  className: PropTypes.string,
  filters: PropTypes.object
};

export default TableauViz;