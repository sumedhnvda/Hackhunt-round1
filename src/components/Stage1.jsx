"use client";
import React, { useState } from "react";
import { useGame } from "@/context/GameContext";

export default function Stage1() {
  const { nextStage } = useGame();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === "welcome to varnothsava") {
      nextStage();
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="stage-container fade-in">
      <div className="glass-panel">
        <h2 className="title-gradient">Stage 1: The First Whisper</h2>
        <div className="terminal-box">
          <code>
            01110111 01100101 01101100 01100011 01101111 01101101 01100101<br />
            00100000<br />
            01110100 01101111<br />
            00100000<br />
            01110110 01100001 01110010 01101110 01101111 01110100 01101000<br />
            01110011 01100001 01110110 01100001
          </code>
        </div>
        <div className="hint-text neon-text">
          <p>Spaces and tabs speak in binary.</p>
          <p>Eight whispers make a letter.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="input-group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter the translated text..."
            className={error ? "shake error-input" : ""}
          />
          <button className="primary-btn" type="submit">Unlock</button>
        </form>
      </div>
    </div>
  );
}
