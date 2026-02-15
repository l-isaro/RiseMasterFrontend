import { motion } from "framer-motion";
import { TrendingUp, Flame, Target, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockUser, mockTopics } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import MasteryRing from "@/components/MasteryRing";
import TopicCard from "@/components/TopicCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const bestTopic = [...mockTopics].sort((a, b) => b.gain - a.gain)[0];

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
            Hey {mockUser.name}! Ready to level up?
          </h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Let's keep that streak going. you're doing amazing!
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: TrendingUp,
              label: "Overall Gain",
              value: `+${Math.round(mockUser.overallGain * 100)}%`,
              sublabel: "since you started",
              bgClass: "bg-primary/10 text-primary",
            },
            {
              icon: Target,
              label: "Mastery",
              value: `${Math.round(mockUser.overallMastery * 100)}%`,
              sublabel: "across all topics",
              bgClass: "bg-success/10 text-success",
            },
            {
              icon: Flame,
              label: "Streak",
              value: `${mockUser.streak} days`,
              sublabel: "keep it up!",
              bgClass: "bg-accent/10 text-accent",
            },
            {
              icon: Sparkles,
              label: "Problems Solved",
              value: mockUser.totalProblems.toString(),
              sublabel: "and counting",
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
              <div className={`mb-3 inline-flex rounded-lg p-2 ${stat.bgClass}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        {/* Biggest win + CTA */}
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6 rounded-xl border border-success/30 bg-success/5 p-6"
          >
            <MasteryRing value={bestTopic.mastery} size={90} strokeWidth={8} showPercentage />
            <div>
              <p className="text-sm font-medium text-success">Biggest win this week</p>
              <p className="text-xl font-bold text-foreground">
                {bestTopic.name}: +{Math.round(bestTopic.gain * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">You're on fire! Keep pushing</p>
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
              onClick={() => navigate("/practice")}
              className="rounded-xl bg-card px-8 py-3 text-lg font-bold text-primary shadow-sm transition-shadow hover:shadow-md"
            >
              Start Practice
            </motion.button>
          </motion.div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">Your Topics</h2>
          <p className="text-sm text-muted-foreground">Pick a topic to practice — every little bit counts!</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockTopics.map((topic, i) => (
            <TopicCard key={topic.id} topic={topic} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
