/* eslint-disable @typescript-eslint/no-unused-vars */
import "@testing-library/jest-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { withExtraArgument } from "redux-thunk";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../../src/App";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import attendantsReducer from "../../src/redux/reducers/attendantsReducer";
import selectAttendantReducer from "../../src/redux/reducers/selectAttendantReducer";
import loadingReducer from "../../src/redux/reducers/loadingReducer";
import messageReducer from "../../src/redux/reducers/messageReducer";
import { postMessage, postAttendant } from "../../src/api/apiCalls";

const customRender = (message, attendant) => {
  const fakeDependencies = {
    fetchAttendants: vi.fn().mockResolvedValue([attendant]),
    fetchMessages: vi.fn().mockResolvedValue([message]),
  };

  const reducer = combineReducers({
    attendants: attendantsReducer,
    selectAttendant: selectAttendantReducer,
    loading: loadingReducer,
    messages: messageReducer,
  });

  const store = legacy_createStore(
    reducer,
    applyMiddleware(withExtraArgument(fakeDependencies))
  );

  return render(
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  );
};

describe("integration test", () => {
  const user = userEvent.setup();
  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

  beforeEach(() => {
    vi.mock("../../src/api/apiCalls", () => ({
      postAttendant: vi.fn().mockImplementation((name) => {
        return Promise.resolve({
          id: Math.floor(Math.random() * 100),
          name: name,
        });
      }),
      postMessage: vi.fn().mockImplementation((attendantId, text) => {
        return Promise.resolve({
          id: Math.floor(Math.random() * 100),
          attendantId: attendantId,
          sentAt: new Date(Date.now()).toISOString(),
          text: text,
        });
      }),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("initial render of the App", () => {
    const message = {};
    const attendant = {};
    customRender(message, attendant);

    const title = screen.getByRole("heading", {
      name: /the chatsubo/i,
    });
    const messageInput = screen.getByPlaceholderText(/type here\.\.\./i);
    const addButton = screen.getByRole("button", {
      name: /add new attendant/i,
    });
    const sendButton = screen.getByRole("button", {
      name: /send/i,
    });
    const attendants = screen.getByRole("combobox");

    expect.soft(title).toBeInTheDocument();
    expect.soft(messageInput).toBeInTheDocument();
    expect.soft(addButton).toBeInTheDocument();
    expect.soft(sendButton).toBeInTheDocument();
    expect.soft(attendants).toBeInTheDocument();

    expect.soft(sendButton).toBeDisabled();
    expect.soft(messageInput).toHaveValue("");
    expect.soft(attendants).toBeEmptyDOMElement();
  });

  describe("when adding new attendants", () => {
    it("renders a new form", async () => {
      const message = {};
      const attendant = {};
      customRender(message, attendant);

      const addButton = screen.getByRole("button", {
        name: /add new attendant/i,
      });

      await user.click(addButton);

      const title = screen.getByRole("heading", {
        name: /Add a new Attendant/i,
      });
      const attendantsInput = screen.getByPlaceholderText(
        /type the new attendant name\.\.\./i
      );
      const addAttendantButton = screen.getByRole("button", {
        name: /add attendant/i,
      });
      const cancelButton = screen.getByRole("button", {
        name: /cancel/i,
      });

      expect.soft(title).toBeInTheDocument();
      expect.soft(attendantsInput).toBeInTheDocument();
      expect.soft(addAttendantButton).toBeInTheDocument();
      expect.soft(cancelButton).toBeInTheDocument();
    });

    it("add a new value to the attendant and set it as its value", async () => {
      const message = {
        sentAt: new Date(Date.now()).toISOString(),
        text: "This is a message",
      };
      const attendant = {
        id: 1,
        name: "Juberto",
      };

      customRender(message, attendant);
      const attendantName = "Vitor";

      const addButton = screen.getByRole("button", {
        name: /add new attendant/i,
      });
      const attendants = screen.getByRole("combobox");

      await user.click(addButton);

      const attendantsInput = screen.getByPlaceholderText(
        /type the new attendant name\.\.\./i
      );
      const addAttendant = screen.getByRole("button", {
        name: /add attendant/i,
      });

      await user.type(attendantsInput, attendantName);
      await user.click(
        screen.getByRole("button", {
          name: /add attendant/i,
        })
      );

      expect.soft(attendants).not.toBeEmptyDOMElement();
      expect.soft(attendants).not.toHaveValue(attendant.id);

      expect.soft(attendantsInput).not.toBeInTheDocument();
      expect.soft(addAttendant).not.toBeInTheDocument();
    });
  });

  describe("when there's already an attendant with the same name", () => {
    it("shows an alert", async () => {
      const attendantName = "Juberto";
      const message = {
        sentAt: new Date(Date.now()).toISOString(),
        text: "This is a message",
      };
      const attendant = {
        id: 1,
        name: attendantName,
      };

      customRender(message, attendant);

      const addButton = screen.getByRole("button", {
        name: /add new attendant/i,
      });

      await user.click(addButton);

      const attendantsInput = screen.getByPlaceholderText(
        /type the new attendant name\.\.\./i
      );
      const addAttendant = screen.getByRole("button", {
        name: /add attendant/i,
      });

      await user.type(attendantsInput, attendantName);
      await user.click(addAttendant);

      expect(alertMock).toHaveBeenCalledWith("Attendant name already taken!");
      expect(alertMock).toHaveBeenCalledOnce();
    });
  });

  describe("when you want to send a message to the chat", () => {
    it("only allows to send if there's already three or more attendants", async () => {
      const messages = {
        sentAt: new Date(Date.now()).toISOString(),
        text: "This is a message",
      };
      const attendant = {
        id: 1,
        name: "Juberto",
      };

      customRender(messages, attendant);

      const attendantName1 = "Vitor";
      const attendantName2 = "Lucas";
      const attendantName3 = "Julio";

      const message = "This is a new message";

      const messageInput = screen.getByPlaceholderText(/type here\.\.\./i);
      const sendButton = screen.getByRole("button", {
        name: /send/i,
      });
      const addButton = screen.getByRole("button", {
        name: /add new attendant/i,
      });

      await user.click(addButton);

      expect.soft(sendButton).toBeDisabled();

      await user.type(
        screen.getByPlaceholderText(/type the new attendant name\.\.\./i),
        attendantName1
      );
      await user.click(
        screen.getByRole("button", {
          name: /add attendant/i,
        })
      );
      await user.click(addButton);
      await user.type(
        screen.getByPlaceholderText(/type the new attendant name\.\.\./i),
        attendantName2
      );
      await user.click(
        screen.getByRole("button", {
          name: /add attendant/i,
        })
      );

      await user.click(addButton);
      await user.type(
        screen.getByPlaceholderText(/type the new attendant name\.\.\./i),
        attendantName3
      );
      await user.click(
        screen.getByRole("button", {
          name: /add attendant/i,
        })
      );

      expect.soft(sendButton).not.toBeDisabled();

      await user.type(messageInput, message);
      await user.click(sendButton);

      const newMessageRender = screen.getAllByRole("message");
      const newMessageSender = screen.getByText(attendantName3);

      const foundMessage = newMessageRender.find(
        (msg) => msg.textContent === message
      );

      expect.soft(foundMessage).toBeInTheDocument();

      expect.soft(newMessageSender).toBeInTheDocument();
    });
  });
});
