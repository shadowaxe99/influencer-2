import React, { useState, useEffect } from 'react';

const Challenges = () => {
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        // Fetch challenges from the server or a service
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        // This is a placeholder URL, replace with your actual API endpoint
        const response = await fetch('https://api.example.com/challenges');
        const data = await response.json();
        setChallenges(data);
    };

    return (
        <div className="challenges">
            <h2>Challenges</h2>
            {challenges.map((challenge, index) => (
                <div key={index} className="challenge">
                    <h3>{challenge.title}</h3>
                    <p>{challenge.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Challenges;