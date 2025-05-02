
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
//         contents: [{ parts: [{ text: "In 50 words max, write a poem about flowers" }] }],
//       });

//       setResponseText(response.data?.candidates?.[0]?.content?.parts?.[0]?.text  ?? "No response");
//     } catch (error) {
//       console.error("Error:", error);
//       setResponseText("Error fetching AI response.");
//     }
//   };
//   // console.log("API Response:", response.data);

// console.log({responseText});

//   return (
//     <div>
//       <h1>AI Response</h1>
//       <button onClick={fetchAIResponse}>Ask AI</button>
//       {/* <p>The response is: {responseText}</p> */}
//       <p>{responseText}</p>
//     </div>
//   );
// }

// export default App;
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
