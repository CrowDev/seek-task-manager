// Importante: Colocar los mocks antes de las importaciones
vi.mock("import.meta", () => ({
  env: {
    VITE_API_URL: "https://api.example.com/",
  },
}));

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useUpsertTask } from "./upsertTask";
import React from "react";
import { DashboardPageContext } from "@/contexts/dashboard/DashboardContext";

describe("useUpsertTask", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn((url, options) => {
      const response =
        options.method === "POST"
          ? { task_id: "123" }
          : { task_id: "321", modified_count: 1 };

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response),
      });
    });
  });

  const createWrapper = (contextValue) => {
    return ({ children }) => (
      <DashboardPageContext.Provider value={contextValue}>
        {children}
      </DashboardPageContext.Provider>
    );
  };

  it("should create a task successfully", async () => {
    const mockBody = {
      title: "New Task",
      description: "Description",
      status: "todo",
      priority: "high",
    };
    const createContextValue = {
      isCreatingTask: true,
      taskToEdit: null,
    };
    const wrapper = createWrapper(createContextValue);

    const { result } = renderHook(() => useUpsertTask(mockBody), { wrapper });

    await act(async () => {
      await result.current.createTask();
    });

    expect(fetch).toHaveBeenCalled();
    const [url, options] = fetch.mock.calls[0];
    expect(url).toContain("/create");
  });

  it("should update a task successfully", async () => {
    const taskId = "321";
    const mockBody = {
      title: "Updated Task",
      description: "Updated Description",
      priority: "medium",
      status: "blocked",
    };
    const editContextValue = {
      isCreatingTask: false,
      taskToEdit: { _id: taskId, title: "Original Task" },
    };
    const wrapper = createWrapper(editContextValue);

    const { result } = renderHook(() => useUpsertTask(mockBody), { wrapper });

    await act(async () => {
      await result.current.createTask();
    });

    expect(fetch).toHaveBeenCalled();
    const [url, options] = fetch.mock.calls[0];
    expect(url).toContain(`/edit/${taskId}`);
  });
});
