
import { create } from 'zustand';

export type Player = {
  id: string;
  name: string;
  eliminated: boolean;
  isSelected: boolean;
  answer?: string;
};

export type GameState = {
  players: Player[];
  currentPrompt: string | null;
  gameActive: boolean;
  roundNumber: number;
  gamePhase: 'setup' | 'selection' | 'prompt' | 'answering' | 'results';
  categoryName: string | null;
  
  // Actions
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  selectRandomPlayer: () => void;
  startGame: () => void;
  endGame: () => void;
  setGamePhase: (phase: GameState['gamePhase']) => void;
  submitAnswer: (playerId: string, answer: string) => void;
  evaluateAnswers: () => void;
  nextRound: () => void;
  setPrompt: (prompt: string, category: string) => void;
  resetAnswers: () => void;
  resetEliminatedPlayers: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  currentPrompt: null,
  gameActive: false,
  roundNumber: 0,
  gamePhase: 'setup',
  categoryName: null,
  
  addPlayer: (name) => {
    if (name.trim() === '') return;
    
    set((state) => ({
      players: [
        ...state.players,
        {
          id: Date.now().toString(),
          name,
          eliminated: false,
          isSelected: false,
        },
      ],
    }));
  },
  
  removePlayer: (id) => {
    set((state) => ({
      players: state.players.filter((player) => player.id !== id),
    }));
  },
  
  selectRandomPlayer: () => {
    const { players } = get();
    const activePlayers = players.filter((p) => !p.eliminated);
    
    if (activePlayers.length < 2) return;
    
    const randomIndex = Math.floor(Math.random() * activePlayers.length);
    
    set((state) => ({
      players: state.players.map((player) => ({
        ...player,
        isSelected: player.id === activePlayers[randomIndex].id,
      })),
      gamePhase: 'selection',
    }));
  },
  
  startGame: () => {
    const { players } = get();
    if (players.length < 2) return;
    
    set({
      gameActive: true,
      roundNumber: 1,
      gamePhase: 'selection',
    });
    
    get().selectRandomPlayer();
  },
  
  endGame: () => {
    set({
      gameActive: false,
      roundNumber: 0,
      gamePhase: 'setup',
      currentPrompt: null,
      categoryName: null,
      players: get().players.map((player) => ({
        ...player,
        eliminated: false,
        isSelected: false,
        answer: undefined,
      })),
    });
  },
  
  setGamePhase: (phase) => {
    set({ gamePhase: phase });
  },
  
  submitAnswer: (playerId, answer) => {
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId ? { ...player, answer } : player
      ),
    }));

    // Check if all non-eliminated players have answered
    const { players } = get();
    const activePlayers = players.filter((p) => !p.eliminated);
    const allAnswered = activePlayers.every((p) => p.answer !== undefined);
    
    if (allAnswered) {
      get().evaluateAnswers();
    }
  },
  
  evaluateAnswers: () => {
    set((state) => {
      const selectedPlayer = state.players.find((p) => p.isSelected);
      
      if (!selectedPlayer || !selectedPlayer.answer) return state;
      
      const selectedAnswer = selectedPlayer.answer.toLowerCase().trim();
      
      return {
        players: state.players.map((player) => {
          if (player.eliminated || player.isSelected) return player;
          
          const playerAnswer = (player.answer || '').toLowerCase().trim();
          const isEliminated = playerAnswer === selectedAnswer;
          
          return {
            ...player,
            eliminated: isEliminated,
          };
        }),
        gamePhase: 'results',
      };
    });
  },
  
  nextRound: () => {
    const { players } = get();
    const activePlayers = players.filter((p) => !p.eliminated);
    
    if (activePlayers.length < 2) {
      // Game over - only one player remains
      set({ gamePhase: 'setup', gameActive: false });
      return;
    }
    
    set((state) => ({
      roundNumber: state.roundNumber + 1,
      gamePhase: 'selection',
      currentPrompt: null,
      categoryName: null,
    }));
    
    get().resetAnswers();
    get().selectRandomPlayer();
  },
  
  setPrompt: (prompt, category) => {
    set({
      currentPrompt: prompt,
      categoryName: category,
      gamePhase: 'answering',
    });
  },
  
  resetAnswers: () => {
    set((state) => ({
      players: state.players.map((player) => ({
        ...player,
        answer: undefined,
      })),
    }));
  },
  
  resetEliminatedPlayers: () => {
    set((state) => ({
      players: state.players.map((player) => ({
        ...player,
        eliminated: false,
      })),
    }));
  },
}));
