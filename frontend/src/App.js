import React, { useState } from "react";
import CodeEditor from "./components/Editor";
import TerminalWindow from "./components/Terminal";
import "./App.css";

const MOTIVATIONAL_QUOTES = [
  "Keep calm and code in Python!",
  "Every error is a step closer to mastery.",
  "Debugging: The art of removing bugs.",
  "Simple is better than complex. — Zen of Python",
  "Readability counts. — Zen of Python",
  "Tip: Use list comprehensions for concise loops.",
  "Tip: Use virtual environments for project isolation.",
  "Tip: Use f-strings for easy string formatting.",
  "Tip: Functions keep your code DRY and organized.",
  "Tip: Use 'enumerate' to get index and value in loops.",
];

function App() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("Untitled.py");
  const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);

  const handleRun = async () => {
    setLoading(true);
    setOutput("Running...");
    const random =
      MOTIVATIONAL_QUOTES[
        Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)
      ];
    setQuote(random);

    try {
      const response = await fetch(
        "https://mini-python-code-editor.fly.dev/execute",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, input }),
        }
      );

      const data = await response.json();
      setOutput(data.output ?? "No output");
    } catch (err) {
      setOutput("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: "text/x-python" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName || "untitled.py";
    a.click();
  };

  const clearOutput = () => setOutput("");

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "monospace" }}>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h2 style={{ margin: 0 }}>Mini Python Code Editor</h2>
        <div
          style={{
            marginTop: "6px",
            display: "inline-block",
            padding: "6px 12px",
            background: "#222",
            color: "#22c55e",
            borderRadius: "6px",
            fontStyle: "italic",
            fontSize: "0.95rem",
            maxWidth: "90%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          💡 {quote}
        </div>
      </div>

      <CodeEditor
        code={code}
        setCode={setCode}
        onRun={handleRun}
        fileName={fileName}
        setFileName={setFileName}
        onSave={handleSave}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <textarea
          placeholder="Enter input here (one input per line)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: "10px 40px 10px 10px",
            background: "black",
            color: "lime",
            border: "1px solid #444",
            fontFamily: "monospace",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={() => setInput("")}
          title="Clear Input"
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "linear-gradient(90deg, #22c55e 60%, #16a34a 100%)",
            border: "none",
            borderRadius: "4px",
            padding: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            zIndex: 2,
          }}
        >
          <svg width="15" height="15" fill="none" viewBox="0 0 16 16">
            <rect
              x="3"
              y="6"
              width="10"
              height="7"
              rx="1"
              stroke="#fff"
              strokeWidth="2"
            />
            <path d="M6 7v4M10 7v4" stroke="#fff" strokeWidth="2" />
            <path d="M2 4h12M6 2h4" stroke="#fff" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <TerminalWindow output={output} onClear={clearOutput} />
    </div>
  );
}

export default App;
