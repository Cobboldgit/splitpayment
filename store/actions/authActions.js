import firebase from "../../firebase/firebase";
import { alertError, isLoading } from "./userActions";

// Create user with email and password =======================================
export const createUserWithEmail = ({ email, password, nickName, phone }) => {
  return (dispatch, state, { getFirebase, getFirestore }) => {
    const auth = getFirebase().auth();
    const db = getFirestore();
    dispatch(isLoading(true));

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        auth.onAuthStateChanged((user) => {
          if (user != null) {
            user.sendEmailVerification().then(() => {});

            const userRef = db.collection("users").doc(user.uid);
            userRef
              .set({
                displayName: nickName,
                phoneNumber: phone,
                email: email,
                groups: [
                  {
                    groupName: "New group",
                    participants: [],
                    transactions: [],
                    id: 1,
                    timestamp: Date.now(),
                  },
                ],
              })
              .then(() => {
                dispatch(isLoading(false));
              })
              .catch((error) => {
                // alert(error.message);
              });
          }
        });
      })
      .catch((error) => {
        let open;
        let close;
        switch (error.code) {
          case "auth/invalid-email":
            open = {
              state: true,
              text: "Enter a valid email",
            };
            close = {
              state: false,
              text: "",
            };
            dispatch(alertError(open));
            setTimeout(() => dispatch(alertError(close)), 4000);
            break;

          case "auth/weak-password":
            open = {
              state: true,
              text: "Enter a strong password",
            };
            close = {
              state: false,
              text: "",
            };
            dispatch(alertError(open));
            setTimeout(() => dispatch(alertError(close)), 4000);
            break;

          case "auth/network-request-failed":
            open = {
              state: true,
              text: "Network error",
            };
            close = {
              state: false,
              text: "",
            };
            dispatch(alertError(open));
            setTimeout(() => dispatch(alertError(close)), 4000);
            break;

          default:
            open = {
              state: true,
              text: error.message,
            };
            close = {
              state: false,
              text: "",
            };
            dispatch(alertError(open));
            setTimeout(() => dispatch(alertError(close)), 4000);
            break;
        }
      });
  };
};

// Login in with email with password =======================================
export const loginUser = (email, password) => {
  return (dispatch, useState, { getFirebase, getFirestore }) => {
    dispatch(isLoading(true));
    const auth = getFirebase().auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(isLoading(false));
      })
      .catch((error) => {
        dispatch(isLoading(false));
        let open;
        let close;
        switch (error.code) {
          case "auth/invalid-email":
            alert("Enter a valid email.");

            break;

          case "auth/user-not-found":
            // alert("Incorrect email or password");
            open = {
              state: true,
              text: "Incorrect email or password",
            };
            close = {
              state: false,
              text: "",
            };
            dispatch(alertError(open));
            setTimeout(() => dispatch(alertError(close)), 4000);
            break;

          case "auth/wrong-password":
            alert("Wrong password");
            open = {
              state: true,
              text: "Incorrect password",
            };
            close = {
              state: false,
              text: "",
            };
            dispatch(alertError(open));
            setTimeout(() => dispatch(alertError(close)), 4000);
            break;

          case "auth/network-request-failed":
            open = {
              state: true,
              text: "Network error",
            };
            close = {
              state: false,
              text: "",
            };
            dispatch(alertError(open));
            setTimeout(() => dispatch(alertError(close)), 4000);
            break;

          default:
            open = {
              state: true,
              text: error.message,
            };
            close = {
              state: false,
              text: "",
            };
            dispatch(alertError(open));
            setTimeout(() => dispatch(alertError(close)), 4000);
            break;
        }
      });
  };
};

// Sign out =======================================================
export const signOut = () => {
  return (dispatch, state, { getFirebase }) => {
    dispatch(isLoading(true));
    const auth = getFirebase().auth();
    auth
      .signOut()
      .then(() => {
        dispatch(isLoading(false));
      })
      .catch((err) => {
        dispatch(isLoading(false));
      });
  };
};
