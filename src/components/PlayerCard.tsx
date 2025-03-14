
import { Player } from "../utils/gameLogic";
import { cn } from "@/lib/utils";
import { X, User } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  onRemove?: (id: string) => void;
  onSubmitAnswer?: (id: string, answer: string) => void;
  gameActive: boolean;
  showAnswerInput: boolean;
  showResults: boolean;
}

const PlayerCard = ({
  player,
  onRemove,
  onSubmitAnswer,
  gameActive,
  showAnswerInput,
  showResults,
}: PlayerCardProps) => {
  const handleSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const answer = formData.get("answer") as string;
    
    if (answer && onSubmitAnswer) {
      onSubmitAnswer(player.id, answer);
      form.reset();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div
      className={cn(
        "player-card relative h-full",
        player.isSelected && "selected",
        player.eliminated && "eliminated"
      )}
    >
      {!gameActive && onRemove && (
        <button
          onClick={() => onRemove(player.id)}
          className="absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Remove player"
        >
          <X size={16} />
        </button>
      )}
      
      <div className="flex flex-col items-center space-y-3">
        <div className="player-avatar">
          {getInitials(player.name)}
        </div>
        
        <div className="text-center">
          <h3 className="font-medium">{player.name}</h3>
          
          {player.isSelected && (
            <span className="category-chip">Selected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
