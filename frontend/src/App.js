import React, { useState } from "react";
import CodeEditor from "./components/Editor";
import TerminalWindow from "./components/Terminal";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setOutput("Running..."); // Show running message

    try {
      const response = await fetch("http://localhost:5000/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, input }),
      });

      const data = await response.json();
      setOutput(data.output ?? "No output");
    } catch (err) {
      setOutput("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearOutput = () => setOutput("");

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>Mini python Code Editor</h2>

      <CodeEditor code={code} setCode={setCode} onRun={handleRun} />

      <textarea
        placeholder="Enter input here (one input per line)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          background: "black",
          color: "lime",
          border: "1px solid #444",
          fontFamily: "monospace",
          resize: "vertical",
        }}
      />

      <TerminalWindow output={output} onClear={clearOutput} />
    </div>
  );
}

export default App;
