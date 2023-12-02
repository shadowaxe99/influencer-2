import React from 'react';
import './UX.css';

const UX = () => {
    return (
        <div className="ux-container">
            <h1>Welcome to Elysium Innovations' Interactive AI Metaverse Demo</h1>
            <p>Experience a personalized AI butler, explore an interactive metaverse, and engage in gamified learning experiences.</p>
            <div className="ux-features">
                <div className="ux-feature">
                    <h2>Personalized AI Butler</h2>
                    <p>Experience a personalized AI butler that can assist you with managing tasks and providing recommendations.</p>
                </div>
                <div className="ux-feature">
                    <h2>Interactive Metaverse</h2>
                    <p>Explore an interactive metaverse, complete tasks, and interact with AI agents to solve virtual challenges.</p>
                </div>
                <div className="ux-feature">
                    <h2>Gamified Learning</h2>
                    <p>Engage in gamified learning experiences that educate you on leveraging the platform's features.</p>
                </div>
            </div>
        </div>
    );
}

export default UX;