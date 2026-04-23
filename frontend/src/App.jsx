import React, { useEffect, useState } from 'react';
import liff from '@line/liff';

function App() {
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    const initLiff = async () => {
      try {
        // 1. เริ่มต้นระบบด้วย LIFF ID ที่ดึงมาจาก Environment Variable
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

        // 2. ถ้ายังไม่ได้ Login ให้เด้งไปหน้า Login ของ LINE
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          // 3. ถ้า Login แล้ว ให้ดึงชื่อโปรไฟล์มาแสดงเพื่อเช็คว่าเชื่อมต่อได้จริง
          const profile = await liff.getProfile();
          setProfileName(profile.displayName);
        }
      } catch (error) {
        console.error("LIFF Initialization failed", error);
      }
    };
    initLiff();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1>Hello World</h1>
      {profileName ? (
        <p style={{ color: 'green' }}>เชื่อมต่อกับ LINE สำเร็จ: <b>{profileName}</b></p>
      ) : (
        <p>กำลังเชื่อมต่อกับ LINE...</p>
      )}
    </div>
  );
}

export default App;