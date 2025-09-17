// Hamro Awaz - Poll Data Collection Server
// Simple Node.js server to collect poll responses

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Data storage file
const DATA_FILE = 'poll_data.json';

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({
        pollResponses: [],
        demographics: [],
        serverStats: {
            totalResponses: 0,
            totalDemographics: 0,
            startTime: new Date().toISOString()
        }
    }, null, 2));
}

// API Routes

// Get all poll data
app.get('/api/poll-data', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read poll data' });
    }
});

// Submit poll response
app.post('/api/poll-responses', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        
        const responseData = {
            ...req.body,
            timestamp: new Date().toISOString(),
            ip: req.ip || req.connection.remoteAddress
        };
        
        data.pollResponses.push(responseData);
        data.serverStats.totalResponses++;
        
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        
        console.log('Poll response received:', responseData);
        res.json({ success: true, message: 'Response saved successfully' });
        
    } catch (error) {
        console.error('Error saving poll response:', error);
        res.status(500).json({ error: 'Failed to save poll response' });
    }
});

// Submit demographic data
app.post('/api/demographics', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        
        const demographicData = {
            ...req.body,
            timestamp: new Date().toISOString(),
            ip: req.ip || req.connection.remoteAddress
        };
        
        data.demographics.push(demographicData);
        data.serverStats.totalDemographics++;
        
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        
        console.log('Demographic data received:', demographicData);
        res.json({ success: true, message: 'Demographic data saved successfully' });
        
    } catch (error) {
        console.error('Error saving demographic data:', error);
        res.status(500).json({ error: 'Failed to save demographic data' });
    }
});

// Get statistics
app.get('/api/statistics', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        
        const stats = {
            totalResponses: data.pollResponses.length,
            totalDemographics: data.demographics.length,
            pollsByCategory: {},
            responsesByCountry: {},
            responsesByAge: {},
            responsesByAffiliation: {},
            responsesByResidence: {},
            responseTimeline: [],
            serverStats: data.serverStats
        };
        
        // Analyze responses by category
        data.pollResponses.forEach(response => {
            if (response.category) {
                if (!stats.pollsByCategory[response.category]) {
                    stats.pollsByCategory[response.category] = 0;
                }
                stats.pollsByCategory[response.category]++;
            }
            
            if (response.userCountry) {
                if (!stats.responsesByCountry[response.userCountry]) {
                    stats.responsesByCountry[response.userCountry] = 0;
                }
                stats.responsesByCountry[response.userCountry]++;
            }
            
            // Timeline
            const date = response.timestamp.split('T')[0];
            const timelineItem = stats.responseTimeline.find(item => item.date === date);
            if (timelineItem) {
                timelineItem.count++;
            } else {
                stats.responseTimeline.push({ date: date, count: 1 });
            }
        });
        
        // Analyze demographics
        data.demographics.forEach(demo => {
            if (demo.ageGroup) {
                if (!stats.responsesByAge[demo.ageGroup]) {
                    stats.responsesByAge[demo.ageGroup] = 0;
                }
                stats.responsesByAge[demo.ageGroup]++;
            }
            
            if (demo.affiliation) {
                if (!stats.responsesByAffiliation[demo.affiliation]) {
                    stats.responsesByAffiliation[demo.affiliation] = 0;
                }
                stats.responsesByAffiliation[demo.affiliation]++;
            }
            
            if (demo.residence) {
                if (!stats.responsesByResidence[demo.residence]) {
                    stats.responsesByResidence[demo.residence] = 0;
                }
                stats.responsesByResidence[demo.residence]++;
            }
        });
        
        res.json(stats);
        
    } catch (error) {
        console.error('Error generating statistics:', error);
        res.status(500).json({ error: 'Failed to generate statistics' });
    }
});

// Export data as CSV
app.get('/api/export/csv', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        
        // Convert to CSV format
        let csv = 'Poll ID,Question,Category,Response,Timestamp,User Country,Session ID\n';
        
        data.pollResponses.forEach(response => {
            csv += `"${response.pollId}","${response.question}","${response.category}","${response.response}","${response.timestamp}","${response.userCountry}","${response.sessionId}"\n`;
        });
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="hamroawaz_poll_data.csv"');
        res.send(csv);
        
    } catch (error) {
        console.error('Error exporting CSV:', error);
        res.status(500).json({ error: 'Failed to export CSV' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'hamroawaz.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Hamro Awaz Poll Server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
    console.log(`API endpoints:`);
    console.log(`  GET  /api/poll-data - Get all poll data`);
    console.log(`  POST /api/poll-responses - Submit poll response`);
    console.log(`  POST /api/demographics - Submit demographic data`);
    console.log(`  GET  /api/statistics - Get poll statistics`);
    console.log(`  GET  /api/export/csv - Export data as CSV`);
});

module.exports = app;
