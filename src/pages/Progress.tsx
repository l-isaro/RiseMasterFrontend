import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import MasteryRing from "@/components/MasteryRing";
import { getUserMastery } from "../data/api.js"; // adjust if your api path differs
import { useToast } from "@/hooks/use-toast";

type TopicRow = {
  id: string;
  name: string;
  mastery: number; // 0..1
  gain: number; // can be negative/positive, 0..1-ish
  interactionsCount: number;
};

const Progress = () => {
  const { toast } = useToast();

  const [topics, setTopics] = useState<TopicRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          setError("No user found. Please register again.");
          setLoading(false);
          return;
        }

        const data = await getUserMastery(userId);
        const masteryList = data.mastery || [];

        const formatted: TopicRow[] = masteryList.map((m) => ({
          id: m.skill_name,
          name: formatSkillName(m.skill_name),
          mastery: clamp01((m.mastery_prob ?? 0) / 100),
          gain: (m.delta ?? 0) / 100,
          interactionsCount: m.interactions_count ?? 0,
        }));

        // ---- DEMO injection (localStorage fallback) ----
        const DEMO_SKILL = "geometric_progression"; // <-- match your demo topicKey/skill_name

        const demoMastery = Number(
          localStorage.getItem(`demo_mastery_${DEMO_SKILL}`) || "0",
        );
        const demoGain = Number(
          localStorage.getItem(`demo_gain_${DEMO_SKILL}`) || "0",
        );

        if (demoMastery > 0) {
          const idx = formatted.findIndex((t) => t.id === DEMO_SKILL);

          const demoRow: TopicRow = {
            id: DEMO_SKILL,
            name: "Sequences", // or "Geometric Progression" if you prefer
            mastery: clamp01(demoMastery),
            gain: demoGain,
            interactionsCount: Math.max(
              1,
              idx >= 0 ? formatted[idx].interactionsCount : 1,
            ),
          };

          if (idx >= 0) {
            // Override existing backend entry with demo values
            formatted[idx] = { ...formatted[idx], ...demoRow };
          } else {
            // Insert at top so it's visible
            formatted.unshift(demoRow);
          }
        }
        // -----------------------------------------------

        setTopics(formatted);

        setTopics(formatted);
      } catch (err) {
        const msg = err?.message || "Failed to load progress.";
        setError(msg);

        toast({
          title: "Could not load progress",
          description: msg,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [toast]);

  const overallMastery = useMemo(() => {
    if (topics.length === 0) return 0;
    const avg = topics.reduce((sum, t) => sum + t.mastery, 0) / topics.length;
    return clamp01(avg);
  }, [topics]);

  const overallGain = useMemo(() => {
    if (topics.length === 0) return 0;
    // Demo-friendly: average gain across skills
    return topics.reduce((sum, t) => sum + t.gain, 0) / topics.length;
  }, [topics]);

  const totalSolved = useMemo(() => {
    // DEMO: start at 0 and only become 1 after first completed demo problem
    const DEMO_SKILL = "geometric_progression"; // must match topicKey
    return Number(localStorage.getItem(`demo_solved_${DEMO_SKILL}`) || "0");
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-muted-foreground">Loading progress...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Your Progress 📈
          </h1>
          <p className="text-red-500">{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-1 text-3xl font-bold text-foreground">
            Your Progress
          </h1>
          <p className="mb-8 text-muted-foreground">
            Look how far you've come — every step matters!
          </p>
        </motion.div>

        {/* Overall stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center rounded-xl border border-border bg-card p-6 shadow-card"
          >
            <MasteryRing
              value={overallMastery}
              size={140}
              strokeWidth={12}
              label="Overall Mastery"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 shadow-card"
          >
            <div className="mb-2 inline-flex rounded-xl bg-success/10 p-3 text-success">
              <TrendingUp className="h-8 w-8" />
            </div>
            <p className="text-4xl font-bold text-foreground">
              {formatSignedPercent(overallGain)}
            </p>
            <p className="text-sm text-muted-foreground">Total Improvement</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 shadow-card"
          >
            <div className="mb-2 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
              <CheckCircle className="h-8 w-8" />
            </div>
            <p className="text-4xl font-bold text-foreground">{totalSolved}</p>
            <p className="text-sm text-muted-foreground">
              {/** This is closer to "Steps Completed" in your data model */}
              Problems Solved
            </p>
          </motion.div>
        </div>

        {/* Topic breakdown */}
        <h2 className="mb-4 text-xl font-bold text-foreground">
          Topic Breakdown
        </h2>

        {topics.length === 0 ? (
          <p className="text-muted-foreground">
            No mastery data yet. Try practicing a problem first.
          </p>
        ) : (
          <div className="space-y-3">
            {topics.map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Target className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">
                      {topic.name}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {Math.round(topic.mastery * 100)}%
                    </span>
                  </div>

                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full gradient-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${topic.mastery * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08 }}
                    />
                  </div>
                </div>

                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    topic.gain >= 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                  {formatSignedPercent(topic.gain)}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

function formatSkillName(skillName: string) {
  return skillName
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function formatSignedPercent(value: number) {
  const pct = Math.round(value * 100);
  return `${pct >= 0 ? "+" : ""}${pct}%`;
}

export default Progress;
