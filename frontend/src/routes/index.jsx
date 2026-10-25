import React, { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import MainLayout from "../layouts/MainLayout";
import IconRabbit from '../assets/rabbitAnimate.svg';
import { PATH } from './path';

const OnboardingPage = lazy(() => 
    import('../pages/Onboarding/OnboardingPage'));
const DashboardPage = lazy(() =>
    import('../pages/Dashboard/DashboardPage'));
const TransactionsPage = lazy(() => 
    import('../pages/Transactions/TransactionsPage'));
const GoalsPage = lazy(() => 
    import('../pages/Goals/GoalsPage'));
const CalculatorsPage = lazy(() => 
    import('../pages/Calculators/CalculatorsPage'));

const PageLoader = () => (
    <div className="flex flex-col h-screen items-center justify-center gap-3">
        <img src={IconRabbit} alt="Loading..." className="w-[30%] h-auto animate-pulse" />
        <p className="text-gray-600">กำลังโหลด...</p>
    </div>
);

export default function AppRoutes() {
    // return <PageLoader />
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {/* Public Routes */}
                <Route path={PATH.ROOT} element={<OnboardingPage />} />

                {/* Route ใน MainLayout */}
                <Route element={<MainLayout />}>
                    <Route path={PATH.DASHBOARD} element={<DashboardPage />} />
                    <Route path={PATH.TRANSACTIONS} element={<TransactionsPage />} />
                    <Route path={PATH.GOALS} element={<GoalsPage />} />
                    <Route path={PATH.CALCULATORS} element={<CalculatorsPage />} />
                </Route>

                {/* 404 Not Found Page*/}
                <Route path="*" element={<div>404 Page Not Found</div>} />
            </Routes>
        </Suspense>
    );
}
