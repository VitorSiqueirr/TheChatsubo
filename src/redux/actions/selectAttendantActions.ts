import {
  SelectAttendantActions,
  SelectedAttendant,
} from "../../interface/AttendantInterface";

export function selectAttendant(
  attendant: SelectedAttendant
): SelectAttendantActions {
  return { type: "SELECT_ATTENDANT", payload: attendant };
}
