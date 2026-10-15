import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { resetOnboarding } from "../../services/userService";
import Topbar from "../../components/Topbar";
import MoodGoalsPopup from "../../components/MoodGoalsPopup";

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

    return (
        <>
            <Topbar title='เป้าหมาย' />
            <MoodGoalsPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
        </>
    );
}