import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, Trophy, PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockQuestion } from "@/data/mockData";
import ConceptIntroCard from "@/components/ConceptIntroCard";
import StepCard from "@/components/StepCard";
import Navbar from "@/components/Navbar";

type Phase = "concept" | "steps" | "final" | "complete";

const PracticeSession = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("concept");
  const [currentStep, setCurrentStep] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const question = mockQuestion;

  const handleStepComplete = (correct: boolean) => {
    if (correct) setCorrectCount((c) => c + 1);
    if (currentStep < question.steps.length - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 300);
    } else {
      setTimeout(() => setPhase("final"), 300);
    }
  };

  const handleFinalSubmit = () => {
    setPhase("complete");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>

        <AnimatePresence mode="wait">
          {phase === "concept" && (
            <ConceptIntroCard
              key="concept"
              title={question.conceptTitle}
              intro={question.conceptIntro}
              onStart={() => setPhase("steps")}
            />
          )}

          {phase === "steps" && (
            <motion.div key="steps" className="grid gap-8 lg:grid-cols-[340px_1fr]">
              {/* Sidebar - original question */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-card lg:sticky lg:top-24 lg:self-start">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                  <BookOpen className="h-4 w-4" />
                  REB {question.year} — {question.topic}
                </div>
                <p className="text-base text-foreground leading-relaxed">{question.questionText}</p>
                <div className="mt-3 rounded-lg bg-secondary/50 p-3 text-center font-mono">
                  {question.questionLatex}
                </div>
              </div>

              {/* Main step area */}
              <AnimatePresence mode="wait">
                <StepCard
                  key={currentStep}
                  step={question.steps[currentStep]}
                  stepNumber={currentStep + 1}
                  totalSteps={question.steps.length}
                  onComplete={handleStepComplete}
                />
              </AnimatePresence>
            </motion.div>
          )}

          {phase === "final" && (
            <motion.div
              key="final"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-card"
            >
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Now try the full question! 🎯
              </h2>
              <p className="mb-4 text-muted-foreground">
                You've worked through the steps — now put it all together.
              </p>
              <div className="mb-6 rounded-lg bg-secondary/50 p-4 text-center text-lg font-mono text-foreground">
                {question.fullQuestionLatex || question.fullQuestion}
              </div>
              <input
                type="text"
                placeholder="Your final answer..."
                className="mb-4 w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFinalSubmit}
                className="w-full rounded-xl gradient-primary px-6 py-3.5 text-lg font-semibold text-primary-foreground"
              >
                Submit Final Answer
              </motion.button>
            </motion.div>
          )}

          {phase === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="mx-auto max-w-lg rounded-2xl border border-success/30 bg-card p-10 text-center shadow-card"
            >
              <motion.div
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full gradient-success"
              >
                <Trophy className="h-8 w-8 text-success-foreground" />
              </motion.div>
              <h2 className="mb-2 text-3xl font-bold text-foreground">Amazing work! 🎉</h2>
              <p className="mb-2 text-muted-foreground">
                You got {correctCount}/{question.steps.length} steps right on the first try!
              </p>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-success/10 px-5 py-2 text-lg font-bold text-success">
                <PartyPopper className="h-5 w-5" />
                Mastery +22%
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setPhase("concept"); setCurrentStep(0); setCorrectCount(0); }}
                  className="flex-1 rounded-xl border border-border px-4 py-3 font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Practice Again
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 rounded-xl gradient-primary px-4 py-3 font-semibold text-primary-foreground"
                >
                  Back to Dashboard
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PracticeSession;
