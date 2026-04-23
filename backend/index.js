// 1. นำเข้า Library ทั้งหมด (Imports)
const express = require('express');
const { messagingApi, middleware } = require('@line/bot-sdk');
const cors = require('cors');
require('dotenv').config();

// 2. ตั้งค่าการเชื่อมต่อ (Config)
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: config.channelAccessToken
});

// 3. สร้างตัวแปรแอป (Initialization)
const app = express(); // *** ต้องสร้างตัวนี้ก่อนที่จะสั่ง app.use ใดๆ ***

// 4. ตั้งค่า Webhook ของ LINE (ต้องอยู่ก่อน Middleware ตัวอื่น)
// เพราะ middleware(config) จะตรวจเช็คข้อมูลจาก LINE โดยเฉพาะ
app.post('/webhook', middleware(config), (req, res) => {
  res.sendStatus(200); // ตอบกลับ LINE ทันทีเพื่อกัน Timeout
  Promise.all(req.body.events.map(handleEvent))
    .catch((err) => console.error(err));
});

// 5. ตั้งค่า Middleware ทั่วไป (สำหรับคุยกับ React)
app.use(cors()); // อนุญาตให้ React ส่งข้อมูลข้าม Domain มาได้
app.use(express.json()); // ให้ Backend อ่านข้อมูล JSON จาก React ได้

// 6. ประตูรับข้อมูลจากหน้าจอ React/LIFF
app.post('/api/save-transaction', async (req, res) => {
  const { userId, amount, category } = req.body;
  
  console.log(`Log: User ${userId} บันทึกรายจ่าย ${amount} บาท`);

  try {
    // สั่งให้บอทส่งข้อความไปหา User คนนั้น
    await client.pushMessage({
      to: userId,
      messages: [{ type: 'text', text: `บันทึกรายจ่าย ${amount} บาท สำเร็จ!` }]
    });
    res.json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

// 7. ฟังก์ชันจัดการเมื่อมีคนทักบอท (Bot Logic)
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') return null;

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: 'text', text: `บอทได้รับข้อความ: ${event.message.text}` }]
  });
}

// 8. เริ่มต้นเซิร์ฟเวอร์ (Start Server)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});