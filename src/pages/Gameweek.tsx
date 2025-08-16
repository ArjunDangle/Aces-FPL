import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Users, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/fpl-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/fpl-card";

const Gameweek: React.FC = () => {
  const navigate = useNavigate();
  const { gw } = useParams();
  
  const isLocked = true; // Gameweek is locked
  const gwPoints = 73;
  const benchPoints = 12;
  const totalPoints = 1245;
  const currentRank = 127543;

  // Mock squad with GW points
  const squad = [
    { id: 1, name: "Jordan Pickford", club: "EVE", fixture: "LEE(H)", points: 6, captain: false, vice: false },
    { id: 2, name: "Trent Alexander-Arnold", club: "LIV", fixture: "MUN(A)", points: 8, captain: false, vice: false },
    { id: 3, name: "Virgil van Dijk", club: "LIV", fixture: "MUN(A)", points: 6, captain: false, vice: false },
    { id: 4, name: "João Cancelo", club: "MCI", fixture: "ARS(H)", points: 2, captain: false, vice: false },
    { id: 5, name: "Mohamed Salah", club: "LIV", fixture: "MUN(A)", points: 15, captain: true, vice: false },
    { id: 6, name: "Kevin De Bruyne", club: "MCI", fixture: "ARS(H)", points: 12, captain: false, vice: true },
    { id: 7, name: "Bruno Fernandes", club: "MUN", fixture: "LIV(H)", points: 5, captain: false, vice: false },
    { id: 8, name: "Bukayo Saka", club: "ARS", fixture: "MCI(A)", points: 8, captain: false, vice: false },
    { id: 9, name: "Erling Haaland", club: "MCI", fixture: "ARS(H)", points: 11, captain: false, vice: false },
    { id: 10, name: "Harry Kane", club: "TOT", fixture: "CHE(A)", points: 7, captain: false, vice: false },
    { id: 11, name: "Gabriel Jesus", club: "ARS", fixture: "MCI(A)", points: 4, captain: false, vice: false },
  ];

  const PlayerCard = ({ player }: { player: any }) => {
    const displayPoints = player.captain ? player.points * 2 : player.vice ? Math.floor(player.points * 1.5) : player.points;
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gradient-to-b from-pl-white to-pl-white/90 rounded-2xl p-4 text-center shadow-card"
      >
        {/* Points badge */}
        <div className="absolute -top-2 -right-2 bg-pl-green text-pl-purple text-mini font-bold size-6 rounded-full flex items-center justify-center">
          {displayPoints}
        </div>
        
        {/* Captain/Vice badge */}
        {(player.captain || player.vice) && (
          <div className="absolute -top-2 -left-2 bg-pl-purple text-pl-white text-mini font-bold size-6 rounded-full flex items-center justify-center">
            {player.captain ? 'C' : 'V'}
          </div>
        )}
        
        {/* Jersey placeholder */}
        <div className="size-16 bg-gradient-to-br from-pl-cyan/20 to-pl-green/20 rounded-full mx-auto mb-3 flex items-center justify-center">
          <Users className="size-8 text-pl-purple" />
        </div>
        
        {/* Player info */}
        <h4 className="text-caption font-semibold text-pl-purple mb-1">{player.name}</h4>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-mini text-pl-purple/60">{player.club}</span>
          <span className="bg-pl-green/20 text-pl-purple text-mini px-2 py-0.5 rounded-full">
            {player.fixture}
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-pl-purple">
      {/* Header */}
      <div className="border-b border-pl-border">
        <div className="container mx-auto px-6 py-4 max-w-[1100px]">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="text-pl-white/80"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            
            <div className="text-center">
              <h1 className="text-h2 font-bold text-pl-white mb-1">Gameweek {gw}</h1>
              <div className="flex items-center space-x-2 text-caption">
                {isLocked ? (
                  <span className="bg-pl-pink text-pl-white px-3 py-1 rounded-full">
                    Locked
                  </span>
                ) : (
                  <span className="text-pl-green">Active</span>
                )}
              </div>
            </div>

            <div className="w-[60px]" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-[1100px]">
        {/* Points Summary */}
        <Card variant="hero" className="mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pl-cyan/20 to-pl-green/20" />
          <CardContent className="relative z-10 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-caption text-pl-purple/60 mb-1">GW Points</p>
                <motion.p 
                  className="text-display font-bold text-pl-purple tabular-nums"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 24 }}
                >
                  {gwPoints}
                </motion.p>
              </div>
              <div>
                <p className="text-caption text-pl-purple/60 mb-1">Bench</p>
                <motion.p 
                  className="text-h2 font-bold text-pl-purple tabular-nums"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 24 }}
                >
                  {benchPoints}
                </motion.p>
              </div>
              <div>
                <p className="text-caption text-pl-purple/60 mb-1">Total Points</p>
                <motion.p 
                  className="text-h2 font-bold text-pl-purple tabular-nums"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 24 }}
                >
                  {totalPoints.toLocaleString()}
                </motion.p>
              </div>
              <div>
                <p className="text-caption text-pl-purple/60 mb-1">Rank</p>
                <motion.p 
                  className="text-h2 font-bold text-pl-purple tabular-nums"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 24 }}
                >
                  {currentRank.toLocaleString()}
                </motion.p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Squad on Pitch */}
        <div className="relative">
          <div className="relative bg-gradient-to-b from-pitch-top to-pitch-bottom rounded-3xl p-8 min-h-[600px] overflow-hidden">
            {/* Pitch lines overlay */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="0" y="0" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-pitch-line" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-pitch-line" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-pitch-line" />
              </svg>
            </div>

            {/* Formation */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Forwards */}
              <div className="flex justify-center space-x-4 mb-8">
                {squad.slice(8, 11).map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>

              {/* Midfielders */}
              <div className="flex justify-center space-x-4 mb-8">
                {squad.slice(4, 8).map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>

              {/* Defenders */}
              <div className="flex justify-center space-x-4 mb-8">
                {squad.slice(1, 4).map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>

              {/* Goalkeeper */}
              <div className="flex justify-center">
                <PlayerCard player={squad[0]} />
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <Card variant="glass" className="mt-6">
          <CardContent className="p-6 text-center">
            <p className="text-body text-pl-white/80">
              <span className="text-pl-cyan font-semibold">C</span> = Captain (2x points) • 
              <span className="text-pl-cyan font-semibold"> V</span> = Vice Captain (1.5x points)
            </p>
            <p className="text-caption text-pl-white/60 mt-2">
              Teams locked 2 hours before first match of the gameweek
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Gameweek;
