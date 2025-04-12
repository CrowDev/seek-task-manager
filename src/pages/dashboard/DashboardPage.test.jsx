import { afterEach, describe, it, expect, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import DashboardPage from "@/pages/dashboard/page";
import * as useBreakpoint from "@/hooks/useBreakpoint";

describe("DashboardPage", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should render", () => {
    render(<DashboardPage />);
  });

  it("should render the correct title", () => {
    render(<DashboardPage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Dev Team Task Board");
  });

  it("should render Board component", () => {
    vi.spyOn(useBreakpoint, "useBreakpoint").mockReturnValue("desktop");
    render(<DashboardPage />);
    const button = screen.queryByRole("button", { name: "To Do" });
    expect(button).toBeNull();
  });

  it("should render Tab Tasks component", () => {
    vi.spyOn(useBreakpoint, "useBreakpoint").mockReturnValue("tablet");
    render(<DashboardPage />);
    const button = screen.getByRole("button", { name: "To Do" });
    expect(button).toBeDefined();
  });
});
