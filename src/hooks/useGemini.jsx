import React, { useState } from "react";

export function useGemini() {
  const [responeses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function chatAI(prompt) {
    setLoading(true);
  }
}

export default useGemini;
