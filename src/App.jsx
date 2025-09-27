// import genai from './genai.js'
import { GoogleGenAI } from "@google/genai";
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';


// import React from 'react';


import React, { useState } from "react";
// import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import remarkGfm from 'remark-gfm'; // Import a plugin for handling markdown features
// If you installed rehype-highlight for code highlighting:
// import rehypeHighlight from 'rehype-highlight';
// You might also need to import a CSS theme for highlighting, e.g.,
// import 'highlight.js/styles/github.css'; // Choose a style you like

// WARNING: Hardcoding API key in frontend is INSECURE.
// Use environment variables or a backend in production.
import HTMLFlipBook from 'react-pageflip';

const API_KEY = "AIzaSyDuYyzAp6Kmx0ImIzv7ZVYHvkaRgdGK56Q";


const API_URL =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const ai = new GoogleGenAI({ apiKey: "AIzaSyDuYyzAp6Kmx0ImIzv7ZVYHvkaRgdGK56Q" });


function App() {
// make a text box 
// make a button to submit the text box

const [inputValue, setInputValue] = useState('');

const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    // Call your function here with the inputValue
    processInput(inputValue);
    // Optionally clear the input after processing
    setInputValue('');
  }
};

  const user_topic = "Create a story about" + inputValue + "First paragraph must be title, then 6 paragraphs, and the last paragrpah must be The End paragraph, and also each body paragraph must be 3 sentences, short sentences, whatever the story is it must relate back to health and wellness, don't bold anymore"; // This is the input value from the text box
  const [index, setIndex] = useState(0);
  const colorsArray = ['#FF99C8','#FCF6BD','#D0F4DE','#A9DEF9','#E4C1F9'];

  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const fetchAIResponse = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, {
        contents: [{ parts: [{ text: user_topic }] }],
      });

      const aiContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      setResponseText(aiContent || "No response text found in the expected format.");

    } catch (error) {
      console.error("Error fetching AI response:", error.response?.data || error.message);
      setResponseText(`Error fetching AI response: ${error.response?.data?.error?.message || error.message}`);
    } finally {
       setIsLoading(false); // Set loading to false
    }

  };

  const processInput = (text) => {
    // This is the function that will receive the input value
    console.log(`Processing input: ${text}`);
    // You can replace this with your actual function call
    fetchAIResponse();
  };

  // make FUNCTION GRAB TITLE 

  // MAKE FUNCTION GRAB IMAGE

  // make FUNCTION to GRAB EACH PARAGRPAH OF BOOK from responseText which will return as in array 

  // Function to extract paragraphs from responseText
  const getParagraphs = (text) => {
    if (!text) return []; // Return empty array if text is empty or null
    return text.split('\n\n').filter(paragraph => paragraph.trim() !== "");
  };

  const paragraphs = getParagraphs(responseText); // Get paragraphs.


  const pokemonData = [
    {
      id: "006",
      name: paragraphs[1],
      types: ["Fire", "Flying"],
      description: "Flies in search of strong opponents. Breathes extremely hot fire that melts anything, but never uses it on weaker foes."
    },
    {
      id: "025",
      name: paragraphs[2],
      types: ["Electric"],
      description: "When Pikachu meet, they touch tails to exchange electricity as a greeting."
    },
    {
      id: "125",
      name: paragraphs[3],
      types: ["Electric"],
      description: "Often kept at power plants to regulate electricity. Competes with others to attract lightning during storms."
    },
    {
      id: "185",
      name: paragraphs[4],
      types: ["Rock"],
      description: "Despite looking like a tree, its body is more like rock. Hates water and hides when it rains."
    },
    {
      id: "448",
      name: paragraphs[5],
      types: ["Fighting", "Steel"],
      description: "Can read thoughts and movements by sensing others' aura. No foe can hide from Lucario."
    },
    {
      id: "658",
      name: paragraphs[6],
      types: ["Water", "Dark"],
      description: "Creates throwing stars from compressed water that can slice through metal when thrown at high speed."
    },
    {
      id: "491",
      name: paragraphs[7],
      types: ["Dark"],
      description: "A legendary Pokémon that appears on moonless nights, putting people to sleep and giving them nightmares."
    }
  ];


// // Function to toggle dropdown visibility
// const myFunction = () => {
//     document.getElementById("myDropdown").classList.toggle("show");
//   };
  

  return (
    <div class="container">
    <div class = "mindquill">
      <h1>Mindquill</h1>
      {/* Disable button while loading */}

      {/* <button className={`textbook-button ${isLoading ? 'loading' : ''}`} onClick={fetchAIResponse} disabled={isLoading}>
        {isLoading ? 'Fetching...' : 'Ask AI'}
      </button> */}

      <div>
      <input class = "other_button"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter text and press Enter"
      />
      {/* You can optionally add a button to trigger the function as well */}
      <button class = "button" onClick={() => processInput(inputValue)} disabled={!inputValue}>
        Submit
      </button>
    </div>
      {/* <p>Response:</p> */}
      {/* Use ReactMarkdown to render the responseText */}
      <div class = "markdown">
        

      {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {responseText}
      </ReactMarkdown> */}
      </div>
    </div>

  <HTMLFlipBook 
      width={740} 
      height={1000}
      maxShadowOpacity={0.5}
      drawShadow={true}
      showCover={true}
      size='fixed'
    >
      <div className="page" style={{ background: 'transparent' }}>
        <div className="page-content cover">


          {/* hidden untill they click */}
        <h1 className="cover-title">{paragraphs[0] || "No Title"}</h1>          
          {/* <h1 className="cover-title">paragraphs[0]</h1> */}
          {/* <h2 className="cover-subtitle">A Journey Through the World of Pokémon</h2> */}
          <div className="pokemon-logo" >

          </div>

          {/* <img 
            src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" 
            alt="Pokémon Logo" 
            className="pokemon-logo"
            
          /> */}
        </div>
      </div>

      {pokemonData.map((pokemon) => (
        <div className="page" key={pokemon.id}>
          <div className="page-content">
            <div className="pokemon-container">
              <img 
                src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokemon.id}.png`} 
                alt={pokemon.name} 
              />
              <div className="pokemon-info">
                <h2 className="pokemon-name">{pokemon.name}</h2>
                {/* <p className="pokemon-number">#{pokemon.id}</p> */}
                {/* <div>
                  {pokemon.types.map((type) => (
                    <span key={type} className={`pokemon-type type-${type.toLowerCase()}`}>
                      {type}
                    </span>
                  ))}
                </div> */}
                {/* <p className="pokemon-description">{pokemon.description}</p> */}
              </div>
            </div>
          </div>
        </div>

      ))}

      {/* <div className="page" key="back-cover">
        <div className="page-content cover back">
          <h1>The End</h1>
          <p>More content can go here.</p>
        </div>
      </div> */}

<div className="page" key="back-cover">
        <div className="page-content cover back"  /* Add onClick handler here */
             onClick={() => {
              pageFlip.getPageFlip().flipNext();
             }}
        >
          {/* <h1>The End</h1>
          <p>Click here to close the book.</p> */}
        </div>
      </div>

    </HTMLFlipBook>
    </div>
  );
}

export default App;
