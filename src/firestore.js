import fire from "./firebase";
import firebase from "firebase";
console.log("hachibi");
export let db = fire.firestore();
const newUser = async (user) => {
  const userRef = db.collection("users");
  const groupsRef = db.collection("groups");
  const email = user.email;
  const displayName = user.displayName;
  const photoURL = user.photoURL;
  const uid = user.uid;
  userRef.doc(email).set({
    uid: uid,
    displayName: displayName,
    photoURL: photoURL,
    email: email,
    friends: [],
    friendRequest: {},
  });
};

export default newUser;
