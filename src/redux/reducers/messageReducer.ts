import { ActionMessage } from "../../interface/MessageInterface";
import { initialState } from "../initialState";

export default function messageReducer(
  state = initialState.messages,
  action: ActionMessage
) {
  switch (action.type) {
    case "ADD_MESSAGE":
      return [
        ...state,
        {
          id: action.payload.id,
          attendantId: action.payload.attendantId,
          sentAt: action.payload.sentAt,
          text: action.payload.text,
        },
      ];
    default:
      return state;
  }
}
