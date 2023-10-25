import React, { useEffect, useRef } from "react";

const sections = [
    { name: "Client Onboarding", saving: "$60,000" },
    { name: "Talent Scouting", saving: "$100,000" },
    { name: "Contract Management", saving: "$100,000" },
    { name: "Public Relations", saving: "$120,000" },
    { name: "Social Media Management", saving: "$210,000" },
    { name: "Revenue Generation", saving: "$150,000" },
    { name: "Financial Management", saving: "$50,000" },
    { name: "Financial Management", saving: "$50,000" },
    { name: "Financial Management", saving: "$50,000" }
];

const ScratchCard = ({ agents }) => {
    const gridRef = useRef(null);

    useEffect(() => {
        const scratchCanvases =
            gridRef.current.querySelectorAll(".scratchCanvas");
        const revealCanvases =
            gridRef.current.querySelectorAll(".revealCanvas");

        scratchCanvases.forEach((canvas, index) => {
            const ctx = canvas.getContext("2d");
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            ctx.fillStyle = "blue";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Draw the section name on the scratchable layer
            ctx.save(); // Save the current state
            ctx.fillStyle = "white";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.translate(canvas.width / 2, canvas.height / 2 - 20 + 20); // Moved down by 10 pixels
            ctx.rotate((45 * Math.PI) / 180); // Rotate 45 degrees
            ctx.fillText(agents[index].name, 0, 0); // Draw the text at the rotated angle
            ctx.restore();

            ctx.fillText(
                sections[index].name,
                canvas.width / 2,
                canvas.height / 2 - 20
            );

            let isDrawing = false;

            const startDrawing = (e) => {
                isDrawing = true;
                draw(e);
            };

            const stopDrawing = () => {
                isDrawing = false;
                ctx.beginPath();
            };

            const draw = (e) => {
                if (!isDrawing) return;
                ctx.globalCompositeOperation = "destination-out";
                ctx.lineWidth = 10;
                ctx.lineCap = "round";

                ctx.lineTo(
                    e.clientX - canvas.getBoundingClientRect().left,
                    e.clientY - canvas.getBoundingClientRect().top
                );
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(
                    e.clientX - canvas.getBoundingClientRect().left,
                    e.clientY - canvas.getBoundingClientRect().top
                );
            };

            canvas.addEventListener("mousedown", startDrawing);
            canvas.addEventListener("mouseup", stopDrawing);
            canvas.addEventListener("mousemove", draw);
        });

        revealCanvases.forEach((canvas, index) => {
            const ctx = canvas.getContext("2d");
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            ctx.fillStyle = "white";

            // Draw the dollar amount on the reveal layer
            ctx.fillStyle = "green";
            ctx.font = "14px Arial";
            // ctx.textAlign = "c";
            ctx.textBaseline = "middle";
            ctx.fillText(`$${agents[index].costReduction}`, 10, 50);
        });
    }, []);

    return (
        <div
            ref={gridRef}
            className="grid grid-cols-1 gap-2 p-2 w-full h-full  bg-purple-400 border-4 border-yellow-400 border-dashed justify-items-center"
        >
            {agents &&
                agents.map((section, index) => (
                    <div
                        key={index}
                        className="scratchArea bg-gray-300  w-full h-full flex"
                    >
                        <canvas className="revealCanvas absolute top-0 left-0 w-full h-full"></canvas>
                        <canvas className="scratchCanvas absolute top-0 left-0 w-full h-full"></canvas>
                    </div>
                ))}
        </div>
    );
};

export default ScratchCard;
