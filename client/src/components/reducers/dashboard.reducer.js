import { GET_USER_PROCESS, GET_USER_PROCESS_ERROR, GET_USER_PROCESS_START } from "../actions/action-types";

const initialState = {
  processes: [],
  loading: false,
  error: ""
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROCESS:
      console.log(action);
      return {
        ...state,
        processes: [...state.processes, ...action.payload],
        loading: false
      };
    case GET_USER_PROCESS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        processes: []
      };
    case GET_USER_PROCESS_START:
      return {
        ...state,
        loading: true,
        error: ""
      };
    default:
      return state;
  }
};

export default dashboard;
