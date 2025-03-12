// src/utils/teamColors.js
export const getTeamColor = (teamCode) => {
  // MLB team colors (approximate)
  const teamColors = {
    ARI: '#A71930',
    ATL: '#CE1141',
    BAL: '#DF4601',
    BOS: '#BD3039',
    CHC: '#0E3386',
    CWS: '#27251F',
    CIN: '#C6011F',
    CLE: '#00385D',
    COL: '#333366',
    DET: '#0C2340',
    HOU: '#EB6E1F',
    KC: '#004687',
    LAA: '#BA0021',
    LAD: '#005A9C',
    MIA: '#00A3E0',
    MIL: '#0A2351',
    MIN: '#002B5C',
    NYM: '#FF5910',
    NYY: '#0C2340',
    OAK: '#003831',
    PHI: '#E81828',
    PIT: '#FDB827',
    SD: '#2F241D',
    SF: '#FD5A1E',
    SEA: '#0C2C56',
    STL: '#C41E3A',
    TB: '#092C5C',
    TEX: '#003278',
    TOR: '#134A8E',
    WSH: '#AB0003',
  };

  return teamColors[teamCode] || '#999999';
};

export const getTeamLogo = (teamCode) => {
  // MLB team logo URLs using MLB's static domain
  // These are based on MLB's official team ID numbers
  const teamIds = {
    ARI: 109,
    ATL: 144,
    BAL: 110,
    BOS: 111,
    CHC: 112,
    CWS: 145,
    CIN: 113,
    CLE: 114,
    COL: 115,
    DET: 116,
    HOU: 117,
    KC: 118,
    LAA: 108,
    LAD: 119,
    MIA: 146,
    MIL: 158,
    MIN: 142,
    NYM: 121,
    NYY: 147,
    OAK: 133,
    PHI: 143,
    PIT: 134,
    SD: 135,
    SF: 137,
    SEA: 136,
    STL: 138,
    TB: 139,
    TEX: 140,
    TOR: 141,
    WSH: 120,
  };

  // If team code is valid, return the MLB static logo URL
  if (teamIds[teamCode]) {
    return `https://www.mlbstatic.com/team-logos/${teamIds[teamCode]}.svg`;
  }

  // Return a placeholder for unknown teams
  return '/api/placeholder/50/50';
};

// Optional: Get team full names
export const getTeamName = (teamCode) => {
  const teamNames = {
    ARI: 'Arizona Diamondbacks',
    ATL: 'Atlanta Braves',
    BAL: 'Baltimore Orioles',
    BOS: 'Boston Red Sox',
    CHC: 'Chicago Cubs',
    CWS: 'Chicago White Sox',
    CIN: 'Cincinnati Reds',
    CLE: 'Cleveland Guardians',
    COL: 'Colorado Rockies',
    DET: 'Detroit Tigers',
    HOU: 'Houston Astros',
    KC: 'Kansas City Royals',
    LAA: 'Los Angeles Angels',
    LAD: 'Los Angeles Dodgers',
    MIA: 'Miami Marlins',
    MIL: 'Milwaukee Brewers',
    MIN: 'Minnesota Twins',
    NYM: 'New York Mets',
    NYY: 'New York Yankees',
    OAK: 'Oakland Athletics',
    PHI: 'Philadelphia Phillies',
    PIT: 'Pittsburgh Pirates',
    SD: 'San Diego Padres',
    SF: 'San Francisco Giants',
    SEA: 'Seattle Mariners',
    STL: 'St. Louis Cardinals',
    TB: 'Tampa Bay Rays',
    TEX: 'Texas Rangers',
    TOR: 'Toronto Blue Jays',
    WSH: 'Washington Nationals',
  };

  return teamNames[teamCode] || 'Unknown Team';
};
