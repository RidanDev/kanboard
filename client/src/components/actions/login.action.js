import axios from "axios";
import { API_URL } from "../../config";
import { LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_START } from "./action-types";

const loginStart = () => ({
  type: LOGIN_USER_START,
  payload: "login started"
});

export const loginUser = details => dispatch => {
  dispatch(loginStart());

  axios({
    method: "post",
    url: `${API_URL}/user/login`,
    data: details,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error) {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: res.data.error
        });
      } else {
        dispatch({
          type: LOGIN_USER,
          payload: res.data.message
        });
      }
    })
    .catch(err => {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: err
      });
    });
};
