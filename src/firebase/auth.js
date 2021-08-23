import firebase from "firebase";
import { addSnapshot, newUser } from "./firestore";

export const login = async () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      if (res.additionalUserInfo.isNewUser === true) {
        newUser(res.user);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logout = async () => {
  firebase.auth().signOut();
};

export const authListener = (setUser) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      addSnapshot(user);
    } else {
      setUser(null);
    }
  });
};
