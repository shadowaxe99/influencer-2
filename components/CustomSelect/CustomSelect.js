import {
    faCaretDown,
    faInfo,
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const InfoCard = ({ info, onClose }) => {
    return (
        <div className="absolute z-50 top-0 left-0 p-4 bg-white text-black w-[600px] rounded-lg shadow-lg w-80 border-gray-500 border">
            <button
                className="bg-transparent border-none absolute top-2 right-2 w-4 h-4 border border-gray-500 rounded-full"
                onClick={onClose}
            >
                <FontAwesomeIcon icon={faTimes} color="red" />
            </button>
            <div className="flex items-center mb-4">
                <div className="relative w-24 h-24 border-2 border-gray-300 mr-4 rounded-full overflow-hidden">
                    <Image
                        src={info.image}
                        alt={info.name}
                        objectFit="cover"
                        layout="fill"
                    />
                </div>
                <div>
                    <p className="text-xl font-bold">{info.name}</p>
                    <p className="text-lg text-gray-500">{info.title}</p>
                </div>
            </div>
            <p className="text-gray-700">{info.description}</p>
        </div>
    );
};

// ... rest of your code

const Tooltip = () => {
    return (
        <div className="absolute z-50 left-[-40%] top-0 ml-48 mt-2 p-4 bg-gray-800 text-white rounded-lg shadow-lg w-80">
            <div className=" items-center mb-2">
                <ul className="tool-tip-ul">
                    <li>Select team member to chat with.</li>
                    <li>
                        {" "}
                        You can switch between team members in a continuous
                        conversation.{" "}
                    </li>
                    <li>
                        Watch the magic as AI embodies the different personas
                        from our team. ✨
                    </li>
                </ul>
            </div>
        </div>
    );
};

const CustomSelect = ({ options, onSelect, selectedProfile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showToolTipInfo, setShowToolTipInfo] = useState(null);
    const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);

    const handleAboutClick = () => {
        setIsInfoCardOpen(true);
    };
    const handleInfoCardClose = () => {
        setIsInfoCardOpen(false);
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);

        setIsOpen(false);
    };
    useEffect(() => {
        if (selectedProfile) {
            setSelectedOption(selectedProfile);
        }
    }, [selectedProfile]);
    return (
        <div className="relative mx-auto w-1/2 mt-2">
            {showToolTipInfo && <Tooltip />}

            <div className="flex flex-row">
                <FontAwesomeIcon
                    icon={faInfo}
                    size="1xs"
                    className="border w-5 border-gray-500 p-2 my-auto mr-4 rounded-full hover:cursor-pointer focus:ring-blue-300"
                    onMouseEnter={() => setShowToolTipInfo(true)}
                    onMouseLeave={() => setShowToolTipInfo(false)}
                />
                <button
                    disabled={true} // We are only using this select to display names
                    className="bg-white flex flex-row text-center h-16 justify-between text-gray-700 border border-gray-300 px-4  rounded shadow focus:outline-none w-full focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    onClick={toggleDropdown}
                >
                    <div className="relative w-12 h-12 mt-1 border-2 border-gray-300 mr-4 rounded-full overflow-hidden">
                        {selectedOption && (
                            <Image
                                id={selectedOption.id}
                                src={selectedOption.image}
                                alt={selectedOption.name}
                                objectFit="cover"
                                layout="fill"
                            />
                        )}
                    </div>
                    <span className="p-2 mt-2">
                        {selectedOption
                            ? selectedOption.name
                            : "Select a team member"}
                    </span>
                    {/* <div className="w-10 h-10"> */}
                    {/* <FontAwesomeIcon
                        icon={faCaretDown}
                        className="ml-2 w-10 h-10 mt-2"
                    /> */}
                    {/* </div> */}
                </button>

                {/* {selectedOption && (
                    <button
                        onClick={() => handleAboutClick()}
                        className="border border-gray-300 rounded p-2 ml-2 h-12 w-16 my-auto"
                    >
                        About
                    </button>
                )} */}
            </div>
            {isInfoCardOpen && (
                <InfoCard info={selectedOption} onClose={handleInfoCardClose} />
            )}

            {isOpen && (
                <ul className="absolute border border-gray-300 bg-white text-gray-700 mt-1 py-2 rounded shadow z-50 max-h-48 overflow-y-scroll w-full hover:cursor-pointer">
                    {options.map((option, index) => (
                        <div
                            className="text-black flex flex-row my-2 border-b border-black px-2 pb-2"
                            onClick={() => handleSelect(option)}
                            key={index}
                        >
                            <div className="relative w-12 h-12 border-2 border-gray-300 mr-4 rounded-full overflow-hidden">
                                <Image
                                    id={option.id}
                                    src={option.image}
                                    alt={option.name}
                                    objectFit="cover"
                                    layout="fill"
                                />
                            </div>
                            <div className="text-black flex flex-col">
                                <span>{option.name}</span>
                                <small>{option.title}</small>
                                <small>{option.group}</small>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
