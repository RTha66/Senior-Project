import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import OnboardingPage from './pages/Onboarding/OnboardingPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import GoalsPage from './pages/Goals/GoalsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OnboardingPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/goals' element={<GoalsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;