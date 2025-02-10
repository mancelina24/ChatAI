import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export function useGemini() {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBGLZ5Vut9EqEmMgZNS-SC6wux0UfyXJB4"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function chatAI(prompt) {
    setLoading(true);

    const newMessage = [
      { role: "user", text: prompt },
      { role: "model", text: "" }, // Prepare a placeholder for the model response
    ];

    setResponses((prevResponses) => [...prevResponses, ...newMessage]);

    model
      .generateContent({ prompt }) // Pass the prompt as an object
      .then((response) => {
        setResponses((prevResponses) => [
          ...prevResponses.slice(0, -1), // Remove the placeholder for model
          { role: "model", text: response.text }, // Add the model's response
        ]);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
        setError(null);
      });

    setLoading(false);
  }

  return { responses, loading, error, chatAI };
}
