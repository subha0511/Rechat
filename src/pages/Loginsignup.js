import "firebase/auth";
import fire from "../firebase";
import { useState, useEffect } from "react";
import ChatBox from "../components/Chatbox/Chatbox";
import { login, authListener } from "../firebase/auth";

const Loginsignup = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authListener(setUser);
  }, []);

  return (
    <div>
      {user ? <ChatBox user={user} /> : <button onClick={login}>Google</button>}
    </div>
  );
};

export default Loginsignup;
