import React from "react";
import { useNavigate } from "react-router-dom";

// import BottomTabBar from "../../components/BottomTabBar";

import { resetOnboarding } from "../../services/userService";
import Topbar from "../../components/Topbar";

export default function GoalsPage() {
    const navigate = useNavigate();

    return (
        <>
            <Topbar title='เป้าหมาย' />
            <div>

            </div>
        </>
    );
}