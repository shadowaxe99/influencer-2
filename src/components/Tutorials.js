import React from 'react';

const Tutorials = () => {
    const tutorials = [
        {
            id: 1,
            title: 'Getting Started with Elysium Innovations',
            description: 'Learn the basics of navigating through the metaverse.',
            content: 'Tutorial content goes here...'
        },
        {
            id: 2,
            title: 'Interacting with AI Butler',
            description: 'Understand how to interact with your personalized AI Butler.',
            content: 'Tutorial content goes here...'
        },
        {
            id: 3,
            title: 'Exploring the AI Agent Ecosystem',
            description: 'Discover the diverse AI agents and how to engage with them.',
            content: 'Tutorial content goes here...'
        },
        // More tutorials can be added here
    ];

    return (
        <div className="tutorials">
            {tutorials.map(tutorial => (
                <div key={tutorial.id} className="tutorial">
                    <h2>{tutorial.title}</h2>
                    <p>{tutorial.description}</p>
                    <div>{tutorial.content}</div>
                </div>
            ))}
        </div>
    );
};

export default Tutorials;