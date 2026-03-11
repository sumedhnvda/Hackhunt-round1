"use client";
import React, { useState } from "react";
import { useGame } from "@/context/GameContext";

const SNIPPETS = {
  javascript: `function calculateTotal(items) {
  let total = 1;
  for (let i = 0; i < items.length; i++) {
    total += items[i];
  }
  return total;
}

console.log(calculateTotal([15, 25, 35, 25]));`,
  python: `def calculate_total(items):
    total = 1
    for item in items:
        total += item
    return total

print(calculate_total([15, 25, 35, 25]))`,
  cpp: `#include <iostream>
#include <vector>

int calculateTotal(std::vector<int> items) {
    int total = 1;
    for(int i = 0; i < items.size(); i++) {
        total += items[i];
    }
    return total;
}

int main() {
    std::cout << calculateTotal({15, 25, 35, 25});
    return 0;
}`,
  java: `public class Main {
    public static int calculateTotal(int[] items) {
        int total = 1;
        for(int i = 0; i < items.length; i++) {
            total += items[i];
        }
        return total;
    }

    public static void main(String[] args) {
        int[] items = {15, 25, 35, 25};
        System.out.println(calculateTotal(items));
    }
}`
};

export default function Stage2() {
  const { nextStage } = useGame();
  const [lang, setLang] = useState("javascript");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "100") {
      nextStage();
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="stage-container fade-in">
      <div className="glass-panel">
        <h2 className="title-gradient">Stage 2: The Broken Logic</h2>
        <p className="mb-4">
          The code below contains a logical error. Fix the code mentally and enter the EXACT output it would produce if the bug was resolved.
        </p>
        
        <div className="lang-selector">
          {Object.keys(SNIPPETS).map((key) => (
            <button
              key={key}
              type="button"
              className={lang === key ? "lang-btn active" : "lang-btn"}
              onClick={() => setLang(key)}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="terminal-box code-snippet" style={{ marginBottom: '2rem' }}>
          <pre><code>{SNIPPETS[lang]}</code></pre>
        </div>
        
        <form onSubmit={handleSubmit} className="input-group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter the correct output..."
            className={error ? "shake error-input" : ""}
          />
          <button className="primary-btn" type="submit">Submit Output</button>
        </form>
      </div>
    </div>
  );
}
