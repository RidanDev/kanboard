import { GET_USER_PROCESS, GET_USER_PROCESS_ERROR, GET_USER_PROCESS_START } from "../actions/action-types";

const initialState = {
  processes: [],
  loading: false
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROCESS:
      return {
        ...state,
        processes: [...processes, ...action.payload]
      };
    default:
      return state;
  }
};

export default dashboard;
