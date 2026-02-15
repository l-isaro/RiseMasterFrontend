import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ConceptIntroCardProps {
  title: string;
  intro: string;
  onStart: () => void;
}

const ConceptIntroCard = ({ title, intro, onStart }: ConceptIntroCardProps) => {
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
        <h2 className="text-2xl font-bold text-foreground">{title} — no need to panic!</h2>
      </div>

      <p className="mb-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>

      <p className="mb-6 text-base text-foreground/80">
        Don't worry if it looks confusing — we'll go through it together step by step. Ready? 💪
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="w-full rounded-xl gradient-primary px-6 py-3.5 text-lg font-semibold text-primary-foreground shadow-sm transition-shadow hover:shadow-md"
      >
        Okay, show me the steps! 🚀
      </motion.button>
    </motion.div>
  );
};

export default ConceptIntroCard;
