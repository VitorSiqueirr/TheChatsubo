import { SelectedAttendant } from "../../../src/interface/AttendantInterface";
import { LoadingInterface } from "../../../src/interface/LoadingInterface";
import loadingReducer from "../../../src/redux/reducers/loadingReducer";
import { State } from "./../../../src/interface/interface";
import { beforeEach, describe, expect, it } from "vitest";
import {
  addLoading,
  errorLoading,
  finishedLoading,
} from "../../../src/redux/actions/loadingActions";

describe("loadingReducer", () => {
  let state: State;

  beforeEach(() => {
    state = {
      attendants: [],
      messages: [],
      selectAttendant: {} as SelectedAttendant,
      loading: {} as LoadingInterface,
    };
  });

  describe("when the action.type is LOADING", () => {
    it("add the loading state true and error equal to '' ", () => {
      expect(loadingReducer(state.loading, addLoading())).toEqual([
        { loading: true, error: "" },
      ]);
    });
  });

  describe("when the action.type is FINISHED_LOADING", () => {
    it("add the loading state false and error equal to '' ", () => {
      expect(loadingReducer(state.loading, finishedLoading())).toEqual([
        { loading: false, error: "" },
      ]);
    });
  });

  describe("when the action.type is ERROR_LOADING", () => {
    it("add the loading state false and error equal to the error ", () => {
      const loadingError: LoadingInterface = {
        loading: false,
        error: "This is the new error!",
      };

      expect(loadingReducer(state.loading, errorLoading(loadingError))).toEqual(
        [{ loading: false, error: "This is the new error!" }]
      );
    });
  });
});
