const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// ตรวจสอบเบื้องต้นใน Log ว่าค่าโหลดมาจริงไหม (จะเห็นในหน้า Logs ของ Render)
console.log("Check Secret:", config.channelSecret ? "Found" : "Not Found");

// หน้าแรกสุด เอาไว้เช็คว่าเว็บออนไลน์ไหม
app.get('/', (req, res) => {
  res.send('Server is Online!');
});

// Webhook
app.post('/webhook', line.middleware(config), (req, res) => {
  res.sendStatus(200);
});

// Error Handler: ถ้ามีอะไรพัง มันจะพ่นออกมาใน Logs ไม่ให้ขึ้น 500 เฉยๆ
app.use((err, req, res, next) => {
  console.error("Error detected:", err.message);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Ready on port ${PORT}`);
});