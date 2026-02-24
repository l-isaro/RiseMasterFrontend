import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, Target } from "lucide-react";
import { mockUser, mockTopics } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import MasteryRing from "@/components/MasteryRing";

const Progress = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-1 text-3xl font-bold text-foreground">Your Progress 📈</h1>
          <p className="mb-8 text-muted-foreground">Look how far you've come — every step matters!</p>
        </motion.div>

        {/* Overall stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center rounded-xl border border-border bg-card p-6 shadow-card"
          >
            <MasteryRing value={mockUser.overallMastery} size={140} strokeWidth={12} label="Overall Mastery" />
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
            <p className="text-4xl font-bold text-foreground">+{Math.round(mockUser.overallGain * 100)}%</p>
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
            <p className="text-4xl font-bold text-foreground">{mockUser.totalProblems}</p>
            <p className="text-sm text-muted-foreground">Problems Solved</p>
          </motion.div>
        </div>

        {/* Topic breakdown */}
        <h2 className="mb-4 text-xl font-bold text-foreground">Topic Breakdown</h2>
        <div className="space-y-3">
          {mockTopics.map((topic, i) => (
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
                  <span className="font-semibold text-foreground">{topic.name}</span>
                  <span className="text-sm font-medium text-foreground">{Math.round(topic.mastery * 100)}%</span>
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
              <div className="flex items-center gap-1 text-sm font-semibold text-success">
                <TrendingUp className="h-3.5 w-3.5" />
                +{Math.round(topic.gain * 100)}%
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Progress;
