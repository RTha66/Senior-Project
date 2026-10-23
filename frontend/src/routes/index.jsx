import React, { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import MainLayout from "../layouts/MainLayout";
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
    <div className="flex h-screen items-center justify-center">กำลังโหลด...</div>
);

export default function AppRoutes() {
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
