import { fetchMessagesAction } from "./../../../src/redux/thunks/fetchMessageAction";
import { describe, expect, it, vi } from "vitest";
import setupMockStore from "redux-mock-store";
import { withExtraArgument } from "redux-thunk";

describe("fetchAttendant", () => {
  const errorLoading = {
    error: "Error while loading messages",
    loading: false,
  };
  const loading = { error: "", loading: true };
  const finishedLoading = { error: "", loading: false };

  describe("when the fetch is resolved successfully", () => {
    it("dispatches LOADING, ADD_ATTENDANT and FINISHED_LOADING", async () => {
      const message = {
        id: 1,
        attendantId: 1,
        sentAt: new Date(Date.now()).toISOString(),
        text: "This is a message",
      };
      const fakeDependencies = {
        fetchMessages: vi.fn().mockResolvedValue([message]),
      };

      const createMockStore = setupMockStore([
        withExtraArgument(fakeDependencies),
      ]);

      const store = createMockStore();

      await store.dispatch(fetchMessagesAction());

      expect(store.getActions()).toEqual([
        { type: "LOADING", payload: loading },
        { type: "ADD_MESSAGE", payload: message },
        { type: "FINISHED_LOADING", payload: finishedLoading },
      ]);

      expect(fakeDependencies.fetchMessages).toHaveBeenCalledOnce();
    });
  });

  describe("when the fetch returns an error", () => {
    it("dispatches LOADING and ERROR_LOADING", async () => {
      const fakeDependencies = {
        fetchMessages: vi.fn().mockRejectedValue(new Error("fetch error")),
      };

      const createMockStore = setupMockStore([
        withExtraArgument(fakeDependencies),
      ]);

      const store = createMockStore();

      await store.dispatch(fetchMessagesAction());

      expect(store.getActions()).toEqual([
        { type: "LOADING", payload: loading },
        {
          type: "ERROR_LOADING",
          payload: errorLoading,
        },
      ]);

      expect(fakeDependencies.fetchMessages).toHaveBeenCalledOnce();
    });
  });
});
