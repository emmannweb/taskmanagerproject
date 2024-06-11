import {
  TASK_LOAD_FAIL,
  TASK_LOAD_REQUEST,
  TASK_LOAD_RESET,
  TASK_LOAD_SUCCESS,
  TASK_SINGLE_FAIL,
  TASK_SINGLE_REQUEST,
  TASK_SINGLE_RESET,
  TASK_SINGLE_SUCCESS,
  TASK_SINGLE_EDIT_FAIL,
  TASK_SINGLE_EDIT_REQUEST,
  TASK_SINGLE_EDIT_RESET,
  TASK_SINGLE_EDIT_SUCCESS,
} from "../constants/taskConstants";

export const loadTaskReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_LOAD_REQUEST:
      return { loading: true };
    case TASK_LOAD_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        stages: action.payload.stages,
        tasks: action.payload.tasks,
        setUniquePriority: action.payload.setUniquePriority,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
        countStat: action.payload.countStat,
      };
    case TASK_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TASK_LOAD_RESET:
      return {};
    default:
      return state;
  }
};

export const loadSingleTaskReducer = (state = { task: {} }, action) => {
  switch (action.type) {
    case TASK_SINGLE_REQUEST:
      return { loading: true };
    case TASK_SINGLE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        task: action.payload.task,
      };
    case TASK_SINGLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TASK_SINGLE_RESET:
      return {};
    default:
      return state;
  }
};

export const editSingleTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case TASK_SINGLE_EDIT_REQUEST:
      return { loading: true };
    case TASK_SINGLE_EDIT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        task: action.payload.task,
      };
    case TASK_SINGLE_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TASK_SINGLE_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

