import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

const totalSlides = 19;
const slideInfo = [
  "Info for Slide 1",
  "Info for Slide 2",
  "Info for Slide 3",
  "Info for Slide 4",
  "Info for Slide 5",
  "Info for Slide 6",
  "Info for Slide 7",
  "Info for Slide 8",
  "Info for Slide 9",
  "Info for Slide 10",
  "Info for Slide 11",
  "Info for Slide 12",
  "Info for Slide 13",
  "Info for Slide 14",
  "Info for Slide 15",
  "Info for Slide 16",
  "Info for Slide 17",
  "Info for Slide 18",
  "Info for Slide 19",
];

const AnimatedDeckElysium = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handlePrev = () => {
    setCurrentSlide(prevSlide => (prevSlide === 1 ? totalSlides : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide(nextSlide => (nextSlide === totalSlides ? 1 : nextSlide + 1));
  };

  const handleDragStart = (e) => {
    dragging.current = true;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleDrag = (e) => {
    if (dragging.current) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      setPosition({ x: position.x + dx, y: position.y + dy });
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleDragEnd = () => {
    dragging.current = false;
  };

  return (
    <div className="center-container">
      
      <div className="slideshow-container">
        <div className="slides-wrapper">
          <div className="slides" style={{ transform: `translateX(-${(currentSlide - 1) * 100}%)` }}>
            {Array.from({ length: totalSlides }).map((_, index) => (
              <img 
                key={index}
                src={`/slides/Slide${index + 1}.jpeg`} 
                alt={`Slide ${index + 1}`} 
                className="slide-image"
              />
            ))}
          </div>
        </div>
        <button className="prev" onClick={handlePrev}></button>
        <button className="next" onClick={handleNext}></button>
      </div>
      {/* <Draggable>
      <div className="chat-box">
      <img 
        src="/ironman.jpeg" 
        alt="Iron Man" 
        className="draggable-image" 
        style={{ left: position.x, top: position.y }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      />
      <div className="chat-box">
         {slideInfo[currentSlide - 1]}
      </div>
      </div>
      </Draggable> */}
    </div>
  );
}

export default AnimatedDeckElysium;
