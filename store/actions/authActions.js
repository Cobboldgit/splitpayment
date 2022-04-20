// Create user with email and password =======================================
export const createUserWithEmail = ({ email, password, nickName, phone }) => {
  return (dispatch, state, { getFirebase, getFirestore }) => {
    const auth = getFirebase().auth();
    const db = getFirestore();
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
                alert('doc created')
              })
              .catch((error) => {
                alert(error.message);
              });
          }
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            alert("Enter a valid email");
            break;

          case "auth/weak-password":
            alert("Enter a strong password");
            break;

          case "auth/network-request-failed":
            alert("Network errro");
            break;

          default:
            alert(error.code);
            break;
        }
      });
  };
};

// Login in with email with password =======================================
export const loginUser = (email, password) => {
  return (dispatch, useState, { getFirebase, getFirestore }) => {
    const auth = getFirebase().auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            alert("Enter a valid email.");

            break;

          case "auth/user-not-found":
            alert("Incorrect email or password");

            break;

          case "auth/wrong-password":
            alert("Wrong password");

            break;

          case "auth/network-request-failed":
            alert("Network errro");

            break;

          default:
            alert(error.code);

            break;
        }
      });
  };
};

// Sign in with google ===============================================
export const signInWithGoogle = () => {
  return (dispatch, state, { getFirebase }) => {
    const auth = getFirebase().auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((user) => {
        d;
      })
      .catch((err) => {});
  };
};

// Sign out =======================================================
export const signOut = () => {
  return (dispatch, state, { getFirebase }) => {
    const auth = getFirebase().auth();
    auth
      .signOut()
      .then(() => {})
      .catch((err) => {});
  };
};
