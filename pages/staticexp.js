import React from 'react';
import AnimatedDeckElysium from '@components/StaticExp/animatedDeck';
import ColorsBackground from '@components/Particles/ColorsBackground';

export default function StaticExp() {
    return (
        <div className='bg-black'>
            <ColorsBackground />
            <AnimatedDeckElysium />
        </div>
    )
}
