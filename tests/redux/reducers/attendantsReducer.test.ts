import { State } from "../../../src/interface/interface";
import { beforeEach, describe, expect, it } from "vitest";
import attendantsReducer from "../../../src/redux/reducers/attendantsReducer";
import { addAttendant } from "../../../src/redux/actions/attendantActions";
import {
  Attendant,
  SelectedAttendant,
} from "../../../src/interface/AttendantInterface";
import { LoadingInterface } from "../../../src/interface/LoadingInterface";

describe("attendantsReducer", () => {
  let state: State;

  beforeEach(() => {
    state = {
      attendants: [],
      messages: [],
      selectAttendant: {} as SelectedAttendant,
      loading: {} as LoadingInterface,
    };
  });

  describe("when the action.type is ADD_ATTENDANT", () => {
    it("add a new attendant to the state", () => {
      const newAttendant: Attendant = {
        id: 1,
        name: "Vitor",
      };

      expect(
        attendantsReducer(state.attendants, addAttendant(newAttendant))
      ).toEqual([newAttendant]);
    });
  });

  describe("when the action.type is not defined", () => {
    it("return the state", () => {
      expect(
        attendantsReducer(state.attendants, {
          type: "undefined",
          payload: { id: 1, name: "foo" },
        })
      ).toEqual(state.attendants);
    });
  });
});
