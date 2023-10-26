import { SectionContainer } from "@components/Section";
import { Icon } from "@iconify/react";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import { useState } from "react";
const ColumnData = [
    {
        id: uuid(),
        title: "Michael Gruen",
        imagePath: "/team/gru.png",
        content: "CEO",
        previewContent: "Chief Executive Officer of Elysium",
        group: "Team"
    },
    {
        id: uuid(),
        title: "Doug Schaer",
        imagePath: "/team/doug.jpeg",
        content: "CBO",
        previewContent: "Chief Business Officer",
        group: "Team"
    },
    {
        id: uuid(),
        title: "Michael Daigler",
        imagePath: "/team/merk.png",
        previewContent: "VP of Engineering",
        content: "VP of Engineering at Elysium",
        group: "Team"
    },
    {
        id: uuid(),
        title: "Brock Pierce",
        imagePath: "/team/brock.jpeg",
        content: "Chief Evangelist",
        previewContent: "Chief Evangelist",
        group: "Team"
    },
    {
        id: uuid(),
        title: "Anthony Scaramucci",
        imagePath: "/team/mooch.jpeg",
        previewContent:
            "Former White House Director of Communications and founder of SkyBridge Capital",
        content:
            "Former White House Director of Communications and founder of SkyBridge Capital, Anthony is a well-known financier and political commentator. His extensive career highlights include stints at Goldman Sachs and Lehman Brothers.",
        group: "Advisors"
    },
    {
        id: uuid(),
        title: "Marc Randolph",
        imagePath: "/team/marc.jpeg",
        group: "Advisors",
        previewContent: "Founder of Netflix",
        content:
            "Advisor - Co-founder and first CEO of Netflix (NFLX:NASDAQ), Marc is a seasoned Silicon Valley entrepreneur and investor. His portfolio includes Looker Data Sciences, Chubbies Shorts, and MentorBox, etc."
    },
    {
        id: uuid(),
        title: "Jay Abraham",
        imagePath: "/team/jayabraham.jpeg",
        group: "Advisors",
        previewContent: "Mentor of Mentors",
        content:
            'Advisor - Mentor of Mentors, Jay is the founder and CEO of The Abraham Group, and has advised over 10,000 clients across 400+ industries, generating billions in revenue. Innovator behind "Three Ways to Grow a Business" model, Jay is a sought-after author, speaker, and mentor in the field of business growth and marketing.'
    },
    {
        id: uuid(),
        title: "Ambassador Jamie McCourt",
        imagePath: "/team/jamie.jpeg",
        group: "Committee",
        previewContent: "Scholar-in-Residence",
        content:
            "Advisor - Foreign Relations and Regulatory Advocacy, Scholar-in-Residence"
    },
    {
        id: uuid(),
        title: "Dr. Jeffrey Pfeffer",
        imagePath: "/team/pfeffer.jpeg",
        group: "Advisors",
        previewContent:
            "Professor at Stanford’s Graduate School of Business. A revered figure in organizational behavior",
        content:
            "Advisor - Professor at Stanford’s Graduate School of Business, Jeffrey is a revered figure in organizational behavior. As a thought leader in business theories he has written 16 influential books, is involved in Business 2.0 and Fortune.com, and has served on the boards of Quantum Leap Healthcare, SonoSite, etc."
    },
    {
        id: uuid(),
        title: "G. Scott Paterson",
        imagePath: "/team/gscott.png",
        group: "Advisors",
        previewContent: "Media Mogul",
        content:
            "Advisor - Director of Lionsgate Entertainment Canada Corp (LGF.A:NYSE), Scott is an accomplished investment banker with 30+ years of experience in tech and media sectors. He has served as CEO / Board of Yorkton Securities, NeuLion, QYOU (TSX.V: QYOU), and more."
    },
    {
        id: uuid(),
        title: "Rabbi Shmuley Boteach",
        imagePath: "/team/shmuley.jpeg",
        group: "Advisors",
        previewContent: "Rabbi & best-selling author",
        content:
            "Advisor - A well-known author and public speaker, now serving as the Chief Ethics and Culture Officer at Elysium Innovations"
    },
    {
        id: uuid(),
        title: "Arben Gutierrez-B.",
        imagePath: "/team/arben.jpeg",
        content: "Head of Product at Elysium",
        previewContent: "Head of Product",
        group: "Team"
    },
    {
        id: uuid(),
        title: "Shivam Mittal",
        imagePath: "/team/shivam.jpeg",
        content: "Engineer at Elysium",
        previewContent: "Engineer",
        group: "Team"
    },
    {
        id: uuid(),
        title: "Yohei Nakajima",
        imagePath: "/team/yohei.jpeg",
        group: "Committee",
        previewContent: "AI Solutions Architectural Consultant",
        content:
            "Yohei Nakajima, a venture capitalist and entrepreneur, created BabyAGI, an experimental project aimed at developing autonomous AI agents capable of executing tasks and achieving objectives within a specified context. BabyAGI is powered by a large language model and uses OpenAI and Pinecone APIs, as well as the LangChain framework, to create, organize, prioritize, and execute tasks. The project has inspired numerous innovative applications and use cases, and future improvements include an integrated security/safety agent, parallel tasks, and more."
    },
    {
        id: uuid(),
        title: "Shweta Katyal",
        imagePath: "/team/shweta.jpeg",
        group: "Advisors",
        previewContent: "Founder of Infinite Timelines",
        content:
            "Founder of Infinite Timelines, Shweta Katyal is the visionary behind Pierced Media, the first Gen Z female podcast network. With roles at Coil, Humana, and McKesson, she's a dynamic force in content creation and strategy. As an angel investor, she's also active in the creator and crypto spaces."
    },
    {
        id: uuid(),
        title: "Karia Samaroo",
        imagePath: "/team/karia.webp",
        group: "Advisors",
        previewContent: "Co-founder and CEO of WonderFi",
        content:
            "Karia Samaroo, formerly known as Ben Samaroo, is the co-founder and CEO of WonderFi, a leading technology company in Vancouver, Canada, with experience in fintech, blockchain, and digital assets."
    },
    {
        id: uuid(),
        title: "Frederic Chesnais",
        imagePath: "/team/chesnais.jpeg",
        group: "Advisors",
        previewContent: "Founder & CEO of CBI",
        content:
            "Current Founder & CEO of CBI, Crypto Blockchain Industries, Frédéric Chesnais is a luminary in tech and gaming. An alumnus of the Institut d'Etudes Politiques de Paris, he steered Atari S.A. as CEO for 8+ years and has been influential at Microprose and Ker Ventures."
    },
    {
        id: uuid(),
        title: "Dave Bialek",
        imagePath: "/team/bialek.png",
        group: "Advisors",
        previewContent: "CEO and Founder of ReKTGlobal",
        content:
            "CEO and Founder of ReKTGlobal, Dave Bialek is a leading figure in esports and digital entertainment. Owner of renowned teams Rogue and London Royal Ravens, he successfully sold ReKTGlobal for nearly half a billion dollars. With a decade at the helm of Skylark Marketing and accolades like Sports Business Journal’s Forty Under 40, Dave's influence in the industry is profound."
    },
    {
        id: uuid(),
        title: "Munam Wasi",
        imagePath: "/team/wasi.jpeg",
        group: "Advisors",
        previewContent: "COO at Delegate",
        content:
            " Chief Operating Officer at Delegate, Munam Wasi has been instrumental in securing $600 Million across the EVM. With a background in computational research at Stanford, he transitioned to crypto, spearheading Delegate Cash's growth to $400 million in assets in mere months. Previously, he contributed to ConstitutionDAO's impressive $47M+ fundraising effort."
    }
];

