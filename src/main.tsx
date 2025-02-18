import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Providers from "./providers/providers.tsx";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <Toaster richColors position="top-center" />
      <App />
    </Providers>
  </StrictMode>
);
