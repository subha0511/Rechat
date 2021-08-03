import React, { useEffect } from "react";
import Loginsignup from "./pages/Loginsignup";
import { SnackbarProvider } from "notistack";
import Chatbox from "./components/Chatbox/Chatbox";

function App() {
  useEffect(() => {
    document.title = "Chat App";
  }, []);
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <Loginsignup />
        {/* <Chatbox /> */}
      </div>
    </SnackbarProvider>
  );
}

export default App;
