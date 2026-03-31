import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils";
import Dashboard from "@/pages/Dashboard";

// -- Module mocks --

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => mockNavigate };
});

// -------------------------------------------------------

describe("Dashboard Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("user_id", "user-123");
    localStorage.setItem("user_name", "Alice Uwase");
  });

  it("renders stat cards and topics using BKT mastery", async () => {
    renderWithProviders(<Dashboard />);

    expect(screen.getByText(/loading dashboard/i)).toBeInTheDocument();

    // Greeting uses the first name from localStorage ("Alice Uwase" -> "Alice")
    await waitFor(() => {
      expect(
        screen.getByText(/hey alice/i, { exact: false }),
      ).toBeInTheDocument();
    });

    // Stat card labels (simplified — breakdown lives on Progress page)
    expect(
      screen.getAllByText(/improvement grade/i).length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(/overall mastery/i).length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^mastery$/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(/problems solved/i).length,
    ).toBeGreaterThanOrEqual(1);

    // Topics rendered from mockTopics
    expect(screen.getAllByText("Sequences").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Calculus").length).toBeGreaterThanOrEqual(1);
  });

  it('navigates to /practice on "Start Practice"', async () => {
    renderWithProviders(<Dashboard />);

    await waitFor(() => screen.getByText("Start Practice"));

    fireEvent.click(screen.getByText("Start Practice"));

    expect(mockNavigate).toHaveBeenCalledWith("/practice");
  });

  it("shows BKT mastery when interactions exist", async () => {
    // Seed some BKT history for sequences
    localStorage.setItem(
      "bkt_history_sequences",
      JSON.stringify([
        { timestamp: Date.now(), correct: true, hintsUsed: 0 },
        { timestamp: Date.now(), correct: true, hintsUsed: 0 },
      ]),
    );
    localStorage.setItem("bkt_mastery_sequences", "0.45");

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(
        screen.getByText(/hey alice/i, { exact: false }),
      ).toBeInTheDocument();
    });

    // The mastery for sequences should be displayed as 45%
    expect(screen.getByText("45%")).toBeInTheDocument();
  });
});
