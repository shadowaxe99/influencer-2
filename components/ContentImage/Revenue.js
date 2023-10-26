import { BadgeGroup, BadgeIcon, BadgeMessage } from "@components/Badge";
import { Button, ButtonGroup } from "@components/Button";
import { Content } from "@components/Content";
import { MotionBTTContainer, MotionInfiniteImage } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper React components
import "swiper/css"; // Import Swiper styles

export const Revenue = () => {
    const [isInView, setIsInView] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.5 // Adjust according to how much of the Revenue component you want to be visible before triggering
            }
        );

        const target = document.getElementById("revenue-component");
        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, []);

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
        <SectionContainer className="page-banner--container py-16">
            <SectionContainer className="page-banner--inner-container wrap wrap-px z-10">
                <div id="ninthSlide"></div>
                {/* Appear First */}
                <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                    <BadgeGroup alignment="center">
                        <BadgeMessage>Revenue</BadgeMessage>
                        {/* <BadgeIcon icon="twemoji:waving-hand" /> */}
                    </BadgeGroup>
                </MotionBTTContainer>
                {/* Appear Second */}
                <MotionBTTContainer transition={{ delay: 0.4, duration: 0.5 }}>
                    <PageTitle className="text-center mx-auto" type="heavy">
                        How We Thrive – Monetization Strategy
                    </PageTitle>
                </MotionBTTContainer>
                {/* Appear Third */}
                <MotionBTTContainer transition={{ delay: 0.6, duration: 0.5 }}>
                    <Content className="text-center" alignment="center">
                        <p>
                            {
                                "Great visions need sustainable plans. Discover how we blend innovation with business acumen."
                            }{" "}
                        </p>
                    </Content>
                </MotionBTTContainer>
                {/* Appear Fourth */}
                <MotionBTTContainer transition={{ delay: 0.8, duration: 0.5 }}>
                    <div
                        className="page-banner--image flex-row flex"
                        id="revenue-component"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Image
                                src="/revenue.png"
                                alt="Centered image"
                                width={1000}
                                height={600}
                                layout="intrinsic"
                            />
                        </div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1, marginRight: '10px' }}>
                                <Image src="/subscription.png" alt="Slide 1" width={500} height={300} layout="intrinsic" />
                            </div>
                            <div style={{ flex: 1, marginLeft: '10px' }}>
                                <Image src="/personas.png" alt="Slide 2" width={500} height={300} layout="intrinsic" />
                            </div>
                        </div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1, marginRight: '10px' }}>
                                <Image src="/Licensing.png" alt="Slide 3" width={500} height={300} layout="intrinsic" />
                            </div>
                            <div style={{ flex: 1, marginLeft: '10px', marginRight: '10px' }}>
                                <Image src="/automation.png" alt="Slide 4" width={500} height={300} layout="intrinsic" />
                            </div>
                            <div style={{ flex: 1, marginLeft: '10px' }}>
                                <Image src="/commision.png" alt="Slide 5" width={500} height={300} layout="intrinsic" />
                            </div>
                        </div> */}
                        <Image
                            src="/revenuestreams.png"
                            width={1024}
                            draggable={false}
                            height={680}
                            alt="Page Banner"
                            objectFit="cover"
                            className="z-20  mx-auto drop-shadow-xl w-full offset-y-0 offset-x-8 blur-16 border-4 border-blue-500 rounded glow-image float-image"
                            loading="lazy"
                        />
                    </div>
                </MotionBTTContainer>
            </SectionContainer>
        </SectionContainer>
    );
};
