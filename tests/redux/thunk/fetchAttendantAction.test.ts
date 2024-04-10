import { fetchAttendantsAction } from "./../../../src/redux/thunks/fetchAttendantAction";
import { describe, expect, it, vi } from "vitest";
import setupMockStore from "redux-mock-store";
import { withExtraArgument } from "redux-thunk";

describe("fetchAttendant", () => {
  const errorLoading = {
    error: "Error while loading attendants",
    loading: false,
  };
  const loading = { error: "", loading: true };
  const finishedLoading = { error: "", loading: false };

  describe("when the fetch is resolved successfully", () => {
    it("dispatches LOADING, ADD_ATTENDANT and FINISHED_LOADING", async () => {
      const attendant = { id: 1, name: "Vitor" };
      const fakeDependencies = {
        fetchAttendants: vi.fn().mockResolvedValue([attendant]),
      };

      const createMockStore = setupMockStore([
        withExtraArgument(fakeDependencies),
      ]);

      const store = createMockStore();

      await store.dispatch(fetchAttendantsAction());

      expect(store.getActions()).toEqual([
        { type: "LOADING", payload: loading },
        { type: "ADD_ATTENDANT", payload: attendant },
        { type: "FINISHED_LOADING", payload: finishedLoading },
      ]);

      expect(fakeDependencies.fetchAttendants).toHaveBeenCalledOnce();
    });
  });

  describe("when the fetch returns an error", () => {
    it("dispatches LOADING and ERROR_LOADING", async () => {
      const fakeDependencies = {
        fetchAttendants: vi.fn().mockRejectedValue(new Error("fetch error")),
      };

      const createMockStore = setupMockStore([
        withExtraArgument(fakeDependencies),
      ]);

      const store = createMockStore();

      await store.dispatch(fetchAttendantsAction());

      expect(store.getActions()).toEqual([
        { type: "LOADING", payload: loading },
        {
          type: "ERROR_LOADING",
          payload: errorLoading,
        },
      ]);

      expect(fakeDependencies.fetchAttendants).toHaveBeenCalledOnce();
    });
  });
});
