import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ChevronRight, Check, X } from "lucide-react";
import { PracticeStep } from "@/types";

interface StepCardProps {
  step: PracticeStep;
  stepNumber: number;
  totalSteps: number;
  onComplete: (correct: boolean, hintsUsed: number) => void;
}

function normalizeText(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/\s+/g, "") // remove spaces
    .replace(/,/g, "") // remove commas
    .replace(/×/g, "*") // normalize multiply symbol
    .trim();
}

function isNumericLike(s: string) {
  return /^-?\d+(\.\d+)?$/.test((s || "").trim());
}

function numericEqual(a: string, b: string, tolerance = 0.02) {
  const na = Number(a);
  const nb = Number(b);
  if (Number.isNaN(na) || Number.isNaN(nb)) return false;
  return Math.abs(na - nb) <= tolerance;
}

/**
 * Allows correctAnswer to include multiple accepted variants separated by "|"
 * Example: "k=ln(2)/3|ln(2)/3|0.231"
 */
function isAnswerCorrect(userAnswer: string, correctAnswer: string) {
  const uaRaw = (userAnswer || "").trim();
  const caRaw = (correctAnswer || "").trim();

  if (!uaRaw || !caRaw) return false;

  const accepted = caRaw
    .split("|")
    .map((x) => x.trim())
    .filter(Boolean);

  // If user typed a pure number, allow numeric tolerance matching against any numeric accepted answer
  if (isNumericLike(uaRaw)) {
    return accepted.some((acc) => {
      if (isNumericLike(acc)) return numericEqual(uaRaw, acc);
      // also allow them to type numeric approx when correct answer is symbolic
      // e.g. correct: ln(2)/3, user: 0.231
      return false;
    });
  }

  const ua = normalizeText(uaRaw);

  return accepted.some((acc) => {
    const accNorm = normalizeText(acc);

    // allow "k=" optional
    const uaNoK = ua.replace(/^k=/, "");
    const accNoK = accNorm.replace(/^k=/, "");

    return ua === accNorm || uaNoK === accNoK;
  });
}

const StepCard = ({
  step,
  stepNumber,
  totalSteps,
  onComplete,
}: StepCardProps) => {
  const [answer, setAnswer] = useState("");
  const [hintsShown, setHintsShown] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const hints = useMemo(
    () => [step.hint1, step.hint2, step.hint3].filter(Boolean),
    [step],
  );

  const handleSubmit = () => {
    const correct = isAnswerCorrect(answer, step.correctAnswer);
    setIsCorrect(correct);
    setSubmitted(true);
    setTimeout(() => onComplete(correct, hintsShown), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      {/* Progress */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-muted-foreground">
            Step {stepNumber} of {totalSteps}
          </span>
          <span className="font-semibold text-primary">
            {Math.round((stepNumber / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full gradient-primary"
            initial={{ width: `${((stepNumber - 1) / totalSteps) * 100}%` }}
            animate={{ width: `${(stepNumber / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Instruction */}
      <p className="mb-4 text-lg font-medium text-foreground">
        {step.instruction}
      </p>

      {step.latex && (
        <div className="mb-4 rounded-lg bg-secondary/50 p-3 text-center font-mono text-lg text-foreground">
          {step.latex}
        </div>
      )}

      {/* Answer input */}
      {!submitted ? (
        <>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && answer.trim() && handleSubmit()
            }
            placeholder="Type your answer here..."
            className="mb-4 w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="flex items-center gap-2 rounded-lg gradient-primary px-5 py-2.5 font-semibold text-primary-foreground disabled:opacity-50"
            >
              Submit <ChevronRight className="h-4 w-4" />
            </motion.button>

            {hintsShown < hints.length && (
              <button
                onClick={() => setHintsShown((h) => h + 1)}
                className="flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/5 px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
              >
                <Lightbulb className="h-4 w-4" />
                Hint {hintsShown + 1}
              </button>
            )}
          </div>

          {/* Hints */}
          <AnimatePresence>
            {hintsShown > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 space-y-2"
              >
                {hints.slice(0, hintsShown).map((hint, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-lg border border-accent/20 bg-accent/5 px-4 py-2.5 text-sm text-foreground/80"
                  >
                    💡 {hint}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex items-center gap-3 rounded-lg p-4 ${
            isCorrect
              ? "bg-success/10 text-success"
              : "bg-accent/10 text-accent"
          }`}
        >
          {isCorrect ? (
            <>
              <Check className="h-6 w-6" />
              <div>
                <p className="font-semibold">Nice! That’s correct ✅</p>
                <p className="text-sm opacity-80">Moving to the next step...</p>
              </div>
            </>
          ) : (
            <>
              <X className="h-6 w-6" />
              <div>
                <p className="font-semibold">Close — let’s fix it together.</p>
                <p className="text-sm opacity-80">
                  A correct answer could be:{" "}
                  <span className="font-mono">
                    {step.correctAnswer.split("|")[0]}
                  </span>
                </p>
              </div>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default StepCard;
