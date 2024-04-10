import { ActionLoading } from "../../interface/LoadingInterface";
import { initialState } from "../initialState";

export default function loadingReducer(
  state = initialState.loading,
  action: ActionLoading
) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: action.payload.loading,
        error: action.payload.error,
      };

    case "FINISHED_LOADING":
      return {
        loading: action.payload.loading,
        error: action.payload.error,
      };

    case "ERROR_LOADING":
      return {
        loading: action.payload.loading,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
