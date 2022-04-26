import Uuid from "../../components/Uuid";
import firebase from "../../firebase/firebase";

// add participant
// clear participant state
// create group
// edit group
// get all groups

export const promptToConfirm = (state) => {
  return {
    type: "PROMPT",
    payload: state
  }
}

export const alertError = ({ state, text }) => {
  return {
    type: "ALERT_ERROR",
    payload: {
      state,
      text,
    },
  };
};

export const isLoading = (boolean) => {
  return {
    type: "LOADING",
    payload: boolean,
  };
};

export const alertPending = (boolean) => {
  return {
    type: "PAYMENT_PENDING",
    payload: boolean,
  };
};

export const addTransactionOffline = (data) => {
  console.log("transdata ACTIONS");
  return {
    type: "ADD_TRANS",
    payload: data,
  };
};

export const clearAddedTransactions = () => {
  console.log("clear");
  return {
    type: "CLEAR_TRANS",
  };
};

export const addParticipant = (data) => {
  return {
    type: "ADD_PARTICIPANT",
    payload: data,
  };
};

export const editParticipant = (data) => {
  return {
    type: "UPDATE_PARTICIPANTS",
    payload: { phone: data.phone, updateParticipant: data },
  };
};

export const deleteParticipant = (phone) => {
  return {
    type: "DELETE_PARTICIPANTS",
    payload: phone,
  };
};

export const clearAddedParticipant = () => {
  return {
    type: "CLEAR_PARTICIPANT",
  };
};

// ============================ create a new group==========================
export const createGroup = ({ groupName, participant }) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    dispatch(isLoading(true));
    const userId = getFirebase().auth().currentUser.uid;
    const db = getFirestore();
    const dbRef = db.collection("users").doc(userId);
    let data = {
      groupName: groupName,
      participants: participant,
      transactions: [],
      id: Uuid(20),
      timestamp: Date.now(),
    };

    dbRef
      .update({
        groups: firebase.firestore.FieldValue.arrayUnion(data),
      })
      .then(() => {
        setTimeout(() => {
          dispatch(isLoading(false));
        }, 2000);
      })
      .catch((error) => {
        alert(error.message);
        dispatch(isLoading(false));
      });
  };
};

//==================== edit group ============================
export const editGroup = ({ participant, groupName, id, transactions }) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    // let data = { groupName, participant, id, tim };
    dispatch(isLoading(true));
    const userData = useState().userReducers.userData;
    const userId = getFirebase().auth().currentUser.uid;
    const db = getFirestore();
    const dbRef = db.collection("users");
    let data = {
      groupName: groupName,
      id,
      participants: participant,
      timestamp: Date.now(),
      transactions,
    };
    const updateGroupData = userData[0].groups.map((item) => {
      if (item.id === id) {
        return data;
      }
      return item;
    });

    dbRef
      .doc(userId)
      .update({ groups: updateGroupData })
      .then(() => {
        setTimeout(() => {
          dispatch(isLoading(false));
        }, 2000);
      })
      .catch((error) => {
        dispatch(isLoading(false));
        alert(error.message);
      });
  };
};

export const deleteGroup = (id) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    dispatch(isLoading(true));
    const userData = useState().userReducers.userData;
    const userId = getFirebase().auth().currentUser.uid;
    const db = getFirestore();
    const dbRef = db.collection("users");
    const deletedGroup = userData[0].groups.filter((item) => {
      return item.id != id;
    });
    dbRef
      .doc(userId)
      .update({ groups: deletedGroup })
      .then(() => {
        setTimeout(() => {
          dispatch(isLoading(false));
        }, 2000);
      })
      .catch((error) => {
        dispatch(isLoading(false));
        alert(error.message);
      });
  };
};

//================ get groups for current user ====================
export const getAllGroups = () => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    dispatch(isLoading(true));
    // Get current user

    const userId = getFirebase().auth().currentUser.uid;

    // Firestore
    const db = getFirestore();

    // Get data from database
    db.collection("users")
      .doc(userId)
      .onSnapshot(
        (querySnapshot) => {
          // array to store returned data
          let userData = [];

          // push returned data from database to trans array
          userData.push(querySnapshot.data());

          // make data available for redux state
          dispatch({
            type: "GET_USER_DATA",
            payload: userData,
          });

          setTimeout(() => {
            dispatch(isLoading(false));
          }, 2000);
        },
        (error) => {
          dispatch(isLoading(false));
          alert(error.message);
        }
      );
  };
};

export const addNewTrans = ({ groupName, id, participants, transaction }) => {
  return (dispatch, useState, { getFirebase, getFirestore }) => {
    const userData = useState().userReducers.userData;
    const userId = getFirebase().auth().currentUser.uid;
    const db = getFirestore();
    const dbRef = db.collection("users");
    let data = {
      groupName: groupName,
      id: id,
      participants: participants,
      timestamp: Date.now(),
      transactions: transaction,
    };
    const updateGroupData = userData[0].groups.map((item) => {
      if (item.id === id) {
        return data;
      }
      return item;
    });

    dbRef
      .doc(userId)
      .update({ groups: updateGroupData })
      .then(() => {
        setTimeout(() => {
          dispatch(isLoading(false));
        }, 2000);
      })
      .catch((error) => {
        dispatch(isLoading(false));
        alert(error.message);
      });
  };
};
