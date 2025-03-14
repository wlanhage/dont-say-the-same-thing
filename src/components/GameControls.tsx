
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/utils/gameLogic";
import { getRandomPrompt } from "@/utils/prompts";
import { Play, RotateCcw, ArrowRight } from "lucide-react";

const GameControls = () => {
  const {
    players,
    gameActive,
    gamePhase,
    startGame,
    endGame,
    nextRound,
    setPrompt,
  } = useGameStore();

  const handleStartGame = () => {
    startGame();
  };

  const handleEndGame = () => {
    endGame();
  };

  const handleNextRound = () => {
    nextRound();
  };

  const handleRevealPrompt = () => {
    const { prompt, category } = getRandomPrompt();
    setPrompt(prompt, category);
  };

  const activePlayers = players.filter((p) => !p.eliminated);
  const hasEnoughPlayers = players.length >= 2;
  const isLastPlayerStanding = activePlayers.length < 2 && gameActive;

  return (
    <div className="flex flex-wrap justify-center gap-4 my-6">
      {!gameActive && (
        <Button
          className="primary-button"
          onClick={handleStartGame}
          disabled={!hasEnoughPlayers}
        >
          <Play size={16} className="mr-2" />
          Start Game
        </Button>
      )}

      {gameActive && (
        <Button
          className="outline-button"
          onClick={handleEndGame}
          variant="outline"
        >
          <RotateCcw size={16} className="mr-2" />
          End Game
        </Button>
      )}

      {gamePhase === "selection" && gameActive && (
        <Button
          className="primary-button animate-pulse-soft"
          onClick={handleRevealPrompt}
        >
          Reveal Prompt
        </Button>
      )}

      {gamePhase === "results" && gameActive && (
        <Button
          className="primary-button"
          onClick={handleNextRound}
        >
          {isLastPlayerStanding ? (
            "End Game"
          ) : (
            <>
              <ArrowRight size={16} className="mr-2" />
              Next Round
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default GameControls;
