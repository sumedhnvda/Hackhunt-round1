"use client";
import React, { useState } from "react";

/**
 * HintModal
 * Props:
 *  - isOpen: boolean
 *  - onClose: () => void
 *  - onConfirm: () => void   (called once, to add penalty + reveal hint)
 *  - hintPenaltyMinutes: number
 *  - hintText: string
 *  - alreadyUsed: boolean    (if true, show disabled state in parent instead)
 */
export default function HintModal({
  isOpen,
  onClose,
  onConfirm,
  hintPenaltyMinutes,
  hintText,
}) {
  const [step, setStep] = useState("confirm"); // "confirm" | "reveal"

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();          // trigger penalty + mark used in context
    setStep("reveal");    // flip to hint display
  };

  const handleClose = () => {
    setStep("confirm");   // reset for next time (shouldn't re-open, but safe)
    onClose();
  };

  /* ── Step 1: Confirmation ── */
  if (step === "confirm") {
    return (
      <div className="modal-overlay">
        <div className="modal-content glass-panel bounce-in">
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "2.5rem" }}>⚠️</span>
          </div>
          <h3
            className="neon-text"
            style={{ fontSize: "1.4rem", marginTop: 0, textAlign: "center" }}
          >
            Request a Rescue Hint?
          </h3>
          <p style={{ lineHeight: "1.7", marginBottom: "1.5rem", color: "var(--text-main)" }}>
            A{" "}
            <strong style={{ color: "var(--error-color)" }}>
              +{hintPenaltyMinutes}-minute penalty
            </strong>{" "}
            will be added to your total time. Each stage allows only{" "}
            <strong>one hint</strong>. This cannot be undone.
          </p>
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
          >
            <button className="hint-btn" onClick={handleClose}>
              Cancel
            </button>
            <button
              className="primary-btn"
              onClick={handleConfirm}
              style={{ background: "var(--error-color)", color: "#fff" }}
            >
              Yes, add penalty &amp; show hint
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Step 2: Hint Reveal ── */
  return (
    <div className="modal-overlay">
      <div
        className="modal-content glass-panel bounce-in"
        style={{
          borderColor: "rgba(102, 252, 241, 0.4)",
          boxShadow: "0 0 30px rgba(102,252,241,0.15)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "2.5rem" }}>🔦</span>
        </div>
        <h3
          className="neon-text"
          style={{ fontSize: "1.3rem", marginTop: 0, textAlign: "center", marginBottom: "1rem" }}
        >
          Rescue Hint
        </h3>
        <div
          style={{
            background: "rgba(102,252,241,0.06)",
            border: "1px solid rgba(102,252,241,0.25)",
            borderLeft: "4px solid var(--accent-cyan)",
            borderRadius: "8px",
            padding: "1.2rem 1.4rem",
            marginBottom: "1.5rem",
            color: "#c5c6c7",
            lineHeight: "1.8",
            fontStyle: "italic",
          }}
        >
          {hintText}
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.8rem",
            color: "var(--error-color)",
            marginBottom: "1.5rem",
          }}
        >
          ⏱ +{hintPenaltyMinutes} min penalty has been applied to your timer.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="primary-btn" onClick={handleClose}>
            Got it, back to the challenge
          </button>
        </div>
      </div>
    </div>
  );
}
