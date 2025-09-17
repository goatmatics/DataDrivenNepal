# Hamro Awaz - Political Polling Platform

A comprehensive political polling platform for Nepal, featuring 20 detailed polls covering current political issues, electoral reforms, and demographic analysis.

## Features

### 🗳️ **Comprehensive Political Survey**
- **20 Detailed Polls** covering Nepal's current political situation
- **September 2025 Crisis Analysis** - Public opinion on government response
- **Electoral Reforms** - Direct elections, term limits, federalism
- **Anti-Corruption Strategies** - Public preferences for governance reform
- **Youth Leadership** - Integration and participation strategies
- **Economic Development** - Job creation and foreign relations
- **Demographics** - Age, residence, political affiliation tracking

### 📊 **Live Data Collection**
- **Real-time Statistics** - Visitor count, countries, poll completions
- **Data Persistence** - Local storage with server backup
- **Export Functionality** - JSON and CSV data export
- **Analytics Dashboard** - Comprehensive response analysis

### 🎨 **Modern Design**
- **Nepal-Inspired Theme** - Mountain icon, dark crimson accents
- **Responsive Design** - Works on all devices
- **Interactive Maps** - User location tracking
- **Clean UI** - Minimalist design with teal hover effects

## Quick Start

### Option 1: Static Website (GitHub Pages)
1. Open `hamroawaz.html` in your browser
2. All data is stored locally in browser storage
3. Use the export button (bottom-right) to download data

### Option 2: Full Server Setup (Recommended)
1. **Install Node.js** (version 14 or higher)
2. **Install dependencies:**
   ```bash
   npm install express cors
   ```
3. **Start the server:**
   ```bash
   node server.js
   ```
4. **Visit:** `http://localhost:3001`

## Data Collection System

### 📝 **Poll Response Data**
Each poll response includes:
- Poll ID and question text
- Selected answer and category
- Timestamp and session ID
- User country (detected)
- Browser information

### 👥 **Demographic Data**
- Age group and occupation
- Current residence (Nepal urban/rural, diaspora)
- Political affiliation
- Geographic distribution

### 📈 **Analytics Available**
- Responses by category
- Geographic distribution
- Age group analysis
- Political affiliation breakdown
- Response timeline
- Most popular answers

## API Endpoints

When running the server, these endpoints are available:

- `GET /api/poll-data` - Get all collected data
- `POST /api/poll-responses` - Submit poll response
- `POST /api/demographics` - Submit demographic data
- `GET /api/statistics` - Get comprehensive statistics
- `GET /api/export/csv` - Export data as CSV

## Data Export

### Local Export
- **JSON Format** - Complete dataset with metadata
- **CSV Format** - Spreadsheet-compatible format
- **Real-time Updates** - Data updates automatically

### Server Export
- **Database Storage** - Persistent data collection
- **API Access** - Programmatic data retrieval
- **Statistics Dashboard** - Real-time analytics

## Poll Categories

1. **Political Crisis** - September 2025 handling assessment
2. **Root Causes** - Primary triggers analysis
3. **Stability Assessment** - Political stability rating
4. **Youth Movement** - Gen Z influence evaluation
5. **Interim Government** - Priorities and effectiveness
6. **Electoral Timeline** - Early elections preference
7. **Victim Support** - Compensation and justice
8. **Electoral System** - Direct election preferences
9. **Electoral Reform** - Trustworthiness improvements
10. **Term Limits** - Power concentration prevention
11. **Federalism** - System retention/modification
12. **Anti-Corruption** - Strategy effectiveness
13. **Youth Leadership** - Integration methods
14. **Economic Development** - Job creation strategies
15. **Foreign Relations** - India-China balance
16. **Demographics** - Residence, age, affiliation

## Technical Details

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS variables
- **JavaScript ES6+** - Interactive functionality
- **Leaflet.js** - Interactive maps
- **Local Storage** - Client-side data persistence

### Backend (Optional)
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **JSON Storage** - File-based data persistence

## Deployment Options

### GitHub Pages
1. Push files to GitHub repository
2. Enable GitHub Pages in repository settings
3. Access via `https://username.github.io/repository-name`

### Vercel/Netlify
1. Connect GitHub repository
2. Deploy with default settings
3. Add server functionality if needed

### Custom Server
1. Deploy Node.js server to hosting provider
2. Configure environment variables
3. Set up database for production use

## Data Privacy

- **No Personal Information** - Only anonymous responses
- **Local Storage** - Data stays in user's browser
- **Optional Server** - Can run completely offline
- **Export Control** - Users control their data

## Contributing

This platform is designed for public opinion collection on Nepal's political situation. Feel free to:
- Add new poll questions
- Improve the UI/UX
- Enhance data analytics
- Add new features

## License

MIT License - Feel free to use and modify for your needs.

## Contact

**Upendra Bhattarai**
- Email: upendrarajbhattarai@gmail.com
- GitHub: @upendrabhattarai
- Twitter: @Bhattarai_UR

---

*Hamro Awaz - Voice of the Himalayas, From Nepal to the World*
