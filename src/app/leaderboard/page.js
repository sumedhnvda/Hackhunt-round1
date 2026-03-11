"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Leaderboard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      if (data.success) {
        setTeams(data.data);
      }
    } catch (err) {
      console.error("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="main-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav className="navbar" style={{ justifyContent: 'center' }}>
        <div className="nav-brand">Hack Hunt Leaderboard</div>
      </nav>

      <div className="stage-wrapper" style={{ alignItems: 'flex-start', paddingTop: '4rem' }}>
        <div className="stage-container fade-in">
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <h2 className="title-gradient text-center" style={{ marginBottom: '2rem' }}>
              Top 10 Qualifiers
            </h2>
            
            {loading ? (
              <div className="text-center" style={{ color: '#a8b2d1' }}>Loading records...</div>
            ) : teams.length === 0 ? (
              <div className="text-center" style={{ color: '#a8b2d1' }}>No teams have finished yet!</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--accent-cyan)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Rank</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Team Name</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Total Time (+Penalties)</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr 
                      key={team._id} 
                      style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        backgroundColor: index < 10 ? (index === 0 ? 'rgba(102, 252, 241, 0.1)' : 'transparent') : 'transparent'
                      }}
                    >
                      <td style={{ padding: '1rem', fontWeight: 'bold', color: index === 0 ? '#ffd700' : 'inherit' }}>
                        #{index + 1}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '1.1rem' }}>{team.teamName}</td>
                      <td style={{ padding: '1rem', textAlign: 'right', fontFamily: '"Fira Code", monospace', color: '#a8b2d1' }}>
                        {team.formattedTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="text-center" style={{ marginTop: '3rem' }}>
              <button className="hint-btn" onClick={() => fetchLeaderboard()}>
                Refresh Leaderboard
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
