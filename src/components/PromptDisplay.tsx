
import { motion } from "framer-motion";

interface PromptDisplayProps {
  prompt: string | null;
  category: string | null;
}

const PromptDisplay = ({ prompt, category }: PromptDisplayProps) => {
  if (!prompt) return null;

  return (
    <motion.div
      className="prompt-card max-w-md mx-auto my-8 glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {category && (
        <div className="category-chip">{category}</div>
      )}
      <h2 className="text-2xl font-medium text-center">{prompt}</h2>
    </motion.div>
  );
};

export default PromptDisplay;
