# 🤖 Telegram Bot Setup Guide

## Overview
This guide will help you set up a Telegram bot to receive instant notifications for new orders and contact form submissions. This allows your team to handle orders without constantly checking emails.

## 🚀 Step-by-Step Setup

### 1. Create a Telegram Bot

1. **Open Telegram** and search for `@BotFather`
2. **Start a chat** with BotFather
3. **Send the command**: `/newbot`
4. **Choose a name** for your bot (e.g., "Elixir Victoria Orders")
5. **Choose a username** for your bot (e.g., "elixir_victoria_orders_bot")
6. **Save the bot token** that BotFather gives you

### 2. Get Your Chat ID

#### Option A: Using the Bot (Recommended)
1. **Start a chat** with your new bot
2. **Send any message** to the bot
3. **Visit this URL** in your browser (replace with your bot token):
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
4. **Find the chat ID** in the response (it will be a number like `123456789`)

#### Option B: Using a Group
1. **Create a Telegram group** for order notifications
2. **Add your bot** to the group
3. **Send a message** in the group
4. **Visit the same URL** as above
5. **Find the chat ID** (group chat IDs start with `-`)

### 3. Configure Environment Variables

Add these to your `.env` file:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 4. Test the Bot

1. **Start your backend server**
2. **Submit a test order** or contact form
3. **Check your Telegram** for the notification

## 📱 Notification Features

### Order Notifications
When a new order is placed, you'll receive a message like:

```
🛍️ NEW ORDER RECEIVED!

📦 Order: ELX-123456-789
👤 Customer: John Doe
📧 Email: john@example.com
📱 Phone: +234 704 892 8368
💰 Total: ₦25,000
📊 Items: 3 items
⏰ Time: Dec 15, 2024, 2:30 PM

📋 Items:
• Victoria Nocturne (Qty: 1)
• Luxury Body Scrub (Qty: 2)

📝 Notes: Please deliver before 5 PM

🔗 Status: PENDING
```

### Contact Form Notifications
When someone submits a contact form:

```
📞 NEW CONTACT FORM SUBMISSION!

👤 Name: Jane Smith
📧 Email: jane@example.com
📱 Phone: +234 704 892 8368
📋 Subject: Product Inquiry

💬 Message:
Hi, I'm interested in your luxury body scrub. 
Do you have it in stock?

⏰ Time: Dec 15, 2024, 2:30 PM
```

## 🔧 Configuration Options

### Multiple Chat IDs
If you want to send notifications to multiple chats, you can modify the code to support multiple chat IDs:

```javascript
const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_IDS?.split(',') || []
```

### Custom Message Format
You can customize the message format by modifying the `sendOrderNotification` and `sendContactNotification` functions in `backend/server.js`.

### Notification Types
Currently supported:
- ✅ New order notifications
- ✅ Contact form submissions
- 🔄 Payment confirmations (can be added)
- 🔄 Order status updates (can be added)

## 🛠️ Troubleshooting

### Bot Not Sending Messages
1. **Check bot token** - Make sure it's correct
2. **Check chat ID** - Verify the chat ID is correct
3. **Check bot permissions** - Make sure the bot can send messages
4. **Check server logs** - Look for error messages

### Common Errors
- `Unauthorized` - Invalid bot token
- `Chat not found` - Invalid chat ID
- `Forbidden` - Bot doesn't have permission to send messages

### Testing Commands
You can test your bot setup with these curl commands:

```bash
# Test bot connection
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getMe"

# Test sending a message
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id":"<YOUR_CHAT_ID>","text":"Test message"}'
```

## 🎯 Benefits

1. **Instant Notifications** - Get notified immediately when orders come in
2. **Mobile Access** - Handle orders from your phone
3. **Team Collaboration** - Share notifications with your team
4. **No Email Dependency** - Don't need to check emails constantly
5. **Real-time Updates** - Immediate response to customer inquiries

## 🔒 Security Notes

- **Keep your bot token secret** - Don't share it publicly
- **Use environment variables** - Never hardcode tokens
- **Regular token rotation** - Change tokens periodically
- **Monitor bot usage** - Check for unusual activity

## 📞 Support

If you need help setting up the Telegram bot:
1. Check the troubleshooting section above
2. Verify your bot token and chat ID
3. Test with the curl commands
4. Check server logs for error messages

**Your team will now receive instant notifications for all orders and inquiries!** 🎉 