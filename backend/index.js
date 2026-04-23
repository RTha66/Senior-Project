const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// สร้าง Client สำหรับส่งข้อความกลับ
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: config.channelAccessToken
});

// Webhook
app.post('/webhook', line.middleware(config), (req, res) => {
  res.sendStatus(200);
  // จัดการกับทุกข้อความที่ส่งเข้ามา
  Promise.all(req.body.events.map(handleEvent))
    .catch((err) => console.error(err));
});

// ฟังก์ชันหลักที่สั่งให้บอทพูด
async function handleEvent(event) {
  // ถ้าไม่ใช่ข้อความตัวอักษร ไม่ต้องทำอะไร
  if (event.type !== 'message' || event.message.type !== 'text') return null;

  // ส่งข้อความกลับไปหา User (ทวนคำพูด)
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: `คุณพิมพ์ว่า: ${event.message.text}` }]
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Bot is ready!`);
});