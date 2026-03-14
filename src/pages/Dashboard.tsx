import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Flame, Target, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MasteryRing from "@/components/MasteryRing";
import TopicCard from "@/components/TopicCard";
import {
  getUserMastery,
  getNextProblem,
  getTopics,
  getUserStats,
} from "../data/api.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Student");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [solved, setSolved] = useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const storedName = localStorage.getItem("user_name");

        if (storedName) setUserName(storedName);

        if (!userId) {
          setError("No user found. Please register first.");
          setLoading(false);
          return;
        }

        // Load in parallel
        const [topicsRes, masteryRes, statsRes] = await Promise.allSettled([
          getTopics(userId),
          getUserMastery(userId),
          getUserStats(userId),
        ]);

        // Topics are the base list
        let availableTopics = [];
        if (topicsRes.status === "fulfilled") {
          availableTopics = topicsRes.value.topics || [];
          // DEMO: ensure GP appears even if DB seed is missing it
          const demoSkill = "geometric_progression";
          const alreadyHasDemo = availableTopics.some(
            (t) => t.skill_name === demoSkill,
          );

          if (!alreadyHasDemo) {
            availableTopics.unshift({
              topic: "Sequences",
              skill_name: demoSkill,
              available_count: 2,
            });
          }
        } else {
          throw new Error(topicsRes.reason?.message || "Failed to load topics");
        }

        console.log("Available topics:", availableTopics);

        // Mastery is optional (might be empty)
        const masteryList =
          masteryRes.status === "fulfilled"
            ? masteryRes.value.mastery || []
            : [];

        // Build a lookup by skill_name
        const masteryBySkill = {};
        for (const m of masteryList) {
          masteryBySkill[m.skill_name] = m;
        }

        // Merge into topic cards
        const mergedTopics = availableTopics.map((t, index) => {
          const m = masteryBySkill[t.skill_name];

          const demoMastery = Number(
            localStorage.getItem(`demo_mastery_${t.skill_name}`) || "0",
          );
          const demoGain = Number(
            localStorage.getItem(`demo_gain_${t.skill_name}`) || "0",
          );

          const masteryValue =
            m?.mastery_prob != null ? m.mastery_prob / 100 : demoMastery;

          const gainValue = m?.delta != null ? m.delta / 100 : demoGain;

          return {
            id: `${t.skill_name}-${index}`,
            name: t.topic || formatSkillName(t.skill_name), // show "Calculus" etc.
            skill_name: t.skill_name,
            mastery: masteryValue,
            gain: gainValue,
            interactionsCount: m?.interactions_count ?? 0,
            availableCount: t.available_count ?? 0,
          };
        });

        setTopics(mergedTopics);

        // Stats endpoint (for problems solved)
        if (statsRes.status === "fulfilled") {
          setSolved(statsRes.value.problems_solved || 0);
        } else {
          setSolved(0);
        }
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const overallMastery =
    topics.length > 0
      ? topics.reduce((sum, topic) => sum + topic.mastery, 0) / topics.length
      : 0;

  const overallGain =
    topics.length > 0
      ? topics.reduce((sum, topic) => sum + topic.gain, 0) / topics.length
      : 0;

  const totalProblems = topics.reduce(
    (sum, topic) => sum + (topic.interactionsCount || 0),
    0,
  );

  const bestTopic = useMemo(() => {
    if (topics.length === 0) return null;
    return [...topics].sort((a, b) => b.gain - a.gain)[0];
  }, [topics]);

  const handleStartPractice = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        alert("No user found. Please register first.");
        return;
      }

      const problem = await getNextProblem(userId);
      localStorage.setItem("current_problem", JSON.stringify(problem));
      navigate("/practice");
    } catch (err) {
      alert(err.message || "Could not start practice");
    }
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
              icon: TrendingUp,
              label: "Overall Gain",
              value: `+${Math.round(overallGain * 100)}%`,
              sublabel: "from mastery data",
              bgClass: "bg-primary/10 text-primary",
            },
            {
              icon: Target,
              label: "Mastery",
              value: `${Math.round(overallMastery * 100)}%`,
              sublabel: "across all topics",
              bgClass: "bg-success/10 text-success",
            },
            {
              icon: Flame,
              label: "Streak",
              value: `0 days`,
              sublabel: "placeholder for now",
              bgClass: "bg-accent/10 text-accent",
            },
            {
              icon: Sparkles,
              label: "Problems Solved",
              value: solved.toString(),
              sublabel: "distinct correct problems",
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
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6 rounded-xl border border-success/30 bg-success/5 p-6"
          >
            <MasteryRing
              value={bestTopic ? bestTopic.mastery : 0}
              size={90}
              strokeWidth={8}
              showPercentage
            />
            <div>
              <p className="text-sm font-medium text-success">
                Biggest win so far
              </p>
              <p className="text-xl font-bold text-foreground">
                {bestTopic
                  ? `${bestTopic.name}: +${Math.round(bestTopic.gain * 100)}%`
                  : "No mastery data yet"}
              </p>
              <p className="text-sm text-muted-foreground">
                Keep practicing to grow your mastery
              </p>
            </div>
          </motion.div>

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
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">Your Topics</h2>
          <p className="text-sm text-muted-foreground">
            Pick a topic to practice — every little bit counts!
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

function formatSkillName(skillName) {
  return skillName
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default Dashboard;
