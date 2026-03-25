import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils";
import Login from "@/pages/Login";

// -- Module mocks (hoisted automatically by Vitest) --

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
  loginUser: vi.fn(),
}));

import { loginUser } from "@/data/api.js";

// -------------------------------------------------------

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders the login form with required fields", () => {
    renderWithProviders(<Login />);

    // Brand text is split: "RISE" + "MASTER" — check for the visible "MASTER" span
    expect(screen.getByText("MASTER")).toBeInTheDocument();
    expect(screen.getByText("Log in to continue learning")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("alice@example.com"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /continue/i }),
    ).toBeInTheDocument();
  });

  it("shows a validation toast when submitted with empty fields", async () => {
    renderWithProviders(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // The form requires both email and password — loginUser should not be called
    await waitFor(() => {
      expect(loginUser).not.toHaveBeenCalled();
    });
  });

  it("shows a loading spinner while the login request is in-flight", async () => {
    // Mock loginUser to never resolve so we can catch the loading state
    (loginUser as ReturnType<typeof vi.fn>).mockReturnValue(
      new Promise(() => {}),
    );

    const { container } = renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText("alice@example.com"), {
      target: { value: "alice@example.com" },
    });
    const passwordInput = container.querySelector('input[type="password"]')!;
    fireEvent.change(passwordInput, { target: { value: "secret" } });

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText(/logging in/i)).toBeInTheDocument();
    });
  });

  it("stores user data in localStorage and navigates to /dashboard on success", async () => {
    const fakeUser = {
      user_id: "user-abc",
      name: "Alice Smith",
      email: "alice@example.com",
      class_level: "S5",
    };
    (loginUser as ReturnType<typeof vi.fn>).mockResolvedValue(fakeUser);

    const { container } = renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText("alice@example.com"), {
      target: { value: "alice@example.com" },
    });
    const passwordInput = container.querySelector('input[type="password"]')!;
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    await waitFor(() => {
      expect(localStorage.getItem("user_id")).toBe("user-abc");
      expect(localStorage.getItem("user_name")).toBe("Alice Smith");
      expect(localStorage.getItem("user_email")).toBe("alice@example.com");
      expect(localStorage.getItem("class_level")).toBe("S5");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows a toast with the server error message on failed login", async () => {
    (loginUser as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Invalid credentials"),
    );

    const { container } = renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText("alice@example.com"), {
      target: { value: "bad@example.com" },
    });
    const passwordInput = container.querySelector('input[type="password"]')!;
    fireEvent.change(passwordInput, { target: { value: "wrong" } });

    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Login failed",
          description: "Invalid credentials",
          variant: "destructive",
        }),
      );
    });
  });

  it('navigates to the onboarding page when "Create one" is clicked', () => {
    renderWithProviders(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /create one/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
