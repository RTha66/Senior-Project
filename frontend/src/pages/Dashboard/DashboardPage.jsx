import React from "react";
import { useNavigate } from "react-router-dom";
import { resetOnboarding } from "../../services/userService";

export default function DashboardPage() {
    const navigate = useNavigate();

    const handleReset = async () => {
        await resetOnboarding();
        navigate('/');
    }

    return (
        <div>
            <h1 className="text-xl font-bold text-gray-800">Hello World</h1>
            <button onClick={handleReset}>reset</button>
        </div>
    );
}