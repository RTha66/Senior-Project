const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: config.channelAccessToken
});

// 1. ลองเช็คว่า Server ตื่นอยู่ไหม (เข้าทาง Browser ได้เลย)
app.get('/', (req, res) => {
  res.send('Server is Online! ✅');
});

// 2. Route สำหรับ Webhook
app.post('/webhook', line.middleware(config), (req, res) => {
  console.log("-----------------------");
  console.log("📩 มี Request เข้ามาที่ Webhook!"); // ถ้าบรรทัดนี้ขึ้น แสดงว่า LINE ส่งมาถึงแล้ว
  console.log("Events:", JSON.stringify(req.body.events));

  if (req.body.events.length === 0) {
    console.log("⚠️ เจอ Webhook Verify (ไม่มี Event)");
    return res.status(200).send('OK');
  }

  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.status(200).send('OK'))
    .catch((err) => {
      console.error("❌ Error ใน Handler:", err);
      res.status(500).end();
    });
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }
  
  console.log(`💬 ได้รับข้อความ: ${event.message.text} จาก User: ${event.source.userId}`);

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: `บอทตอบกลับ: ${event.message.text}` }]
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});