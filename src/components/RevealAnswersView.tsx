
import { motion } from "framer-motion";
import { useGameStore } from "@/utils/gameLogic";
import { Check, X } from "lucide-react";

const RevealAnswersView = () => {
  const { players, currentPrompt, categoryName } = useGameStore();
  
  const selectedPlayer = players.find(p => p.isSelected);
  const selectedAnswer = selectedPlayer?.answer || "";
  
  const activePlayers = players.filter(p => !p.eliminated || p.isSelected);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto my-8"
    >
      {currentPrompt && (
        <div className="glass-card mb-8 p-6">
          <h3 className="text-xl font-medium text-center mb-2">The Prompt Was:</h3>
          {categoryName && (
            <div className="category-chip mx-auto mb-3">{categoryName}</div>
          )}
          <h2 className="text-2xl font-bold text-center">{currentPrompt}</h2>
        </div>
      )}

      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-center mb-2">
          Round Results
        </h2>
        
        <div className="mt-8 space-y-8">
          <div className="bg-amber-100/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-amber-800 dark:text-amber-300">
              Selected Player
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="player-avatar-small mr-3">
                  {selectedPlayer?.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="font-medium">{selectedPlayer?.name}</span>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                {selectedAnswer}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-2">Other Players</h3>
            
            {activePlayers
              .filter(p => !p.isSelected)
              .map(player => {
                const isEliminated = player.eliminated;
                const matchesSelectedPlayer = player.answer?.toLowerCase().trim() === selectedAnswer.toLowerCase().trim();
                
                return (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      isEliminated
                        ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30"
                        : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`player-avatar-small mr-3 ${isEliminated ? "opacity-50" : ""}`}>
                        {player.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className={`font-medium ${isEliminated ? "line-through opacity-50" : ""}`}>
                        {player.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm mr-3">
                        {player.answer}
                      </div>
                      
                      {isEliminated && matchesSelectedPlayer ? (
                        <div className="flex items-center text-red-600">
                          <X size={18} className="mr-1" />
                          <span className="text-sm font-medium">Out!</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-green-600">
                          <Check size={18} className="mr-1" />
                          <span className="text-sm font-medium">Safe</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RevealAnswersView;
