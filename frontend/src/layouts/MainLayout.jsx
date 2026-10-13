import React from "react";
import { Outlet } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-bgpage">
            <main>
                <Outlet />
            </main>
            <BottomTabBar />
        </div>
    )
}