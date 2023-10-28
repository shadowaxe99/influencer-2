import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import ScratchCard from "@components/ScratchCard/ScratchCard";
import AudioPlayer from "@components/AudioPlayer/Audioplayer";
const ContentImageData = [
    {
        id: uuid(),
        title: "Cutting costs in the real world",
        content: `Step into a world where your personal AI "Butler" deftly manages an ecosystem of AI agents, ensuring tasks are executed with unparalleled precision.`,
        align: "right",
        image: "/demos/agent-graph.png",
        flipIconPosition: { top: "4px", right: "5px" }, // new property
        moreInfo: `Elysium OS comes in the form of a personal AI "Butler" assistant, with the ability to delegate tasks for you to our ecosystem of AI agents.`,
        learnMoreHeader: "Learn more 🤔"
    },
    {
        id: uuid(),
        title: "Our G.U.I.D.E to Excellence",
        // content: "",
        align: "left",
        image: "/head.jpeg",
        flipIconPosition: { top: "4px", left: "5px" }, // new property
        learnMoreHeader: "Dive deeper💡",

        listItems: [
            {
                content: "Growth",
                id: uuid(),
                description: "Nurturing innovation."
            },
            {
                content: "User Empowerment",
                id: uuid(),
                description: "Placing control in your hands."
            },
            {
                content: "Innovation",
                id: uuid(),
                description: "Forever forward."
            },
            {
                content: "Data Security",
                id: uuid(),
                description: "Your trust is paramount."
            },
            {
                content: "Enterprise Optimization",
                id: uuid(),
                description: "Efficient, effective, exceptional."
            }
        ],
        moreInfo: `At Elysium, we have a game plan to win and it is laid out in our G.U.I.D.E. principles.`
    }
];
const agents = [
    {
        id: 1,
        name: "Client Onboarding",
        description:
            "I handle the onboarding clients with ease. Let me deal with the riff-raff."
    },
    {
        id: 2,
        name: "Brand Research",
        description:
            "Let me find the perfect brands for you and vet them! Kick your feet up and relax"
    },
    {
        id: 3,
        name: "Brand Outreach",
        description:
            "I automate outreach and communciation with brands! No more pretending to liek them. Let me take care of that 😉"
    }
    // Add other agents here...
];

const agentTasks = {
    1: ["Sort client inbound emails", "Log new client"],
    2: ["Search brands", "Write brand summaries"],
    3: ["Reached out to brands", "Set tracking on emails"]
    // Add more agents and their tasks here
};

export const AgencyExample = ( { addAudioRef, removeAudioRef } ) => {
    const [agentsRunning, setAgentsRunning] = useState(false);
    const [selectedAgents, setSelectedAgents] = useState([]);
    const [runningAgents, setRunningAgents] = useState([]);
    const [showSavings, setShowSavings] = useState(false);
    const [generatedAgentCost, setGeneratedAgentCost] = useState(null);
    const [showChecklist, setShowChecklist] = useState(false);
    const [displayedTasks, setDisplayedTasks] = useState([]);
    const [isRadioVisible, setRadioVisible] = useState(false);
    const radioRef = useRef(null);

    function generateCost() {
        // This will generate a random number between 9 and 500
        const cost = Math.random() * (10000 - 800) + 9;

        // Round off to two decimal places
        const roundedCost = Math.round(cost * 100) / 100;

        return `$${roundedCost.toFixed(2)}`; // This will return a string like "$123.45"
    }
    const toggleAgent = (agent) => {
        if (selectedAgents.includes(agent.id)) {
            setSelectedAgents((prev) => prev.filter((id) => id !== agent.id));
        } else {
            setSelectedAgents((prev) => [...prev, agent.id]);
        }
    };

    const runAgent = (agent) => {
        setRunningAgents((prev) => [...prev, agent.id]);
        setTimeout(() => {
            setRunningAgents((prev) => prev.filter((id) => id !== agent.id));
        }, 5000); // Simulating a 5 second run time for agents
    };

    const handleRunAllAgents = () => {
        setAgentsRunning(true);
        setShowSavings(false);
        setShowChecklist(false);

        setGeneratedAgentCost(generateCost());

        // Simulate running of all selected agents
        setSelectedAgents((prev) => {
            prev.forEach((agentId) => runAgent({ id: agentId }));
            return prev;
        });

        setTimeout(() => {
            setAgentsRunning(false);
            setShowSavings(true);
            setShowChecklist(true);
        }, 5000);
    };
    useEffect(() => {
        if (!agentsRunning && selectedAgents.length > 0) {
            console.log("DDDDDD");
            const tasks = selectedAgents.flatMap((agentId) => {
                console.log(`Processing agentId: ${agentId}`);
                console.log(`Tasks for agentId:`, agentTasks[agentId] || []);
                return agentTasks[agentId] || [];
            });
            console.log("Resultant tasks array:", tasks);
            setDisplayedTasks(tasks);
        }
    }, [agentsRunning, selectedAgents]);
    
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
    return (
        <div className="flex flex-col w-full h-full relative">
            {" "}
            {/* Parent div */}
            <div className="flex flex-col items-center space-y-2 text-center mb-8">
                <Image
                    src="/demos/agent-graph-2.png"
                    width={1000}
                    height={1000}
                    className="object-cover border-blue-500 border-2 rounded"
                    loading="lazy"
                />
                <span>
                    Plug your assistant into various agents to suit your needs
                </span>
            </div>
            <div id="radio-trigger">
                <div
                    className={`radio-container ${
                        isRadioVisible ? "sliding-radio" : ""
                    }`}
                    ref={radioRef}
                >
                    <AudioPlayer 
                        addAudioRef={addAudioRef}
                        removeAudioRef={removeAudioRef}
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <video
                    src={"/demos/agency-demo.mp4"}
                    // width={600}
                    // height={512}
                    muted
                    preload="metadata"
                    loop
                    playsInline={true}
                    autoPlay
                    alt="Demo Video"
                    className="drop-shadow-xl h-full w-3/4 mx-auto offset-y-0 offset-x-8 blur-16 border-4 border-blue-500 rounded-sm"
                    controls
                    loading="lazy"
                />
                <span className="mx-auto">AI Talent Agent Demo</span>
            </div>
            {/* uncomment this when done ⬇️ */}
            {/* <div className="absolute top-96 z-50">
                <AudioPlayer />
            </div> */}
        </div>
    );
};

const AgentSelection = ({ onSelect }) => {
    return (
        <div>
            {agents.map((agent) => (
                <div key={agent.id}>
                    <input
                        type="checkbox"
                        value={agent.id}
                        onChange={onSelect}
                    />
                    <label>
                        {agent.name}: {agent.description}
                    </label>
                </div>
            ))}
        </div>
    );
};
const LotteryScratch = ({ selectedAgents }) => {
    return (
        <div>
            {selectedAgents.map((agent) => (
                <div key={agent.id}>
                    <span>{agent.name}: </span>
                    <span>Traditional Cost: $XXX </span>
                    <span>With AI: $YY </span>
                    <span>Savings: ZZ%</span>
                </div>
            ))}
        </div>
    );
};
