import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export function useGemini() {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBGLZ5Vut9EqEmMgZNS-SC6wux0UfyXJB4"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [responeses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function chatAI(prompt) {
    setLoading(true);

    const newState = 
    [
            {  
              role: "user",
              text: prompt,
            },
            {
              role: "model",
            },
          ],
    
          model.generateContent(prompt)
          .then((response) => {
            const newState = [...responeses, response.text()];
            setResponses(newState);
          })
          .catch((error) => {
            setError(error.message);
          })
          .finally(() => {
            setLoading(false);
            setError(null);
          });

    



    setResponses([]);
    setLoading(false);
  }

  return { responeses, loading, error, chatAI };
}
