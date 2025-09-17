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
const TSV_FILE = 'poll_data.tsv';

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

// Initialize TSV file with header if it doesn't exist
function ensureTsvHeader() {
    if (!fs.existsSync(TSV_FILE)) {
        const header = [
            'type',
            'pollId',
            'question',
            'category',
            'response',
            'ageGroup',
            'residence',
            'affiliation',
            'timestamp',
            'sessionId',
            'userCountry',
            'ip',
            'userAgent',
            'language'
        ].join('\t') + '\n';
        fs.writeFileSync(TSV_FILE, header, 'utf8');
    }
}

function tsvEscape(value) {
    if (value === undefined || value === null) return '';
    const str = String(value).replace(/\r?\n|\r/g, ' ');
    return str.includes('\t') ? str.replace(/\t/g, ' ') : str;
}

function appendTsvRow(obj) {
    ensureTsvHeader();
    const fields = [
        tsvEscape(obj.type || ''),
        tsvEscape(obj.pollId || ''),
        tsvEscape(obj.question || ''),
        tsvEscape(obj.category || ''),
        tsvEscape(obj.response || ''),
        tsvEscape(obj.ageGroup || ''),
        tsvEscape(obj.residence || ''),
        tsvEscape(obj.affiliation || ''),
        tsvEscape(obj.timestamp || ''),
        tsvEscape(obj.sessionId || ''),
        tsvEscape(obj.userCountry || ''),
        tsvEscape(obj.ip || ''),
        tsvEscape(obj.userAgent || ''),
        tsvEscape(obj.language || '')
    ];
    fs.appendFileSync(TSV_FILE, fields.join('\t') + '\n', 'utf8');
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
            ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || req.ip || req.connection.remoteAddress
        };
        
        data.pollResponses.push(responseData);
        data.serverStats.totalResponses++;
        
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        appendTsvRow({ type: 'poll', ...responseData });
        
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
            ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || req.ip || req.connection.remoteAddress
        };
        
        data.demographics.push(demographicData);
        data.serverStats.totalDemographics++;
        
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        appendTsvRow({ type: 'demographics', ...demographicData });
        
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

// Export data as TSV (tab-delimited)
app.get('/api/export/tsv', (req, res) => {
    try {
        ensureTsvHeader();
        const stream = fs.createReadStream(TSV_FILE);
        res.setHeader('Content-Type', 'text/tab-separated-values');
        res.setHeader('Content-Disposition', 'attachment; filename="hamroawaz_poll_data.tsv"');
        stream.pipe(res);
    } catch (error) {
        console.error('Error exporting TSV:', error);
        res.status(500).json({ error: 'Failed to export TSV' });
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
    console.log(`  GET  /api/export/tsv - Export data as TSV`);
});

module.exports = app;
