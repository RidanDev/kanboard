import axios from "axios";
import { API_URL } from "../../config";
import { GET_USER_PROCESS, GET_USER_PROCESS_ERROR, GET_USER_PROCESS_START, CREATE_PROCESS, CREATE_PROCESS_START, CREATE_PROCESS_ERROR, CREATE_TASK, CREATE_TASK_ERROR, CREATE_TASK_START } from "./action-types";

const getUserProcessStart = () => ({
  type: GET_USER_PROCESS_START,
  payload: "Getting user's processes..."
});

const startProcessCreation = () => ({
  type: CREATE_PROCESS_START,
  payload: "Process creation started..."
});

const startTaskCreation = () => ({
  type: CREATE_TASK_START,
  payload: "Task creation started..."
});

export const getUserProcesses = () => dispatch => {
  dispatch(getUserProcessStart());

  axios
    .get(`${API_URL}/user/processes`, { withCredentials: true })
    .then(res => {
      if (res.data.error) {
        throw new Error(res.data.error);
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

export const createUserProcess = process => dispatch => {
  dispatch(startProcessCreation());

  axios({
    method: "post",
    url: `${API_URL}/process/create`,
    data: process,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }

      dispatch({
        type: CREATE_PROCESS,
        payload: res.data.message
      });

      dispatch(getUserProcessStart());

      axios
        .get(`${API_URL}/user/processes`, { withCredentials: true })
        .then(res => {
          if (res.data.error) {
            throw new Error(res.data.error);
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
    })
    .catch(err =>
      dispatch({
        type: CREATE_PROCESS_ERROR,
        payload: err
      })
    );
};

export const createUserTask = (task, processId) => dispatch => {
  dispatch(startTaskCreation());

  axios({
    method: "post",
    url: `${API_URL}/task/create/${processId}`,
    data: task,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error) {
        throw new Error(res.data.error);
      }

      dispatch({
        type: CREATE_TASK,
        payload: res.data.message
      });

      dispatch(getUserProcessStart());

      axios
        .get(`${API_URL}/user/processes`, { withCredentials: true })
        .then(res => {
          if (res.data.error) {
            throw new Error(res.data.error);
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
    })
    .catch(err =>
      dispatch({
        type: CREATE_TASK_ERROR,
        payload: err
      })
    );
};
