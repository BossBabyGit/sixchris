import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ParticleBackground from "./components/ParticleBackground";
import Leaderboard from "./pages/Leaderboard";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <>
      <ParticleBackground />
      <div className="vignette" />

      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/leaderboards" replace />} />
        <Route path="/leaderboards" element={<Leaderboard />} />
        <Route path="/how-to-sign-up" element={<Signup />} />
        <Route path="*" element={<Navigate to="/leaderboards" replace />} />
      </Routes>
    </>
  );
}