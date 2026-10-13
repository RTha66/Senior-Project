import React from "react";
import { useNavigate } from "react-router-dom";

import { resetOnboarding } from "../../services/userService";
import Topbar from "../../components/Topbar";

export default function TransactionsPage() {
    const navigate = useNavigate();

    const handleReset = async () => {
        await resetOnboarding();
        navigate('/');
    }

    return (
        <>
            <Topbar title='รายรับ - รายจ่าย' rightContent={
                <button onClick={() => alert('ไปหน้าสรุปรายการ')}
                    className="bg-hotpink text-white text-sm font-medium px-4 py-1.5 rounded-xl">
                    สรุปรายการ
                </button>
            } />
            <div>

            </div>
        </>
    );
}