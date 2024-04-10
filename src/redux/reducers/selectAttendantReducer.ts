import { ActionSelectAttendant } from "../../interface/AttendantInterface";
import { initialState } from "../initialState";

export default function selectAttendantReducer(
  state = initialState.selectAttendant,
  action: ActionSelectAttendant
) {
  switch (action.type) {
    case "SELECT_ATTENDANT":
      return { id: action.payload.id };
    default:
      return state;
  }
}
