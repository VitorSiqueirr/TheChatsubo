import { SelectedAttendant } from "../../../src/interface/AttendantInterface";
import { getLoading } from "../../../src/redux/selectors/loadingSelector";
import { State } from "./../../../src/interface/interface";
import { describe, expect, it } from "vitest";

describe("selectedAttendantSelector", () => {
  it("returns the name of the selected attendant", () => {
    const loadingState = { loading: true, error: "" };

    const state: State = {
      attendants: [],
      selectAttendant: {} as SelectedAttendant,
      loading: loadingState,
      messages: [],
    };

    expect(getLoading(state)).toEqual(loadingState);
  });
});
