import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDeleteTask } from "./deleteTask";
import { DashboardPageContext } from "@/contexts/dashboard/DashboardContext";

describe("useDeleteTask", () => {
  const originalFetch = global.fetch;

  const mockTaskId = "123";
  const mockDeleteResponse = {
    task_id: "123",
  };

  beforeEach(() => {
    vi.resetAllMocks();

    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockDeleteResponse),
      }),
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  const createWrapper = (taskToEdit) => {
    const contextValue = { taskToEdit };

    return ({ children }) => (
      <DashboardPageContext.Provider value={contextValue}>
        {children}
      </DashboardPageContext.Provider>
    );
  };

  it("should delete a task successfully", async () => {
    const wrapper = createWrapper({ _id: mockTaskId, title: "Task to Delete" });

    const { result } = renderHook(() => useDeleteTask(), { wrapper });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await act(async () => {
      await result.current.deleteTask();
    });

    expect(fetch).toHaveBeenCalled();
    const [url, options] = fetch.mock.calls[0];
    expect(url).toContain(`/delete/${mockTaskId}`);
    expect(options.method).toBe("DELETE");
    expect(options.headers).toEqual({
      "Content-Type": "application/json",
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual(mockDeleteResponse);
  });

  it("should handle API error", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: "Not Found",
      }),
    );

    const wrapper = createWrapper({ _id: mockTaskId });

    const { result } = renderHook(() => useDeleteTask(), { wrapper });

    await act(async () => {
      await result.current.deleteTask();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Failed to delete task");
    expect(result.current.data).toBeNull();
  });
});
