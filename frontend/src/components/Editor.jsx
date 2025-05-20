import React, { useEffect, useRef } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { python } from "@codemirror/lang-python";

// Custom theme for green cursor (solid and blinking)
const greenCursorTheme = EditorView.theme({
  ".cm-cursor": {
    borderLeft: "2px solid #22c55e !important",
    backgroundColor: "#22c55e !important",
    marginLeft: "0px",
    marginRight: "0px",
  },
  ".cm-content": {
    caretColor: "#22c55e !important",
  },
  "&.cm-focused .cm-cursor": {
    borderLeft: "2px solid #22c55e !important",
    backgroundColor: "#22c55e !important",
  },
});

function CodeEditor({ code, setCode, onRun }) {
  const editorRef = useRef();
  const viewRef = useRef();

  useEffect(() => {
    if (!editorRef.current) return;

    viewRef.current = new EditorView({
      state: EditorState.create({
        doc: code,
        extensions: [
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

    // Auto-focus the editor on mount
    viewRef.current.focus();

    return () => viewRef.current.destroy();
    // eslint-disable-next-line
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
          Editor
        </div>
        <button
          onClick={onRun}
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
            <polygon points="4,3 13,8 4,13" fill="white" />
          </svg>
          Run
        </button>
      </div>
      <div
        ref={editorRef}
        style={{
          height: "300px",
          background: "#18181b",
          color: "#e5e5e5",
          fontFamily: "Fira Mono, monospace",
        }}
      />
    </div>
  );
}

export default CodeEditor;
