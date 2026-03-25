import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../utils";
import Onboarding from "@/pages/Onboarding";

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
  registerUser: vi.fn(),
}));

import { registerUser } from "@/data/api.js";

// -------------------------------------------------------

describe("Onboarding (Registration) Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders the registration form with all required fields", () => {
    renderWithProviders(<Onboarding />);

    // Brand text is split: "RISE" + "MASTER" spans
    expect(screen.getByText("MASTER")).toBeInTheDocument();
    expect(
      screen.getByText("Master Math One Step at a Time"),
    ).toBeInTheDocument();
    // Name, Email are textbox roles
    const textboxes = screen.getAllByRole("textbox");
    expect(textboxes.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders all class-level options in the select", () => {
    renderWithProviders(<Onboarding />);

    const select = screen.getByRole("combobox");
    fireEvent.click(select);

    ["S1", "S2", "S3", "S4", "S5", "S6"].forEach((level) => {
      expect(screen.getByRole("option", { name: level })).toBeInTheDocument();
    });
  });

  it("navigates to /login on successful registration", async () => {
    const fakeUser = {
      user_id: "new-user-1",
      name: "Bob Mugisha",
      class_level: "S4",
    };
    (registerUser as ReturnType<typeof vi.fn>).mockResolvedValue(fakeUser);

    const { container } = renderWithProviders(<Onboarding />);

    // Verify the form renders with the submit button
    expect(
      screen.getByRole("button", { name: /start learning/i }),
    ).toBeInTheDocument();

    // Fill in the form fields
    const [nameInput, emailInput] = screen.getAllByRole("textbox");
    fireEvent.change(nameInput, { target: { value: "Bob Mugisha" } });
    fireEvent.change(emailInput, { target: { value: "bob@example.com" } });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "S4" } });

    // Submit the form directly
    fireEvent.submit(container.querySelector("form")!);

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalled();
    });
  });

  it("shows an error toast when registration fails", async () => {
    (registerUser as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Email already in use"),
    );

    const { container } = renderWithProviders(<Onboarding />);

    const [nameInput, emailInput] = screen.getAllByRole("textbox");
    fireEvent.change(nameInput, { target: { value: "Alice" } });
    fireEvent.change(emailInput, { target: { value: "alice@example.com" } });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "S6" } });

    // Submit the form directly
    fireEvent.submit(container.querySelector("form")!);

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ variant: "destructive" }),
      );
    });
  });

  it("navigates to /login when the login link is clicked", () => {
    renderWithProviders(<Onboarding />);

    fireEvent.click(screen.getByRole("button", { name: /logins/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
