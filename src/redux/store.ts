import { fetchAttendants, fetchMessages } from "./../api/apiCalls";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import attendantsReducer from "./reducers/attendantsReducer";
import selectAttendantReducer from "./reducers/selectAttendantReducer";
import messageReducer from "./reducers/messageReducer";
import { withExtraArgument } from "redux-thunk";
import loadingReducer from "./reducers/loadingReducer";
import { RootAction, State } from "../interface/interface";

const reducer = combineReducers({
  attendants: attendantsReducer,
  selectAttendant: selectAttendantReducer,
  loading: loadingReducer,
  messages: messageReducer,
});

const dependencies = {
  fetchAttendants,
  fetchMessages,
};

export const store = legacy_createStore<State, RootAction>(
  reducer,
  applyMiddleware(withExtraArgument(dependencies))
);
