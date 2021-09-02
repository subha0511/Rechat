import fire from "../firebase";
import firebase from "firebase";
import "firebase/auth";
import newUser from "../firestore";
import { useState, useEffect } from "react";
import Chatbox from "../components/Chatbox/Chatbox";

const Loginsignup = () => {
  const [user, setUser] = useState(null);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  const googleAuth = async (provider) => {
    return fire
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  const loginHandler = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const authentication = googleAuth(googleProvider);
    authentication
      .then((res) => {
        if (res.additionalUserInfo.isNewUser === true) {
          newUser(res.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signOutHandler = async () => {
    fire.auth().signOut();
  };

  return (
    <div>
      {user ? (
        <Chatbox signOutHandler={signOutHandler} user={user} />
      ) : (
        <button onClick={() => loginHandler()}>google</button>
      )}
    </div>
  );
};

export default Loginsignup;
