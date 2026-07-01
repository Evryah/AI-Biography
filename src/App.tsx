import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CheckEmailPage from './pages/CheckEmailPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PreserveStoryPage from './pages/PreserveStoryPage';
import DIYDashboard from './pages/DIYDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Mapping authentication routes as requested */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/preserve-story" element={<PreserveStoryPage />} />
        <Route path="/diy" element={<DIYDashboard />} />
        
        {/* Fallback pattern to map root or custom routes directly to /register */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
