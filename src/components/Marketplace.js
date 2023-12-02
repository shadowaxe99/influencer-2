import React from 'react';
import AIAgent from './AIAgent';

const Marketplace = () => {
    const [agents, setAgents] = React.useState([]);

    React.useEffect(() => {
        // Fetch AI agents from the backend
        fetch('/api/agents')
            .then(response => response.json())
            .then(data => setAgents(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="marketplace">
            <h2>AI Agent Marketplace</h2>
            <div className="agent-list">
                {agents.map(agent => (
                    <AIAgent key={agent.id} agent={agent} />
                ))}
            </div>
        </div>
    );
};

export default Marketplace;