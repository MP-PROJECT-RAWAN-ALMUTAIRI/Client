import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import users from "./users";

const reducers = combineReducers({ users });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store(); 