import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Topic } from "@/types";
import { useNavigate } from "react-router-dom";

interface TopicCardProps {
  topic: Topic;
  index: number;
}

const TopicCard = ({ topic, index }: TopicCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to practice with the topic id as a query param
    navigate(`/practice?topic=${encodeURIComponent(topic.id)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onClick={handleClick}
      className="group cursor-pointer rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{topic.name}</h3>
      </div>

      <div className="mb-3">
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-muted-foreground">Mastery</span>
          <span className="font-medium text-foreground">
            {Math.round(topic.mastery * 100)}%
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${topic.mastery * 100}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
          Start practicing →
        </p>
      </div>
    </motion.div>
  );
};

export default TopicCard;
