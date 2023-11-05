
import { memo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Draggable = dynamic(() => import("react-draggable"), { ssr: false, loading: () => <p>Loading...</p> });

const Preloader = memo(({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="preloader-container">
            {/* Assume preloader animation is handled here with optimized assets */}
        </div>
    );
});

export default Preloader;
