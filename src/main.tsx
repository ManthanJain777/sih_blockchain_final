
  import { Buffer } from 'buffer';
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  // Set up buffer for browser compatibility
  window.Buffer = Buffer;
  window.global = window.global || window;
  window.process = window.process || {
    env: { DEBUG: undefined },
  };

  createRoot(document.getElementById("root")!).render(<App />);
  