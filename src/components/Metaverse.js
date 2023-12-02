import React, { useState, useEffect } from 'react';
import AIButler from './AIButler';
import AIAgent from './AIAgent';
import Challenges from './Challenges';
import './Metaverse.css';

const Metaverse = () => {
    const [agents, setAgents] = useState([]);
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        // Fetch AI agents and challenges from the server
        // This is a placeholder, replace with actual server calls
        setAgents(fetchAIAgents());
        setChallenges(fetchChallenges());
    }, []);

    return (
        <div className="metaverse">
            <AIButler />
            <div className="ai-agents">
                {agents.map(agent => <AIAgent key={agent.id} agent={agent} />)}
            </div>
            <div className="challenges">
                {challenges.map(challenge => <Challenges key={challenge.id} challenge={challenge} />)}
            </div>
        </div>
    );
};

// Placeholder functions, replace with actual server calls
const fetchAIAgents = () => {
    return [
        { id: 1, name: 'Agent 1', skills: ['Task 1', 'Task 2'] },
        { id: 2, name: 'Agent 2', skills: ['Task 3', 'Task 4'] },
    ];
};

const fetchChallenges = () => {
    return [
        { id: 1, name: 'Challenge 1', tasks: ['Task 1', 'Task 2'] },
        { id: 2, name: 'Challenge 2', tasks: ['Task 3', 'Task 4'] },
    ];
};

export default Metaverse;