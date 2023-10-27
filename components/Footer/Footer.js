import { SectionContainer } from "@components/Section";
import Link from "next/link";
import Image from "next/image";
import { ButtonGroup } from "@components/Button";
import { Icon } from "@iconify/react";
import useCharacterStore from "@store/charStore";

const DATA = [
    {
        title: "Elysium",
        items: [
            {
                label: "Features",
                href: "#features"
            },

            {
                label: "FAQ",
                href: "#faq"
            }
        ]
    },
    {
        title: "Company",
        items: []
    }
];

export const Footer = () => {
    const {
        selectedCharacter,
        setSelectedCharacter,
        characters,
        themeImagePaths,
        setThemeImagePaths
    } = useCharacterStore();

    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer id="footer" className="bg-white">
            {/* Footer Links */}
            <SectionContainer className="footer--container wrap wrap-px relative z-10">
                <div className="footer--content-container py-16">
                    <div className="footer-links mb-12 grid grid-cols-2 gap-8 md:mb-16 md:grid-cols-8 lg:grid-cols-12">
                        <div className="col-span-6">
                            <div className="footer--logo grid gap-8">
                                <Link href="/">
                                    <Image
                                        src="/elysium-logo-1.jpeg"
                                        alt="logo"
                                        className="h-24 w-auto"
                                        height="500"
                                        width="100"
                                        draggable={false}
                                        priority
                                    />
                                </Link>
                                {/* Get Template button; remove if not used */}
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="footer-menu grid grid-cols-2 md:grid-cols-8 lg:grid-cols-12">
                                {DATA.map((footerLinks) => (
                                    <div
                                        key={footerLinks.title}
                                        className="footer-menu--container col-span-1 md:col-span-4"
                                    >
                                        <h3 className="font-bold text-base mb-2">
                                            {footerLinks.title}
                                        </h3>
                                        <ul className="footer-menu--list">
                                            {footerLinks.items.map(
                                                (footerItem) => (
                                                    <li
                                                        key={footerItem.label}
                                                        className="footer-menu--list-item gap-2"
                                                    >
                                                        <a
                                                            className="mb-2 block w-auto font-medium transition-colors duration-300 hover:underline"
                                                            href={
                                                                footerItem.href
                                                            }
                                                            target={
                                                                footerItem.target
                                                            }
                                                        >
                                                            {footerItem.label}
                                                        </a>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
            {/* Footer Credits */}
            <SectionContainer className="footer-credits relative z-10">
                <div className="wrap wrap-px py-6">
                    <p className="my-0">
                        {selectedCharacter ? selectedCharacter.contentText[20] :
                            "So are you ready to join the future?"
                        }
                    </p>
                    <p className="my-0">
                        {selectedCharacter ? selectedCharacter.contentText[21] :
                            "© 2024 Elysium Innovations 2023. All rights reserved"
                        }
                        {/* <span className="font-normal">
                            A template by{" "}
                            <Link
                                className="transition-colors duration-300 hover:underline"
                                href="https://cjluntok.com"
                                target="_blank"
                            >
                                Christian Luntok.
                            </Link>
                        </span> */}
                    </p>
                </div>
            </SectionContainer>
            <div className="footer--background"></div>
            <video
                className="absolute bottom-0 right-0 z-0 object-cover us-israel-video"
                src="/israel-usa-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                height={350}
                width={350}
            >
                Your browser does not support the video tag.
            </video>
        </footer>
    );
};
