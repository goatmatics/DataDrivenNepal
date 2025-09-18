// Google Apps Script Code for Hamro Awaz Poll Collection
// Copy this code into your Google Apps Script project

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Add a new row with the poll data
    sheet.appendRow([
      new Date(),                    // Timestamp
      data.pollId || '',            // Poll ID
      data.question || '',          // Question
      data.category || '',          // Category
      data.response || '',          // Response
      data.userCountry || '',       // User Country
      data.language || '',          // Language
      data.sessionId || '',         // Session ID
      data.userAgent || ''          // User Agent
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Poll data saved successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Function to test the script
function testScript() {
  const testData = {
    pollId: 'poll1',
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
  
  console.log(result.getContent());
}
