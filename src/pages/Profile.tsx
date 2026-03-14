import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, GraduationCap, Flame, Target, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { getUserMastery } from "../data/api.js"; // adjust import path if needed

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [overallMasteryPct, setOverallMasteryPct] = useState<number | null>(
    null,
  );
  const [streakDays, setStreakDays] = useState<number>(() => {
    const val = localStorage.getItem("streak_days");
    return val ? Number(val) : 0;
  });

  const initial = useMemo(() => {
    const c = (name || "U").trim().charAt(0).toUpperCase();
    return c || "U";
  }, [name]);

  useEffect(() => {
    const load = async () => {
      const userId = localStorage.getItem("user_id");
      const storedName = localStorage.getItem("user_name") || "";
      const storedEmail = localStorage.getItem("user_email") || "";
      const storedClass = localStorage.getItem("class_level") || "";

      if (!userId) {
        toast({
          title: "Session missing",
          description: "Please register again.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setName(storedName);
      setEmail(storedEmail);
      setClassLevel(storedClass);

      try {
        const data = await getUserMastery(userId);

        const masteryList = data.mastery || [];
        if (masteryList.length === 0) {
          setOverallMasteryPct(0);
          return;
        }

        // mastery_prob is already returned as a percentage (e.g. 62.4)
        const avg =
          masteryList.reduce(
            (sum: number, r) => sum + (r.mastery_prob ?? 0),
            0,
          ) / masteryList.length;

        setOverallMasteryPct(avg);
      } catch (err) {
        setOverallMasteryPct(0);
        toast({
          title: "Could not load mastery",
          description: err?.message || "Please try again.",
          variant: "destructive",
        });
      }
    };

    load();
  }, [navigate, toast]);

  const handleLogout = () => {
    // Clear only your app keys (cleaner than localStorage.clear())
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("class_level");
    localStorage.removeItem("current_problem");
    localStorage.removeItem("streak_days");
    localStorage.removeItem("last_practice_date");

    toast({ title: "Logged out", description: "See you next time!" });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-8 shadow-card"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-2xl font-bold text-primary-foreground">
              {initial}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {name || "Student"}
              </h1>
              <p className="text-muted-foreground">
                Class {classLevel || "—"} Student
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: email || "—" },
              {
                icon: GraduationCap,
                label: "Class Level",
                value: classLevel || "—",
              },
              {
                icon: Target,
                label: "Overall Mastery",
                value:
                  overallMasteryPct === null
                    ? "Loading..."
                    : `${Math.round(overallMasteryPct)}%`,
              },
              {
                icon: Flame,
                label: "Current Streak",
                value: `${streakDays} days`, // placeholder until we update streak on practice submits
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-border p-4"
              >
                <item.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 px-4 py-3 font-medium text-destructive transition-colors hover:bg-destructive/5"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
