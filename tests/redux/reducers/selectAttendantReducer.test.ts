import { State } from "../../../src/interface/interface";
import { beforeEach, describe, expect, it } from "vitest";
import selectAttendantReducer from "../../../src/redux/reducers/selectAttendantReducer";
import { selectAttendant } from "../../../src/redux/actions/selectAttendantActions";
import { SelectedAttendant } from "../../../src/interface/AttendantInterface";
import { LoadingInterface } from "../../../src/interface/LoadingInterface";

describe("selectAttendantsReducer", () => {
  let state: State;

  beforeEach(() => {
    state = {
      attendants: [],
      messages: [],
      selectAttendant: {} as SelectedAttendant,
      loading: {} as LoadingInterface,
    };
  });

  describe("when the action.type is SELECT_ATTENDANT", () => {
    it("change the attendant state", () => {
      const newAttendant: SelectedAttendant = {
        id: 1,
      };

      expect(
        selectAttendantReducer(
          state.selectAttendant,
          selectAttendant(newAttendant)
        )
      ).toEqual(newAttendant);
    });
  });

  describe("when the action.type is not defined", () => {
    it("return the state", () => {
      expect(
        selectAttendantReducer(state.selectAttendant, {
          type: "undefined",
          payload: { id: 1 },
        })
      ).toEqual(state.selectAttendant);
    });
  });
});
