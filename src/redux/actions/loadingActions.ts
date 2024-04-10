import {
  LoadingActions,
  LoadingInterface,
} from "../../interface/LoadingInterface";

export function addLoading(): LoadingActions {
  return { type: "LOADING", payload: { loading: true, error: "" } };
}

export function finishedLoading(): LoadingActions {
  return { type: "FINISHED_LOADING", payload: { loading: false, error: "" } };
}

export function errorLoading(data: LoadingInterface): LoadingActions {
  return { type: "ERROR_LOADING", payload: data };
}
