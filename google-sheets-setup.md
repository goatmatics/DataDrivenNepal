# 📊 Google Sheets Setup (Most Secure Option)

## Why Google Sheets is Better for Your Use Case:
- ✅ **No tokens in your code** - completely secure
- ✅ **Easy to set up** - just create a sheet and get a public URL
- ✅ **Real-time data** - see responses as they come in
- ✅ **Easy analysis** - built-in charts and filtering
- ✅ **Export options** - download as Excel, CSV, etc.

## 🚀 Quick Setup (5 minutes):

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Hamro Awaz Poll Responses"
4. Add these headers in row 1:
   - A1: `Timestamp`
   - B1: `Poll ID` 
   - C1: `Question`
   - D1: `Category`
   - E1: `Response`
   - F1: `User Country`
   - G1: `Language`
   - H1: `Session ID`

### Step 2: Make Sheet Public
1. Click "Share" button (top right)
2. Click "Change to anyone with the link"
3. Set permission to "Editor" (so the script can add rows)
4. Copy the shareable link

### Step 3: Get Sheet ID
From your sheet URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
Copy the `SHEET_ID_HERE` part

### Step 4: Update Your Config
Edit `config.js` and uncomment the Google Sheets section:

```javascript
window.GOOGLE_SHEETS_CONFIG = {
    sheetId: 'YOUR_SHEET_ID_HERE',  // Replace with your sheet ID
    apiKey: 'YOUR_API_KEY_HERE'     // You can get this from Google Cloud Console
};
```

### Step 5: Get Google API Key (Optional)
If you want to use the API key method:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create credentials (API Key)
5. Restrict the key to Google Sheets API only

## 🎯 Alternative: Use Google Apps Script (Even Easier!)

Instead of API keys, you can use Google Apps Script:

### Step 1: Create Apps Script
1. In your Google Sheet, go to Extensions → Apps Script
2. Replace the default code with this:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.pollId,
    data.question,
    data.category,
    data.response,
    data.userCountry,
    data.language,
    data.sessionId
  ]);
  
  return ContentService.createTextOutput("Success");
}
```

### Step 2: Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as type
3. Set access to "Anyone"
4. Copy the web app URL

### Step 3: Update Your Website
Use the webhook method instead:

```javascript
window.WEBHOOK_CONFIG = {
    webhookUrl: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
    options: {}
};
```

## 🎉 Result:
- Every poll response adds a new row to your Google Sheet
- No tokens or sensitive data in your code
- Real-time updates as people submit polls
- Easy to analyze with charts and filters
- Can share the sheet with others if needed

## 🔒 Security Benefits:
- No API keys in your repository
- Google handles authentication
- You control who can see the data
- Can revoke access anytime
