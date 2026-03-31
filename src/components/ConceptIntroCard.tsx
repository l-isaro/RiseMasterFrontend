import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";

type ConceptOption = {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
};

type ConceptCheck = {
  id: string;
  question: string;
  options: ConceptOption[];
};

interface ConceptIntroCardProps {
  title: string;
  intro: string;
  onStart: () => void;
  conceptChecks?: ConceptCheck[]; // NEW (optional)
}

const ConceptIntroCard = ({
  title,
  intro,
  onStart,
  conceptChecks = [],
}: ConceptIntroCardProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<{ [qid: string]: string }>({});
  const [revealed, setRevealed] = useState<{ [qid: string]: boolean }>({});

  const hasChecks = conceptChecks.length > 0;

  const current = conceptChecks[currentQ];

  const answeredAll = useMemo(() => {
    if (!hasChecks) return true;
    return conceptChecks.every((q) => selected[q.id]);
  }, [conceptChecks, hasChecks, selected]);

  const getOption = (q: ConceptCheck, optionId: string) =>
    q.options.find((o) => o.id === optionId);

  const handlePick = (q: ConceptCheck, optionId: string) => {
    setSelected((prev) => ({ ...prev, [q.id]: optionId }));
    setRevealed((prev) => ({ ...prev, [q.id]: true }));
  };

  const goNext = () => {
    if (currentQ < conceptChecks.length - 1) setCurrentQ((n) => n + 1);
  };

  const goBack = () => {
    if (currentQ > 0) setCurrentQ((n) => n - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-card"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-accent">
          <Sparkles className="h-5 w-5 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          {title}, no need to panic!
        </h2>
      </div>

      <p className="mb-4 whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
        {intro}
      </p>

      <p className="mb-6 text-base text-foreground/80">
        Don&apos;t worry if it looks confusing, we&apos;ll go through it
        together step by step.
      </p>

      {/* Concept Check (Multiple Choice) */}
      {hasChecks && current && (
        <div className="mb-6 rounded-xl border border-border bg-background p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-primary">
              Quick concept check {currentQ + 1}/{conceptChecks.length}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={goBack}
                disabled={currentQ === 0}
                className="rounded-lg border border-border px-3 py-1 text-sm text-muted-foreground disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={currentQ === conceptChecks.length - 1}
                className="rounded-lg border border-border px-3 py-1 text-sm text-muted-foreground disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <p className="mb-4 text-base font-semibold text-foreground">
            {current.question}
          </p>

          <div className="space-y-2">
            {current.options.map((opt) => {
              const picked = selected[current.id] === opt.id;
              const showFeedback = revealed[current.id] && picked;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handlePick(current, opt.id)}
                  className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                    picked
                      ? opt.correct
                        ? "border-success/40 bg-success/10"
                        : "border-destructive/40 bg-destructive/10"
                      : "border-border bg-card hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {picked ? (
                        opt.correct ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-border" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-foreground">{opt.text}</p>

                      <AnimatePresence>
                        {showFeedback && (
                          <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`mt-1 text-sm ${
                              opt.correct ? "text-success" : "text-destructive"
                            }`}
                          >
                            {opt.feedback}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* small hint if they haven't answered */}
          {!selected[current.id] && (
            <p className="mt-3 text-xs text-muted-foreground">
              Pick an option to see feedback.
            </p>
          )}
        </div>
      )}

      <motion.button
        whileHover={{ scale: answeredAll ? 1.02 : 1 }}
        whileTap={{ scale: answeredAll ? 0.98 : 1 }}
        onClick={onStart}
        disabled={!answeredAll}
        className={`w-full rounded-xl gradient-primary px-6 py-3.5 text-lg font-semibold text-primary-foreground shadow-sm transition-shadow hover:shadow-md ${
          !answeredAll ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        Okay, show me the steps! 🚀
      </motion.button>

      {hasChecks && !answeredAll && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Answer the quick concept checks to continue.
        </p>
      )}
    </motion.div>
  );
};

export default ConceptIntroCard;
