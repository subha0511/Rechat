import { db } from "./firebase";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  getDoc,
  getDocs,
  collection,
  orderBy,
  limit,
  startAt,
  endAt,
} from "firebase/firestore";

export const newUser = async (user) => {
  const userRef = doc(db, "users", user.email);
  try {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      friends: [],
      friendRequest: {},
      sentRequest: [],
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const sendFriendRequest = async (user, friend) => {
  try {
    await updateDoc(doc(db, "users", friend.email), {
      friendRequest: {
        [user.uid]: {
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          seen: false,
          uid: user.uid,
        },
      },
    });
    await updateDoc(doc(db, "users", user.email), {
      sentRequest: arrayUnion(friend.email),
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    return { status: "Error", error };
  }
};

export const autocompleteQuery = async (user, value) => {
  try {
    const q = query(
      collection(db, "users"),
      orderBy("email"),
      startAt(value),
      endAt(value + "\uf8ff"),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    let suggestions = [];
    querySnapshot.forEach((doc) => {
      if (
        doc.data().email !== user.email &&
        !user.friends.includes(doc.data().email) &&
        !user.sentRequest.includes(doc.data().email) &&
        !user.friendRequest[doc.data().email]
      ) {
        suggestions.push(doc.data().email);
      }
    });
    return suggestions;
  } catch (error) {
    return { status: "Error", error };
  }
};

export const getUser = async (email) => {
  try {
    const user = await getDoc(doc(db, "users", email));
    return user;
  } catch (error) {
    throw error;
  }
};
