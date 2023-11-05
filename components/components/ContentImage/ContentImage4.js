import React, { useRef } from 'react';
import { SectionContainer } from '../Section';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export const ContentImage4 = () => {
    const ContentImageData = [
        {
            id: uuid(),
            title: 'AI Agent Interface',
            content: 'A world of agents that is here to serve you.',
            align: 'left',
            image: '/agent-web-demo.mp4',
            isYoutubeVideo: false,
            demoId: 'web',
            index: 0
        },
        {
            id: uuid(),
            title: 'Elysium OS on Desktop ',
            content: 'Control your computer without lifting a finger.',
            align: 'right',
            image: '/desktop-demo.mp4',
            isYoutubeVideo: false,
            demoId: 'desktop',
            index: 1
        }
    ];
    const [activeTab, setActiveTab] = useState(ContentImageData[1]); // Default to first tab
    const videoRefs = useRef([]); // Ref for video elements
    const [initialLoad, setInitialLoad] = useState(true); // State to check if it's the initial load

    return (
        <SectionContainer className='process-items mt-24 space-y-16'>
            {ContentImageData.map((item) => (
                <div
                    id={item.id}
                    key={item.id}
                    className='process-item--container grid md:grid-cols-2 gap-y-8'
                >
                    <div
                        className={`process-item--image rounded-3xl ${
                            item.align === 'left' ? 'md:order-1' : ''
                        }`}
                    >
                        <video
                            ref={(ref) => videoRefs.current.push(ref)}
                            src={item.image}
                            width='100%'
                            height='auto'
                            objectFit='cover'
                            alt='Process Banner 1'
                            className='drop-shadow-xl w-full offset-y-0 offset-x-8 blur-16 border-4 border-gray-300 rounded'
                            autoPlay
                            // muted
                            preload='metadata'
                            playsInline={true}
                            controls
                            poster={item.thumbnail}
                            loading='lazy'
                        ></video>
                        <div className='video-controls'>
                            <button onClick={() => videoRefs.current[item.index].play()}>Play</button>
                            <button onClick={() => videoRefs.current[item.index].pause()}>Pause</button>
                            <button onClick={() => videoRefs.current[item.index].muted = !videoRefs.current[item.index].muted}>Mute/Unmute</button>
                        </div>
                    </div>
                </div>
            ))}
        </SectionContainer>
    );
};