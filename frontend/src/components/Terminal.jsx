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
          style={{
            background: "#27272a",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "4px",
            padding: "2px 10px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>
      <div
        ref={terminalRef}
        style={{
          height: "220px",
          background: "#18181b",
          color: "white",
          fontFamily: "Fira Mono, monospace",
        }}
      />
    </div>
  );
}

export default TerminalWindow;
