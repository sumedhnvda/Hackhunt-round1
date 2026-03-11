"use client";
import React from "react";

export default function HintModal({ isOpen, onClose, onConfirm, hintPenaltyMinutes }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel bounce-in">
        <h3 className="neon-text mb-4" style={{ fontSize: '1.5rem', marginTop: 0 }}>Request a Hint?</h3>
        <p style={{ lineHeight: '1.6', marginBottom: '2rem' }}>
          By requesting a hint, a <strong>{hintPenaltyMinutes}-minute penalty</strong> will be added to your total time.
          Are you sure you want to proceed?
        </p>
        <div className="modal-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button className="hint-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={onConfirm} style={{ background: 'var(--error-color)', color: '#fff' }}>
            Confirm (Add Penalty)
          </button>
        </div>
      </div>
    </div>
  );
}
