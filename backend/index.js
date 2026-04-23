const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();

const app = express();

// 1. ตั้งค่า Config (ดึงมาจาก Environment Variables ใน Render)
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// 2. เส้นทาง Webhook สำหรับ Verify
// middleware จะเช็คว่าข้อมูลที่ส่งมามาจาก LINE จริงหรือไม่ (ใช้ Channel Secret เช็ค)
app.post('/webhook', line.middleware(config), (req, res) => {
  // ตอบกลับสถานะ 200 ทันที เพื่อบอก LINE ว่า "ฉันได้รับข้อมูลแล้วนะ และเซิร์ฟเวอร์ฉันปกติ"
  res.sendStatus(200);
});

// 3. เริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});