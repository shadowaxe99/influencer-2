import React from 'react';
import InteractiveElements from './components/InteractiveElements';
import AIAgent from './components/AIAgent';
import AIButler from './components/AIButler';
import Metaverse from './components/Metaverse';
import GamifiedLearning from './components/GamifiedLearning';
import Marketplace from './components/Marketplace';

function App() {
  return (
    <div className='App'>
      <InteractiveElements />
      <AIAgent />
      <AIButler />
      <Metaverse />
      <GamifiedLearning />
      <Marketplace />
    </div>
  );
}

export default App;