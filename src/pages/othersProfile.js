import React from "react";
import { db } from "../firestore";
import { useState, useEffect } from "react";
import firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

const Profile = ({ profile, user, setProfile, myData, setMyData }) => {
  const [data, setData] = useState(null);
  console.log(myData);
  const fetchData = async () => {
    db.collection("users")
      .doc(profile)
      .onSnapshot((querySnapshot) => {
        setData(querySnapshot.data());
      });
  };
  const addFriend = (user) => {
    const profileRef = db.collection("users").doc(profile);

    profileRef.set(
      {
        friendRequest: {
          [user.email]: {
            email: user.email,
            photo: user.photoURL,
            name: user.displayName,
          },
        },
      },
      { merge: true }
    );
    // profileRef.update({
    //   friendRequest: firebase.firestore.FieldValue.arrayUnion(photo),
    // });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {data ? (
        <>
          <h1>{data.displayName}</h1>
          <h1>{data.email}</h1>
          {myData.friends.includes(data.email) === false ||
          myData.friendRequest[data.email] === false ? (
            <button onClick={() => addFriend(user)}>Add friend</button>
          ) : (
            <></>
          )}
          <button
            onClick={() => {
              setProfile(false);
            }}
          >
            back
          </button>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
export default Profile;
