import React from "react";
import { useAuth } from "./context/AuthContext";
import "./firebase/firebase";
import RoomProvider from "./context/RoomContext";
import Chatbox from "./features/Chatbox";
import LandingPage from "./pages/LandingPage";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? (
        <RoomProvider>
          <Chatbox />
        </RoomProvider>
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default App;
