import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

function TerminalWindow({ output, onClear }) {
  const terminalRef = useRef();
  const termRef = useRef();
  const lastOutputRef = useRef("");

  useEffect(() => {
    let timer;
    if (terminalRef.current && !termRef.current) {
      timer = setTimeout(() => {
        termRef.current = new Terminal({
          fontFamily: "Fira Mono, monospace",
          fontSize: 14,
          theme: {
            background: "#18181b",
            foreground: "#e5e5e5",
            cursor: "#facc15",
          },
        });
        termRef.current.open(terminalRef.current);
      }, 0);
    }
    return () => {
      clearTimeout(timer);
      if (termRef.current) termRef.current.dispose();
      termRef.current = null;
    };
  }, []);

  useEffect(() => {
    console.log("Terminal output update:", output);
    if (termRef.current) {
      const safeOutput = output ? output : "";
      if (lastOutputRef.current !== safeOutput) {
        termRef.current.clear();
        termRef.current.write(safeOutput.replace(/\n/g, "\r\n"));
        lastOutputRef.current = safeOutput;
      }
    }
  }, [output]);

  return (
    <div
      style={{
        border: "1.5px solid #27272a",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        background: "#18181b",
        width: "100%",
        minWidth: "200px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#27272a",
          color: "#facc15",
          padding: "6px 14px",
          fontWeight: "bold",
          fontSize: "14px",
          borderBottom: "1px solid #18181b",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              background: "#ef4444",
              borderRadius: "50%",
              marginRight: "6px",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              background: "#facc15",
              borderRadius: "50%",
              marginRight: "6px",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              background: "#22c55e",
              borderRadius: "50%",
              marginRight: "12px",
            }}
          />
          Terminal
        </div>
        <button
          onClick={onClear}
          title="Clear"
          style={{
            background: "linear-gradient(90deg, #22c55e 60%, #16a34a 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 16px",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 1px 4px rgba(34,197,94,0.12)",
            transition: "background 0.2s",
          }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path
              d="M6 6v5M10 6v5M2.5 4h11M5.5 4V3.5A1.5 1.5 0 0 1 7 2h2A1.5 1.5 0 0 1 10.5 3.5V4m-6 0v8A1.5 1.5 0 0 0 6 13.5h4A1.5 1.5 0 0 0 12.5 12V4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div
        ref={terminalRef}
        style={{
          height: "220px",
          background: "#18181b",
          color: "white",
          fontFamily: "Fira Mono, monospace",
          textAlign: "left",
        }}
      />
    </div>
  );
}

export default TerminalWindow;