const groupOrder = {
    Team: 1,
    Committee: 2,
    Advisors: 3
};
const sortedColumnData = [...ColumnData].sort((a, b) => {
    return groupOrder[a.group] - groupOrder[b.group];
});
console.log("sortedColumnData", sortedColumnData);
export const TeamColumns = () => {
    let lastGroup = "";
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(null);
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    return (
        <SectionContainer className="benefits-lists grid gap-x-8 gap-y-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-16">
            {sortedColumnData.map((item, index) => {
                const isNewGroup = lastGroup !== item.group;

                if (isNewGroup) {
                    lastGroup = item.group; // Update lastGroup here, outside of the JSX
                }

                return (
                    <>
                        {isNewGroup && (
                            <div
                                className="separator rounded"
                                key={"sep-" + index}
                            >
                                <h2 className="pt-8">{item.group}</h2>
                                <br />
                            </div>
                        )}
                        <div
                            id={item.id}
                            key={item.id}
                            className="benefits-list--item text-[#737373] text-left"
                            onClick={() => handleItemClick(item)}
                        >
                            <div className="relative w-24 h-24 border-2 border-gray-300 rounded-full overflow-hidden">
                                <Image
                                    src={item.imagePath}
                                    className="mb-4 w-200 h-200"
                                    // width={100}
                                    // height={100}
                                    // draggable={false}
                                    objectFit="cover"
                                    layout="fill"
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="text-xl mb-2 font-medium text-black">
                                {item.title}
                            </h3>
                            <p>{item.previewContent}</p>
                        </div>
                        {selectedItem && (
                            <div className="modal">
                                <div className="modal-content">
                                    <span
                                        className="close"
                                        onClick={closeModal}
                                    >
                                        &times;
                                    </span>
                                    <div className="relative w-24 h-24 border-2 border-gray-300 rounded-full overflow-hidden">
                                        <Image
                                            src={selectedItem.imagePath}
                                            className="mb-4 w-200 h-200 "
                                            // width={100}
                                            // height={100}
                                            // draggable={false}
                                            objectFit="cover"
                                            layout="fill"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h2 className="modal-title">Role:</h2>
                                    <h3 className="modal-subtitle">
                                        {selectedItem.title}
                                    </h3>
                                    <h2 className="modal-title">About:</h2>
                                    <p className="modal-text">
                                        {selectedItem.content}
                                    </p>
                                </div>
                            </div>
                        )}
                        {/* {(lastGroup = item.group)} */}
                    </>
                );
            })}
        </SectionContainer>
    );
};
