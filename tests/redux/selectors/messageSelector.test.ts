import { getMessages } from "./../../../src/redux/selectors/messagesSelector";
import { describe, expect, it } from "vitest";
import { State } from "../../../src/interface/interface";
import { Attendant } from "../../../src/interface/AttendantInterface";
import { Message } from "../../../src/interface/MessageInterface";
import { LoadingInterface } from "../../../src/interface/LoadingInterface";

describe("messageSelector", () => {
  it("returns all the messages", () => {
    const message: Message = {
      id: 1,
      attendantId: 1,
      sentAt: new Date(Date.now()).toISOString(),
      text: "This is a message",
    };

    const state: State = {
      attendants: [],
      selectAttendant: {} as Attendant,
      loading: {} as LoadingInterface,
      messages: [message],
    };

    expect(getMessages(state)).toEqual([message]);
  });
});
