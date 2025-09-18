// Google Sheets Poll Data Collector
// This script sends poll responses to a Google Sheet

class GoogleSheetsCollector {
    constructor(sheetId, apiKey) {
        this.sheetId = sheetId;
        this.apiKey = apiKey;
        this.sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:append`;
    }

    async submitPollResponse(pollData) {
        try {
            const values = [
                [
                    pollData.timestamp,
                    pollData.pollId,
                    pollData.question,
                    pollData.category,
                    pollData.response,
                    pollData.userCountry,
                    pollData.language,
                    pollData.sessionId,
                    pollData.userAgent
                ]
            ];

            const response = await fetch(`${this.sheetUrl}?valueInputOption=RAW&key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    values: values
                })
            });

            if (response.ok) {
                console.log('Poll response submitted to Google Sheets');
                return await response.json();
            } else {
                throw new Error(`Google Sheets API error: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to submit poll to Google Sheets:', error);
            // Fallback to localStorage
            this.saveToLocalStorage(pollData);
            throw error;
        }
    }

    saveToLocalStorage(pollData) {
        const existingData = JSON.parse(localStorage.getItem('hamroawaz_poll_responses') || '[]');
        existingData.push(pollData);
        localStorage.setItem('hamroawaz_poll_responses', JSON.stringify(existingData));
    }
}

// Usage example:
// const collector = new GoogleSheetsCollector('your_sheet_id', 'your_api_key');
// collector.submitPollResponse(pollData);
