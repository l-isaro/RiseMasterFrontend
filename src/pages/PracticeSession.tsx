import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, Trophy } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { questionsByTopic, allQuestions, mockTopics } from "@/data/mockData";
import ConceptIntroCard from "@/components/ConceptIntroCard";
import StepCard from "@/components/StepCard";
import Navbar from "@/components/Navbar";
import PracticeWelcomeCard from "@/components/PracticeWelcomeCard";
import {
  recordInteraction,
  getMastery,
  logSession,
  getGrowthGrade,
} from "@/lib/bkt";

type Phase = "welcome" | "concept" | "steps" | "final" | "complete";

/** Pick questions for the selected topic, or fall back to all questions. */
function getQuestionsForTopic(topicId: string | null) {
  if (topicId && questionsByTopic[topicId]) {
    return questionsByTopic[topicId];
  }
  return allQuestions;
}

const PracticeSession = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const topicParam = searchParams.get("topic"); // e.g. /practice?topic=calculus

  const questions = getQuestionsForTopic(topicParam);

  const [phase, setPhase] = useState<Phase>("welcome");
  const [currentStep, setCurrentStep] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const [qIndex, setQIndex] = useState(0);
  const question = questions[qIndex];

  const topicKey = question.topicKey || "demo_topic";

  const [startMastery, setStartMastery] = useState(() => getMastery(topicKey));
  const [mastery, setMastery] = useState(() => getMastery(topicKey));

  const gainPct = Math.round((mastery - startMastery) * 100);

  const handlePracticeAgain = () => {
    // Reset session baseline so we measure improvement during this repeat
    setStartMastery(mastery);
    setPhase("concept");
    setCurrentStep(0);
    setCorrectCount(0);
  };

  const handleNextProblem = () => {
    const nextIndex = (qIndex + 1) % questions.length;
    setQIndex(nextIndex);

    // Carry mastery forward
    const nextQ = questions[nextIndex];
    const nextTopicKey = nextQ.topicKey || topicKey;
    const nextMastery = getMastery(nextTopicKey);
    setStartMastery(nextMastery);
    setMastery(nextMastery);

    setPhase("concept");
    setCurrentStep(0);
    setCorrectCount(0);
  };

  const handleStepComplete = (correct: boolean, hintsUsed: number = 0) => {
    if (correct) setCorrectCount((c) => c + 1);

    const newMastery = recordInteraction(topicKey, correct, hintsUsed);
    setMastery(newMastery);

    if (currentStep < question.steps.length - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 300);
    } else {
      setTimeout(() => setPhase("final"), 300);
    }
  };

  const handleFinalSubmit = () => {
    // Log session for growth tracking (consistency, breadth)
    logSession(topicKey);

    // Persist demo values for Dashboard compatibility
    localStorage.setItem(`demo_mastery_${topicKey}`, String(mastery));
    const gainFraction = Math.max(0, mastery - startMastery);
    localStorage.setItem(`demo_gain_${topicKey}`, String(gainFraction));

    // Track solved count
    const solvedKey = `demo_solved_${topicKey}`;
    const completedFlag = `demo_completed_${question.id}`;
    if (localStorage.getItem(completedFlag) !== "1") {
      const currentSolved = Number(localStorage.getItem(solvedKey) || "0");
      localStorage.setItem(solvedKey, String(currentSolved + 1));
      localStorage.setItem(completedFlag, "1");
    }

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
          {phase === "welcome" && (
            <PracticeWelcomeCard
              key="welcome"
              topicName={question.conceptTitle}
              onContinue={() => setPhase("concept")}
            />
          )}
          {phase === "concept" && (
            <ConceptIntroCard
              title={question.conceptTitle}
              intro={question.conceptIntro}
              conceptChecks={question.conceptChecks} // NEW
              onStart={() => setPhase("steps")}
            />
          )}

          {phase === "steps" && (
            <motion.div
              key="steps"
              className="grid gap-8 lg:grid-cols-[340px_1fr]"
            >
              {/* Sidebar - original question */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-card lg:sticky lg:top-24 lg:self-start">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                  <BookOpen className="h-4 w-4" />
                  REB {question.year} — {question.topic}
                </div>
                <p className="text-base text-foreground leading-relaxed">
                  {question.questionText}
                </p>
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
              <h2 className="mb-2 text-3xl font-bold text-foreground">
                Amazing work! 🎉
              </h2>
              <p className="mb-2 text-muted-foreground">
                You got {correctCount}/{question.steps.length} steps right on
                the first try!
              </p>
              <div className="mb-6 rounded-xl border border-border bg-background p-4 text-left">
                <p className="text-sm text-muted-foreground">Session Summary</p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Session gain
                  </span>
                  <span className="font-bold text-success">+{gainPct}%</span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm font-medium text-foreground">
                    Current mastery
                  </span>
                  <span className="font-bold text-primary">
                    {Math.round(mastery * 100)}%
                  </span>
                </div>

                {(() => {
                  const allTopicIds = mockTopics.map((t) => t.id);
                  const g = getGrowthGrade(allTopicIds);
                  return (
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-sm font-medium text-foreground">
                        Improvement Grade
                      </span>
                      <span className="font-bold text-accent">
                        {g.grade > 0 ? `${g.letter} (${g.grade}%)` : "—"}
                      </span>
                    </div>
                  );
                })()}
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePracticeAgain}
                  className="flex-1 rounded-xl border border-border px-4 py-3 font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Practice Again
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextProblem}
                  className="flex-1 rounded-xl gradient-primary px-4 py-3 font-semibold text-primary-foreground"
                >
                  Next Problem →
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
