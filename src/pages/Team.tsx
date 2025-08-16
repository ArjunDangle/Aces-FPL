import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Users, Shield, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/fpl-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/fpl-card";
import { PillToggle } from "@/components/ui/pill-toggle";
import { Countdown } from "@/components/ui/countdown";

const Team: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"pitch" | "list">("pitch");
  
  const gameweekDeadline = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  
  const viewOptions = [
    { value: "pitch", label: "Pitch" },
    { value: "list", label: "List" },
  ];

  // Mock squad data
  const squad = {
    goalkeepers: [
      { id: 1, name: "Jordan Pickford", club: "EVE", price: 5.0, fixture: "LEE(H)" }
    ],
    defenders: [
      { id: 2, name: "Trent Alexander-Arnold", club: "LIV", price: 7.5, fixture: "MUN(A)" },
      { id: 3, name: "Virgil van Dijk", club: "LIV", price: 6.5, fixture: "MUN(A)" },
    ],
    midfielders: [
      { id: 4, name: "Mohamed Salah", club: "LIV", price: 13.0, fixture: "MUN(A)" },
      { id: 5, name: "Kevin De Bruyne", club: "MCI", price: 12.5, fixture: "ARS(H)" },
    ],
    forwards: [
      { id: 6, name: "Erling Haaland", club: "MCI", price: 15.0, fixture: "ARS(H)" },
    ]
  };

  const totalSpent = 59.5;
  const budget = 110.0;
  const remaining = budget - totalSpent;

  const PlayerCard = ({ player }: { player: any }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="relative bg-gradient-to-b from-pl-white to-pl-white/90 rounded-2xl p-4 text-center shadow-card hover:shadow-glow-cyan transition-all duration-200"
    >
      {/* Price ribbon */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-pl-green text-pl-purple text-mini font-bold px-3 py-1 rounded-full">
        £{player.price}m
      </div>
      
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

  const EmptySlot = ({ position }: { position: string }) => (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="relative bg-pl-white/10 border-2 border-dashed border-pl-white/30 rounded-2xl p-4 text-center hover:border-pl-cyan transition-all duration-200"
      onClick={() => console.log(`Add ${position}`)}
    >
      <div className="size-16 bg-pl-white/5 rounded-full mx-auto mb-3 flex items-center justify-center">
        <Plus className="size-6 text-pl-white/60" />
      </div>
      <p className="text-caption text-pl-white/60">{position}</p>
    </motion.button>
  );

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
              <h1 className="text-h2 font-bold text-pl-white mb-1">Pick Team</h1>
              <div className="flex items-center space-x-4 text-caption text-pl-white/80">
                <span>Gameweek 15</span>
                <span>•</span>
                <span className="text-pl-pink">Deadline: Fri 22 Aug, 23:00</span>
                <span>•</span>
                <span className="text-pl-green">£{remaining.toFixed(1)}m left</span>
              </div>
            </div>

            <PillToggle
              options={viewOptions}
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "pitch" | "list")}
              size="sm"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-[1100px]">
        {viewMode === "pitch" ? (
          /* Pitch View */
          <div className="relative">
            {/* Pitch background */}
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
                  {squad.forwards.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                  <EmptySlot position="FWD" />
                  <EmptySlot position="FWD" />
                </div>

                {/* Midfielders */}
                <div className="flex justify-center space-x-4 mb-8">
                  {squad.midfielders.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                  <EmptySlot position="MID" />
                  <EmptySlot position="MID" />
                  <EmptySlot position="MID" />
                </div>

                {/* Defenders */}
                <div className="flex justify-center space-x-4 mb-8">
                  {squad.defenders.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                  <EmptySlot position="DEF" />
                  <EmptySlot position="DEF" />
                  <EmptySlot position="DEF" />
                </div>

                {/* Goalkeeper */}
                <div className="flex justify-center">
                  {squad.goalkeepers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-pl-white">Squad List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Table header */}
                <div className="grid grid-cols-5 gap-4 text-caption text-pl-white/60 font-semibold border-b border-pl-border pb-2">
                  <span>Player</span>
                  <span>Position</span>
                  <span>Club</span>
                  <span>Fixture</span>
                  <span>Price</span>
                </div>

                {/* Players */}
                {[...squad.goalkeepers, ...squad.defenders, ...squad.midfielders, ...squad.forwards].map((player) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-5 gap-4 text-body text-pl-white items-center p-3 rounded-xl glass hover:bg-pl-white/10 transition-all"
                  >
                    <span className="font-medium">{player.name}</span>
                    <span className="text-pl-white/80">MID</span>
                    <span className="text-pl-white/80">{player.club}</span>
                    <span className="bg-pl-green/20 text-pl-purple text-caption px-2 py-1 rounded-full w-fit">
                      {player.fixture}
                    </span>
                    <span className="font-semibold tabular-nums">£{player.price}m</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            pill
            onClick={() => console.log("Add Player")}
          >
            <Plus className="size-5" />
            Add Player
          </Button>
          <Button
            variant="hero"
            size="lg"
            fullWidth
            pill
            onClick={() => navigate("/gameweek/15")}
          >
            Continue to Gameweek
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Team;
