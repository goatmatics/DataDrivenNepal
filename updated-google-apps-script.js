// Updated Google Apps Script for Hamro Awaz Polling Platform
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
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data received and saved successfully',
        timestamp: new Date().toISOString(),
        rowCount: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing request:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Hamro Awaz Polling Platform Webhook',
      status: 'active',
      timestamp: new Date().toISOString(),
      instructions: 'Send POST requests with poll data to this endpoint'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to verify the script is working
function testScript() {
  const testData = {
    pollId: 'test_poll',
    response: 'test_response',
    question: 'Test Question',
    category: 'Test',
    timestamp: new Date().toISOString(),
    sessionId: 'test_session',
    userCountry: 'Nepal',
    userAgent: 'Test Agent',
    language: 'en'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
  return result;
}
