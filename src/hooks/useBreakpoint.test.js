import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { useBreakpoint } from "./useBreakpoint";
import { breakpoints } from "@/utils/constants";

describe("useBreakpoint", () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    window.addEventListener = vi.fn();
    window.removeEventListener = vi.fn();
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    vi.restoreAllMocks();
  });

  it('should return "desktop" when window width is >= desktop breakpoint', () => {
    window.innerWidth = breakpoints.desktop;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe("desktop");
  });

  it('should return "tablet" when window width is < desktop breakpoint', () => {
    window.innerWidth = breakpoints.desktop - 1;
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe("tablet");
  });

  it("should add resize event listener on mount", () => {
    renderHook(() => useBreakpoint());
    expect(window.addEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });

  it("should remove resize event listener on unmount", () => {
    const { unmount } = renderHook(() => useBreakpoint());
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });

  it("should update breakpoint when window is resized", () => {
    window.innerWidth = breakpoints.desktop - 1;

    let resizeHandler;
    window.addEventListener = vi.fn((event, handler) => {
      if (event === "resize") {
        resizeHandler = handler;
      }
    });

    const { result } = renderHook(() => useBreakpoint());

    expect(result.current).toBe("tablet");

    window.innerWidth = breakpoints.desktop;

    act(() => {
      resizeHandler();
    });

    expect(result.current).toBe("desktop");
  });
});
