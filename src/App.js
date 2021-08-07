import React, { useEffect } from "react";
import Loginsignup from "./pages/Loginsignup";

function App() {
  useEffect(() => {
    document.title = "Chat App";
  }, []);
  return (
    <div className="App">
      <Loginsignup />
    </div>
  );
}

export default App;
