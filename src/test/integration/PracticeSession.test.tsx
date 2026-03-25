import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import { renderWithProviders } from "../utils";
import PracticeSession from "@/pages/PracticeSession";

// Navigate mock — used by the back button
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => mockNavigate };
});

// mockData is real static data — no API mock needed for PracticeSession
// (it imports mockQuestions directly from @/data/mockData)

// -------------------------------------------------------

describe("PracticeSession Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ── Phase: welcome ────────────────────────────────────────────

  it("starts in the welcome phase showing the topic name", () => {
    renderWithProviders(<PracticeSession />);

    // PracticeWelcomeCard is shown first
    expect(screen.getByText(/quick warm-up/i)).toBeInTheDocument();
    expect(
      screen.getByText(/geometric progression/i, { exact: false }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /begin/i })).toBeInTheDocument();
  });

  it("navigates back to the dashboard when the back button is clicked", () => {
    renderWithProviders(<PracticeSession />);

    fireEvent.click(screen.getByText(/back to dashboard/i));

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  // ── Phase: concept ────────────────────────────────────────────

  it('transitions from welcome to concept phase on "Let\'s begin"', async () => {
    renderWithProviders(<PracticeSession />);

    fireEvent.click(screen.getByRole("button", { name: /begin/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/geometric progression.*insert terms/i, {
          exact: false,
        }),
      ).toBeInTheDocument();
    });
  });

  it("renders concept checks in the concept phase", async () => {
    renderWithProviders(<PracticeSession />);
    fireEvent.click(screen.getByRole("button", { name: /begin/i }));

    await waitFor(() => {
      expect(screen.getByText(/quick concept check 1/i)).toBeInTheDocument();
    });
  });

  it('disables the "show me the steps" button until all checks are answered', async () => {
    renderWithProviders(<PracticeSession />);
    fireEvent.click(screen.getByRole("button", { name: /begin/i }));

    await waitFor(() => screen.getByText(/show me the steps/i));

    const continueBtn = screen.getByRole("button", {
      name: /show me the steps/i,
    });
    expect(continueBtn).toBeDisabled();
  });

  it('enables the "show me the steps" button after all concept checks are answered', async () => {
    renderWithProviders(<PracticeSession />);
    fireEvent.click(screen.getByRole("button", { name: /begin/i }));

    await waitFor(() => screen.getByText(/In a GP, each new term/i));

    // Answer concept check 1 — any option click counts as an answer
    const options1 = screen.getAllByRole("button");
    const answerOption1 = options1.find((btn) =>
      btn.textContent?.includes("Multiplying by the same"),
    );
    fireEvent.click(answerOption1!);

    // Navigate to check 2
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => screen.getByText(/how many times is r multiplied/i));

    const options2 = screen.getAllByRole("button");
    const answerOption2 = options2.find((btn) =>
      btn.textContent?.includes("5 times"),
    );
    fireEvent.click(answerOption2!);

    await waitFor(() => {
      const continueBtn = screen.getByRole("button", {
        name: /show me the steps/i,
      });
      expect(continueBtn).not.toBeDisabled();
    });
  });

  // ── Phase: steps ─────────────────────────────────────────────

  it("transitions to the steps phase after answering all concept checks", async () => {
    renderWithProviders(<PracticeSession />);
    fireEvent.click(screen.getByRole("button", { name: /begin/i }));

    await waitFor(() => screen.getByText(/In a GP, each new term/i));

    // Answer both checks
    const allButtons = screen.getAllByRole("button");
    const q1answer = allButtons.find((b) =>
      b.textContent?.includes("Multiplying by the same"),
    );
    fireEvent.click(q1answer!);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => screen.getByText(/how many times is r multiplied/i));
    const allButtons2 = screen.getAllByRole("button");
    const q2answer = allButtons2.find((b) =>
      b.textContent?.includes("5 times"),
    );
    fireEvent.click(q2answer!);

    fireEvent.click(screen.getByRole("button", { name: /show me the steps/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/step 1 of/i, { exact: false }),
      ).toBeInTheDocument();
    });
  });

  it("shows the step instruction and answer input in the steps phase", async () => {
    renderWithProviders(<PracticeSession />);

    // Short-circuit to steps by going through welcome + concept
    fireEvent.click(screen.getByRole("button", { name: /begin/i }));
    await waitFor(() => screen.getByText(/In a GP, each new term/i));

    const allButtons = screen.getAllByRole("button");
    const q1answer = allButtons.find((b) =>
      b.textContent?.includes("Multiplying by the same"),
    );
    fireEvent.click(q1answer!);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() => screen.getByText(/how many times is r multiplied/i));
    const allButtons2 = screen.getAllByRole("button");
    const q2answer = allButtons2.find((b) =>
      b.textContent?.includes("5 times"),
    );
    fireEvent.click(q2answer!);
    fireEvent.click(screen.getByRole("button", { name: /show me the steps/i }));

    await waitFor(() => screen.getByPlaceholderText(/type your answer/i));

    expect(
      screen.getByPlaceholderText(/type your answer/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("accepts a correct answer and advances to the next step", async () => {
    renderWithProviders(<PracticeSession />);

    // Get to steps phase
    fireEvent.click(screen.getByRole("button", { name: /begin/i }));
    await waitFor(() => screen.getByText(/In a GP, each new term/i));
    const allButtons = screen.getAllByRole("button");
    const q1 = allButtons.find((b) =>
      b.textContent?.includes("Multiplying by the same"),
    );
    fireEvent.click(q1!);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() => screen.getByText(/how many times is r multiplied/i));
    const allButtons2 = screen.getAllByRole("button");
    const q2 = allButtons2.find((b) => b.textContent?.includes("5 times"));
    fireEvent.click(q2!);
    fireEvent.click(screen.getByRole("button", { name: /show me the steps/i }));
    await waitFor(() => screen.getByPlaceholderText(/type your answer/i));

    // Answer step 1 correctly (answer: "6")
    vi.useFakeTimers();
    fireEvent.change(screen.getByPlaceholderText(/type your answer/i), {
      target: { value: "6" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // StepCard fires onComplete after 1500 ms; PracticeSession advances after 300 ms more
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    vi.useRealTimers();

    await waitFor(() => {
      expect(
        screen.getByText(/step 2 of/i, { exact: false }),
      ).toBeInTheDocument();
    });
  });

  // ── Phase: final ──────────────────────────────────────────────

  it("shows the final answer input after all steps are completed", async () => {
    renderWithProviders(<PracticeSession />);

    // Get to steps phase
    fireEvent.click(screen.getByRole("button", { name: /begin/i }));
    await waitFor(() => screen.getByText(/In a GP, each new term/i));
    const b1 = screen.getAllByRole("button");
    fireEvent.click(
      b1.find((b) => b.textContent?.includes("Multiplying by the same"))!,
    );
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() => screen.getByText(/how many times is r multiplied/i));
    const b2 = screen.getAllByRole("button");
    fireEvent.click(b2.find((b) => b.textContent?.includes("5 times"))!);
    fireEvent.click(screen.getByRole("button", { name: /show me the steps/i }));
    await waitFor(() => screen.getByPlaceholderText(/type your answer/i));

    // Complete all 6 steps using fake timers so we don't wait for real delays
    vi.useFakeTimers();
    for (const answer of [
      "6",
      "5",
      "6250=2r^5",
      "3125",
      "5",
      "10,50,250,1250",
    ]) {
      fireEvent.change(screen.getByPlaceholderText(/type your answer/i), {
        target: { value: answer },
      });
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
      await act(async () => {
        vi.advanceTimersByTime(1800);
      });
    }
    vi.useRealTimers();

    await waitFor(() => {
      expect(
        screen.getByText(/now try the full question/i),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /submit final answer/i }),
      ).toBeInTheDocument();
    });
  });

  // ── Phase: complete ───────────────────────────────────────────

  it("shows the completion screen with mastery summary after submitting the final answer", async () => {
    renderWithProviders(<PracticeSession />);

    // Navigate to final phase via concept + steps
    fireEvent.click(screen.getByRole("button", { name: /begin/i }));
    await waitFor(() => screen.getByText(/In a GP, each new term/i));
    const b1 = screen.getAllByRole("button");
    fireEvent.click(
      b1.find((b) => b.textContent?.includes("Multiplying by the same"))!,
    );
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    await waitFor(() => screen.getByText(/how many times is r multiplied/i));
    const b2 = screen.getAllByRole("button");
    fireEvent.click(b2.find((b) => b.textContent?.includes("5 times"))!);
    fireEvent.click(screen.getByRole("button", { name: /show me the steps/i }));
    await waitFor(() => screen.getByPlaceholderText(/type your answer/i));

    vi.useFakeTimers();
    for (const answer of [
      "6",
      "5",
      "6250=2r^5",
      "3125",
      "5",
      "10,50,250,1250",
    ]) {
      fireEvent.change(screen.getByPlaceholderText(/type your answer/i), {
        target: { value: answer },
      });
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
      await act(async () => {
        vi.advanceTimersByTime(1800);
      });
    }
    vi.useRealTimers();

    await waitFor(() =>
      screen.getByRole("button", { name: /submit final answer/i }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: /submit final answer/i }),
    );

    await waitFor(() => {
      expect(screen.getByText(/amazing work/i)).toBeInTheDocument();
    });
  });
});
