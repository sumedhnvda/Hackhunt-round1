"use client";
import React, { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";

export default function Victory() {
  const { startTime, penaltyMs, resetGame } = useGame();
  const [finalTime, setFinalTime] = useState("");
  const [totalMs, setTotalMs] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!startTime) return;
    
    // Freeze time on victory component mount
    const elapsedMs = Date.now() - startTime + penaltyMs;
    setTotalMs(elapsedMs);

    const totalSeconds = Math.floor(elapsedMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    setFinalTime(
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    );
  }, [startTime, penaltyMs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          teamName: teamName.trim(),
          totalTimeMs: totalMs,
          formattedTime: finalTime,
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to submit score");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Network error trying to submit.");
    }
  };

  const handleViewLeaderboard = () => {
    // Optionally reset local game storage if they are fully done
    resetGame();
    router.push("/leaderboard");
  };

  return (
    <div className="stage-container fade-in">
      <div className="glass-panel text-center" style={{ border: '1px solid var(--accent-cyan)' }}>
        <h2 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>VICTORY</h2>
        <p className="neon-text mb-6">You have successfully cleared Round 1 of Hack Hunt!</p>
        
        <div className="terminal-box" style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '2rem' }}>
          Final Time: <span style={{ color: 'white' }}>{finalTime}</span>
        </div>

        {status === "idle" || status === "error" ? (
          <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto 2rem auto' }}>
            <p style={{ color: '#a8b2d1', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Submit your team name to lock in your score on the global leaderboard.
            </p>
            <div className="input-group" style={{ marginTop: '0' }}>
              <input 
                type="text" 
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter Team Name..."
                required
                maxLength={50}
                className={status === "error" ? "shake error-input" : ""}
              />
              <button 
                className="primary-btn" 
                type="submit"
                disabled={status === "submitting"}
              >
                I am done
              </button>
            </div>
            {status === "error" && <div style={{ color: 'var(--error-color)', marginTop: '0.5rem', fontSize: '0.85rem' }}>{errorMsg}</div>}
          </form>
        ) : status === "submitting" ? (
          <div style={{ marginBottom: '2rem', color: 'var(--accent-cyan)' }}>Submitting score...</div>
        ) : (
          <div style={{ marginBottom: '2rem', color: '#66fcf1', fontWeight: 'bold' }}>
            Score submitted successfully!
          </div>
        )}

        {status === "success" && (
          <button className="primary-btn" onClick={handleViewLeaderboard} style={{ background: '#f25f5c', color: 'white' }}>
            View Leaderboard
          </button>
        )}
      </div>
    </div>
  );
}
