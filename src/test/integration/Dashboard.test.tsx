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

vi.mock("@/data/api.js", () => ({
  getTopics: vi.fn(),
  getUserMastery: vi.fn(),
  getUserStats: vi.fn(),
  getNextProblem: vi.fn(),
}));

import {
  getTopics,
  getUserMastery,
  getUserStats,
  getNextProblem,
} from "@/data/api.js";

// -------------------------------------------------------

const mockTopics = [
  {
    topic: "Sequences",
    skill_name: "geometric_progression",
    available_count: 3,
  },
  { topic: "Calculus", skill_name: "calculus_basics", available_count: 2 },
];

const mockMastery = [
  {
    skill_name: "geometric_progression",
    mastery_prob: 60,
    delta: 15,
    interactions_count: 5,
  },
  {
    skill_name: "calculus_basics",
    mastery_prob: 40,
    delta: 10,
    interactions_count: 3,
  },
];

describe("Dashboard Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("user_id", "user-123");
    localStorage.setItem("user_name", "Alice Uwase");
  });

  it("shows a loading indicator while data is being fetched", () => {
    // Promises that never resolve, so we stay in loading state
    (getTopics as ReturnType<typeof vi.fn>).mockReturnValue(
      new Promise(() => {}),
    );
    (getUserMastery as ReturnType<typeof vi.fn>).mockReturnValue(
      new Promise(() => {}),
    );
    (getUserStats as ReturnType<typeof vi.fn>).mockReturnValue(
      new Promise(() => {}),
    );

    renderWithProviders(<Dashboard />);

    expect(screen.getByText(/loading dashboard/i)).toBeInTheDocument();
  });

  it("shows an error message when no user_id is in localStorage", async () => {
    localStorage.removeItem("user_id");

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/no user found/i)).toBeInTheDocument();
    });
  });

  it("renders stat cards and topics after a successful API load", async () => {
    (getTopics as ReturnType<typeof vi.fn>).mockResolvedValue({
      topics: mockTopics,
    });
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: mockMastery,
    });
    (getUserStats as ReturnType<typeof vi.fn>).mockResolvedValue({
      problems_solved: 7,
    });

    renderWithProviders(<Dashboard />);

    // Greeting uses the first name from localStorage ("Alice Uwase" → "Alice")
    await waitFor(() => {
      expect(
        screen.getByText(/hey alice/i, { exact: false }),
      ).toBeInTheDocument();
    });

    // Stat card labels
    expect(screen.getAllByText(/overall gain/i).length).toBeGreaterThanOrEqual(
      1,
    );
    expect(screen.getAllByText(/mastery/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(/problems solved/i).length,
    ).toBeGreaterThanOrEqual(1);

    // Topics rendered — Sequences is always injected by the dashboard
    expect(screen.getAllByText("Sequences").length).toBeGreaterThanOrEqual(1);
  });

  it("calls all three API functions with the stored user_id", async () => {
    (getTopics as ReturnType<typeof vi.fn>).mockResolvedValue({
      topics: mockTopics,
    });
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [],
    });
    (getUserStats as ReturnType<typeof vi.fn>).mockResolvedValue({
      problems_solved: 0,
    });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(getTopics).toHaveBeenCalledWith("user-123");
      expect(getUserMastery).toHaveBeenCalledWith("user-123");
      expect(getUserStats).toHaveBeenCalledWith("user-123");
    });
  });

  it("displays the correct problems-solved count returned by the stats API", async () => {
    (getTopics as ReturnType<typeof vi.fn>).mockResolvedValue({ topics: [] });
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [],
    });
    (getUserStats as ReturnType<typeof vi.fn>).mockResolvedValue({
      problems_solved: 12,
    });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("12")).toBeInTheDocument();
    });
  });

  it('calls getNextProblem and navigates to /practice on "Start Practice"', async () => {
    (getTopics as ReturnType<typeof vi.fn>).mockResolvedValue({
      topics: mockTopics,
    });
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [],
    });
    (getUserStats as ReturnType<typeof vi.fn>).mockResolvedValue({
      problems_solved: 0,
    });
    (getNextProblem as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: "p1",
    });

    renderWithProviders(<Dashboard />);

    await waitFor(() => screen.getByText("Start Practice"));

    fireEvent.click(screen.getByText("Start Practice"));

    await waitFor(() => {
      expect(getNextProblem).toHaveBeenCalledWith("user-123");
      expect(mockNavigate).toHaveBeenCalledWith("/practice");
    });
  });

  it("shows the error returned by getTopics when the API fails", async () => {
    (getTopics as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Network error"),
    );
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [],
    });
    (getUserStats as ReturnType<typeof vi.fn>).mockResolvedValue({
      problems_solved: 0,
    });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });
  });
});
