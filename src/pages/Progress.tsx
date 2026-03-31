import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, Award, Zap, LayoutGrid } from "lucide-react";
import Navbar from "@/components/Navbar";
import MasteryRing from "@/components/MasteryRing";
import { mockTopics } from "@/data/mockData";
import {
  getMastery,
  getImprovement,
  getInteractionCount,
  getGrowthGrade,
  getTotalProblemsCompleted,
  type GrowthBreakdown,
} from "@/lib/bkt";

const SIMULATED_FETCH_DELAY_MS = 450;

type TopicRow = {
  id: string;
  name: string;
  mastery: number; // 0..1
  gain: number; // 0..1
  interactionsCount: number;
};

const Progress = () => {
  const [topics, setTopics] = useState<TopicRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const loadedTopics = mockTopics.map((t) => {
        const bktMastery = getMastery(t.id);
        const improvement = getImprovement(t.id);
        const interactionsCount = getInteractionCount(t.id);
        return {
          id: t.id,
          name: t.name,
          mastery: bktMastery,
          gain: improvement,
          interactionsCount,
        };
      });

      setTopics(loadedTopics);
      setLoading(false);
    }, SIMULATED_FETCH_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const allTopicIds = useMemo(() => mockTopics.map((t) => t.id), []);
  const growth: GrowthBreakdown = useMemo(
    () => getGrowthGrade(allTopicIds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allTopicIds, topics],
  );

  const overallMastery = useMemo(() => {
    if (topics.length === 0) return 0;
    return topics.reduce((sum, t) => sum + t.mastery, 0) / topics.length;
  }, [topics]);

  const totalProblems = useMemo(
    () => getTotalProblemsCompleted(allTopicIds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allTopicIds, topics],
  );

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

        {/* Top stats row */}
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
            <div className="mb-2 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
              <Award className="h-8 w-8" />
            </div>
            <p className="text-4xl font-bold text-foreground">
              {growth.grade > 0 ? `${growth.letter}` : "—"}
            </p>
            <p className="text-sm text-muted-foreground">Improvement Grade</p>
            {growth.grade > 0 && (
              <p className="text-xs text-muted-foreground">
                {growth.grade}/100
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 shadow-card"
          >
            <div className="mb-2 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
              <TrendingUp className="h-8 w-8" />
            </div>
            <p className="text-4xl font-bold text-foreground">
              {totalProblems}
            </p>
            <p className="text-sm text-muted-foreground">Problems Completed</p>
          </motion.div>
        </div>

        {/* Improvement breakdown */}
        <h2 className="mb-4 text-xl font-bold text-foreground">
          Improvement Breakdown
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              icon: TrendingUp,
              label: "Mastery Growth",
              value: growth.masteryGrowth,
              desc: "How well you've learned",
              weight: "40%",
            },
            {
              icon: Zap,
              label: "Consistency",
              value: growth.consistency,
              desc: "Practice regularly",
              weight: "20%",
            },
            {
              icon: Target,
              label: "Persistence",
              value: growth.persistence,
              desc: "Retry & use fewer hints",
              weight: "20%",
            },
            {
              icon: LayoutGrid,
              label: "Breadth",
              value: growth.breadth,
              desc: "Try all topics",
              weight: "20%",
            },
          ].map((dim, i) => (
            <motion.div
              key={dim.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="rounded-xl border border-border bg-card p-4 shadow-card"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="inline-flex rounded-lg bg-primary/10 p-1.5 text-primary">
                  <dim.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {dim.label}
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {dim.weight}
                </span>
              </div>
              <div className="mb-1 h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round(dim.value * 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{dim.desc}</p>
                <span className="text-sm font-bold text-foreground">
                  {Math.round(dim.value * 100)}%
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Topic breakdown */}
        <h2 className="mb-4 text-xl font-bold text-foreground">
          Topic Breakdown
        </h2>

        {topics.every((t) => t.interactionsCount === 0) ? (
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

                <div className="flex flex-col items-end text-sm">
                  <span
                    className={`font-semibold ${
                      topic.gain > 0 ? "text-success" : "text-muted-foreground"
                    }`}
                  >
                    {topic.gain > 0 ? `+${Math.round(topic.gain * 100)}%` : "—"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {topic.interactionsCount} steps
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Progress;
