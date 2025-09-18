# 🔗 Zapier Integration (No Code Required)

## Why Zapier is Great:
- ✅ **No tokens in your code** - completely secure
- ✅ **Visual setup** - drag and drop interface
- ✅ **Multiple destinations** - Google Sheets, email, Slack, etc.
- ✅ **Free tier available** - 100 tasks per month
- ✅ **No coding required** - just point and click

## 🚀 Setup (10 minutes):

### Step 1: Create Zapier Account
1. Go to [Zapier.com](https://zapier.com)
2. Sign up for free account
3. You get 100 free tasks per month

### Step 2: Create a Zap
1. Click "Create Zap"
2. Choose trigger: "Webhooks by Zapier"
3. Choose event: "Catch Hook"
4. Click "Continue"

### Step 3: Get Webhook URL
1. Copy the webhook URL (looks like: `https://hooks.zapier.com/hooks/catch/123456/abcdef/`)
2. This is your secure endpoint - no tokens needed!

### Step 4: Choose Action
Pick where you want the data to go:

**Option A: Google Sheets**
- Action: "Google Sheets"
- Event: "Create Spreadsheet Row"
- Connect your Google account
- Choose your sheet and map the fields

**Option B: Email Notifications**
- Action: "Email by Zapier"
- Event: "Send Outbound Email"
- Get email notifications for each poll response

**Option C: Slack Notifications**
- Action: "Slack"
- Event: "Send Channel Message"
- Get notifications in your Slack channel

### Step 5: Test and Activate
1. Test the webhook with sample data
2. Activate your Zap
3. Your webhook URL is ready to use!

### Step 6: Update Your Website
Edit `config.js`:

```javascript
window.WEBHOOK_CONFIG = {
    webhookUrl: 'https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID_HERE/',
    options: {}
};
```

## 🎯 What Happens:
- User submits poll → Webhook sends data to Zapier → Zapier processes and sends to your chosen destination
- You can have multiple actions (save to sheet AND send email notification)
- All data flows through Zapier's secure infrastructure

## 🔒 Security Benefits:
- No API keys in your repository
- Zapier handles all authentication
- You control the data flow through Zapier dashboard
- Can pause/delete the integration anytime
