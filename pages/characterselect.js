import { useState } from 'react';
import { Button } from '@components/components/ui/button';
import useCharacterStore from '@store/charStore';
import { useRouter } from 'next/router';
import Image from 'next/image';

const CharacterSelect = () => {
  // Existing state and logic
  const { characters, setSelectedCharacter } = useCharacterStore();
  const router = useRouter();
  const [currentSound, setCurrentSound] = useState(null);

  // Enhanced functions
  const playGreetingSound = (soundPath) => {
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
    }
    const audio = new Audio(soundPath);
    setCurrentSound(audio);
    audio.play();
  };

  const selectCharacterAndNavigate = (index) => {
    setSelectedCharacter(characters[index]);
    router.push('/playground');
  };

  return (
    <div className="character-selection-container flex flex-col h-screen text-white relative border-t-4 border-b-4 border-l-4 border-r-4 border-gradient">
      {/* Inlined styles for border and hover effects */}
      <style jsx>{`
        .border-gradient {
          border-image: linear-gradient(45deg, #f06, #9f6);
          border: 10px solid;
        }
        .hover-effect:hover img {
          box-shadow: 0 0 20px #9f6, 0 0 30px #f06, 0 0 40px #f06;
          transform: scale(1.1);
        }
      `}</style>

      {/* ...rest of the code remains the same, but perhaps with enhanced commenting for readability. */}
      
      <main className="flex-grow overflow-auto p-8 z-10">
        <h2 className="text-4xl mb-10 text-neon-yellow animate__animated animate__fadeInDown">Unlock Your Character</h2>
        <p className="text-2xl mb-6 text-neon-green animate__animated animate__fadeInUp">Let Your AI Knowledge Guide Your Choice</p>
        <div className="grid grid-cols-4 gap-6">
          {characters.map((character, index) => (
  <div className="flex flex-col items-center group card animate__animated animate__zoomIn hover-effect">
    <Image 
        src={character.img} 
        alt={character.name} 
        height={100} 
        width={100} 
        className="rounded-full transform transition-all duration-300 ease-in-out" 
        onMouseEnter={() => playGreetingSound(character.greeting_sound)} 
        loading="lazy"
    />
    <!-- The text classes have been modified here -->
    <h3 className="text-3xl mt-6 text-white group-hover:text-neon-blue transition-all duration-300 whitespace-nowrap">
        {character.name}
    </h3>
   <h2 className="text-2xl mt-2 text-white group-hover:text-neon-blue transition-all duration-300 whitespace-nowrap">
  {character.skill}
</h2>

    <Button className="mt-4 text-white bg-yellow-500 text-2xl group-hover:bg-neon-green transition-all duration-300" onClick={() => stopHackSound(index)}>Select</Button>
  </div>
))}

        </div>
      </main>
      
      {/* ...footer code */}
      
    </div>
  );
};

export default CharacterSelect;
