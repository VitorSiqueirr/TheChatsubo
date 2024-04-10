import { ActionAttendant } from "../../interface/AttendantInterface";
import { initialState } from "../initialState";

export default function attendantsReducer(
  state = initialState.attendants,
  action: ActionAttendant
) {
  switch (action.type) {
    case "ADD_ATTENDANT":
      return [...state, { id: action.payload.id, name: action.payload.name }];
    default:
      return state;
  }
}
