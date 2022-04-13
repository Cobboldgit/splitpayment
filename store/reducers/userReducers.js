const initialState = {
  participant: [],
  userData: []
};

const userReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_PARTICIPANT":
      return { ...state, participant: [...state.participant, payload] };
      case "CLEAR_PARTICIPANT":
          return{...state, participant: []}
      case "UPDATE_PARTICIPANTS":
        const updateParticipant = state.participant.map((item) => {
          if (item.phone === payload.phone) {
            return payload.updateParticipant
          }
          return item
        })
        return {...state, participant: updateParticipant}
        case "DELETE_PARTICIPANTS":
          const filterParticipant = state.participant.filter((item) => {
            return item.phone !== payload
          })
          return {...state, participant: filterParticipant}
      case "GET_USER_DATA":
          return{...state, userData: payload}
    default:
      return state;
  }
};

export default userReducers;
