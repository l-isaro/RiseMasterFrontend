import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, Trophy, PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockQuestions } from "@/data/mockData";
import ConceptIntroCard from "@/components/ConceptIntroCard";
import StepCard from "@/components/StepCard";
import Navbar from "@/components/Navbar";
import PracticeWelcomeCard from "@/components/PracticeWelcomeCard";

type Phase = "welcome" | "concept" | "steps" | "final" | "complete";

function getSkillKey(skillName) {
  return (skillName || "general").toLowerCase();
}

function getSpacedMultiplier(msSinceLast) {
  const minutes = msSinceLast / (60 * 1000);
  const hours = msSinceLast / (60 * 60 * 1000);
  const days = msSinceLast / (24 * 60 * 60 * 1000);

  if (minutes < 5) return 1.05;
  if (minutes < 30) return 1.2;
  if (hours < 6) return 1.35;
  if (hours < 24) return 1.6;
  if (days < 3) return 1.9;
  return 2.1;
}

const PracticeSession = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("welcome");
  const [currentStep, setCurrentStep] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  // const [mastery, setMastery] = useState(0.3);
  // const startMastery = 0.3; // baseline for the session

  const [qIndex, setQIndex] = useState(0);
  const question = mockQuestions[qIndex];

  const topicKey = question.topicKey || "demo_topic";
  const masteryKey = `mastery_${topicKey}`;
  const repeatKey = `repeats_${topicKey}_${question.id}`; // per-question repeats

  const storedMastery = Number(localStorage.getItem(masteryKey) || "0.30");
  const storedRepeats = Number(localStorage.getItem(repeatKey) || "0");

  const [startMastery, setStartMastery] = useState(storedMastery);
  const [mastery, setMastery] = useState(storedMastery);

  const [repeatCount, setRepeatCount] = useState(storedRepeats); // how many times they repeated THIS question
  const [usualGainPct, setUsualGainPct] = useState(0);
  const [bonusGainPct, setBonusGainPct] = useState(0); // only >0 if repeatCount > 0

  const gainPct = Math.round((mastery - startMastery) * 100);

  const handlePracticeAgain = () => {
    const newRepeats = repeatCount + 1;
    setRepeatCount(newRepeats);
    localStorage.setItem(repeatKey, String(newRepeats));

    // Reset session baseline so we measure improvement during this repeat too
    setStartMastery(mastery);

    setPhase("concept");
    setCurrentStep(0);
    setCorrectCount(0);
    setUsualGainPct(0);
    setBonusGainPct(0);
  };

  const handleNextProblem = () => {
    const nextIndex = (qIndex + 1) % mockQuestions.length;
    setQIndex(nextIndex);

    const nextQ = mockQuestions[nextIndex];
    const nextRepeatKey = `repeats_${topicKey}_${nextQ.id}`;
    const nextRepeats = Number(localStorage.getItem(nextRepeatKey) || "0");

    setRepeatCount(nextRepeats);

    // carry mastery forward to next question
    setStartMastery(mastery);

    setPhase("concept");
    setCurrentStep(0);
    setCorrectCount(0);
    setUsualGainPct(0);
    setBonusGainPct(0);
  };

  const handleStepComplete = (correct, hintsUsed = 0) => {
    if (correct) setCorrectCount((c) => c + 1);

    // Usual mastery gain (first exposure learning)
    const baseGain = correct ? 0.02 : 0.005;
    const hintPenalty = Math.min(hintsUsed, 3) * 0.005;
    const gain = Math.max(0, baseGain - hintPenalty);

    setMastery((m) => Math.min(0.7, m + gain));

    if (currentStep < question.steps.length - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 300);
    } else {
      setTimeout(() => setPhase("final"), 300);
    }
  };

  const handleFinalSubmit = () => {
    // compute usual gain from this run
    const usualGain = mastery - startMastery;
    const usualPct = repeatCount === 0 ? Math.round(usualGain * 100) : 0;

    // Improvement bonus only if repeated
    let bonus = 0;
    if (repeatCount > 0) {
      // small extra bonus to reward repetition (spaced repetition can be added later)
      bonus = Math.min(0.08, 0.02 + repeatCount * 0.01); // grows slightly each repeat
    }

    const finalMastery = Math.min(0.95, mastery + bonus);

    setUsualGainPct(usualPct);
    setBonusGainPct(repeatCount > 0 ? Math.round(bonus * 100) : 0);
    setMastery(finalMastery);

    // persist topic mastery
    localStorage.setItem(masteryKey, String(finalMastery));

    // ---- DEMO: problems solved count (only once per question, not on repeat) ----
    const solvedKey = `demo_solved_${topicKey}`; // per topic solved count
    const completedFlag = `demo_completed_${question.id}`; // per question completion flag

    const alreadyCounted = localStorage.getItem(completedFlag) === "1";

    if (!alreadyCounted) {
      const currentSolved = Number(localStorage.getItem(solvedKey) || "0");
      localStorage.setItem(solvedKey, String(currentSolved + 1));
      localStorage.setItem(completedFlag, "1");
    }
    // --------------------------------------------------------------------------

    // --- DEMO: also store gain so Dashboard card updates instantly ---
    const gainFraction = Math.max(0, finalMastery - startMastery); // 0..1
    localStorage.setItem(`demo_mastery_${topicKey}`, String(finalMastery));
    localStorage.setItem(`demo_gain_${topicKey}`, String(gainFraction));
    // ---------------------------------------------------------------

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
                <p className="text-sm text-muted-foreground">
                  Mastery summary (this topic)
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Usual gain
                  </span>
                  <span className="font-bold text-success">
                    +{usualGainPct}%
                  </span>
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Improvement bonus
                  </span>
                  <span
                    className={`font-bold ${bonusGainPct > 0 ? "text-success" : "text-muted-foreground"}`}
                  >
                    {bonusGainPct > 0
                      ? `+${bonusGainPct}%`
                      : "0% (repeat to earn)"}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm font-medium text-foreground">
                    New mastery
                  </span>
                  <span className="font-bold text-primary">
                    {Math.round(mastery * 100)}%
                  </span>
                </div>
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
