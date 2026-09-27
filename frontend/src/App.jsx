import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import OnboardingPage from './pages/Onboarding/OnboardingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OnboardingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;