import fire from "./firebase";
import firebase from "firebase";
console.log("hachibi");
let db = fire.firestore();
const newUser = async (uid) => {
  console.log(uid, "lao");
  const defaultData = {
    contacts: [{ contact: { msgs: { msg: [] } } }],
  };
  const userRef = db.collection("users").doc(uid);
  userRef.set(defaultData).then(() => {
    console.log("Document successfully written!");
  });
};
export default newUser;
