import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../data/api.js";
import { useToast } from "@/hooks/use-toast.js";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Missing info",
        description: "Enter your email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const user = await loginUser({
        email: email || undefined,
        password: password || undefined,
      });

      localStorage.setItem("user_id", user.user_id);
      localStorage.setItem("user_name", user.name);
      localStorage.setItem("user_email", user.email); // use backend returned email
      localStorage.setItem("class_level", user.class_level);

      toast({
        title: "Welcome back!",
        description: `Logged in as ${user.name}.`,
      });

      navigate("/dashboard");
    } catch (err) {
      toast({
        title: "Login failed",
        description: err?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card"
      >
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
            <BookOpen className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            RISE<span className="text-primary">MASTER</span>
          </h1>
          <p className="mt-2 text-center text-base text-muted-foreground">
            Log in to continue learning
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alice@example.com"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          {/* Button with loading */}
          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3.5 text-lg font-semibold text-primary-foreground shadow-sm ${
              isLoading ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Continue <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
          {/* Link to register */}
          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="font-semibold text-primary hover:underline"
            >
              Create one
            </button>
          </p>{" "}
          <p className="text-center text-xs text-muted-foreground/60">
            By continuing, you agree to our{" "}
            <button
              type="button"
              onClick={() => navigate("/terms")}
              className="underline hover:text-muted-foreground"
            >
              Terms of Use
            </button>
          </p>{" "}
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
