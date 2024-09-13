import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

interface WelcomeProps {
  name: string;
}

const Welcome = (props: WelcomeProps): JSX.Element => {
  return <h1>Hello, {props.name}</h1>;
};
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Welcome name={"sarah"} />
  </StrictMode>
);
