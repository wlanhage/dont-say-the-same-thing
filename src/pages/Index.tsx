
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type JoinGameFormData = {
  name: string;
  gameCode: string;
};

const Index = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  
  const { register, handleSubmit, formState: { errors } } = useForm<JoinGameFormData>();

  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      toast.error("Please enter your name to create a game");
      return;
    }
    
    // Store player name and navigate to game page
    localStorage.setItem("playerName", playerName);
    navigate("/game");
  };
  
  const onJoinGame = (data: JoinGameFormData) => {
    if (!data.gameCode.trim()) {
      toast.error("Please enter a game code");
      return;
    }
    
    // Store player name and navigate to game page with code
    localStorage.setItem("playerName", data.name);
    localStorage.setItem("gameCode", data.gameCode);
    navigate(`/game?code=${data.gameCode}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/30 px-4 py-12">
      <div className="w-full max-w-md mx-auto glass-card">
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center mb-4">
            <Sparkles className="text-primary mr-2" size={24} />
            <h1 className="text-3xl font-bold">Don't Say The Same Thing As Me</h1>
            <Sparkles className="text-primary ml-2" size={24} />
          </div>
          <p className="text-muted-foreground text-center">
            The party game where being different is the key to victory!
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Create Game Form */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Create a New Game</h2>
            <form onSubmit={handleCreateGame} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Create Game
              </Button>
            </form>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground/30" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-2 text-xs text-muted-foreground bg-card">OR</span>
            </div>
          </div>
          
          {/* Join Game Form */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Join a Game</h2>
            <form onSubmit={handleSubmit(onJoinGame)} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full mb-2"
                />
                {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Enter game code"
                  {...register("gameCode", { required: "Game code is required" })}
                  className="w-full mb-2"
                />
                {errors.gameCode && <p className="text-destructive text-sm">{errors.gameCode.message}</p>}
              </div>
              <Button type="submit" variant="outline" className="w-full">
                Join Game
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
