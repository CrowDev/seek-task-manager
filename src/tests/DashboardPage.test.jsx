import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardPage from "@/pages/dashboard/page";

describe("DashboardPage", () => {
  it("renders without crashing", () => {
    render(<DashboardPage />);
    screen.debug();
  });
});
