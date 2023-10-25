// Import necessary packages and components
import AudioPlayer from "@components/AudioPlayer/Audioplayer";
import ScratchCard from "@components/ScratchCard/ScratchCard";
import React, { useState, useEffect, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BarChart from "./BarChart";
import Image from "next/image";

const AgencyPlayground = () => {
    const agents = [
        {
            id: 1,
            name: "Client Onboarding",
            description:
                "I handle the onboarding clients with ease. Let me deal with the riff-raff.",
            backgroundColor: "bg-green-300",
            tasks: [
                { taskName: "Client Data Import", progress: 0, speed: 4 },
                { taskName: "Initial Setup", progress: 0, speed: 3 }
            ],
            costReduction: 16000,
            imageSrc: "/agents/agent1.png",
            isAnimating: true
        },
        {
            id: 2,
            name: "Brand Research",
            description:
                "Let me find the perfect brands for you and vet them! Kick your feet up and relax",
            backgroundColor: "bg-yellow-300",
            tasks: [
                { taskName: "Client Data Import", progress: 0, speed: 4 },
                { taskName: "Initial Setup", progress: 0, speed: 5 }
            ],
            costReduction: 12000,
            imageSrc: "/agents/agent2.png",
            isAnimating: true
        },
        {
            id: 3,
            name: "Brand Outreach",
            description:
                "I automate outreach and communciation with brands! No more pretending to liek them. Let me take care of that 😉",
            backgroundColor: "bg-red-300",
            tasks: [
                { taskName: "Client Data Import", progress: 0, speed: 5 },
                { taskName: "Initial Setup", progress: 0, speed: 6 }
            ],
            costReduction: 10000,
            imageSrc: "/agents/agent3.png",
            isAnimating: true
        }
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [droppedAgents, setDroppedAgents] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [totalCost, setTotalCost] = useState(60000);
    const [aiCostDeducted, setAiCostDeducted] = useState(false);
    const [pendingDeduction, setPendingDeduction] = useState(0);
    const [isRadioVisible, setRadioVisible] = useState(false);
    const radioRef = useRef(null);
    const [aiCost, setAiCost] = useState(60000); // initial value

    const deductCostForAgent = (agentId) => {
        const agent = agents.find((a) => a.id === agentId);
        setPendingDeduction((prevPending) => prevPending + agent.costReduction);
    };

    const addTasksForAgent = (agentId) => {
        const agent = agents.find((a) => a.id === agentId);
        if (agent && agent.tasks) {
            setTasks((prevTasks) => [
                ...prevTasks,
                ...agent.tasks.map((t) => ({ ...t, agentId }))
            ]);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTasks((prevTasks) => {
                const updatedTasks = prevTasks.map((task) => {
                    if (task.progress < 100) {
                        const newProgress = task.progress + task.speed;
                        return {
                            ...task,
                            progress: newProgress > 100 ? 100 : newProgress
                        };
                    }
                    return task;
                });

                // Iterate through each agent
                agents.forEach((agent) => {
                    const tasksOfAgent = updatedTasks.filter(
                        (t) => t.agentId === agent.id
                    );
                    // Check if all tasks of an agent are complete
                    if (tasksOfAgent.every((t) => t.progress === 100)) {
                        agent.isAnimating = false;
                    }
                });

                return updatedTasks;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const costReductionInterval = 40; // Interval in milliseconds for each cost reduction. Adjust as needed.
        const reductionAmount = 204; // Amount to reduce in each interval. Adjust as needed.

        const interval = setInterval(() => {
            if (pendingDeduction > 0) {
                const amountToDeduct = Math.min(
                    reductionAmount,
                    pendingDeduction
                );

                setTotalCost((prevCost) => prevCost - amountToDeduct);
                setPendingDeduction(
                    (prevPending) => prevPending - amountToDeduct
                );
            }
        }, costReductionInterval);

        return () => clearInterval(interval); // Clear the interval when the component is unmounted or upon changes.
    }, [pendingDeduction]);

    const handleAgentClick = (agent) => {
        setSelectedAgent(agent);
        setIsModalOpen(true);
    };
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setRadioVisible(true);
                }
            },
            { threshold: 0.1 } // Adjust the threshold as needed
        );

        if (radioRef.current) {
            observer.observe(radioRef.current);
        }

        return () => {
            if (radioRef.current) {
                observer.unobserve(radioRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !aiCostDeducted) {
                    if (aiCost > 22000) {
                        setAiCost((prevAiCost) => prevAiCost - 40000); // example
                        setAiCostDeducted(true);
                    }
                    // Your function to reduce aiCost here.
                }
            },
            { threshold: 0.1 }
        );

        const target = document.getElementById("bar-section"); // Adjust ID as needed
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [aiCostDeducted]);

    return (
        <DndProvider backend={HTML5Backend}>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                agent={selectedAgent}
            />
            <div className="container mx-auto px-4 py-6">
                {/* First Section */}
                <div id="radio-trigger">
                    <div
                        className={`radio-container ${
                            isRadioVisible ? "sliding-radio" : ""
                        }`}
                        ref={radioRef}
                    >
                        <AudioPlayer />
                    </div>

                </div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="col-span-1">
                            <div className="mb-4">
                                <div className="grid grid-cols-3 gap-2">
                                    {/* Generate agents from the agents array */}
                                    {agents.map((agent) => (
                                        <Agent
                                            key={agent.id}
                                            agent={agent}
                                            handleAgentClick={(a) =>
                                                handleAgentClick(a)
                                            }
                                            droppedAgents={droppedAgents}
                                            setDroppedAgents={setDroppedAgents}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Place to drop agents */}
                            <div className="grid grid-cols-3 gap-2">
                                <Placeholder
                                    id={1}
                                    agents={agents}
                                    droppedAgents={droppedAgents}
                                    setDroppedAgents={setDroppedAgents}
                                    addTasksForAgent={addTasksForAgent}
                                    onDrop={deductCostForAgent}
                                />
                                <Placeholder
                                    id={2}
                                    agents={agents}
                                    droppedAgents={droppedAgents}
                                    setDroppedAgents={setDroppedAgents}
                                    addTasksForAgent={addTasksForAgent}
                                    onDrop={deductCostForAgent}
                                />
                                <Placeholder
                                    id={3}
                                    agents={agents}
                                    droppedAgents={droppedAgents}
                                    setDroppedAgents={setDroppedAgents}
                                    addTasksForAgent={addTasksForAgent}
                                    onDrop={deductCostForAgent}
                                />
                            </div>
                        </div>

                        {/* Agent progress */}
                        <div className="col-span-1 border bg-white p-4">
                            Agent Progress
                            {tasks.map((task, index) => (
                                <TaskProgress key={index} task={task} />
                            ))}
                        </div>

                        {/* Agent Environment */}

                        <div className="col-span-1 border bg-white h-full max-h-full overflow-y-hidden p-4 bg-[url('/backgrounds/pokemon-background.webp')] rounded relative">
                            <div className="bg-white p-1 rounded w-1/3 text-center font-semibold">
                                Workspace
                            </div>
                            <div className="flex flex-col space-y-12">
                                {droppedAgents.map((agent, index) => (
                                    <AgentAnimation
                                        key={agent.id}
                                        agent={agent}
                                        path={`agentPath${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Total Cost */}
                    <div className="total-cost text-center mb-6">
                        Total Cost: ${totalCost.toLocaleString()}
                    </div>
                    <div className="text-center w-1/2 mb-2">
                        <p className="text-black font-semibold text-2xl">
                            AI Savings!
                        </p>{" "}
                        <br />
                        {"(must be 21+ to scratch 😉)"}
                    </div>

                {/* Second Section */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Scratch-off lottery */}

                    <ScratchCard agents={agents} />

                    {/* Trad costs vs AI costs */}
                    <div
                        className="col-span-1 border bg-white p-4 "
                        id="bar-section"
                    >
                        Bar Chart
                        <BarChart aiCost={aiCost} />
                        Traditional vs AI Onboarding Costs Comparison (Drag and
                        drop agents to see the difference)
                    </div>

                    {/* Radio Player */}
                    {/* <div
                        className="col-span-1 border bg-blue-300 p-4  "
                        style={{
                            backgroundImage: "url('/ai-radio-bg.png')",
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat"
                        }}
                    >
                        <div className="w-3/4 h-3/4 mt-20 ml-16">
                            <AudioPlayer />
                        </div>
                    </div>

                    <div className="col-span-1 border bg-white p-4">
                        Elysium Apps
                    </div> */}
                </div>
            </div>
        </DndProvider>
    );
};

const TaskProgress = ({ task }) => {
    return (
        <div className="my-2 flex items-center justify-between">
            <div className="mr-4">{task.taskName}</div>
            <div className="bg-gray-300 w-1/2 rounded">
                <div
                    className={`bg-green-500 h-2 rounded`}
                    style={{ width: `${task.progress}%` }}
                />
            </div>
        </div>
    );
};

export default AgencyPlayground;

const Agent = ({ agent, handleAgentClick, setDroppedAgent, droppedAgents }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "AGENT",
        item: { id: agent.id, name: agent.name },
        canDrag: !droppedAgents.includes(agent.id),
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    return (
        <div
            ref={drag}
            className={`h-10 p-2 bg-gray-400 border rounded w-full h-24 text-center ${agent.backgroundColor}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            onClick={() => handleAgentClick(agent)} // Add onClick event
        >
            {agent.name}
        </div>
    );
};
const Placeholder = ({
    droppedAgents,
    setDroppedAgents,
    id,
    addTasksForAgent,
    onDrop,
    agents
}) => {
    const [droppedAgent, setDroppedAgent] = useState(null);
    const isFilled = droppedAgents.includes(id);

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "AGENT",
        drop: (item) => handleDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        }),
        canDrop: () => !isFilled
    }));

    const handleDrop = (item) => {
        // If there's a previous agent in the placeholder, make it draggable again
        if (droppedAgent) {
            const updatedDroppedAgents = droppedAgents.filter(
                (agentId) => agentId !== droppedAgent.id
            );
            setDroppedAgents((prev) => updatedDroppedAgents);
        }
        const agentInfo = agents.find((a) => a.id === item.id);
        setDroppedAgent(agentInfo);
        setDroppedAgents((prev) => [...prev, agentInfo]);
        addTasksForAgent(item.id);
        onDrop(item.id);
        const dropSound = new Audio("/sounds/costReduction.mp3");
        dropSound.volume = 0.25;
        dropSound.play();
    };

    return (
        <div
            ref={drop}
            className={`h-24 p-2 bg-gray-300 border rounded ${
                isOver && canDrop
                    ? "border-2 border-green-500"
                    : isOver
                    ? "border-2 border-red-500"
                    : ""
            } ${droppedAgent && droppedAgent.backgroundColor}`}
        >
            {droppedAgent ? (
                <div>
                    <strong>{droppedAgent.name}</strong>
                </div>
            ) : (
                "Drop an agent here"
            )}
        </div>
    );
};

const Modal = ({ isOpen, onClose, agent }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-md">
                <button onClick={onClose} className="float-right">
                    X
                </button>
                <h2>{agent.name}</h2>
                <p>{agent.description}</p>
            </div>
        </div>
    );
};

const AgentAnimation = ({ agent, path }) => {
    const animationStyles = {
        agentPath1: "agentPath1 15s ",
        agentPath2: "agentPath2 15s ",
        agentPath3: "agentPath3 15s "
    };

    return (
        <div
            className="absolute h-24 w-1/2 text-black flex-col  flex justify-center items-center"
            style={{ animation: animationStyles[path] }}
        >
            <Image height={48} width={48} src={agent.imageSrc} />
            <p className="text-sm font-bold w-full text-center">{agent.name}</p>

            {/* Add more agent details or display components */}
        </div>
    );
};
