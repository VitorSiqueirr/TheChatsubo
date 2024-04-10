import { describe, expect, it } from "vitest";
import { getSelectAttendantId } from "../../../src/redux/selectors/selectedAttendantSelector";
import { State } from "../../../src/interface/interface";
import { LoadingInterface } from "../../../src/interface/LoadingInterface";

describe("selectedAttendantSelector", () => {
  it("returns the name of the selected attendant", () => {
    const attendantId = 1;
    const state: State = {
      attendants: [],
      selectAttendant: { id: attendantId },
      loading: {} as LoadingInterface,
      messages: [],
    };

    expect(getSelectAttendantId(state)).toEqual(attendantId);
  });
});
