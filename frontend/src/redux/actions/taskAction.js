import axios from "axios";
import {
  TASK_LOAD_FAIL,
  TASK_LOAD_REQUEST,
  TASK_LOAD_SUCCESS,
  TASK_SINGLE_EDIT_FAIL,
  TASK_SINGLE_EDIT_REQUEST,
  TASK_SINGLE_EDIT_SUCCESS,
  TASK_SINGLE_FAIL,
  TASK_SINGLE_REQUEST,
  TASK_SINGLE_SUCCESS,
} from "../constants/taskConstants";
import { toast } from "react-toastify";

//LOAD ALL TASKS
export const taskLoadAction =
  (pageNumber, keyword = "", checked, priority = "") =>
    async (dispatch) => {
      const priorityFilter =
        priority === "todos" || priority === "" ? "" : priority;
      dispatch({ type: TASK_LOAD_REQUEST });
      try {
        const { data } = await axios.get(
          `/api/tasks/all/?pageNumber=${pageNumber}&keyword=${keyword}&qstage=${checked.join(
            ","
          )}&priority=${priorityFilter}`
        );

        dispatch({
          type: TASK_LOAD_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: TASK_LOAD_FAIL,
          payload: error.response.data.error,
        });
      }
    };

// ahow single task
export const singleTask = (id) => async (dispatch) => {
  dispatch({ type: TASK_SINGLE_REQUEST });
  try {
    const { data } = await axios.get(`/api/task/${id}`);

    dispatch({
      type: TASK_SINGLE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: TASK_SINGLE_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

// edit task
export const singleTaskEdit = (task) => async (dispatch) => {
  dispatch({ type: TASK_SINGLE_EDIT_REQUEST });
  try {
    const { data } = await axios.put(`/api/admin/task/edit/${task._id}`, task);

    dispatch({
      type: TASK_SINGLE_EDIT_SUCCESS,
      payload: data,
    });
    toast.success("alterada com sucesso!");
  } catch (error) {
    dispatch({
      type: TASK_SINGLE_EDIT_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};
