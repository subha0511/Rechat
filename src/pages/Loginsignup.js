import fire from "../firebase";
import firebase from "firebase";
import "firebase/auth";
import newUser from "../firestore";
import { useState, useEffect } from "react";
import Chatbox from "../components/Chatbox/Chatbox";
import { db } from "../firestore";

const Loginsignup = () => {
  const [gmail, setGmail] = useState(null);
  const [user, setUser] = useState(null);

  const authListener = () => {
    fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setGmail(authUser);
      } else {
        setGmail(null);
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  useEffect(() => {
    if (!gmail) {
      return;
    }
    db.collection("users")
      .doc(gmail.email)
      .onSnapshot((doc) => {
        setUser(doc.data());
      });
  }, [gmail]);

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
      {gmail && user ? (
        <Chatbox signOutHandler={signOutHandler} user={user} />
      ) : (
        <button onClick={() => loginHandler()}>google</button>
      )}
    </div>
  );
};

export default Loginsignup;
