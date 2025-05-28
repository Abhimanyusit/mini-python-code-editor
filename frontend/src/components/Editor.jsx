import React, { useEffect, useRef } from "react";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { python } from "@codemirror/lang-python";

const greenCursorTheme = EditorView.theme({
  ".cm-cursor": {
    borderLeft: "2px solid #22c55e !important",
    backgroundColor: "#22c55e !important",
    marginLeft: "0px",
    marginRight: "0px",
  },
  ".cm-content": {
    caretColor: "#22c55e !important",
    textAlign: "left",
  },
  "&.cm-focused .cm-cursor": {
    borderLeft: "2px solid #22c55e !important",
    backgroundColor: "#22c55e !important",
  },
  ".cm-gutters": {
    backgroundColor: "#5D576B !important",
    color: "#white !important",
    border: "!important",
  },
  ".cm-lineNumbers .cm-gutterElement": {
    color: "white !important",
  },
});

function CodeEditor({ code, setCode, onRun, fileName, setFileName, onSave }) {
  const editorRef = useRef();
  const viewRef = useRef();

  useEffect(() => {
    if (!editorRef.current) return;

    viewRef.current = new EditorView({
      state: EditorState.create({
        doc: code,
        extensions: [
          lineNumbers(),
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          python(),
          greenCursorTheme,
          EditorView.updateListener.of((v) => {
            if (v.docChanged) {
              setCode(v.state.doc.toString());
            }
          }),
        ],
      }),
      parent: editorRef.current,
    });

    viewRef.current.focus();

    return () => viewRef.current.destroy();
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (view && code !== view.state.doc.toString()) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: code,
        },
      });
    }
  }, [code]);

  // Clear handler
  const handleClear = () => setCode("");

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
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Untitled.py"
            style={{
              background: "transparent",
              border: "none",
              color: "#facc15",
              fontWeight: "bold",
              fontSize: "14px",
              outline: "none",
              width: "120px",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handleClear} title="Clear" style={iconBtnStyle}>
            {/* Clear SVG (trash) */}
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
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
          <button onClick={onSave} title="Save" style={iconBtnStyle}>
            {/* Save SVG (floppy) */}
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <rect
                x="3"
                y="2"
                width="10"
                height="12"
                rx="1"
                stroke="#fff"
                strokeWidth="2"
              />
              <path d="M6 2v4h4V2" stroke="#fff" strokeWidth="2" />
              <rect x="6" y="10" width="4" height="2" rx="1" fill="#fff" />
            </svg>
          </button>
          <button
            onClick={onRun}
            title="Run"
            style={{
              ...iconBtnStyle,
              background: "linear-gradient(90deg, #22c55e 60%, #16a34a 100%)",
              color: "#fff",
              padding: "6px 16px",
              fontWeight: "bold",
              fontSize: "14px",
              gap: "6px",
            }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <polygon points="4,3 13,8 4,13" fill="white" />
            </svg>
            Run
          </button>
        </div>
      </div>
      <div
        ref={editorRef}
        style={{
          height: "300px",
          background: "#18181b",
          color: "#e5e5e5",
          fontFamily: "Fira Mono, monospace",
          overflowY: "auto", // <-- add this line
        }}
      />
    </div>
  );
}

// Add this style object above your component
const iconBtnStyle = {
  background: "linear-gradient(90deg, #22c55e 60%, #16a34a 100%)",
  border: "none",
  borderRadius: "4px",
  padding: "6px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s",
  color: "#fff",
};

export default CodeEditor;
