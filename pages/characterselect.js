import React, { useState } from 'react';
import { Button } from '@components/components/ui/button';
import useCharacterStore from '@store/charStore';
import { useRouter } from 'next/router';
import Image from 'next/image';

function useGreetingSound() {
  const [currentSound, setCurrentSound] = useState(null);
  const playSound = (soundPath) => {
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
    }
    const audio = new Audio(soundPath);
    setCurrentSound(audio);
    audio.play();
  };
  return { playSound };
}

const CharacterSelect = () => {
  const { characters, setSelectedCharacter } = useCharacterStore();
  const { playSound } = useGreetingSound();
  const router = useRouter();

  const selectCharacter = (index) => {
    setSelectedCharacter(characters[index]);
    router.push('/playground');
  };

  return (
    <div className="character-selection-container">
      <main>
        <div className="grid grid-cols-4 gap-6">
          {characters.map((character, index) => (
            <CharacterCard
              key={index}
              character={character}
              playSound={playSound}
              selectCharacter={() => selectCharacter(index)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

const CharacterCard = React.memo(({ character, playSound, selectCharacter }) => (
  <div className="flex flex-col items-center group card">
    {/* ...content of the card... */}
  </div>
));

export default CharacterSelect;

