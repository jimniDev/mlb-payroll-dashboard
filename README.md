# MLB SPENDING EFFICIENCY DASHBOARD (2021~ 2024)
ⓒ Jimin Kim | Brendan Sallee | William King | Anita Nwude-Chenge

A comprehensive data visualization dashboard analyzing Major League Baseball team spending efficiency and performance from 2021 to 2024.

**Live Demo**: [https://jimnidev.github.io/mlb-payroll-dashboard/](https://jimnidev.github.io/mlb-payroll-dashboard/)

**Course**: HCDE 511 - Information Visualization (2025) of University of Washington


## 📊 Project Overview

Major League Baseball (MLB) is unique in the fact that teams do not have a cap for how much they can pay their players, so each team can spend as much as they want on player salaries. This can be a bit controversial, because fans might begin to think that the team that spends the most money is guaranteed to win the most. History shows that this is not always the case, and thus the purpose of this visualization is to present users with data that tells the story of what teams are most successful at efficiently spending money.

### Key Features

- **Interactive Visualizations**: Multiple chart types including scatter plots, bar charts, and line graphs
- **Multi-Tab Interface**: Three distinct views for different user personas
- **Comprehensive Metrics**: Analyzes payroll, wins, cost per win, and playoff performance
- **Team-Specific Analysis**: Detailed breakdowns for individual teams
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🏗️ Architecture

### Technology Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts library
- **Data Processing**: Lodash
- **External Visualizations**: Tableau Public integrations
- **Build Tool**: Create React App

### Project Structure

```
src/
├── components/
│   ├── common/           # Reusable components
│   ├── overviewTab/      # Overview tab components
│   ├── efficiencyTab/    # Efficiency analysis components
│   └── teamDetailsTab/   # Team-specific components
├── data/
│   └── mlb_data.json     # MLB statistics dataset
├── hooks/
│   └── useMLBData.js     # Custom data processing hook
└── utils/
    ├── formatters.js     # Data formatting utilities
    └── teamColors.js     # Team branding utilities
```

## 📱 User Interface

### Tab Structure

1. **Overview Tab** - Perfect for casual fans
   - Team payroll rankings
   - Spending vs. performance scatter plots
   - Interactive baseball field diagram
   - Success flow visualization

2. **Efficiency Analysis Tab** - For engaged fans
   - Cost per win analysis
   - League efficiency comparisons
   - Spending allocation breakdowns
   - WAR (Wins Above Replacement) analysis

3. **Team Details Tab** - For analytics-driven fans
   - Individual team deep dives
   - Historical spending trends
   - Efficiency rankings
   - Performance summaries

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jimnidev/mlb-payroll-dashboard.git
cd mlb-payroll-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📊 Data Sources

The dashboard uses MLB team statistics from 2021-2024, including:

- **Financial Data**: Total payroll allocation, active roster costs, injured reserve costs
- **Performance Metrics**: Wins, losses, playoff appearances, World Series victories
- **Advanced Statistics**: WAR, OPS, ERA, and other sabermetrics
- **Team Information**: League, division, roster composition

### Data Processing

The `useMLBData` hook processes raw data to calculate:
- Cost per win efficiency metrics
- Multi-year team averages
- Playoff success rates
- Historical spending trends

## 🎨 Design System

### Color Palette
- Primary: Navy Blue (`#041E42`)
- Secondary: Gray scale for backgrounds
- Team Colors: Official MLB team color schemes
- Accent: Performance-based color coding (green for efficient, red for inefficient)

### Typography
- Primary Font: Open Sans
- Header Font: Extrabold weights for impact
- Body Text: Light to regular weights for readability

### Interactive Elements
- Hover states on all charts and buttons
- Smooth transitions and animations
- Responsive tooltip information
- Color-coded performance indicators

## 🔧 Customization

### Adding New Visualizations

1. Create component in appropriate tab folder
2. Import required chart library components
3. Connect to data via `useMLBData` hook
4. Add to tab's main component

### Extending Data Analysis

The `useMLBData` hook can be extended to include additional metrics:

```javascript
// Example: Adding new calculated field
const processedData = mlbData.map(row => ({
  ...row,
  "Custom Metric": row["Field1"] / row["Field2"]
}));
```

### Team Branding

Team colors and logos are managed in `src/utils/teamColors.js`. Update these files to modify team visual representation.

## 📈 Performance Considerations

- **Data Loading**: All data is bundled and processed client-side for fast initial load
- **Chart Rendering**: Recharts provides optimized SVG rendering
- **Responsive Design**: Tailwind CSS ensures efficient responsive layouts
- **Code Splitting**: Components are organized for potential lazy loading

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling consistency
- Ensure responsive design across all viewports
- Add appropriate comments for complex data transformations
- Test thoroughly across different browsers

---

*Built with ⚾ and ❤️ for baseball analytics enthusiasts*
