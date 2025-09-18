# 🚀 Live Poll Data Collection Setup Guide

This guide will help you set up live poll data collection so you can see every poll submission in real-time in your GitHub repository.

## 🎯 **Recommended Solution: GitHub Issues API**

This is the easiest and most integrated solution that works directly with your GitHub repo.

### Step 1: Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "Hamro Awaz Poll Collector"
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `public_repo` (Access public repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

### Step 2: Configure Your Website

1. Open `config.js` in your repository
2. Find the `GITHUB_CONFIG` section
3. Replace the placeholder values:

```javascript
window.GITHUB_CONFIG = {
    repoOwner: 'upendrabhattarai',  // Your GitHub username
    repoName: 'hamroawaz-polling-platform',  // Your repository name
    githubToken: 'ghp_1234567890abcdef...'  // Your actual token
};
```

4. Comment out the other configurations you don't need:

```javascript
// window.GOOGLE_SHEETS_CONFIG = { ... };
// window.WEBHOOK_CONFIG = { ... };
```

### Step 3: Test the Setup

1. Commit and push your changes to GitHub
2. Visit your live website
3. Submit a test poll
4. Check your GitHub repository's Issues tab
5. You should see a new issue created for each poll response!

## 📊 **Alternative: Google Sheets Integration**

If you prefer a spreadsheet format:

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add these headers in row 1:
   - A1: Timestamp
   - B1: Poll ID
   - C1: Question
   - D1: Category
   - E1: Response
   - F1: User Country
   - G1: Language
   - H1: Session ID
   - I1: User Agent

### Step 2: Get Sheet ID and API Key

1. Copy the sheet ID from the URL (the long string between `/d/` and `/edit`)
2. Go to [Google Cloud Console](https://console.cloud.google.com)
3. Enable Google Sheets API
4. Create an API key

### Step 3: Configure

```javascript
window.GOOGLE_SHEETS_CONFIG = {
    sheetId: '1ABC123def456GHI789jkl...',  // Your sheet ID
    apiKey: 'AIzaSyABC123def456GHI789...'  // Your API key
};
```

## 🔗 **Alternative: Webhook Integration**

For maximum flexibility, use webhooks with services like Zapier:

### Step 1: Create a Zapier Webhook

1. Go to [Zapier](https://zapier.com)
2. Create a new Zap
3. Choose "Webhooks" as trigger
4. Select "Catch Hook"
5. Copy the webhook URL

### Step 2: Configure

```javascript
window.WEBHOOK_CONFIG = {
    webhookUrl: 'https://hooks.zapier.com/hooks/catch/123456/abcdef/',
    options: {}
};
```

## 🔒 **Security Notes**

- **Never commit your tokens/keys to public repositories**
- Consider using environment variables or a separate config file
- For production, use a backend server to handle API calls
- GitHub tokens should have minimal required permissions

## 📈 **What You'll See**

### GitHub Issues Method:
- Each poll response creates a new GitHub issue
- Issues are automatically labeled by category
- You can view, search, and analyze responses
- Issues include all poll data in a formatted markdown table

### Google Sheets Method:
- Each poll response adds a new row to your spreadsheet
- Real-time updates as people submit polls
- Easy to create charts and analyze data
- Can export to Excel or other formats

### Webhook Method:
- Data sent to any service that accepts webhooks
- Can trigger automated workflows
- Integrate with databases, email, Slack, etc.

## 🚨 **Troubleshooting**

### Common Issues:

1. **CORS Errors**: Make sure you're testing on the live GitHub Pages site, not locally
2. **Token Permissions**: Ensure your GitHub token has the right permissions
3. **API Limits**: GitHub has rate limits, but they're generous for normal use
4. **Network Issues**: The system falls back to localStorage if APIs fail

### Testing:

1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Submit a poll
4. Look for success/error messages
5. Check Network tab for API calls

## 🎉 **You're All Set!**

Once configured, every poll submission will be automatically recorded in your chosen system. You'll have a live record of all responses that you can access anytime!

---

**Need Help?** Check the browser console for error messages or create an issue in your GitHub repository.
