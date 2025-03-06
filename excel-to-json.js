const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Path to your Excel file - adjust as needed
const excelFilePath = path.join(__dirname, 'public', 'cleaned mlb_team_stats.xlsx');

// Path where you want to save the JSON output
const jsonOutputPath = path.join(__dirname, 'src', 'data', 'mlb_data.json');

// Convert Excel to JSON
try {
  // Make sure the directory exists
  const dataDir = path.join(__dirname, 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);
  
  // Get the first sheet
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(sheet);
  
  // Write to a JSON file
  fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonData, null, 2));
  
  console.log(`Successfully converted Excel file to JSON. Saved at: ${jsonOutputPath}`);
} catch (error) {
  console.error('Error converting Excel to JSON:', error);
}