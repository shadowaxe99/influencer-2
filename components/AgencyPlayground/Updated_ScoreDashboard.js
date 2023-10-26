
import React from "react";

const ScoreDashboard = ({ score, totalCost, multiplier }) => {
    const costSaved = 60000 - totalCost;
    return (
        <div className="score-dashboard">
            <h2>Your Legendary Score: {score} (Multiplier: x{multiplier})</h2>
            <h3>Real-Time Analytics Dashboard</h3>
            <p>Cost saved by AI: ${costSaved.toLocaleString()}</p>
            {score >= 100 && <h4>🎉 Milestone Reached: AI Prodigy 🎉</h4>}
        </div>
    );
};
export default ScoreDashboard;
