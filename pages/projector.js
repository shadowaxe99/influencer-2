import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const [screenDown, setScreenDown] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const videoRef = useRef(null); // To reference the video element
  const router = useRouter();

  useEffect(() => {
    // Start the animation for the screen coming down
    const timer = setTimeout(() => {
      setScreenDown(true);
    }, 1000); // Delay for the screen to come down

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (screenDown) {
      // When the screen is down, start the video
      videoRef.current?.play();
    }
  }, [screenDown]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Trigger the projector screen to go up after the video ends
    setScreenDown(false);
    // Then show the button after a delay to allow for the screen transition
    setTimeout(() => {
      setButtonVisible(true);
    }, 2000); // Time for the screen to go up
  };

  const skipVideo = () => {
    videoRef.current?.pause(); // Pause the video when skipping
    setVideoEnded(true);
    setScreenDown(false); // Screen goes up immediately when skipping
    setTimeout(() => {
      setButtonVisible(true);
    }, 2000); // Wait for the screen to go up before navigating
  };

  const enterMarketplace = () => {
    setButtonVisible(false);
    setTimeout(() => {
      router.push('/marketplace');
    }, 500);
  };

  return (
    <div className="home-page" style={{ position: 'relative', height: '100vh' }}>
      <div className="projector-screen" style={{
        transform: screenDown ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 2s ease-in-out',
        position: 'absolute',
        width: '100%',
        height: '100vh',
        top: 0,
        zIndex: 1,
        overflow: 'hidden',
        background: 'black'
      }}>
        <video
          ref={videoRef}
          src="ironman-video.mp4"
          onEnded={handleVideoEnd}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        {screenDown && (
          <button
            onClick={skipVideo}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              zIndex: 2,
              padding: '10px 20px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#f04',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Skip
          </button>
        )}
      </div>
      {buttonVisible && (
        <button
          onClick={enterMarketplace}
          style={{
            backgroundColor: '#4CAF50', // A green color for the button
            color: 'white',
            opacity: buttonVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            padding: '20px 40px',
            fontSize: '2rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          Enter Marketplace
        </button>
      )}
    </div>
  );
};

export default HomePage;
