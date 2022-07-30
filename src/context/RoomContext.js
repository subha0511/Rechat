import { useContext, createContext, useReducer, useEffect } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { db } from "../firebase/firebase";

const RoomContext = createContext();
RoomContext.displayName = "Room Context";

const actionTypes = {
  setRooms: "SET_ROOMS",
  setActiveRoom: "SET_ACTIVE_ROOM",
  setLoading: "SET_LOADING",
  resetState: "RESET_STATE",
};

const initialState = {
  rooms: [],
  activeRoom: null,
  isLoading: false,
};

const organise = (response, user) => {
  const uid = response.id;
  const data = response.data();
  let name = "";
  let photoURL = "";
  if (data.name === undefined) {
    if (data.name1 !== user.displayName) {
      name = data.name1;
      photoURL = data.image1;
    } else {
      name = data.name2;
      photoURL = data.image2;
    }
  }
  return {
    name,
    photoURL,
    uid,
    lastUpdated: data.lastUpdated,
    lastMessage: data.lastMessage,
    joined: data.joined,
    members: data.members,
  };
};

function roomReducer(state, action) {
  switch (action.type) {
    case actionTypes.setRooms: {
      return {
        ...state,
        rooms: action.payload,
      };
    }
    case actionTypes.setLoading: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case actionTypes.setActiveRoom: {
      return {
        ...state,
        activeRoom: action.payload,
      };
    }
    case actionTypes.resetState: {
      return {
        ...initialState,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const RoomProvider = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(roomReducer, initialState);

  useEffect(() => {
    if (user === null) {
      dispatch({ type: actionTypes.resetState });
    }
    const q = query(
      collection(db, "groups"),
      where("members", "array-contains", user.email),
      orderBy("lastUpdated", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const rooms = querySnapshot.docs.map((doc) => organise(doc, user));
      dispatch({ type: actionTypes.setRooms, payload: rooms });
    });
    return unsub;
  }, [user]);

  return (
    <RoomContext.Provider value={{ state, dispatch }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const { state, dispatch } = useContext(RoomContext);

  const setActiveRoom = (room) =>
    dispatch({ type: actionTypes.setActiveRoom, payload: room });

  return {
    ...state,
    setActiveRoom,
    dispatch,
  };
};

export default RoomProvider;
