// import genai from './genai.js'
// import { GoogleGenAI } from "@google/genai";


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
import { GoogleGenAI, Modality } from "@google/genai";
const API_KEY = "AIzaSyDuYyzAp6Kmx0ImIzv7ZVYHvkaRgdGK56Q";


const API_URL =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
const API_IMAGE_URL= 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=AIzaSyDuYyzAp6Kmx0ImIzv7ZVYHvkaRgdGK56Q';
const ai = new GoogleGenAI({ apiKey: API_KEY });


function App() {

  const user_topic = "Write a book about flower in 5 paragraph, 3 sentences in each";
  const [index, setIndex] = useState(0);
  const colorsArray = ['#FF99C8','#FCF6BD','#D0F4DE','#A9DEF9','#E4C1F9'];

  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const [imageUrl, setImageUrl] = useState("");

  const generateImage = async (ImagePrompt) => {
    try {
      const response = await axios.post(API_IMAGE_URL, {
        contents: [
          {
            parts: [
              {
                text: ImagePrompt
              }
            ]
          }
        ],
        generationConfig: {
          responseModalities: ["TEXT", "IMAGE"]
        }
      });

      console.log("API Response:", response.data); // Debugging logs

      // Extracting Image Data
     
      const imageData = response.data?.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
      const imageURL = imageData.inlineData.data;
      // const imageData = response.data?.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
      //  console.log("Extracted InlineData:", imageData);
      // console.log("MIME Type:", imageData?.mimeType);
      // console.log("Base64 Data:", imageData?.data);

      if (imageData) {
        console.log("Extracted Image Data:", imageData); // Debugging log
        setImageUrl(`data:${imageData.mimeType};base64,${imageData.inlineData.data}`);
      } else {
        console.error("No image data found in response.");
      }
    } catch (error) {
      console.error("Error generating image:", error.response?.data || error.message);
    }
    console.log("image url is: " + imageUrl);
  };
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


  const pokemonData = [
    {
      id: "006",
      name: "Charizard",
      types: ["Fire", "Flying"],
      description: "Flies in search of strong opponents. Breathes extremely hot fire that melts anything, but never uses it on weaker foes."
    },
    {
      id: "025",
      name: "Pikachu",
      types: ["Electric"],
      description: "When Pikachu meet, they touch tails to exchange electricity as a greeting."
    },
    {
      id: "125",
      name: "Electabuzz",
      types: ["Electric"],
      description: "Often kept at power plants to regulate electricity. Competes with others to attract lightning during storms."
    },
    {
      id: "185",
      name: "Sudowoodo",
      types: ["Rock"],
      description: "Despite looking like a tree, its body is more like rock. Hates water and hides when it rains."
    },
    {
      id: "448",
      name: "Lucario",
      types: ["Fighting", "Steel"],
      description: "Can read thoughts and movements by sensing others' aura. No foe can hide from Lucario."
    },
    {
      id: "658",
      name: "Greninja",
      types: ["Water", "Dark"],
      description: "Creates throwing stars from compressed water that can slice through metal when thrown at high speed."
    },
    {
      id: "491",
      name: "Darkrai",
      types: ["Dark"],
      description: "A legendary Pokémon that appears on moonless nights, putting people to sleep and giving them nightmares."
    }
  ];
  

  // Consider fetching on mount or based on user action
  // Example using useEffect to fetch on mount (like before):
  /*
  useEffect(() => {
    fetchAIResponse();
  }, []); // Empty dependency array to run only once on mount
  */

  // Function to toggle dropdown visibility
  const myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show");
  };
  return (
    <>
    <div>
      <h1>Gemini Image Generator</h1>
      <button onClick={() => generateImage("A futuristic city with flying cars")}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated AI Art" />}
    </div>
    
<div className = "Pokemon_book">
<div className = "flexbox-container"
    style={{ backgroundColor: colorsArray[index]}}>
      <button onClick={() => setIndex((index) => {
            if (index < colorsArray.length - 1) {
              console.log("index is " + index + 1);
              return index + 1;} return 0;})}> Click me to change the bg color!</button>

  {/* Dropdown menu */}
  <div className="dropdown"> {/*creates div conatiner for dopdwon menu, cssclass "dropdown" is used to style the drop down menu*/}
        <button onClick={myFunction} className="dropbtn">Choose Topic</button> {/*button user clicks to show dropdown menu*/}
        <div id="myDropdown" className="dropdown-content"> {/*shows contents of button*/}
          <a href="#">Anxiety Relief</a> {/*anchor links*/}
          <a href="#">Self-Esteem Boost</a>
          <a href="#">Stress Management</a>
        </div>
      </div>

    <div>
      <h1>Mindquill</h1>
      {/* Disable button while loading */}
      <button onClick={fetchAIResponse} disabled={isLoading}>
         {isLoading ? 'Fetching...' : 'Ask AI'}
      </button>
      <p>Response:</p>
      {/* Use ReactMarkdown to render the responseText */}
      <div class = "markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
         {responseText}
      </ReactMarkdown>
      </div>
    </div>
  </div>

<HTMLFlipBook
  width={740} // Increase the width to accommodate two pages (2 * 370)
  height={1000}
  maxShadowOpacity={0.5}
  drawShadow={true}
  showCover={true}
  size="fixed" // Keep it fixed if you want consistent two-page display
  flippingTime={1000} // Optional: Adjust the page flip animation speed
  perspective={800} // Optional: Adjust the 3D perspective
>
  {/* Your cover page */}
  <div className="page" style={{ background: 'transparent' }}>
    <div className="page-content cover">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
        alt="Pokémon Logo"
        className="pokemon-logo"
      />
    </div>
  </div>

  {/* Your Pokémon pages */}
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
            <p className="pokemon-number">#{pokemon.id}</p>
            <div>
              {pokemon.types.map((type) => (
                <span key={type} className={`pokemon-type type-${type.toLowerCase()}`}>
                  {type}
                </span>
              ))}
            </div>
            <p className="pokemon-description">{pokemon.description}</p>
          </div>
        </div>
      </div>
    </div>
  ))}
</HTMLFlipBook>
    </div>
    </>
  );
}

export default App;

// function App() {

//   const [responseText, setResponseText] = useState(genai.response);
//   const generate = () => topic; 

//   return (
//     <button onClick={generate()}>generate</button>
    
//   );
// }

// export default App;