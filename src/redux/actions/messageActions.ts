import { Message, MessageActions } from "../../interface/MessageInterface";

export function addMessage(message: Message): MessageActions {
  return { type: "ADD_MESSAGE", payload: message };
}
