import { useState } from "react";
import "./App.css";
import { useGemini } from "./hooks/useGemini";

function App() {
  const [userInput, setUserInput] = useState("");

  const { responses, error, loading, chatAI } = useGemini(
    "use max3 sencences and use bullet points"
  );

  function handleChat(event) {
    event.preventDefault();
    chatAI(userInput);
    setUserInput("");
  }

  function handleChange(event) {
    const { value } = event.target;
    setUserInput(value);
  }

  return (
    <div className="content">
      <div className="response-container">
        <div class="response-container">
          <div class="messageBalloon user">
            {responses.map((response) => (
              <div className={`messageBalloon${response.role}`}>
                {response.text}
              </div>
            ))}
          </div>
          {loading && <p>Loading</p>}
          {error && <p>{error}</p>}
        </div>
      </div>
      <div className="input-container">
        <form onSubmit={handleChat}>
          <input name="user-input" onChange={handleChange} value={userInput} />
          <button>Ask</button>
        </form>
      </div>
    </div>
  );
}

export default App;
