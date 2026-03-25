import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils";
import Progress from "@/pages/Progress";

// -- Module mocks --

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

const mockToast = vi.fn();
vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

vi.mock("@/data/api.js", () => ({
  getUserMastery: vi.fn(),
}));

import { getUserMastery } from "@/data/api.js";

// -------------------------------------------------------

const fakeMastery = [
  {
    skill_name: "geometric_progression",
    mastery_prob: 72,
    delta: 18,
    interactions_count: 8,
  },
  {
    skill_name: "calculus_basics",
    mastery_prob: 45,
    delta: 5,
    interactions_count: 4,
  },
  {
    skill_name: "trigonometry",
    mastery_prob: 30,
    delta: -3,
    interactions_count: 2,
  },
];

describe("Progress Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("shows a loading indicator while mastery data is being fetched", () => {
    localStorage.setItem("user_id", "user-123");
    (getUserMastery as ReturnType<typeof vi.fn>).mockReturnValue(
      new Promise(() => {}),
    );

    renderWithProviders(<Progress />);

    expect(screen.getByText(/loading progress/i)).toBeInTheDocument();
  });

  it("shows an error message when no user_id is in localStorage", async () => {
    renderWithProviders(<Progress />);

    await waitFor(() => {
      expect(screen.getByText(/no user found/i)).toBeInTheDocument();
    });
  });

  it("renders mastery rings and stats after a successful API load", async () => {
    localStorage.setItem("user_id", "user-123");
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: fakeMastery,
    });

    renderWithProviders(<Progress />);

    await waitFor(() => {
      expect(screen.getByText("Your Progress")).toBeInTheDocument();
    });

    // Stat labels
    expect(screen.getByText("Total Improvement")).toBeInTheDocument();
    expect(screen.getByText("Problems Solved")).toBeInTheDocument();
  });

  it("renders a mastery progress bar for each topic returned by the API", async () => {
    localStorage.setItem("user_id", "user-123");
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: fakeMastery,
    });

    renderWithProviders(<Progress />);

    // Skill names formatted as human-readable topic names
    await waitFor(() => {
      expect(screen.getByText("Geometric Progression")).toBeInTheDocument();
      expect(screen.getByText("Calculus Basics")).toBeInTheDocument();
      expect(screen.getByText("Trigonometry")).toBeInTheDocument();
    });
  });

  it("shows an empty-state message when no mastery data is available", async () => {
    localStorage.setItem("user_id", "user-123");
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [],
    });

    renderWithProviders(<Progress />);

    await waitFor(() => {
      expect(screen.getByText(/no mastery data yet/i)).toBeInTheDocument();
    });
  });

  it("calls getUserMastery with the correct user_id", async () => {
    localStorage.setItem("user_id", "user-456");
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [],
    });

    renderWithProviders(<Progress />);

    await waitFor(() => {
      expect(getUserMastery).toHaveBeenCalledWith("user-456");
    });
  });

  it("shows an error banner and a destructive toast when the API call fails", async () => {
    localStorage.setItem("user_id", "user-123");
    (getUserMastery as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Service unavailable"),
    );

    renderWithProviders(<Progress />);

    await waitFor(() => {
      expect(screen.getByText("Service unavailable")).toBeInTheDocument();
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ variant: "destructive" }),
      );
    });
  });

  it("merges demo mastery from localStorage into the topic list", async () => {
    localStorage.setItem("user_id", "user-123");
    localStorage.setItem("demo_mastery_geometric_progression", "0.75");
    localStorage.setItem("demo_gain_geometric_progression", "0.20");
    // Return empty mastery from API so the demo row is injected
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [],
    });

    renderWithProviders(<Progress />);

    await waitFor(() => {
      expect(screen.getByText("Sequences")).toBeInTheDocument();
    });
  });
});
