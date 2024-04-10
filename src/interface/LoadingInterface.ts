export interface LoadingInterface {
  loading: boolean;
  error: string;
}

export interface ActionLoading {
  type: string;
  payload: LoadingInterface;
}

export type LoadingActions =
  | { type: "LOADING"; payload: LoadingInterface }
  | { type: "FINISHED_LOADING"; payload: LoadingInterface }
  | { type: "ERROR_LOADING"; payload: LoadingInterface };
