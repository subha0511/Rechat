import {
  collection,
  doc,
  serverTimestamp,
  addDoc,
  updateDoc,
  deleteField,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./firebase";

export const addMessage = async (senderId, roomUid, message) => {
  try {
    await addDoc(collection(db, "groups", roomUid, "messages"), {
      message,
      timestamp: serverTimestamp(),
      senderId,
    });
    await updateDoc(doc(db, "groups", roomUid), {
      lastMessage: message,
      lastUpdated: serverTimestamp(),
    });
    return { status: "SUCCESS" };
  } catch (e) {
    console.error(e);
    return { status: "ERROR", error: e };
  }
};

export const createRoom = async (user, friend) => {
  try {
    await addDoc(collection(db, "groups"), {
      joined: serverTimestamp(),
      lastUpdated: serverTimestamp(),
      members: [user.email, friend.email],
      lastMessage: "",
      name1: user.displayName,
      image1: user.photoURL,
      name2: friend.displayName,
      image2: friend.photoURL,
    });
    await updateDoc(doc(db, "users", user.email), {
      friends: arrayUnion(friend.email),
      [`friendRequest.${friend.uid}`]: deleteField(),
    });
    await updateDoc(doc(db, "users", friend.email), {
      friends: arrayUnion(user.email),
      sentRequest: arrayRemove(user.email),
    });
    return;
  } catch (e) {
    throw e;
  }
};

export const removeFriendRequest = async (user, friend) => {
  await updateDoc(doc(db, "users", user.email), {
    [`friendRequest.${friend.uid}`]: deleteField(),
  });
  await updateDoc(doc(db, "users", friend.email), {
    sentRequest: arrayRemove(user.email),
  });
};
