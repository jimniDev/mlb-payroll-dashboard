// src/hooks/useTableau.js
import { useState, useEffect } from 'react';

export const useTableau = () => {
  const [isTableauLoaded, setIsTableauLoaded] = useState(false);

  useEffect(() => {
    // Check if Tableau API is loaded
    const checkTableau = () => {
      if (window.tableau) {
        setIsTableauLoaded(true);
        return;
      }
      
      // If not loaded yet, check again after a short delay
      setTimeout(checkTableau, 100);
    };

    checkTableau();
  }, []);

  // Helper to get the correct embed URL format
  const formatTableauUrl = (url) => {
    // If the URL is already in the correct format, return it
    if (url.startsWith('https://public.tableau.com/views/')) {
      return url;
    }
    
    // Handle other URL formats, like from share links
    // Extract workbook and view names if needed
    // ...

    return url;
  };

  return { isTableauLoaded, formatTableauUrl };
};