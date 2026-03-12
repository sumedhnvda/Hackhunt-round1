"use client";
import React, { useEffect, useState } from "react";
import { useGame, STAGE_HINTS } from "@/context/GameContext";
import HintModal from "@/components/HintModal";

export default function NavBar() {
  const { stage, startTime, penaltyMs, applyHint, hintUsedForStage, penaltyFlash } =
    useGame();
  const [timeDisplay, setTimeDisplay] = useState("00:00:00");
  const [isHintModalOpen, setHintModalOpen] = useState(false);

  // Timer tick
  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - startTime + penaltyMs;
      const totalSeconds = Math.floor(elapsedMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setTimeDisplay(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, penaltyMs]);

  // penaltyFlash comes from context; use it directly for the banner
  // (avoids calling setState in an effect)
  const hintAlreadyUsed = stage >= 1 && stage <= 4 ? hintUsedForStage(stage) : false;

  const handleHintClick = () => {
    if (hintAlreadyUsed) return;
    setHintModalOpen(true);
  };

  const confirmHint = () => {
    applyHint(stage);
    // modal stays open to reveal hint - user closes it manually
  };

  return (
    <>
      {/* Penalty banner — driven by penaltyFlash from context; CSS animates it in & out */}
      {penaltyFlash && (
        <div className="penalty-banner">
          ⏱ +5 min penalty added to your time!
        </div>
      )}

      <nav className="navbar">
        <div className="nav-brand">Hack Hunt</div>

        <div className="nav-center">
          <span className={`timer${penaltyFlash ? " timer-penalty-flash" : ""}`}>
            {timeDisplay}
          </span>
          {stage >= 1 && stage <= 4 && (
            <span className="stage-badge">Stage {stage} / 4</span>
          )}
        </div>

        <div className="nav-actions">
          {stage >= 1 && stage <= 4 && (
            <button
              className={`hint-btn${hintAlreadyUsed ? " hint-btn-used" : ""}`}
              onClick={handleHintClick}
              title={
                hintAlreadyUsed
                  ? "Hint already used for this stage"
                  : "Request a rescue hint (+5 min penalty)"
              }
            >
              {hintAlreadyUsed ? "🔦 Hint Used" : "🔦 Rescue Hint"}
            </button>
          )}
        </div>
      </nav>

      <HintModal
        isOpen={isHintModalOpen}
        onClose={() => setHintModalOpen(false)}
        onConfirm={confirmHint}
        hintPenaltyMinutes={5}
        hintText={STAGE_HINTS[stage] || ""}
      />
    </>
  );
}
