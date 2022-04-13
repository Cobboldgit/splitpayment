import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import {
  getFirebase,
  reduxReactFirebase,
  firebaseReducer,
} from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";
import thunk from "redux-thunk";
import contactsReducer from "./reducers/contactsReducer";
import userReducers from "./reducers/userReducers";
import firebase from "../firebase/firebase"



// Root reducers
const rootReducers = combineReducers({
  contactsReducer,
  userReducers,
  firebaseReducer,
});


// Create store
export const store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxReactFirebase(firebase),
    reduxFirestore(firebase)
  )
);
