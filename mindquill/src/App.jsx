
// import React, { useState } from "react";
// import axios from "axios";

// const API_KEY = "AIzaSyDuYyzAp6Kmx0ImIzv7ZVYHvkaRgdGK56Q";
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDuYyzAp6Kmx0ImIzv7ZVYHvkaRgdGK56Q`;
// //`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.1-pro:generateContent?key=AIzaSyDuYyzAp6Kmx0ImIzv7ZVYHvkaRgdGK56Q`;
// function App() {
//   const [responseText, setResponseText] = useState("");

//   const fetchAIResponse = async () => {
//     try {
//       const response = await axios.post(API_URL, {
//         contents: [{ parts: [{ text: "Provide the C++ code to print hello world" }] }],
//       });

//       setResponseText(response.data?.candidates?.[0]?.content?.parts?.[0]?.text  ?? "No response");
//     } catch (error) {
//       console.error("Error:", error);
//       setResponseText("Error fetching AI response.");
//     }
//   };
  // console.log("API Response:", response.data);

// console.log({responseText});

//   return (
//     <div>
//       <h1>Mindquill</h1>
//       <button onClick={fetchAIResponse}>Ask AI</button>
//       {/* <p>The response is: {responseText}</p> */}
//       <p>{responseText}</p>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
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
  
  const [index, setIndex] = useState(0);
  const colorsArray = ['#FF99C8','#FCF6BD','#D0F4DE','#A9DEF9','#E4C1F9'];

  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const [imageUrl, setImageUrl] = useState("");

  const generateImage = async () => {
    try {
      const response = await axios.post(API_IMAGE_URL, {
        contents: [
          {
            parts: [
              {
                text: "Create a picture of a flower"
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
        contents: [{ parts: [{ text: "Write a poem about flower in 50 words" }] }],
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

  // Consider fetching on mount or based on user action
  // Example using useEffect to fetch on mount (like before):
  /*
  useEffect(() => {
    fetchAIResponse();
  }, []); // Empty dependency array to run only once on mount
  */


  return (
    <>
    <div>
      <h1>Gemini Image Generator</h1>
      <button onClick={generateImage}>Generate Image</button>
      {imageUrl && <img src={imageUrl} alt="Generated AI Art" />}
    </div>

    <HTMLFlipBook width={300} height={500}>
            {/* <PageCover>BOOK TITLE</PageCover> */}
            <div className="page 0">
                <h1>Title of Page 1</h1>
                <p>This is the paragraph below the title. You can add more details here.</p>
            </div>
            <div className="demoPage">Page 1</div>
            <div className="demoPage">Page 2</div>
            <div className="demoPage">Page 3</div>
            <div className="demoPage">Page 4</div>
        </HTMLFlipBook>
    <div className = "flexbox-container"
    style={{ backgroundColor: colorsArray[index]}}>
      <button onClick={() => setIndex((index) => {
            if (index < colorsArray.length - 1) {
              console.log("index is " + index + 1);
              return index + 1;} return 0;})}> Click me to change the bg color!</button>
    
  
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
    </>
  );
}

export default App;







// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
