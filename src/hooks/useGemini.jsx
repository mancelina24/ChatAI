import { useState } from "react";
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
      { role: "model", text: "" },
    ];

    setResponses((prevResponses) => [...prevResponses, ...newMessage]);

    model
      .generateContent(prompt)
      .then((response) => {
        setResponses((prevResponses) => {
          return [
            ...prevResponses,
            { role: "model", text: response.response.text() },
          ];
        });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
        setError(null);
      });
  }

  return { responses, loading, error, chatAI };
}
