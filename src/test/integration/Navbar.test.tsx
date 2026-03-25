import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils";
import Navbar from "@/components/Navbar";

// -------------------------------------------------------

describe("Navbar", () => {
  it("renders the RISEMASTER brand logo", () => {
    renderWithProviders(<Navbar />);

    // The brand text is split: outer span "RISE" + inner span "MASTER"
    expect(screen.getByText("MASTER")).toBeInTheDocument();
  });

  it("renders the three main navigation links", () => {
    renderWithProviders(<Navbar />);

    expect(
      screen.getByRole("link", { name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /progress/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /profile/i })).toBeInTheDocument();
  });

  it("links point to the correct routes", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByRole("link", { name: /dashboard/i })).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(screen.getByRole("link", { name: /progress/i })).toHaveAttribute(
      "href",
      "/progress",
    );
    expect(screen.getByRole("link", { name: /profile/i })).toHaveAttribute(
      "href",
      "/profile",
    );
  });

  it("highlights the active navigation link based on the current route", () => {
    renderWithProviders(<Navbar />, {
      routerProps: { initialEntries: ["/progress"] },
    });

    const progressLink = screen.getByRole("link", { name: /progress/i });
    // Active class includes text-primary
    expect(progressLink.className).toMatch(/text-primary/);
  });

  it("does not apply the active style to inactive links", () => {
    renderWithProviders(<Navbar />, {
      routerProps: { initialEntries: ["/progress"] },
    });

    const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
    expect(dashboardLink.className).toMatch(/text-muted-foreground/);
  });

  it("displays the hardcoded 7-day streak badge", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByText(/7.*day streak/i)).toBeInTheDocument();
  });

  it("renders the logout button", () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("the brand logo links back to /dashboard", () => {
    renderWithProviders(<Navbar />);

    // The accessible name is "RISE MASTER" (split across two spans)
    const logoLink = screen.getByRole("link", { name: /rise master/i });
    expect(logoLink).toHaveAttribute("href", "/dashboard");
  });
});
