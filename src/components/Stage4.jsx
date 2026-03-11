"use client";
import React, { useState } from "react";
import { useGame } from "@/context/GameContext";

export default function Stage4() {
  const { nextStage } = useGame();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === "void") {
      nextStage();
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="stage-container fade-in" style={{ padding: '5rem 0' }}>
      <h2 style={{ visibility: 'hidden', position: 'absolute' }}>Stage 4</h2>
      
      {/* The hidden text */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <span style={{ color: 'var(--bg-color)', userSelect: 'all', fontSize: '1.2rem', cursor: 'text' }}>
          the password is void
        </span>
      </div>

      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} className="input-group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your final observation..."
            className={error ? "shake error-input" : ""}
            style={{ background: 'transparent', borderColor: 'rgba(255,255,255,0.1)' }}
          />
          <button className="primary-btn" type="submit">Final Check</button>
        </form>
      </div>
    </div>
  );
}
