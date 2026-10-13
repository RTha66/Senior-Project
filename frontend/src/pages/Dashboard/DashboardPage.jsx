import React from "react";
import { useNavigate } from "react-router-dom";

import { resetOnboarding } from "../../services/userService";
import Topbar from "../../components/Topbar";

export default function DashboardPage() {
    const navigate = useNavigate();

    const handleReset = async () => {
        await resetOnboarding();
        navigate('/');
    }

    return (
        <div>
            <Topbar title='Dashboard' />
            <div className="p-6 flex flex-col items-center gap-4">
                {/* <h2 className="text-h3 font-semibold text-blackk">Hello World</h2> */}
                <button 
                    onClick={handleReset}
                    className="w-full py-2.5 bg-bluee text-h3 text-blackk font-medium rounded-full"
                >
                    reset
                </button>
            </div>
        </div>
    );
}