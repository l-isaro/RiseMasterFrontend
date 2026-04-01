import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, Sparkles, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TopicCard from "@/components/TopicCard";
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

const Dashboard = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Student");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedName = localStorage.getItem("user_name");
      if (storedName) setUserName(storedName);

      const mergedTopics = mockTopics.map((t) => {
        const bktMastery = getMastery(t.id);
        const improvement = getImprovement(t.id);
        const interactionsCount = getInteractionCount(t.id);

        return {
          id: t.id,
          name: t.name,
          icon: t.icon,
          mastery: bktMastery,
          gain: improvement,
          color: t.color,
          interactionsCount,
          availableCount: 3,
        };
      });

      setTopics(mergedTopics);
      setLoading(false);
    }, SIMULATED_FETCH_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const allTopicIds = useMemo(() => mockTopics.map((t) => t.id), []);
  const growth: GrowthBreakdown = useMemo(
    () => getGrowthGrade(allTopicIds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topics, allTopicIds],
  );

  const overallMastery =
    topics.length > 0
      ? topics.reduce((sum, topic) => sum + topic.mastery, 0) / topics.length
      : 0;

  const overallGain =
    topics.length > 0
      ? topics.reduce((sum, topic) => sum + topic.gain, 0) / topics.length
      : 0;

  const totalProblems = useMemo(
    () => getTotalProblemsCompleted(allTopicIds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topics, allTopicIds],
  );

  const bestTopic = useMemo(() => {
    if (topics.length === 0) return null;
    return [...topics].sort((a, b) => b.gain - a.gain)[0];
  }, [topics]);

  const handleStartPractice = () => {
    navigate("/practice");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-8">
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
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">
            Hey {userName.split(" ")[0]}! Ready to level up?
          </h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Let's keep that streak going. you're doing amazing!
          </p>
        </motion.div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Award,
              label: "Improvement Grade",
              value:
                growth.grade > 0 ? `${growth.letter} (${growth.grade}%)` : "—",
              sublabel: "growth, consistency & effort",
              bgClass: "bg-accent/10 text-accent",
            },
            {
              icon: Target,
              label: "Overall Mastery",
              value: `${Math.round(growth.masteryGrowth * 100)}%`,
              sublabel: "across all topics",
              bgClass: "bg-success/10 text-success",
            },
            {
              icon: TrendingUp,
              label: "Improvement",
              value: `+${Math.round(overallGain * 100)}%`,
              sublabel: "mastery gained from practice",
              bgClass: "bg-primary/10 text-primary",
            },
            {
              icon: Sparkles,
              label: "Problems Solved",
              value: totalProblems.toString(),
              sublabel: "completed practice problems",
              bgClass: "bg-primary/10 text-primary",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <div
                className={`mb-3 inline-flex rounded-lg p-2 ${stat.bgClass}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col items-center justify-center rounded-xl gradient-primary p-6 text-center"
          >
            <h3 className="mb-2 text-xl font-bold text-primary-foreground">
              Ready for a challenge?
            </h3>
            <p className="mb-4 text-sm text-primary-foreground/80">
              Practice with real REB exam questions and watch your mastery grow!
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStartPractice}
              className="rounded-xl bg-card px-8 py-3 text-lg font-bold text-primary shadow-sm transition-shadow hover:shadow-md"
            >
              Start Practice
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center"
          >
            <div className="mb-2 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="mb-1 text-xl font-bold text-foreground">
              {growth.grade > 0
                ? `Grade: ${growth.letter} — ${growth.grade}/100`
                : "No grade yet"}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              See the full breakdown of your mastery, consistency, persistence &
              breadth.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/progress")}
              className="rounded-xl border border-border px-8 py-3 text-lg font-bold text-foreground transition-colors hover:bg-secondary"
            >
              View Progress
            </motion.button>
          </motion.div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">Your Topics</h2>
          <p className="text-sm text-muted-foreground">
            Pick a topic to practice. every little bit counts!
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, i) => (
            <TopicCard key={topic.id} topic={topic} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
