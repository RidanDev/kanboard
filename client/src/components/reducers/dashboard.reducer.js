import { GET_USER_PROCESS, GET_USER_PROCESS_ERROR, GET_USER_PROCESS_START, CREATE_PROCESS, CREATE_PROCESS_START, CREATE_PROCESS_ERROR, CREATE_TASK, CREATE_TASK_ERROR, CREATE_TASK_START, DELETE_PROCESS, DELETE_PROCESS_START, DELETE_PROCESS_ERROR, EDIT_PROCESS, EDIT_PROCESS_START, EDIT_PROCESS_ERROR, DELETE_TASK, DELETE_TASK_START, DELETE_TASK_ERROR } from "../actions/action-types";

const initialState = {
  processes: [],
  loading: false,
  error: "",
  message: ""
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROCESS:
      return {
        ...state,
        processes: [...action.payload],
        loading: false,
        error: "",
        message: ""
      };
    case CREATE_PROCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: ""
      };
    case CREATE_TASK:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: ""
      };
    case GET_USER_PROCESS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        processes: [],
        message: ""
      };
    case CREATE_PROCESS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        message: ""
      };
    case CREATE_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        message: ""
      };
    case GET_USER_PROCESS_START:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload
      };
    case CREATE_PROCESS_START:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload
      };
    case CREATE_TASK_START:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload
      };
    case DELETE_PROCESS_START:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload
      };
    case DELETE_PROCESS:
      return {
        ...state,
        loading: false,
        error: "",
        message: action.payload
      };
    case DELETE_PROCESS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: ""
      };
    case DELETE_TASK_START:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload
      };
    case DELETE_TASK:
      return {
        ...state,
        loading: false,
        error: "",
        message: action.payload
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: ""
      };
    case EDIT_PROCESS_START:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload
      };
    case EDIT_PROCESS:
      return {
        ...state,
        loading: false,
        error: "",
        message: action.payload
      };
    case EDIT_PROCESS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: ""
      };
    default:
      return state;
  }
};

export default dashboard;
