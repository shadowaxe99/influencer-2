import React, { useState } from 'react';
import { SectionContainer } from '../Section';
import { MotionBTTContainer } from '../Motion';
import { BadgeGroup, BadgeMessage } from '../Badge';
import { PageTitle } from '../Title';
import { characters } from '../../data/characters';

export const HomeBanner = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);

    return (
        <SectionContainer className='banner--container'>
            <SectionContainer className='banner--content'>
                <MotionBTTContainer transition={{ delay: 0.2, duration: 0.5 }}>
                    <div className='banner--image'>
                        <video
                            id='myVideo'
                            width='100%'
                            height='auto'
                            playsinline
                            muted
                            type='video/mp4'
                            src={
                                selectedCharacter
                                    ? selectedCharacter.themeImagePaths[0]
                                    : '/temple.mp4'
                            }
                            // controls={true}
                            playsInline={true}
                            preload='metadata'
                            speed
                            loop={true}
                            autoPlay
                            className='mx-auto border-blue-500 border-4 rounded shadow-xl'
                            priority
                            // loading='lazy'
                        ></video>
                    </div>
                </MotionBTTContainer>
            </SectionContainer>
        </SectionContainer>
    );
};