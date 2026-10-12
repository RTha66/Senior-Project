import React from "react";
import { useNavigate } from "react-router-dom";

// import BottomTabBar from "../../components/BottomTabBar";

import { resetOnboarding } from "../../services/userService";

export default function DashboardPage() {
    const navigate = useNavigate();

    const handleReset = async () => {
        await resetOnboarding();
        navigate('/');
    }

    return (
        <div className="min-h-screen bg-[#F6F5FF] text-[#c72121]">
            <h1 className="text-xl font-bold text-gray-800">Hello World</h1>
            <button onClick={handleReset}>reset</button>
        </div>
    );
}