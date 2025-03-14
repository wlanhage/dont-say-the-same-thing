
import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/utils/gameLogic";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AlertCircle } from "lucide-react";

const PlayerAnswerView = () => {
  const { players, submitAnswer } = useGameStore();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  
  const activePlayers = players.filter(p => !p.eliminated);
  const currentPlayer = activePlayers[currentPlayerIndex];
  const selectedPlayer = players.find(p => p.isSelected);
  
  const isLastPlayer = currentPlayerIndex === activePlayers.length - 1;
  const isSelectedPlayerTurn = currentPlayer?.id === selectedPlayer?.id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPlayer || !answer.trim()) return;
    
    submitAnswer(currentPlayer.id, answer);
    setAnswer("");
    
    if (!isLastPlayer) {
      setCurrentPlayerIndex(prev => prev + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto my-8"
    >
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {currentPlayer?.name}'s Turn
        </h2>
        
        {isSelectedPlayerTurn && (
          <div className="bg-amber-100 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="text-amber-500 mr-3 mt-0.5 shrink-0" size={20} />
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-300">You are the selected player!</p>
              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                Choose your answer carefully. Other players will be eliminated if they match your answer.
              </p>
            </div>
          </div>
        )}
        
        {!isSelectedPlayerTurn && (
          <div className="bg-blue-100 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="text-blue-500 mr-3 mt-0.5 shrink-0" size={20} />
            <div>
              <p className="font-medium text-blue-800 dark:text-blue-300">Don't match the selected player!</p>
              <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                Avoid giving the same answer as the selected player or you'll be eliminated.
              </p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="answer" className="block text-sm font-medium mb-1">
              Your Answer:
            </label>
            <Input
              id="answer"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full"
              autoFocus
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full primary-button"
          >
            {isLastPlayer ? "Submit Final Answer" : "Next Player"}
          </Button>
        </form>
        
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            {activePlayers.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx < currentPlayerIndex 
                    ? "bg-primary" 
                    : idx === currentPlayerIndex 
                    ? "bg-primary animate-pulse" 
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerAnswerView;
