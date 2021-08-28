import fire from "./firebase";
import firebase from "firebase";
console.log("hachibi");
export let db = fire.firestore();
const newUser = async (user) => {
  const userRef = db.collection("users");
  const groupsRef = db.collection("groups");
  // const messagesRef=db.collection("messages")
  const email = user.email;
  const displayName = user.displayName;
  const photoURL = user.photoURL;
  const uid = user.uid;
  userRef.doc(email).set({
    uid: uid,
    displayName: displayName,
    photoURL: photoURL,
    email: email,
    friends: ["Darkripple"],
  });

  // console.log(user);
  // let name = user.displayName;
  // let pic = "";
  // let email = user.email;
  // const defaultData = {
  //   name: name,
  //   email: email,
  //   pic: pic,
  // };
  // const userRef = db.collection("users").doc(user.email);
  // userRef
  //   .set(defaultData)
  //   .then(() => {
  //     userRef.collection("darkripple08@gmail.com").doc("data").set({
  //       name: "Darkripple",
  //       pic: pic,
  //       lastmessage: "",
  //     });
  //   })
  //   .then(() => {
  //     console.log(firebase.firestore.Timestamp.toString);
  //     console.log(firebase.firestore.Timestamp.toData);
  //     console.log("posh");
  //     userRef
  //       .collection("darkripple08@gmail.com")
  //       .doc("data")
  //       .collection("messages")
  //       .doc("1hello")
  //       .set({ val: 1 });
  //   });
};

export default newUser;
