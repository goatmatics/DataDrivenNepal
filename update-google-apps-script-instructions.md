# Google Apps Script Update Instructions

## Current Issue
Your Google Apps Script is not handling the new location data fields, causing:
1. Column mismatch errors
2. CORS header issues
3. Data not filling all columns

## Solution: Update Your Google Apps Script

### Step 1: Open Your Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Find your existing script for the polling platform
3. Click to open it

### Step 2: Replace the Code
Replace your entire `Code.gs` file with this updated code:

```javascript
// Updated Google Apps Script for DataDriven Nepal Polling Platform
// This script receives poll data and appends it to a Google Sheet

function doPost(e) {
  try {
    // Set CORS headers
    const response = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      }
    };
    
    // Handle preflight OPTIONS request
    if (e.parameter && e.parameter.method === 'OPTIONS') {
      return ContentService.createTextOutput('')
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(response.headers);
    }
    
    // Log the incoming request for debugging
    console.log('Received request:', e);
    console.log('Post data:', e.postData);
    
    // Get the data from the request
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data);
    } else {
      throw new Error('No data received');
    }
    
    console.log('Parsed data:', data);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // If this is the first row, add headers
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Poll ID',
        'Response',
        'Question',
        'Category',
        'Session ID',
        'User Country',
        'User State',
        'User City',
        'Latitude',
        'Longitude',
        'Timezone',
        'IP Address',
        'Country Code',
        'Region Code',
        'User Agent',
        'Language'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.pollId || 'unknown',
      data.response || 'no_response',
      data.question || 'no_question',
      data.category || 'no_category',
      data.sessionId || 'no_session',
      data.userCountry || 'unknown',
      data.userState || 'unknown',
      data.userCity || 'unknown',
      data.latitude || 'unknown',
      data.longitude || 'unknown',
      data.timezone || 'unknown',
      data.ip || 'unknown',
      data.countryCode || 'unknown',
      data.regionCode || 'unknown',
      data.userAgent || 'unknown',
      data.language || 'unknown'
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    console.log('Data appended successfully:', rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data received and saved successfully',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(response.headers);
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    });
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    message: 'DataDriven Nepal Polling Platform - Google Apps Script is running',
    timestamp: new Date().toISOString(),
    status: 'active'
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  });
}
```

### Step 3: Save and Deploy
1. **Save** the script (Ctrl+S or Cmd+S)
2. **Deploy** as a web app:
   - Click "Deploy" → "New deployment"
   - Choose "Web app" as the type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
3. **Copy the new web app URL** (it should be the same as your current one)

### Step 4: Test the Connection
1. Go to your test page: http://localhost:3000/test-location-detection.html
2. Submit a test poll on: http://localhost:3000/hamroawaz.html
3. Check your Google Sheet for the new data

## Expected Results

After updating, your Google Sheet should receive data in this format:

| Timestamp | Poll ID | Response | Question | Category | Session ID | User Country | User State | User City | Latitude | Longitude | Timezone | IP Address | Country Code | Region Code | User Agent | Language |
|-----------|---------|----------|----------|----------|------------|--------------|------------|-----------|----------|-----------|----------|------------|--------------|-------------|------------|----------|
| 2024-09-19T15:47:43.000Z | poll2 | Very satisfied | How satisfied are you... | Political Crisis | sess_123 | US | Connecticut | East Hampton | 41.5733 | -72.5042 | America/New_York | 73.218.62.35 | US | CT | Mozilla/5.0... | en-US |

## Troubleshooting

If you still have issues:
1. **Check the script logs** in Google Apps Script editor
2. **Verify the web app URL** is correct in your config.js
3. **Test with a simple poll submission**
4. **Check browser console** for any remaining errors

## Need Help?

If you need assistance updating the script, let me know and I can provide more detailed step-by-step instructions.
