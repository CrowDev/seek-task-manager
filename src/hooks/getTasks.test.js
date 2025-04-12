import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useTasks } from "./getTasks"; // Adjust import path as needed

describe("useTasks", () => {
  const originalFetch = global.fetch;

  const mockTasks = [
    { id: "_1", title: "Task 1", status: "todo", priority: "high" },
    { id: "_2", title: "Task 2", status: "in-progress", priority: "medium" },
  ];

  beforeEach(() => {
    vi.resetAllMocks();

    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTasks),
      }),
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should fetch tasks on initial render", async () => {
    const { result } = renderHook(() => useTasks());

    expect(result.current.loading).toBe(true);
    expect(result.current.tasks).toEqual([]);
    expect(result.current.error).toBeNull();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.tasks).toEqual(mockTasks);
    expect(result.current.error).toBeNull();

    expect(fetch).toHaveBeenCalled();
  });

  it("should refetch tasks when refetch is called", async () => {
    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fetch.mockClear();

    act(() => {
      result.current.refetch();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.current.tasks).toEqual(mockTasks);
    expect(result.current.loading).toBe(false);
  });

  it("should handle fetch error", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      }),
    );

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Failed to fetch tasks");
    expect(result.current.tasks).toEqual([]);
  });
});
