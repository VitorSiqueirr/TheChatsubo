import { SelectedAttendant } from "../../../src/interface/AttendantInterface";
import { Message } from "../../../src/interface/MessageInterface";
import { State } from "./../../../src/interface/interface";
import { beforeEach, describe, expect, it } from "vitest";
import messageReducer from "../../../src/redux/reducers/messageReducer";
import { addMessage } from "../../../src/redux/actions/messageActions";
import { LoadingInterface } from "../../../src/interface/LoadingInterface";

describe("messageReducer", () => {
  let state: State;

  beforeEach(() => {
    state = {
      attendants: [],
      messages: [],
      selectAttendant: {} as SelectedAttendant,
      loading: {} as LoadingInterface,
    };
  });

  describe("when the action.type is ADD_MESSAGE", () => {
    it("add a new message to the state", () => {
      const newMessage: Message = {
        id: 1,
        attendantId: 1,
        sentAt: new Date(Date.now()).toISOString(),
        text: "This is a message",
      };

      expect(messageReducer(state.messages, addMessage(newMessage))).toEqual([
        newMessage,
      ]);
    });
  });

  describe("when the action.type is not defined", () => {
    it("return the state", () => {
      expect(
        messageReducer(state.messages, {
          type: "null",
          payload: {
            id: 1,
            attendantId: 1,
            sentAt: new Date(Date.now()).toISOString(),
            text: "This is a message",
          },
        })
      ).toEqual(state.attendants);
    });
  });
});
