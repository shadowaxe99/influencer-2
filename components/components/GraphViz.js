import React, { useState, useRef, useEffect } from 'react';
import { graphviz } from 'd3-graphviz';
import 'd3-transition';
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const systemMessage = `YOUR TASK IS TO MAKE A PROPER 'GRAPHVIZ' CODE TO VISUALIZE AI AGENT HEIRARCHY FOR ANY QUERY PROVIDED BY THE USER.
                      RETURN THE GRAPHVIZ CODE AND NOTHING ELSE AT ALL`;

const GraphvizRender = () => {
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [graphRendered, setGraphRendered] = useState(false);
  const graphContainerRef = useRef(null);

  useEffect(() => {
    if (graphRendered) {
      const svgElement = graphContainerRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.style.maxWidth = '100%';
        svgElement.style.height = 'auto';
        svgElement.style.display = 'block';
        svgElement.style.margin = 'auto';
      }
    }
  }, [graphRendered]);

  function extractGraphvizCode(inputString) {
    const startIndex = inputString.indexOf('digraph');
    if (startIndex === -1) {
      throw new Error('digraph not found in the string.');
    }
  
    const lastIndex = inputString.lastIndexOf('}');
    if (lastIndex === -1) {
      throw new Error('Closing brace not found in the string.');
    }
  
    // Extracting the substring from the start of 'digraph' to the last '}'
    const extractedString = inputString.substring(startIndex, lastIndex + 1);
  
    return extractedString;
  }

  // Mock function to simulate fetching Graphviz code. Replace this with your actual fetching logic.
  const processMessageToChatGPT = async (userQuery) => {

    const messages = [
      { role: "system", content: systemMessage },
      { role: "user", content: userQuery }
    ];

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": messages,
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      const data = await response.json();
      // Assuming the API response contains the Graphviz code in the 'choices' field
      const gptResponse = extractGraphvizCode(data.choices[0].message.content);
      console.log(gptResponse);
      setIsFetching(false);
      return gptResponse;
    } catch (error) {
      console.error('Error communicating with ChatGPT:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  };

  const handleSubmit = async () => {
    setIsFetching(true);
    try {
      const code = await processMessageToChatGPT(query);
      graphviz(graphContainerRef.current)
        .renderDot(code)
        .on('end', () => {
          setGraphRendered(true);
        });
    } catch (error) {
      console.error('Error fetching the Graphviz code:', error);
      setIsFetching(false); // Make sure to set fetching to false in case of error
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
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
    setQuery('');
    setInputValue('');
    setGraphRendered(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 dark:from-gray-800 dark:to-black m-4">
      <div className="w-3/4 max-w-3xl mx-auto my-10 bg-white rounded-xl shadow-2xl p-5 dark:bg-gray-900 backdrop-filter backdrop-blur-lg dark:backdrop-blur-md bg-opacity-60 dark:bg-opacity-60">
        <h1 className="text-4xl font-extrabold text-center mb-5 text-white">Futuristic Agent System Generator</h1>
        <textarea
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          rows="4"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter your query"
        />
        <div className="flex space-x-4 my-4">
          {isFetching ? (
            <div className="w-full py-2 text-center text-white">
              Please wait a few moments...
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
            >
              Render Graph
            </button>
          )}
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
