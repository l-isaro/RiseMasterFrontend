import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface PracticeWelcomeCardProps {
  topicName: string;
  onContinue: () => void;
}

const PracticeWelcomeCard = ({
  topicName,
  onContinue,
}: PracticeWelcomeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-7 shadow-card"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Quick warm-up</h2>
          <p className="text-sm text-muted-foreground">
            Today’s topic:{" "}
            <span className="font-semibold text-foreground">{topicName}</span>
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-secondary/40 p-4 text-sm text-foreground/80">
        <p className="mb-2 font-medium text-foreground">What you’ll do:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Get a short explanation (no pressure)</li>
          <li>Answer 2 quick multiple-choice checks</li>
          <li>Solve the problem step-by-step with hints</li>
        </ul>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3 text-base font-semibold text-primary-foreground"
      >
        Let’s begin <ArrowRight className="h-5 w-5" />
      </motion.button>
    </motion.div>
  );
};

export default PracticeWelcomeCard;
