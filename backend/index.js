const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// สร้าง Client สำหรับส่งข้อความ
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: config.channelAccessToken
});

// Webhook Route
app.post('/webhook', line.middleware(config), (req, res) => {
  res.sendStatus(200);

  // ไล่ตรวจเช็คทุกข้อความที่ส่งมา
  Promise.all(req.body.events.map(handleEvent))
    .catch((err) => console.error("Error handler:", err));
});

// ฟังก์ชันสั่งให้บอทพูดตาม
async function handleEvent(event) {
  // ถ้าไม่ใช่ข้อความ (Message) หรือไม่ใช่ตัวหนังสือ (Text) ให้ข้ามไป
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }

  // ส่งข้อความกลับไปหา User
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{
      type: 'text',
      text: `คุณพิมพ์มาว่า: ${event.message.text}` // นี่คือส่วนที่บอทพิมพ์ตาม
    }]
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Bot is ready and listening on port ${PORT}`);
});