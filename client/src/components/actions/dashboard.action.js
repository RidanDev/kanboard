import axios from "axios";
import { API_URL } from "../../config";
import { GET_USER_PROCESS, GET_USER_PROCESS_ERROR, GET_USER_PROCESS_START } from "./action-types";

const getUserProcessStart = () => ({
  type: GET_USER_PROCESS_START,
  payload: "Getting user's processes"
});

export const getUserProcesses = () => dispatch => {
  dispatch(getUserProcessStart);

  axios
    .get(`${API_URL}/user/processes`, { withCredentials: true })
    .then(res => {
      console.log(res);
      if (res.data.error) {
        return dispatch({
          type: GET_USER_PROCESS_ERROR,
          payload: res.data.error
        });
      }

      dispatch({
        type: GET_USER_PROCESS,
        payload: res.data.processes
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USER_PROCESS_ERROR,
        payload: err
      });
    });
};
