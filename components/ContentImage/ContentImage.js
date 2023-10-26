import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
const ContentImageData = [
    {
        id: uuid(),
        title: "Discover Elysium OS",
        content: `Step into a world where your personal AI "Butler" deftly manages an ecosystem of AI agents, ensuring tasks are executed with unparalleled precision.`,
        align: "right",
        image: "/elysium-logo-1.jpeg",
        video: "/elysium-os-video.mp4",
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
        video: "/guide-video.mp4",
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

export const ContentImage = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [hoveredId, setHoveredId] = useState(null);
    const [flippedId, setFlippedId] = useState(null);

    const handlFlip = (id) => {
        if (typeof window !== "undefined") {
            const flipSound = new Audio("/sounds/swoosh.mp3"); // Make sure to provide the correct path to your audio file
            flipSound.volume = 0.25;
            flipSound.play();
        }
        setFlippedId(id);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <SectionContainer className="process-items mt-16 space-y-16">
            {ContentImageData.map((item) => {
                const transformStyle = (align, id) => {
                    const moveFactor = align === "left" ? 0.05 : -0.05;
                    const hoverTransform =
                        id === hoveredId ? "scale(1.05) translateY(-5px)" : "";

                    return {
                        transform: `translateX(${
                            moveFactor * scrollY
                        }px) ${hoverTransform}`,
                        transition: "all 0.3s ease-out",
                        boxShadow:
                            id === hoveredId
                                ? "0 10px 20px rgba(0, 0, 0, 0.2)"
                                : "0 4px 6px rgba(0, 0, 0, 0.1)"
                    };
                };
                // const animationProps = getAnimationProps(item.align);

                return (
                    <div
                        id={item.id}
                        key={item.id}
                        className="process-item--container md:grid md:grid-cols-2 gap-y-8"
                    >
                        <animated.div
                            className={`process-item--image rounded-3xl ${
                                item.align === "left" ? "md:order-1" : ""
                            }`}
                        >
                            <div
                                className="flip-card"
                                onClick={() =>
                                    handlFlip(
                                        flippedId === item.id ? null : item.id
                                    )
                                }
                            >
                                {" "}
                                <div
                                    className={`flip-card-inner ${
                                        flippedId === item.id ? "flipped" : ""
                                    }`}
                                >
                                    <div className="flip-card-front relative">
                                        {/* <div
                                            className=" absolute top-4 right-5 z-50 text-white text-sm h-8 w-8"
                                            style={transformStyle(
                                                item.align,
                                                item.id
                                            )}
                                        > */}
                                        <Image
                                            src="/flip.png" // replace with your image path
                                            alt="Flip Icon"
                                            width={32} // adjust size as needed
                                            height={32} // adjust size as needed
                                            className="absolute z-50"
                                            loading="lazy"
                                            // Can use the belore to add colored backgorunt o clicker image
                                            // style={{
                                            //     ...transformStyle(item.align, item.id),
                                            //     backgroundColor: '#FAF1D4',
                                            //     }}
                                            style={{
                                                ...transformStyle(
                                                    item.align,
                                                    item.id
                                                ),
                                                ...item.flipIconPosition, // use the new property for positioning
                                                backgroundColor: "#FAF1D4"
                                            }}
                                        />
                                        {/* </div> */}

                                        {/* <Image
                                            src={item.image}
                                            width={512}
                                            height={512}
                                            draggable={false}
                                            objectFit="cover"
                                            alt="Process Banner 1"
                                            className="drop-shadow-xl w-full offset-y-0 offset-x-8 blur-16 border-4 border-blue-500 rounded glow-image float-image"
                                            style={transformStyle(
                                                item.align,
                                                item.id
                                            )}
                                            onMouseEnter={() =>
                                                setHoveredId(item.id)
                                            }
                                            onMouseLeave={() =>
                                                setHoveredId(null)
                                            }
                                            onClick={() =>
                                                setFlippedId(item.id)
                                            }
                                        /> */}
                                        <video
                                            src={item.video}
                                            width={512}
                                            height={512}
                                            draggable={false}
                                            objectFit="cover"
                                            alt="Process Banner 1"
                                            className="drop-shadow-xl w-full offset-y-0 offset-x-8 blur-16 border-4 border-blue-500 rounded glow-image float-image"
                                            style={transformStyle(
                                                item.align,
                                                item.id
                                            )}
                                            onMouseEnter={() =>
                                                setHoveredId(item.id)
                                            }
                                            onMouseLeave={() =>
                                                setHoveredId(null)
                                            }
                                            onClick={() =>
                                                setFlippedId(item.id)
                                            }
                                            loop
                                            muted
                                            autoPlay
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flip-card-back p-8">
                                        {/* Information you want to display on the back of the card */}
                                        <h3>{item.learnMoreHeader}</h3>
                                        <p>{item.moreInfo}</p>
                                        <ul className=" space-y-3 text-left">
                                            {item.listItems?.length &&
                                                item.listItems.map(
                                                    (listItem) => (
                                                        <li
                                                            id={listItem.id}
                                                            key={listItem.id}
                                                            className="flex items-center"
                                                        >
                                                            <p className="text-2xl font-bold">
                                                                {
                                                                    listItem.content
                                                                }
                                                                :{" "}
                                                                <small className="text-2xl font-light">
                                                                    {" "}
                                                                    {
                                                                        listItem.description
                                                                    }
                                                                </small>
                                                            </p>
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </animated.div>
                        <div
                            className={`process-item--content ${
                                item.align === "left"
                                    ? "md:pr-16 lg:pr-24 xl:pr-32 ml-auto"
                                    : "md:pl-16 lg:pl-24 xl:pl-32  mr-auto"
                            } my-auto content text-black/60`}
                            style={{
                                width: item.align === "left" ? "150%" : "120%"
                            }} // adjust as needed
                        >
                            <h3
                                className="mb-6 h4 md:h3 font-semibold text-black text-xl w-full"
                                style={{ fontSize: "3em" }} // adjust as needed
                            >
                                {item.title}
                            </h3>
                            <p
                                className="text-lg"
                                style={{ fontSize: "2em", lineHeight: "1" }} // adjust as needed
                            >
                                {item.content}
                            </p>
                            <ul className="process-item--list space-y-3 text-left">
                                {item.listItems?.length &&
                                    item.listItems.map((listItem) => (
                                        <li
                                            id={listItem.id}
                                            key={listItem.id}
                                            className="flex items-center"
                                        >
                                            <Icon
                                                icon="ph:seal-check-bold"
                                                className="w-6 h-6 text-secondary-500 mr-2"
                                            />
                                            <p className="text-4xl">
                                                <span className="underline font-bold">
                                                    {listItem.content.charAt(0)}
                                                </span>
                                                {listItem.content.slice(1)}
                                            </p>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                );
            })}
        </SectionContainer>
    );
};
