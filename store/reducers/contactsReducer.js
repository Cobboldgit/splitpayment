const initialState = {
  contacts: [],
};

const contactsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_CONTACTS":
      return { contacts: payload };
    default:
      return state;
  }
};

export default contactsReducer;
