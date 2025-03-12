// src/components/common/DashboardHeader.jsx
import React from 'react';

const DashboardHeader = () => {
  return (
    <div className="relative w-full bg-white font-sans">
      {/* Header section */}
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex justify-between py-12">
          <div className="uppercase font-bold text-[#383838] text-base">HCDE 511</div>
          <div className="uppercase font-bold text-[#383838] text-base">
            Information Visualization
          </div>
          <div className="uppercase font-bold text-[#383838] text-base">2025</div>
        </div>

        {/* Title Section */}
        <div className="max-w-4xl mx-auto mt-8 justify-center">
          <div className="relative">
            <div className="flex items-center justify-center">
              <h1 className="text-[100px] leading-[80px] font-extrabold text-[#383838] tracking-tight">
                MLB
              </h1>
              <div className="font-light italic text-4xl ml-5 mt-1 ">
                <div>2021</div>
                <div>2024</div>
              </div>
              <h1 className="text-[100px] leading-[80px] font-extrabold text-[#383838] tracking-tight ml-4">
                SPENDING
              </h1>
            </div>
            <div className="flex items-center justify-center">
              <h1 className="justify-center text-[120px] leading-[80px] font-extrabold text-[#383838] tracking-tight">
                EFFICI
              </h1>
              <div className="flex items-center mx-2">
                <img
                  src="https://www.mlbstatic.com/team-logos/league-on-dark/1.svg"
                  alt="MLB Logo"
                  className="mt-2 w-44 h-24 object-contain"
                />
              </div>
              <h1 className="text-[120px] leading-[80px] font-extrabold  text-[#383838] tracking-tight">
                ENCY
              </h1>
            </div>
          </div>

          {/* Authors and Description */}
          <div className="flex items-center justify-center">
            <div className=" max-w-[52rem] text-center mt-10 text-base font-light">
              ⓒ Jimin Kim | Brendan Sallee | William King | Anita Nwude-Chenge
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className=" max-w-[52rem] text-base font-light mt-6 mb-12">
              Major League Baseball (MLB) is unique in the fact that teams do not have a cap for how
              much they can pay their players, so each team can spend as much as they want on player
              salaries. This can be a bit controversial, because fans might begin to think that the
              team that spends the most money is guaranteed to win the most. History shows that this
              is not always the case, and thus the purpose of this visualization is to present users
              with data that tells the story of what teams are most successful at efficiently
              spending money.
            </p>
            <p className="max-w-[52rem] text-base font-light mt-6 mb-12">
              The goals for this data visualization are to be simple enough that someone with
              limited baseball knowledge will understand what the data is telling them, but to also
              have the right variables captured so that someone with a deeper knowledge can extract
              unique insights. Additionally, this data visualization could possibly help inform team
              management about what financial strategies tend to yield the most success in the MLB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
