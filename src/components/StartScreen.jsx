"use client";
import React, { useState } from "react";
import { useGame } from "@/context/GameContext";

export default function StartScreen() {
  const { startGame } = useGame();
  const [nameInput, setNameInput] = useState("");
  const [status, setStatus] = useState("idle");

  const handleStart = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setStatus("starting");
      setTimeout(() => {
        startGame(nameInput.trim());
      }, 500); // Small delay for effect
    }
  };

  return (
    <div className="stage-container fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="glass-panel text-center" style={{ width: '100%', maxWidth: '500px', padding: '3rem', border: '1px solid var(--accent-cyan)' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 className="title-gradient" style={{ fontSize: '3.5rem', marginBottom: '0.5rem', letterSpacing: '2px' }}>HACK HUNT</h1>
          <p className="neon-text" style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>System Initialization Protocol: Round 1</p>
        </div>
        
        <div className="terminal-box text-center" style={{ marginBottom: '2.5rem', fontSize: '0.9rem' }}>
          Welcome, Operator. Enter your team designation to begin the infiltration.
        </div>

        <form onSubmit={handleStart} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="input-group" style={{ marginTop: '0', display: 'flex', justifyContent: 'center' }}>
            <input 
              type="text" 
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="> ENTER_TEAM_NAME_"
              required
              maxLength={50}
              style={{
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center',
                fontSize: '1.25rem',
                padding: '1rem',
                letterSpacing: '2px',
                borderBottom: '2px solid var(--accent-cyan)',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                borderRadius: '0',
                background: 'rgba(0, 0, 0, 0.4)'
              }}
              disabled={status !== "idle"}
            />
          </div>
          <button 
            type="submit" 
            className="primary-btn"
            style={{ 
              padding: '1rem', 
              fontSize: '1.2rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              opacity: !nameInput.trim() ? 0.5 : 1
            }}
            disabled={!nameInput.trim() || status !== "idle"}
          >
            {status === "idle" ? "Initialize Sequence" : "Connecting..."}
          </button>
        </form>
      </div>
    </div>
  );
}
