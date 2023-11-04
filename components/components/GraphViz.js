import React, { useState, useRef, useEffect } from 'react';
import { graphviz } from 'd3-graphviz';
import 'd3-transition';

const GraphvizRender = () => {
  const [inputValue, setInputValue] = useState('');
  const [graphRendered, setGraphRendered] = useState(false);
  const graphContainerRef = useRef(null);

  useEffect(() => {
    if (graphRendered) {
      // Apply additional styles to center the SVG
      const svgElement = graphContainerRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.style.maxWidth = '100%';
        svgElement.style.height = 'auto';
        svgElement.style.display = 'block';
        svgElement.style.margin = 'auto';
      }
    }
  }, [graphRendered]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    graphviz(graphContainerRef.current)
      .renderDot(inputValue)
      .on('end', () => setGraphRendered(true));
  };

  const handleDownload = () => {
    const svg = graphContainerRef.current.querySelector('svg');
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'graph.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDismiss = () => {
    if (graphContainerRef.current) {
      graphContainerRef.current.innerHTML = '';
    }
    setInputValue('');
    setGraphRendered(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 dark:from-gray-800 dark:to-black">
      <div className="w-3/4 max-w-3xl mx-auto my-10 bg-white rounded-xl shadow-2xl p-5 dark:bg-gray-900 backdrop-filter backdrop-blur-lg dark:backdrop-blur-md bg-opacity-60 dark:bg-opacity-60">
        <h1 className="text-4xl font-extrabold text-center mb-5 text-white">Futuristic Agent System Generator</h1>
        <textarea
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          rows="4"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter Graphviz code"
        />
        <div className="flex space-x-4 my-4">
          <button
            onClick={handleSubmit}
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
          >
            Render Graph
          </button>
          {graphRendered && (
            <>
              <button
                onClick={handleDownload}
                className="w-full py-2 text-white bg-green-500 rounded hover:bg-green-700 transition duration-300"
              >
                Download Graph
              </button>
              <button
                onClick={handleDismiss}
                className="w-full py-2 text-white bg-red-500 rounded hover:bg-red-700 transition duration-300"
              >
                Dismiss
              </button>
            </>
          )}
        </div>
        <div className="flex justify-center">
          <div ref={graphContainerRef} className="w-full h-96 overflow-auto text-center" />
        </div>
      </div>
    </div>
  );
};

export default GraphvizRender;
