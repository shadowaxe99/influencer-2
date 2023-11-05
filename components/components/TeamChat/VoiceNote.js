import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const VoiceNote = ({ audioData, playVoiceMessage, pauseVoiceMessage }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseVoiceMessage(audioData);
    } else {
      playVoiceMessage(audioData);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='voice-note'>
      <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} onClick={handlePlayPause} />
      <div className='progress-bar'></div>
      <div className='duration-label'>00:00</div>
    </div>
  );
};

export default VoiceNote;