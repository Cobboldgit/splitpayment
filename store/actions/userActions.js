import Uuid from "../../components/Uuid";
import firebase from "../../firebase/firebase";

// add participant
// clear participant state
// create group
// edit group
// get all groups

export const alertPending = (boolean) => {
  return ({
    type: "PAYMENT_PENDING",
    payload: boolean
  })
}

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
      .then(() => alert("group has been created"));
  };
};

//==================== edit group ============================
export const editGroup = ({ participant, groupName, id, transactions }) => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    // let data = { groupName, participant, id, tim };
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
        // alert("updated")
      });
  };
};

export const deleteGroup = (id ) => {
 return (dispatch, useState, { getFirestore, getFirebase }) => {
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
      .then(() => alert("updated"));
  };
};

//================ get groups for current user ====================
export const getAllGroups = () => {
  return (dispatch, useState, { getFirestore, getFirebase }) => {
    // Get current user uid
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
        },
        (error) => {
          console.log("Error getting document:", error);
        }
      );
  };
};
