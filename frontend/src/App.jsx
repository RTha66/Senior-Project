import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import OnboardingPage from './pages/Onboarding/OnboardingPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import GoalsPage from './pages/Goals/GoalsPage';
import MainLayout from './layouts/MainLayout';
import TransactionsPage from './pages/Transactions/TransactionsPage';
import CalculatorsPage from './pages/Calculators/CalculatorsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OnboardingPage />} />

        {/* Route MainLayout */}
        <Route element={<MainLayout />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/transactions' element={<TransactionsPage />} />
          <Route path='/goals' element={<GoalsPage />} />
          <Route path='/calculators' element={<CalculatorsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;