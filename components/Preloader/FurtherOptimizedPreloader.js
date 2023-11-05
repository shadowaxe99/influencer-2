
import { useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Draggable = dynamic(() => import("react-draggable"), { ssr: false, loading: () => <p>Loading...</p> });

export default function Preloader({ isLoading }) {
    // Only render the Preloader if isLoading is true
    if (!isLoading) return null;

    // Rest of the component logic...
    return (
        <div className="preloader-container">
            {/* Assume preloader animation is handled here */}
        </div>
    );
}
