import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { resetOnboarding } from "../../services/userService";
import Topbar from "../../components/Topbar";
import MoodGoalsPopup from "../../components/MoodGoalsPopup";
import GoalCard from "./GoalCard";

const GOALS_POPUP_KEY = 'has_seen_goals_popup';

export default function GoalsPage() {
    const navigate = useNavigate();

    // เอาไว้ควบคุม popup เปิดหรือปิดให้ค่าเริ่มต้นเป็นปิดก่อน
    const[isPopupOpen, setIsPopupOpen] = useState(false);

    // เช็คว่าเคยเห็น popup หรือยังเมื่อโหลดหน้าเสร็จ
    useEffect(() => {
        const hasSeen = localStorage.getItem(GOALS_POPUP_KEY);
        if (!hasSeen) {
            // ไม่มีให้เปิด popup
            setIsPopupOpen(true);
        }
    }, []);

    // ฟังก์ชันตอนกดปิด
    const handleClosePopup = () => {
        // บันทึกลงเครื่องว่าเคยเห็นแล้ว ครั้งต่อไปจะไม่แสดงอีก
        localStorage.setItem(GOALS_POPUP_KEY, 'true');
        // สังปิด popup
        setIsPopupOpen(false);
    };

    // Mock Data
    const [goals, setGoals] = useState([
        { id: 1, name: 'ทริปเที่ยวญี่ปุ่น', type: 'plan', targetAmount: 50000, currentAmount: 40000, daysLeft: 45 },
        { id: 2, name: 'ซื้อคอมใหม่', type: 'custom', targetAmount: 30000, currentAmount: 3000, daysLeft: null },
        { id: 3, name: 'ดาวน์รถยนต์คันแรก', type: 'plan', targetAmount: 1000000, currentAmount: 1000000, daysLeft: 0 },
        { id: 4, name: 'ทริปเที่ยวเกาหลี', type: 'plan', targetAmount: 50000, currentAmount: 30000, daysLeft: 15 },
        { id: 5, name: 'ทริปเที่ยวไทย', type: 'plan', targetAmount: 50000, currentAmount: 40000, daysLeft: 300 },
    ]);

    

    return (
        <>
            <Topbar title='เป้าหมาย' />
            <MoodGoalsPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
            
            <div className="flex flex-col gap-3 pt-3 p-4 pb-37">
                {goals.map((item) => (
                    <GoalCard key={item.id} goal={item} />
                ))}
            </div>

            {/* ปุ่ม */}
            {/* กล่องคลุม */}
            <div className="fixed bottom-0 left-0 right-0 z-40 pt-10 pb-22 px-4">
                <div className="absolute inset-0 bg-gradient-to-t from-bgpage via-bgpage/80 to-transparent backdrop-blur-[2px] pointer-events-auto"
                    style={{WebkitMaskImage: 'linear-gradient(to top, black 55%, transparent 100%)',maskImage: 'linear-gradient(to top, black 55%, transparent 100%)'}} />
                <div className="relative max-w-md mx-auto">
                    <button onClick={('')}
                        className="flex items-center justify-center w-full py-3.5 bg-hotpink text-white font-medium rounded-2xl shadow-lg active:scale-[0.98] transition-all">
                        <span className="text-lg leading-tight">เพิ่มเป้าหมายใหม่</span>
                    </button>
                </div>
            </div>
        </>
    );
}