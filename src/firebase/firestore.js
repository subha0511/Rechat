import firebase from "firebase";

let db = firebase.firestore();

export const newUser = async (user) => {
  const defaultData = {
    name: user.displayName,
    joined: firebase.firestore.FieldValue.serverTimestamp(),
    groups: [],
  };
  var userRef = db.collection("users").doc(user.email);
  userRef.set(defaultData).then(() => {
    console.log("Document successfully written!");
  });
};

export const getFriends = async (user, setFriends) => {
  var userRef = db.collection("users").doc(user.email);
  userRef.onSnapshot((snapshot) => {
    setFriends(snapshot.data().groups);
  });
};

export const addFriend = async (user, friend) => {
  var groupsRef = db.collection("groups");
  var userRef = db.collection("users").doc(user.email);
  var friendRef = db.collection("users").doc(friend);

  friendRef.get().then((doc) => {
    if (doc.exists) {
      groupsRef
        .add({
          joined: firebase.firestore.FieldValue.serverTimestamp(),
          members: [user.name, doc.name],
        })
        .then((doc) => {
          userRef.update({
            groups: firebase.firestore.FieldValue.arrayUnion(doc.id),
          });
          friendRef.update({
            groups: firebase.firestore.FieldValue.arrayUnion(doc.id),
          });
        });
    } else {
      console.log("User not found");
    }
  });
};

export const addSnapshot = async (user) => {
  var contactRef = db
    .collection("users")
    .doc(user.email)
    .collection("contacts");
  contactRef.get().then((docs) => {
    docs.forEach((doc) => {
      console.log(doc);
    });
  });
};
