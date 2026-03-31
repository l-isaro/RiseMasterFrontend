import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils";
import Progress from "@/pages/Progress";

// -- Module mocks --

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

// -------------------------------------------------------

describe("Progress Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders page heading and empty state when no practice data exists", () => {
    renderWithProviders(<Progress />);

    expect(screen.getByText("Your Progress")).toBeInTheDocument();
    expect(screen.getByText(/no mastery data yet/i)).toBeInTheDocument();
  });

  it("renders improvement breakdown dimensions", () => {
    renderWithProviders(<Progress />);

    expect(screen.getByText("Improvement Breakdown")).toBeInTheDocument();
    expect(screen.getByText("Mastery Growth")).toBeInTheDocument();
    expect(screen.getByText("Consistency")).toBeInTheDocument();
    expect(screen.getByText("Persistence")).toBeInTheDocument();
    expect(screen.getByText("Breadth")).toBeInTheDocument();
  });

  it("shows improvement grade and topic mastery when BKT history exists", () => {
    // Seed BKT history for sequences
    localStorage.setItem(
      "bkt_history_sequences",
      JSON.stringify([
        { timestamp: Date.now(), correct: true, hintsUsed: 0 },
        { timestamp: Date.now(), correct: true, hintsUsed: 0 },
        { timestamp: Date.now(), correct: true, hintsUsed: 0 },
      ]),
    );
    localStorage.setItem("bkt_mastery_sequences", "0.52");

    // Seed a session log for consistency tracking
    localStorage.setItem(
      "growth_sessions",
      JSON.stringify([{ timestamp: Date.now(), skill: "sequences" }]),
    );

    renderWithProviders(<Progress />);

    expect(screen.getByText("Your Progress")).toBeInTheDocument();
    // Topic breakdown shows the mastery percentage
    expect(screen.getByText("52%")).toBeInTheDocument();
    // Total interactions should reflect the 3 seeded entries
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("shows all six topics from mockTopics in the topic breakdown", () => {
    // Seed at least one interaction so the topic list renders (not empty state)
    localStorage.setItem(
      "bkt_history_sequences",
      JSON.stringify([{ timestamp: Date.now(), correct: true, hintsUsed: 0 }]),
    );
    localStorage.setItem("bkt_mastery_sequences", "0.3");

    renderWithProviders(<Progress />);

    expect(screen.getByText("Sequences")).toBeInTheDocument();
    expect(screen.getByText("Exponential Functions")).toBeInTheDocument();
    expect(screen.getByText("Trigonometry")).toBeInTheDocument();
    expect(screen.getByText("Calculus")).toBeInTheDocument();
    expect(screen.getByText("Complex Numbers")).toBeInTheDocument();
    expect(screen.getByText("Statistics")).toBeInTheDocument();
  });
});
