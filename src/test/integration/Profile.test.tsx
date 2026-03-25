import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils";
import Profile from "@/pages/Profile";

// -- Module mocks --

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => mockNavigate };
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

describe("Profile Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("redirects to the root when no user_id is present in localStorage", async () => {
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [],
    });

    renderWithProviders(<Profile />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("renders the user name, email, and class level from localStorage", async () => {
    localStorage.setItem("user_id", "user-123");
    localStorage.setItem("user_name", "Aline Uwase");
    localStorage.setItem("user_email", "aline@example.com");
    localStorage.setItem("class_level", "S6");
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [],
    });

    renderWithProviders(<Profile />);

    await waitFor(() => {
      expect(screen.getByText("Aline Uwase")).toBeInTheDocument();
      expect(screen.getByText("aline@example.com")).toBeInTheDocument();
      expect(screen.getByText("S6")).toBeInTheDocument();
    });
  });

  it("displays the initial avatar letter derived from the user name", async () => {
    localStorage.setItem("user_id", "user-123");
    localStorage.setItem("user_name", "Claude Martin");
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [],
    });

    renderWithProviders(<Profile />);

    await waitFor(() => {
      expect(screen.getByText("C")).toBeInTheDocument();
    });
  });

  it("displays the overall mastery percentage calculated from the API response", async () => {
    localStorage.setItem("user_id", "user-123");
    localStorage.setItem("user_name", "Sarah");
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [
        { skill_name: "gp", mastery_prob: 80 },
        { skill_name: "calc", mastery_prob: 60 },
      ],
    });

    renderWithProviders(<Profile />);

    // Average of 80 and 60 is 70
    await waitFor(() => {
      expect(screen.getByText("70%")).toBeInTheDocument();
    });
  });

  it("clears localStorage and navigates to /login on logout", async () => {
    localStorage.setItem("user_id", "user-123");
    localStorage.setItem("user_name", "Aline");
    localStorage.setItem("user_email", "aline@example.com");
    localStorage.setItem("class_level", "S6");
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [],
    });

    const { container } = renderWithProviders(<Profile />);

    // Wait for mastery to load (the page is rendered)
    await waitFor(() => screen.getAllByRole("button", { name: /logout/i }));

    // The Profile page renders its own logout button inside <main>
    const mainEl = container.querySelector("main");
    const logoutBtn = mainEl
      ? Array.from(mainEl.querySelectorAll("button")).find((b) =>
          /logout/i.test(b.textContent ?? ""),
        )
      : null;

    expect(logoutBtn).not.toBeNull();
    fireEvent.click(logoutBtn!);

    expect(localStorage.getItem("user_id")).toBeNull();
    expect(localStorage.getItem("user_name")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("shows a toast and resets mastery to 0 when the mastery API fails", async () => {
    localStorage.setItem("user_id", "user-123");
    localStorage.setItem("user_name", "Aline");
    (getUserMastery as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("API error"),
    );

    renderWithProviders(<Profile />);

    await waitFor(() => {
      // Falls back to 0%
      expect(screen.getByText("0%")).toBeInTheDocument();
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ variant: "destructive" }),
      );
    });
  });

  it("calls getUserMastery with the stored user_id", async () => {
    localStorage.setItem("user_id", "user-789");
    localStorage.setItem("user_name", "Test User");
    (getUserMastery as ReturnType<typeof vi.fn>).mockResolvedValue({
      mastery: [],
    });

    renderWithProviders(<Profile />);

    await waitFor(() => {
      expect(getUserMastery).toHaveBeenCalledWith("user-789");
    });
  });
});
