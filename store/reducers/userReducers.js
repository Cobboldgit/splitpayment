const initialState = {
  participant: [],
  userData: [],
  transactions: [],
  paymentPending: false,
  loading: false,
  alertError: null,
  confirmPrompt: null,
};

const userReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_PARTICIPANT":
      return { ...state, participant: [...state.participant, payload] };
    case "CLEAR_PARTICIPANT":
      return { ...state, participant: [] };
    case "UPDATE_PARTICIPANTS":
      const updateParticipant = state.participant.map((item) => {
        if (item.phone === payload.phone) {
          return payload.updateParticipant;
        }
        return item;
      });
      return { ...state, participant: updateParticipant };
    case "DELETE_PARTICIPANTS":
      const filterParticipant = state.participant.filter((item) => {
        return item.phone !== payload;
      });
      return { ...state, participant: filterParticipant };
    case "PAYMENT_PENDING":
      return { ...state, paymentPending: payload };
    case "ADD_TRANS":
      return { ...state, transactions: [...state.transactions, payload] };
    case "CLEAR_TRANS":
      return { ...state, transactions: [] };
    case "LOADING":
      return { ...state, loading: payload };
    case "ALERT_ERROR":
      return { ...state, alertError: payload };
    case "PROMPT":
      return { ...state, confirmPrompt: payload };
    case "GET_USER_DATA":
      return { ...state, userData: payload };
    default:
      return state;
  }
};

export default userReducers;
