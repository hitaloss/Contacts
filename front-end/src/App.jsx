import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import Routes from "./routes";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Routes />
      </ThemeProvider>
    </>
  );
}

export default App;
