
import { useEffect, useState } from "react";
import { useGameStore } from "@/utils/gameLogic";
import { AnimatePresence, motion } from "framer-motion";
import PlayerCard from "./PlayerCard";
import AddPlayerForm from "./AddPlayerForm";
import GameControls from "./GameControls";
import PromptDisplay from "./PromptDisplay";
import { Sparkles, Trophy } from "lucide-react";

const GameContainer = () => {
  const {
    players,
    addPlayer,
    removePlayer,
    gameActive,
    gamePhase,
    roundNumber,
    currentPrompt,
    categoryName,
    submitAnswer,
  } = useGameStore();

  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's only one non-eliminated player left
    const activePlayers = players.filter((p) => !p.eliminated);
    
    if (gameActive && activePlayers.length === 1 && players.length > 1) {
      setWinner(activePlayers[0].name);
    } else {
      setWinner(null);
    }
  }, [players, gameActive]);

  const getPhaseMessage = () => {
    switch (gamePhase) {
      case "setup":
        return "Add players to start the game";
      case "selection":
        return "Player selected! Get ready for the prompt";
      case "answering":
        return "Everyone provide an answer";
      case "results":
        return "Round results";
      default:
        return "";
    }
  };

  const showAnswerInput = gamePhase === "answering";
  const showResults = gamePhase === "results";

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center mb-2">
          <Sparkles className="text-primary mr-2" size={24} />
          <h1 className="text-4xl font-bold">Don't Say The Same Thing As Me</h1>
          <Sparkles className="text-primary ml-2" size={24} />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          One player is randomly selected each round. Everyone must respond to the prompt, but if you give the same answer as the selected player, you're out!
        </p>
      </motion.div>

      {!gameActive && (
        <AddPlayerForm 
          onAddPlayer={addPlayer} 
          disabled={gameActive} 
        />
      )}

      <AnimatePresence mode="wait">
        {gameActive && (
          <motion.div
            key="game-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-between items-center mb-4 px-4 py-2 glass-card rounded-xl"
          >
            <div>
              <span className="text-sm font-medium text-muted-foreground">Round</span>
              <h3 className="text-xl font-bold">{roundNumber}</h3>
            </div>
            <div>
              <h3 className="text-xl font-medium text-center">{getPhaseMessage()}</h3>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Players Left</span>
              <h3 className="text-xl font-bold">{players.filter(p => !p.eliminated).length} / {players.length}</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {winner && (
          <motion.div
            key="winner"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="my-6 p-6 glass-card rounded-3xl text-center"
          >
            <Trophy className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">We Have a Winner!</h2>
            <p className="text-3xl font-medium text-primary">{winner}</p>
            <p className="mt-2 text-muted-foreground">
              Congratulations! You're the last player standing.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPrompt && (
          <PromptDisplay
            prompt={currentPrompt}
            category={categoryName}
          />
        )}
      </AnimatePresence>

      <GameControls />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <AnimatePresence>
          {players.map((player) => (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <PlayerCard
                player={player}
                onRemove={!gameActive ? removePlayer : undefined}
                onSubmitAnswer={submitAnswer}
                gameActive={gameActive}
                showAnswerInput={showAnswerInput}
                showResults={showResults}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {players.length === 0 && (
        <div className="text-center my-12 text-muted-foreground">
          <p>Add players to get started!</p>
        </div>
      )}
    </div>
  );
};

export default GameContainer;
