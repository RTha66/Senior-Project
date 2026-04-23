import { useState, useEffect } from 'react'
import liff from '@line/liff' // อย่าลืมติดตั้ง npm install @line/liff
import './App.css'

function App() {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)

  // --- ส่วนที่เพิ่มเข้ามาเพื่อให้เชื่อมกับ LINE ---
  useEffect(() => {
    const initLiff = async () => {
      try {
        // เริ่มต้นใช้งาน LIFF
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        
        if (liff.isLoggedIn()) {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
        } else {
          liff.login(); // ถ้ายังไม่ Login ให้เด้งไปหน้า Login LINE
        }
      } catch (err) {
        console.error("LIFF Init Error:", err);
        setError(err.message);
      }
    };
    initLiff();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <section id="center">
        <div className="hero">
          {/* ถ้าโหลดโปรไฟล์ได้ ให้เอารูป LINE มาแสดงแทนรูป Hero เดิม */}
          {profile ? (
            <img 
              src={profile.pictureUrl} 
              className="base" 
              style={{ borderRadius: '50%' }} 
              width="170" height="170" alt="profile" 
            />
          ) : (
            <div className="base" style={{ width: 170, height: 179 }}>กำลังโหลด...</div>
          )}
        </div>
        
        <div>
          {/* เปลี่ยนคำโปรยเป็นชื่อเราใน LINE */}
          <h1>{profile ? `สวัสดีคุณ ${profile.displayName}` : 'ยินดีต้อนรับ'}</h1>
          <p>
            {profile ? `เชื่อมต่อกับ LINE สำเร็จแล้ว! ✅` : 'กำลังเชื่อมต่อกับ LINE...'}
          </p>
          {profile && <code style={{ fontSize: '12px' }}>User ID: {profile.userId}</code>}
        </div>

        {/* ปุ่มเดิมที่คุณมีอยู่ */}
        <button type="button" className="counter">
          สถานะ: {profile ? 'ออนไลน์' : 'ออฟไลน์'}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Project Status</h2>
          <p>ตอนนี้หน้าจอ Frontend เชื่อมกับ LINE เรียบร้อยแล้ว</p>
          <ul>
            <li>ขั้นตอนต่อไปคือการทำฟอร์มบันทึกรายจ่าย</li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App