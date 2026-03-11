"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [stage, setStage] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);

  // Initialize start time on first load
  useEffect(() => {
    const storedStartTime = localStorage.getItem("hackhunt_startTime");
    const storedStage = localStorage.getItem("hackhunt_stage");
    const storedHints = localStorage.getItem("hackhunt_hints");

    if (storedStartTime) {
      setStartTime(parseInt(storedStartTime, 10));
    } else {
      const now = Date.now();
      setStartTime(now);
      localStorage.setItem("hackhunt_startTime", now.toString());
    }

    if (storedStage) setStage(parseInt(storedStage, 10));
    if (storedHints) setHintsUsed(parseInt(storedHints, 10));
  }, []);

  const nextStage = () => {
    setStage((prev) => {
      const newStage = prev + 1;
      localStorage.setItem("hackhunt_stage", newStage.toString());
      return newStage;
    });
  };

  const addHintPenalty = () => {
    setHintsUsed((prev) => {
      const newHints = prev + 1;
      localStorage.setItem("hackhunt_hints", newHints.toString());
      return newHints;
    });
  };

  const resetGame = () => {
    localStorage.removeItem("hackhunt_startTime");
    localStorage.removeItem("hackhunt_stage");
    localStorage.removeItem("hackhunt_hints");
    setStage(1);
    setStartTime(Date.now());
    setHintsUsed(0);
  };

  // 5 minutes in ms
  const penaltyMs = hintsUsed * 5 * 60 * 1000;

  return (
    <GameContext.Provider
      value={{
        stage,
        nextStage,
        startTime,
        hintsUsed,
        addHintPenalty,
        penaltyMs,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
