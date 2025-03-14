
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";

interface AddPlayerFormProps {
  onAddPlayer: (name: string) => void;
  disabled?: boolean;
}

const AddPlayerForm = ({ onAddPlayer, disabled }: AddPlayerFormProps) => {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onAddPlayer(playerName.trim());
      setPlayerName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto">
      <Input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter player name"
        className="flex-1"
        disabled={disabled}
      />
      <Button 
        type="submit" 
        disabled={!playerName.trim() || disabled}
        className="primary-button"
      >
        <UserPlus size={16} className="mr-2" />
        Add Player
      </Button>
    </form>
  );
};

export default AddPlayerForm;
