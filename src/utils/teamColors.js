// src/utils/teamColors.js
export const getTeamColor = (teamCode) => {
    // MLB team colors (approximate)
    const teamColors = {
        ARI: "#A71930", ATL: "#CE1141", BAL: "#DF4601", BOS: "#BD3039",
        CHC: "#0E3386", CWS: "#27251F", CIN: "#C6011F", CLE: "#00385D",
        COL: "#333366", DET: "#0C2340", HOU: "#EB6E1F", KC: "#004687",
        LAA: "#BA0021", LAD: "#005A9C", MIA: "#00A3E0", MIL: "#0A2351",
        MIN: "#002B5C", NYM: "#FF5910", NYY: "#0C2340", OAK: "#003831",
        PHI: "#E81828", PIT: "#FDB827", SD: "#2F241D", SF: "#FD5A1E",
        SEA: "#0C2C56", STL: "#C41E3A", TB: "#092C5C", TEX: "#003278",
        TOR: "#134A8E", WSH: "#AB0003"
      };
    
    return teamColors[teamCode] || "#999999";
  };