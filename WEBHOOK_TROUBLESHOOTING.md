# 🔧 Webhook Troubleshooting Guide

## 🚨 Issue: Google Sheets Not Updating

Your poll buttons are working, but data isn't appearing in your Google Sheet. Here's how to fix it:

## 📋 Step-by-Step Troubleshooting

### 1. **Test Webhook Connection**
First, test if your webhook is working:

1. **Open the test page:** `http://localhost:8000/test-webhook-connection.html`
2. **Click "Test Basic Connection"**
3. **Check the results** - you should see ✅ or ❌

### 2. **Check Google Apps Script Setup**

#### A. Verify Your Google Apps Script is Deployed:
1. Go to [Google Apps Script](https://script.google.com)
2. Open your project
3. Click **"Deploy"** → **"New deployment"**
4. Choose **"Web app"** as the type
5. Set **"Execute as"** to **"Me"**
6. Set **"Who has access"** to **"Anyone"**
7. Click **"Deploy"**
8. **Copy the new webhook URL**

#### B. Update Your Webhook URL:
1. Open `config.js`
2. Replace the webhook URL with your new one:
```javascript
window.WEBHOOK_CONFIG = {
    webhookUrl: 'YOUR_NEW_WEBHOOK_URL_HERE',
    options: {}
};
```

### 3. **Update Google Apps Script Code**

Replace your current Google Apps Script code with the updated version:

1. **Open your Google Apps Script project**
2. **Replace all code** with the content from `updated-google-apps-script.js`
3. **Save the project**
4. **Redeploy** the web app

### 4. **Test the Updated Script**

1. **Run the test function:**
   - In Google Apps Script, click **"Run"** → **"testScript"**
   - Check if it adds a test row to your sheet

2. **Check your Google Sheet:**
   - Open your spreadsheet
   - Look for a new row with test data

### 5. **Debug with Browser Console**

1. **Open your polling page**
2. **Open Developer Tools** (F12)
3. **Go to Console tab**
4. **Submit a poll**
5. **Look for these messages:**
   - ✅ "Poll data sent to webhook (no-cors mode)"
   - ✅ "Form submission successful"
   - ❌ Any error messages

### 6. **Common Issues & Solutions**

#### Issue: "No webhook config found"
**Solution:** Check that `config.js` is loaded and `WEBHOOK_CONFIG` is set

#### Issue: "Webhook submission failed"
**Solutions:**
- Verify webhook URL is correct
- Check Google Apps Script is deployed
- Ensure "Anyone" has access to the web app

#### Issue: "Form submission also failed"
**Solutions:**
- Check internet connection
- Verify Google Apps Script is active
- Try redeploying the web app

#### Issue: Data appears in sheet but with wrong format
**Solutions:**
- Check the Google Apps Script code
- Verify the sheet headers are correct
- Look at the data structure being sent

### 7. **Manual Test**

Test your webhook manually:

1. **Open:** `http://localhost:8000/test-webhook-connection.html`
2. **Click all three test buttons:**
   - "Test Basic Connection"
   - "Test Poll Data"
   - "Test Form Method"
3. **Check your Google Sheet** for new rows

### 8. **Verify Sheet Permissions**

Make sure your Google Sheet:
1. **Is shared** with your Google account
2. **Has edit permissions** for the script
3. **Is the active sheet** in the Apps Script project

## 🔍 Debug Information

### Check These Files:
- ✅ `config.js` - Webhook URL configuration
- ✅ `js/hamroawaz.js` - Webhook sending code
- ✅ `updated-google-apps-script.js` - Updated script code
- ✅ `test-webhook-connection.html` - Test page

### Expected Console Messages:
```
✅ Sending data to webhook: https://script.google.com/...
✅ Data being sent: {pollId: "poll1", response: "option1", ...}
✅ Poll data sent to webhook (no-cors mode)
```

### Expected Google Sheet Headers:
```
Timestamp | Poll ID | Response | Question | Category | Session ID | User Country | User Agent | Language
```

## 🆘 Still Not Working?

If you're still having issues:

1. **Check the Google Apps Script logs:**
   - Go to Google Apps Script
   - Click **"Executions"** to see if requests are being received

2. **Verify the webhook URL:**
   - Make sure it ends with `/exec`
   - Test it in a new browser tab

3. **Try a different approach:**
   - Use the form submission method
   - Check if data appears in a new tab

4. **Contact support** with:
   - Screenshots of console errors
   - Your webhook URL (first few characters)
   - Google Apps Script execution logs

## 🎯 Success Indicators

You'll know it's working when:
- ✅ Console shows "Poll data sent to webhook"
- ✅ New rows appear in your Google Sheet
- ✅ Data includes all poll information
- ✅ Timestamps are accurate

---

**Need help?** Check the console logs and Google Apps Script execution history for detailed error information.
