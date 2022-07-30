import { useContext, createContext, useReducer, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const AuthContext = createContext();
AuthContext.displayName = "Auth Context";

const actionTypes = {
  setUser: "SET_USER",
  setLoading: "SET_LOADING",
  setLoginEmail: "SET_LOGIN_EMAIL",
  resetState: "RESET_STATE",
  setUnseenNotifications: "SET_UNSEEN_NOTIFICATIONS",
};

const initialState = {
  user: null,
  loginEmail: "",
  isLoading: true,
  unseenNotification: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case actionTypes.setUser: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case actionTypes.setLoading: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case actionTypes.setLoginEmail: {
      return {
        ...state,
        loginEmail: action.payload,
      };
    }
    case actionTypes.resetState: {
      return {
        ...initialState,
      };
    }
    case actionTypes.setUnseenNotifications: {
      return {
        ...state,
        unseenNotification: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const checkIsUnseen = (data) => {
  return data && Object.keys(data).some((key) => data[key].seen === false);
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: actionTypes.setLoginEmail, payload: user.email });
        dispatch({ type: actionTypes.setLoading, payload: false });
      } else {
        dispatch({ type: actionTypes.resetState });
        dispatch({ type: actionTypes.setLoading, payload: false });
      }
    });
    return () => unsub();
  }, [auth]);

  useEffect(() => {
    if (state.loginEmail === "") return;
    const unsub = onSnapshot(doc(db, "users", state.loginEmail), (doc) => {
      if (doc.exists) {
        dispatch({ type: actionTypes.setUser, payload: doc.data() });
        dispatch({
          type: actionTypes.setUnseenNotifications,
          payload: checkIsUnseen(doc.data()?.friendRequest),
        });
      }
    });
    return unsub;
  }, [state.loginEmail]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const setUser = (user) => {
    dispatch({ type: actionTypes.setUser, payload: user });
  };

  const setLoading = (loading) => {
    dispatch({ type: actionTypes.setLoading, payload: loading });
  };

  return {
    ...state,
    setUser,
    setLoading,
    dispatch,
  };
};

export default AuthProvider;
