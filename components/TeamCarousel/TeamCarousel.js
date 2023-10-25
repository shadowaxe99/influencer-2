import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { profiles, frequentlyUsed } from "@components/TeamChat/profiles";
import { useSwiper } from "swiper/react";

import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

// import required modules
import {
    Pagination,
    Navigation,
    EffectCoverflow,
    Autoplay
} from "swiper/modules";

export default function TeamCarousel({ handleProfileClick }) {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [autoPlayOptions, setAutoPlayOptions] = useState({
        delay: 2500,
        disableOnInteraction: false
    });
    const [autoPlayOn, setAutoPlayOn] = useState(true);
    const [swiperInstance, setSwiperInstance] = useState(null);
    useEffect(() => {
        if (autoPlayOn) {
            setAutoPlayOptions({
                delay: 2500,
                disableOnInteraction: false
            });
        } else {
            setAutoPlayOptions(false);
        }
    }, [autoPlayOn, setAutoPlayOn]);

    useEffect(() => {}, []);

    return (
        <>
            {/* <button
                className="border w-1/4 mx-auto mb-2 rounded bg-gray-500 text-white"
                onClick={() => setAutoPlayOn(!autoPlayOn)}
            >
                Autoplay {autoPlayOn ? "On" : "No"}
            </button> */}
            <Swiper
                // pagination={{
                //     type: "progressbar"
                // }}
                // navigation={true}
                // modules={[Pagination, Navigation]}
                // className="mySwiper"

                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            >
                <SwiperPauseButton></SwiperPauseButton>
                {profiles.map((profile, i) => {
                    return (
                        <SwiperSlide key={i} onClick={(e) => console.log(e)}>
                            {" "}
                            <p key={i} className="pt-2 text-md font-semibold">
                                {profile.group}
                            </p>
                            <div
                                key={`${profile.id}-${i}`}
                                className="flex flex-col bg-white rounded w-full p-2 mx-auto mt-2 p-2 h-4/5 shadow-md hover:cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
                                onClick={() => handleProfileClick(profile)}
                            >
                                <div className="flex flex-row w-full justify-start">
                                    <div className="relative w-12 h-12 border-2 border-gray-300 rounded-full  overflow-hidden">
                                        <Image
                                            id={profile.id}
                                            src={profile.image}
                                            alt={profile.name}
                                            objectFit="cover"
                                            layout="fill"
                                        />
                                    </div>
                                    <div className="flex flex-col text-left ml-4">
                                        <p className="name-title m-0">
                                            {profile.name}
                                        </p>
                                        <p className="m-0 text-sm">
                                            {profile.title}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full mt-2 text-left">
                                    <p className="description">
                                        {profile.description}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}

const SwiperPauseButton = () => {
    const swiper = useSwiper();
    console.log("swiper", swiper.slides);
    return (
        <button
            className="border w-1/4 mx-auto mb-2 rounded bg-gray-500 text-white"
            onClick={() => swiper.autoplay.pause()}
        >
            Autoplay toggle
        </button>
    );
};
