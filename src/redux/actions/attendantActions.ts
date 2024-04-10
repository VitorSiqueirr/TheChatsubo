import {
  Attendant,
  AttendantActions,
} from "../../interface/AttendantInterface";

export function addAttendant(attendant: Attendant): AttendantActions {
  return { type: "ADD_ATTENDANT", payload: attendant };
}
