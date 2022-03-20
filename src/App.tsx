import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { Game } from "./features/Game/Game";
import { store } from "./app/store";
import { Provider } from "react-redux";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <Game />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
