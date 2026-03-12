"use client";

import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

// Per-stage hint content
export const STAGE_HINTS = {
  1: "The message is written the way computers store characters internally. Try splitting the digits into equal-sized groups and think about how numbers become letters.",
  2: "The loop is doing its job correctly. The strange result comes from something that happens before the loop even starts.",
  3: "The picture may look normal, but sometimes images carry information in places the eye cannot notice.",
  4: "The answer might already be on the page — just not visible in the usual way.",
};

/** Read a value from localStorage safely (SSR-safe). */
function readLS(key) {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
}

export const GameProvider = ({ children }) => {
  // Lazy initializers avoid the "setState in effect" lint and are more efficient.
  const [stage, setStage] = useState(() => {
    const v = readLS("hackhunt_stage");
    return v ? parseInt(v, 10) : 0;
  });
  const [startTime, setStartTime] = useState(() => {
    const v = readLS("hackhunt_startTime");
    return v ? parseInt(v, 10) : null;
  });
  const [hintsUsed, setHintsUsed] = useState(() => {
    const v = readLS("hackhunt_hints");
    return v ? parseInt(v, 10) : 0;
  });
  const [teamName, setTeamName] = useState(() => readLS("hackhunt_teamName") || "");
  const [stageHintsUsed, setStageHintsUsed] = useState(() => {
    try {
      const v = readLS("hackhunt_stageHints");
      return v ? JSON.parse(v) : {};
    } catch (_) {
      return {};
    }
  });
  // Boolean that flips true for 3 s when a penalty is applied, drives NavBar flash
  const [penaltyFlash, setPenaltyFlash] = useState(false);

  const startGame = (name) => {
    const now = Date.now();
    setStartTime(now);
    localStorage.setItem("hackhunt_startTime", now.toString());
    setTeamName(name);
    localStorage.setItem("hackhunt_teamName", name);
    setStage(1);
    localStorage.setItem("hackhunt_stage", "1");
  };

  const nextStage = () => {
    setStage((prev) => {
      const newStage = prev + 1;
      localStorage.setItem("hackhunt_stage", newStage.toString());
      return newStage;
    });
  };

  /**
   * Returns true if the hint for `stageNum` has already been used.
   */
  const hintUsedForStage = (stageNum) => !!stageHintsUsed[stageNum];

  /**
   * Marks the hint for `stageNum` as used and adds a +5 min penalty.
   * Triggers a brief flash animation on the timer.
   */
  const applyHint = (stageNum) => {
    // Mark stage hint used
    const updated = { ...stageHintsUsed, [stageNum]: true };
    setStageHintsUsed(updated);
    localStorage.setItem("hackhunt_stageHints", JSON.stringify(updated));

    // Add global hint count (for penalty calc)
    setHintsUsed((prev) => {
      const newHints = prev + 1;
      localStorage.setItem("hackhunt_hints", newHints.toString());
      return newHints;
    });

    // Trigger flash for 3 seconds
    setPenaltyFlash(true);
    setTimeout(() => setPenaltyFlash(false), 3000);
  };

  const resetGame = () => {
    localStorage.removeItem("hackhunt_startTime");
    localStorage.removeItem("hackhunt_stage");
    localStorage.removeItem("hackhunt_hints");
    localStorage.removeItem("hackhunt_teamName");
    localStorage.removeItem("hackhunt_stageHints");
    setStage(0);
    setStartTime(null);
    setHintsUsed(0);
    setTeamName("");
    setStageHintsUsed({});
    setPenaltyFlash(false);
  };

  // 5 minutes per hint in ms
  const penaltyMs = hintsUsed * 5 * 60 * 1000;

  return (
    <GameContext.Provider
      value={{
        stage,
        nextStage,
        startGame,
        startTime,
        hintsUsed,
        applyHint,
        hintUsedForStage,
        penaltyMs,
        penaltyFlash,
        resetGame,
        teamName,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
