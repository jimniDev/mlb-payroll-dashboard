// src/components/common/DashboardHeader.jsx
import React, { useState, useEffect } from 'react';
import TabSelector from './TabSelector';

const DashboardHeader = ({ activeTab, setActiveTab }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Use a throttled scroll handler for better performance
    let ticking = false;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Show sticky header after scrolling past the main header
      if (!scrolled && scrollPosition > 600) {
        setScrolled(true);
      } else if (scrolled && scrollPosition <= 600) {
        setScrolled(false);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [scrolled]);

  return (
    <div className="relative w-full font-sans">
      {/* Sticky Header that appears when scrolled */}
      <div
        className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-500 ease-in-out transform ${scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="container max-w-5xl mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-2 md:mb-0">
              <div className="uppercase font-bold text-[#383838] text-sm mr-2">
                MLB Spending Efficiency
              </div>
              <img
                src="https://www.mlbstatic.com/team-logos/league-on-dark/1.svg"
                alt="MLB Logo"
                className="w-8 h-5 object-contain"
              />
              <div className="uppercase font-bold text-[#383838] text-xs ml-2">2021-2024</div>
            </div>
            {/* Always show the tab selector in the minimized header */}
            <div className="flex justify-center w-full md:w-auto">
              <div className="scale-90 transform origin-center">
                <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header (full version that doesn't change) */}
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between py-6 sm:py-12 text-center sm:text-left">
          <div className="uppercase font-bold text-[#383838] text-base mb-2 sm:mb-0">HCDE 511</div>
          <div className="uppercase font-bold text-[#383838] text-base mb-2 sm:mb-0">
            Information Visualization
          </div>
          <div className="uppercase font-bold text-[#383838] text-base">2025</div>
        </div>

        {/* Title Section */}
        <div className="max-w-4xl mx-auto mt-4 sm:mt-8 justify-center">
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center justify-center">
              <h1 className="text-5xl sm:text-7xl md:text-[100px] leading-tight md:leading-[80px] font-extrabold text-[#383838] tracking-tight text-center md:text-left">
                MLB
              </h1>
              <div className="font-light italic text-2xl sm:text-3xl md:text-4xl mx-auto md:mx-0 md:ml-5 mt-1 text-center md:text-left">
                <div>2021</div>
                <div>2024</div>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-[100px] leading-tight md:leading-[80px] font-extrabold text-[#383838] tracking-tight text-center md:text-left md:ml-4">
                SPENDING
              </h1>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center mt-2 md:mt-0">
              <h1 className="text-6xl sm:text-8xl md:text-[120px] leading-tight md:leading-[80px] font-extrabold text-[#383838] tracking-tight text-center md:text-left">
                EFFICI
              </h1>
              <div className="flex items-center justify-center mx-2 my-2 md:my-0">
                <img
                  src="https://www.mlbstatic.com/team-logos/league-on-dark/1.svg"
                  alt="MLB Logo"
                  className="w-32 sm:w-36 md:w-44 h-16 sm:h-20 md:h-24 object-contain"
                />
              </div>
              <h1 className="text-6xl sm:text-8xl md:text-[120px] leading-tight md:leading-[80px] font-extrabold text-[#383838] tracking-tight text-center md:text-left">
                ENCY
              </h1>
            </div>
          </div>

          {/* Authors and Description */}
          <div className="flex items-center justify-center">
            <div className="max-w-full sm:max-w-[52rem] text-center mt-6 sm:mt-10 text-xs sm:text-base font-light px-4 sm:px-0">
              ⓒ Jimin Kim | Brendan Sallee | William King | Anita Nwude-Chenge
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-4 sm:px-0">
            <p className="max-w-full sm:max-w-[52rem] text-sm sm:text-base font-light mt-4 sm:mt-6 mb-4 sm:mb-6">
              Major League Baseball (MLB) is unique in the fact that teams do not have a cap for how
              much they can pay their players, so each team can spend as much as they want on player
              salaries. This can be a bit controversial, because fans might begin to think that the
              team that spends the most money is guaranteed to win the most. History shows that this
              is not always the case, and thus the purpose of this visualization is to present users
              with data that tells the story of what teams are most successful at efficiently
              spending money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
