import React, { useState } from 'react';

const BaseballFieldDiagram = () => {
  const [selectedPosition, setSelectedPosition] = useState('RP');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState('');

  const positions = [
    {
      id: 'SP',
      name: 'Starting Pitcher',
      abbr: 'SP',
      x: 483,
      y: 483,
      info: 'Pitches to batters, trying to get them out.',
    },
    {
      id: 'RP',
      name: 'Relief Pitcher',
      abbr: 'RP',
      x: 330,
      y: 650,
      info: 'Replaces the starting pitcher later in the game when they tire or become ineffective.',
    },
    {
      id: 'C',
      name: 'Catcher',
      abbr: 'C',
      x: 483,
      y: 650,
      info: 'Receives pitches, calls the game, and defends home plate.',
    },
    {
      id: '1B',
      name: 'First Baseman',
      abbr: '1B',
      x: 650,
      y: 420,
      info: 'Defends first base and fields balls hit to the right side of the infield.',
    },
    {
      id: '2B',
      name: 'Second Baseman',
      abbr: '2B',
      x: 533,
      y: 300,
      info: 'Covers second base and fields balls hit up the middle.',
    },
    {
      id: '3B',
      name: 'Third Baseman',
      abbr: '3B',
      x: 286,
      y: 453,
      info: 'Defends third base and fields balls hit to the left side of the infield.',
    },
    {
      id: 'SS',
      name: 'Shortstop',
      abbr: 'SS',
      x: 383,
      y: 350,
      info: 'Fields balls hit between second and third base, covers second base on steals.',
    },
    {
      id: 'LF',
      name: 'Left Fielder',
      abbr: 'LF',
      x: 200,
      y: 175,
      info: 'Catches fly balls and fields ground balls in left field.',
    },
    {
      id: 'CF',
      name: 'Center Fielder',
      abbr: 'CF',
      x: 483,
      y: 90,
      info: 'Covers the most ground in the outfield, catches fly balls in center.',
    },
    {
      id: 'RF',
      name: 'Right Fielder',
      abbr: 'RF',
      x: 766,
      y: 175,
      info: 'Catches fly balls and fields ground balls in right field.',
    },
    {
      id: 'DH',
      name: 'Designated Hitter',
      abbr: 'DH',
      x: 630,
      y: 650,
      info: 'Bats in place of the pitcher in the American League.',
    },
  ];

  const handlePositionClick = (position) => {
    setSelectedPosition(position.id === selectedPosition ? null : position.id);
  };

  const handlePositionHover = (position, event) => {
    setTooltipContent(`${position.name} (${position.abbr})`);
    setTooltipPos({
      x: event.clientX,
      y: event.clientY,
    });
    setShowTooltip(true);
  };

  const handlePositionLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="mt-6">
        <svg viewBox="0 0 966 800" className="w-full">
          {/* Outfield Background with Grass Stripes */}
          <defs>
            <pattern
              id="grassPattern"
              patternUnits="userSpaceOnUse"
              width="60"
              height="60"
              patternTransform="rotate(45)"
            >
              <rect width="30" height="60" fill="#4a8e35" />
              <rect x="30" width="30" height="60" fill="#3c7a2c" />
            </pattern>
          </defs>
          <path d="M0 250 L483 733 L966 250 A600 600 0 0 0 0 250" fill="url(#grassPattern)" />

          {/* Outfield Wall */}
          <path
            d="M0 250 L483 733 L966 250 A600 600 0 0 0 0 250"
            fill="none"
            stroke="#a86c4e"
            strokeWidth="15"
          />

          {/* Infield Dirt */}
          <path d="M473 483 L483 333 L683 483 L483 673 L283 483 Z" fill="#c87f46" />
          {/*      M483 483 L483 333 L633 483 L483 633 L333 483 Z */}

          {/* Circular Sector replacing full circle - 180° sector from 3B to 1B */}
          <path d="M 483 483 L 283 483 A 200 200 0 0 1 683 483 Z" fill="#c87f46" />

          {/* Infield Grass with Stripes */}
          <path d="M483 333 L633 483 L483 633 L333 483 Z" fill="url(#grassPattern)" />

          {/* Fair Territory Line (Foul Lines) */}
          <line x1="483" y1="733" x2="0" y2="250" stroke="white" strokeWidth="3" />
          <line x1="483" y1="733" x2="966" y2="250" stroke="white" strokeWidth="3" />

          {/* Base Paths - Smaller Infield */}
          {/* 1B ~ 2B */}
          <line x1="483" y1="333" x2="633" y2="483" stroke="white" strokeWidth="5" />
          {/* H ~ 1B */}
          <line x1="633" y1="483" x2="483" y2="633" stroke="white" strokeWidth="5" />
          {/* 3B ~  H */}
          <line x1="483" y1="633" x2="333" y2="483" stroke="white" strokeWidth="5" />
          {/* 2B~3B */}
          <line x1="333" y1="483" x2="483" y2="333" stroke="white" strokeWidth="5" />

          {/* Pitcher's Mound */}
          <circle cx="483" cy="483" r="40" fill="#b46b3a" />
          <rect x="473" y="478" width="20" height="10" fill="white" />

          {/* Bases - Positioned at correct corners */}
          {/* 2nd Base */}
          <rect
            x="473"
            y="323"
            width="20"
            height="20"
            fill="white"
            transform="rotate(45, 483, 333)"
          />
          {/* 1st Base */}
          <rect
            x="623"
            y="473"
            width="20"
            height="20"
            fill="white"
            transform="rotate(45, 633, 483)"
          />
          {/* Home Plate */}
          <path d="M483 650 L463 630 L483 610 L503 630 Z" fill="white" />
          <rect x="463" y="630" width="40" height="20" fill="white" />
          {/* 3rd Base */}
          <rect
            x="323"
            y="473"
            width="20"
            height="20"
            fill="white"
            transform="rotate(45, 333, 483)"
          />

          {/* Home Plate */}
          <path d="M483 680 L463 650 L483 630 L503 650 Z" fill="white" />
          <rect x="463" y="650" width="40" height="30" fill="white" />

          {/* Batter's Boxes */}
          <rect x="403" y="650" width="50" height="80" fill="none" stroke="white" strokeWidth="2" />
          <rect x="513" y="650" width="50" height="80" fill="none" stroke="white" strokeWidth="2" />

          {/* Catcher's Box */}
          <path d="M453 680 A30 30 0 0 0 513 680" fill="none" stroke="white" strokeWidth="2" />

          {/* On-Deck Circles */}
          <circle cx="363" cy="700" r="20" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="603" cy="700" r="20" fill="none" stroke="white" strokeWidth="2" />

          {/* Position Labels */}
          {positions.map((position) => (
            <g
              key={position.id}
              onClick={() => handlePositionClick(position)}
              onMouseEnter={(e) => handlePositionHover(position, e)}
              onMouseLeave={handlePositionLeave}
              className="cursor-pointer"
            >
              <circle
                cx={position.x}
                cy={position.y}
                r={selectedPosition === position.id ? 55 : 45}
                fill={selectedPosition === position.id ? '#FFD700' : 'rgba(255, 255, 255, 0.8)'}
                stroke="#333"
                strokeWidth="2"
                className="transition-all duration-300"
              />
              <text
                x={position.x}
                y={position.y + 5}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#333"
                fontWeight="bold"
                fontSize="36"
              >
                {position.abbr}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Position Information Box */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Click on any position to learn more about it
      </div>
      {selectedPosition && (
        <div className="mt-4 p-4 bg-white rounded border-2 border-gray-200">
          <h3 className="text-xl font-bold text-green-800">
            {positions.find((p) => p.id === selectedPosition).name}
            <span className="ml-2 text-gray-500">({selectedPosition})</span>
          </h3>
          <p className="mt-2">{positions.find((p) => p.id === selectedPosition).info}</p>
        </div>
      )}
    </div>
  );
};

export default BaseballFieldDiagram;
