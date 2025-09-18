// SIMPLIFIED Google Apps Script Code for Hamro Awaz Poll Collection
// Copy this code into your Google Apps Script project if the original isn't working

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Log the incoming data for debugging
    console.log('Received data:', e.postData.contents);
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Log the parsed data
    console.log('Parsed data:', data);
    
    // Add a new row with the poll data
    const newRow = [
      new Date(),                    // Timestamp
      data.pollId || 'unknown',      // Poll ID
      data.question || 'unknown',    // Question
      data.category || 'unknown',    // Category
      data.response || 'unknown',    // Response
      data.userCountry || 'unknown', // User Country
      data.language || 'unknown',    // Language
      data.sessionId || 'unknown',   // Session ID
      data.userAgent || 'unknown'    // User Agent
    ];
    
    // Append the row
    sheet.appendRow(newRow);
    
    // Log success
    console.log('Row added successfully:', newRow);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true, 
        message: 'Poll data saved successfully',
        rowAdded: newRow
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error
    console.error('Error:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: error.toString(),
        message: 'Failed to save poll data'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testScript() {
  const testData = {
    pollId: 'test_poll_1',
    question: 'Test question',
    category: 'Test Category',
    response: 'test_response',
    userCountry: 'Nepal',
    language: 'en-US',
    sessionId: 'test_session_123',
    userAgent: 'Test Browser'
  };
  
  const result = doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });
  
  console.log('Test result:', result.getContent());
  return result.getContent();
}
