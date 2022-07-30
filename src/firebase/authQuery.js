import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { newUser } from "./userQuery";

export const login = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      if (result._tokenResponse.isNewUser) {
        newUser(result.user);
      }
      return { status: "SUCCESS" };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { status: "ERROR", errorCode, errorMessage };
    });
};

export const logout = async () => {
  const auth = getAuth();
  signOut(auth);
};
