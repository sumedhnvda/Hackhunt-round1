"use client";
import React, { useState } from "react";
import { useGame } from "@/context/GameContext";

export default function Stage3() {
  const { nextStage } = useGame();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === "lol dewd") {
      nextStage();
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="stage-container fade-in">
      <div className="glass-panel text-center">
        <h2 className="title-gradient">Stage 3: Beyond the Surface</h2>
        <p className="neon-text mb-2">&quot;A single image hides a thousand words&quot;</p>
        <p className="neon-text mb-4" style={{ fontSize: '0.9rem', color: '#a8b2d1' }}>Hint: first site is always right</p>
        
        <div className="image-wrapper mb-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img 
            src="/download2.png" 
            alt="Hidden Message Image" 
            style={{ 
              width: '100%', 
              maxWidth: '400px', 
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              marginBottom: '10px',
              objectFit: 'contain'
            }} 
          />
        </div>

        <form onSubmit={handleSubmit} className="input-group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter the hidden text..."
            className={error ? "shake error-input" : ""}
          />
          <button className="primary-btn" type="submit">Reveal</button>
        </form>
      </div>
    </div>
  );
}
