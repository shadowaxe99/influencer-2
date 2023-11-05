import React, { useRef, useState } from 'react';
import Image from 'next/image';

export const AudioPlayerSB = ({ addAudioRef, removeAudioRef }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className='w-full h-full flex flex-col justify-center items-center radio-container relative'>
            <video
                className='absolute top-3 left-0 w-full h-full object-cover z-0'
                loop
                muted
                autoPlay
                loading='lazy'
            >
                <source src='/radio-bg-pika.mp4' type='video/mp4' />
            </video>

            <audio
                ref={audioRef}
                src='/radio/steve-ballmer-ai.mp3'
                autoPlay={isPlaying}
            ></audio>

            <div className='flex items-center justify-start z-10'>
                <Image
                    src='/ai-radio-1.png'
                    alt='Play/Pause'
                    width={1000}
                    height={800}
                    className='w-full h-full'
                />
                <button onClick={togglePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
};