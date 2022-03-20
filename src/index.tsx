import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@fontsource/roboto";
import CssBaseline from "@mui/material/CssBaseline";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
