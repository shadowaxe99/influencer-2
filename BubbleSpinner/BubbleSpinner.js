// components/BubblesSpinner.js
import React from "react";

const BubblesSpinner = () => {
    return (
        <div className="flex space-x-3">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className={`h-2.5 w-2.5 bg-blue-500 rounded-full animate-bounce-${
                        index + 1
                    }00 delay-${index}00`}
                ></div>
            ))}
            <style jsx>{`
                .animate-bounce-100 {
                    animation: bounce 1s infinite;
                }
                .animate-bounce-200 {
                    animation: bounce 1s infinite;
                    animation-delay: 0.2s;
                }
                .animate-bounce-300 {
                    animation: bounce 1s infinite;
                    animation-delay: 0.4s;
                }
                @keyframes bounce {
                    0%,
                    100% {
                        transform: translateY(0) scale(1);
                        background-color: #3b82f6;
                    }
                    50% {
                        transform: translateY(-25%) scale(1.5);
                        background-color: #9333ea;
                    }
                }
            `}</style>
        </div>
    );
};

export default BubblesSpinner;
