"use client";
import React from "react";
import { useGame } from "@/context/GameContext";
import NavBar from "@/components/NavBar";
import StartScreen from "@/components/StartScreen";
import Stage1 from "@/components/Stage1";
import Stage2 from "@/components/Stage2";
import Stage3 from "@/components/Stage3";
import Stage4 from "@/components/Stage4";
import Victory from "@/components/Victory";

export default function Home() {
  const { stage } = useGame();

  const renderStage = () => {
    switch (stage) {
      case 0:
        return <StartScreen />;
      case 1:
        return <Stage1 />;
      case 2:
        return <Stage2 />;
      case 3:
        return <Stage3 />;
      case 4:
        return <Stage4 />;
      case 5:
        return <Victory />;
      default:
        return <StartScreen />;
    }
  };

  return (
    <main className="main-layout">
      <NavBar />
      <div className="stage-wrapper">
        {renderStage()}
      </div>
    </main>
  );
}
