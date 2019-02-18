import { LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_START } from "../actions/action-types";

const initialState = {
  email: "",
  password: "",
  loading: false,
  error: "",
  message: ""
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: ""
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: ""
      };
    case LOGIN_USER_START:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload
      };
    default:
      return state;
  }
};

export default login;
