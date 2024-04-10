import { describe, expect, it } from "vitest";
import { getAttendants } from "../../../src/redux/selectors/attendantsSelector";
import { State } from "../../../src/interface/interface";
import { Attendant } from "../../../src/interface/AttendantInterface";
import { LoadingInterface } from "../../../src/interface/LoadingInterface";

describe("attendantSelector", () => {
  it("returns the name of the selected attendant", () => {
    const attendant = { id: 1, name: "Vitor" };
    const state: State = {
      attendants: [attendant],
      selectAttendant: {} as Attendant,
      loading: {} as LoadingInterface,
      messages: [],
    };

    expect(getAttendants(state)).toEqual([attendant]);
  });
});
