import React from 'react';

const InteractiveElements = () => {
    const handleInteraction = (event) => {
        // Handle user interaction here
        console.log('User interacted with the element: ', event.target);
    }

    return (
        <div onClick={handleInteraction}>
            <p>Click me to interact!</p>
        </div>
    );
}

export default InteractiveElements;