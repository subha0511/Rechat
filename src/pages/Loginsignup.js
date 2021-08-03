import fire from "../firebase";
import firebase from "firebase";
import "firebase/auth";
import newUser from "../firestore";
const Loginsignup = () => {
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
      .then((res) => fire.auth().signInWithCredential(res.credential))
      .then((res) => {
        newUser(res.user.uid);
      });
  };
  return <button onClick={() => loginHandler()}>google</button>;
};
export default Loginsignup;
