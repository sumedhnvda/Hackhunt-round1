"use client";
import React, { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import HintModal from "@/components/HintModal";

export default function NavBar() {
  const { stage, startTime, penaltyMs, addHintPenalty } = useGame();
  const [timeDisplay, setTimeDisplay] = useState("00:00:00");
  const [isHintModalOpen, setHintModalOpen] = useState(false);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      // Calculate elapsed time plus penalty
      const now = Date.now();
      const elapsedMs = now - startTime + penaltyMs;
      
      const totalSeconds = Math.floor(elapsedMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      setTimeDisplay(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, penaltyMs]);

  const handleHintClick = () => {
    setHintModalOpen(true);
  };

  const confirmHint = () => {
    addHintPenalty();
    setHintModalOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">Hack Hunt</div>
        <div className="nav-center">
          <span className="timer">{timeDisplay}</span>
          {stage <= 4 && <span className="stage-badge">Stage {stage} / 4</span>}
        </div>
        <div className="nav-actions">
          {stage <= 4 && (
            <button className="hint-btn" onClick={handleHintClick}>
              Request Hint
            </button>
          )}
        </div>
      </nav>

      <HintModal 
        isOpen={isHintModalOpen}
        onClose={() => setHintModalOpen(false)}
        onConfirm={confirmHint}
        hintPenaltyMinutes={5}
      />
    </>
  );
}
