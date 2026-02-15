import { motion } from "framer-motion";
import { User, Mail, GraduationCap, Flame, Target, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockUser } from "@/data/mockData";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const navigate = useNavigate();

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
              {mockUser.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{mockUser.name}</h1>
              <p className="text-muted-foreground">Class {mockUser.classLevel} Student</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: mockUser.email },
              { icon: GraduationCap, label: "Class Level", value: mockUser.classLevel },
              { icon: Target, label: "Overall Mastery", value: `${Math.round(mockUser.overallMastery * 100)}%` },
              { icon: Flame, label: "Current Streak", value: `${mockUser.streak} days` },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-lg border border-border p-4">
                <item.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/")}
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
