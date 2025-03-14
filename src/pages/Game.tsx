
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GameContainer from "@/components/GameContainer";

const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const gameCode = queryParams.get("code") || localStorage.getItem("gameCode");
  const playerName = localStorage.getItem("playerName");

  useEffect(() => {
    // Redirect to landing page if no player name
    if (!playerName) {
      navigate("/");
    }
  }, [navigate, playerName]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 px-4 py-8">
      <GameContainer gameCode={gameCode} playerName={playerName || ""} />
    </div>
  );
};

export default Game;
