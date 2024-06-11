import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { editSingleTaskReducer, loadSingleTaskReducer, loadTaskReducer } from "./reducers/taskReducer";
import {
  adminReducerDelete,
  allUserReducer,
  userReducerProfile,
  userReducerSignIn,
  userReducerSignUp,
} from "./reducers/userReducer";

//combine reducers
const reducer = combineReducers({
  loadTasks: loadTaskReducer,
  signIn: userReducerSignIn,
  signUp: userReducerSignUp,
  allUsers: allUserReducer,
  singleTask: loadSingleTaskReducer,
  profile: userReducerProfile,
  adminDeleteUser: adminReducerDelete,
  editSingleTask: editSingleTaskReducer,
});

//initial state
let initialState = {
  signIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
