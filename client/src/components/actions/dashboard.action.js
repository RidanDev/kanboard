import { GET_USER_PROCESS, GET_USER_PROCESS_ERROR, GET_USER_PROCESS_START } from "./action-types";

export const getUserProcess = () => ({
  type: GET_USER_PROCESS,
  payload: [{ title: "todo", tasks: [{ task: "sing" }] }, { title: "doing", tasks: [{ task: "dancing" }] }]
});
