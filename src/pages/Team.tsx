import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import PlayerCard from '@/components/layout/PlayerCard'; 
import { Button } from '@/components/ui/fpl-button';
import { Zap, Users, Shield, RefreshCw } from 'lucide-react';


// --- ASSET IMPORTS ---
import pitchBackground from '@/assets/images/pitch.svg';

// --- MOCK DATA & CONFIGURATION ---
const initialSquad = {
  starting: [
    { id: 1, name: 'Raya', team: 'Satan', pos: 'GK', fixture: 'MUN(A)', points: 6, isCaptain: false, isVice: false },
    { id: 2, name: 'Saliba', team: 'Satan', pos: 'DEF', fixture: 'MUN(A)', points: 7, isCaptain: false, isVice: false },
    { id: 3, name: 'Shaw', team: 'Bandra United', pos: 'DEF', fixture: 'SAT(H)', points: 5, isCaptain: false, isVice: false },
    { id: 4, name: 'Trippier', team: 'Southside', pos: 'DEF', fixture: 'TIT(H)', points: 8, isCaptain: false, isVice: false },
    { id: 5, name: 'Fernandes', team: 'Bandra United', pos: 'MID', fixture: 'SAT(H)', points: 12, isCaptain: true, isVice: false },
    { id: 6, name: 'Son', team: 'Mumbai Hotspurs', pos: 'MID', fixture: 'UMA(A)', points: 9, isCaptain: false, isVice: true },
    { id: 7, name: 'Joelinton', team: 'Southside', pos: 'MID', fixture: 'TIT(H)', points: 4, isCaptain: false, isVice: false },
    { id: 8, name: 'Haaland', team: 'Titans', pos: 'FWD', fixture: 'SOU(A)', points: 13, isCaptain: false, isVice: false },
  ],
  bench: [
    { id: 9, name: 'Pope', team: 'Umaag Foundation Trust', pos: 'GK', fixture: 'MHS(H)', points: 1 },
    { id: 10, name: 'Maddison', team: 'Mumbai Hotspurs', pos: 'MID', fixture: 'UMA(A)', points: 5 },
    { id: 11, name: 'Watkins', team: 'Titans', pos: 'FWD', fixture: 'SOU(A)', points: 2 },
  ]
};

// --- MAIN TEAM COMPONENT ---
const Team: React.FC = () => {
  const { gw } = useParams();
  const [squad, setSquad] = useState(initialSquad);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  const handlePlayerClick = (player, isBenchPlayer) => {
    if (!selectedPlayer) {
      // Nothing selected, so select this player
      setSelectedPlayer({ ...player, isBench: isBenchPlayer });
    } else {
      // A player is already selected, attempt a swap
      if (selectedPlayer.isBench === isBenchPlayer) {
        // Clicked another player in the same area (pitch/bench), so just switch selection
        setSelectedPlayer({ ...player, isBench: isBenchPlayer });
      } else {
        // Perform the swap
        const newStarting = [...squad.starting];
        const newBench = [...squad.bench];

        if (selectedPlayer.isBench) {
          // Swapping from bench to pitch
          const benchIndex = newBench.findIndex(p => p.id === selectedPlayer.id);
          const startingIndex = newStarting.findIndex(p => p.id === player.id);
          
          newBench[benchIndex] = player;
          newStarting[startingIndex] = selectedPlayer;
        } else {
          // Swapping from pitch to bench
          const startingIndex = newStarting.findIndex(p => p.id === selectedPlayer.id);
          const benchIndex = newBench.findIndex(p => p.id === player.id);

          newStarting[startingIndex] = player;
          newBench[benchIndex] = selectedPlayer;
        }

        setSquad({ starting: newStarting, bench: newBench });
        setSelectedPlayer(null); // Reset selection
      }
    }
  };

  const playersByPos = {
    GK: squad.starting.filter(p => p.pos === 'GK'),
    DEF: squad.starting.filter(p => p.pos === 'DEF'),
    MID: squad.starting.filter(p => p.pos === 'MID'),
    FWD: squad.starting.filter(p => p.pos === 'FWD'),
  };

  return (
    <div className="w-full min-h-screen bg-gradient-page-purple flex flex-col font-sans lg:h-screen lg:flex-row lg:overflow-hidden">
      {/* Left Column on Desktop */}
      <div className="flex-shrink-0 p-4 lg:w-1/3 lg:h-full lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="bg-gradient-card-purple rounded-xl p-4 shadow-lg">
            <h1 className="text-white font-bold text-2xl mb-4">Pick Team</h1>
            <div className="space-y-3">
                <Button variant="secondary" size="lg" fullWidth>
                    <RefreshCw className="size-5 mr-2" />
                    Wildcard
                </Button>
                <Button variant="secondary" size="lg" fullWidth>
                    <Users className="size-5 mr-2" />
                    Bench Boost
                </Button>
                <Button variant="secondary" size="lg" fullWidth>
                    <Shield className="size-5 mr-2" />
                    Triple Captain
                </Button>
            </div>
        </div>
      </div>

      {/* Pitch & Bench Container (Right Column on Desktop) */}
      <div className="flex-1 lg:w-2/3 flex flex-col min-h-0">
        <main 
          className="flex-1 relative flex flex-col justify-around py-4 bg-center bg-no-repeat bg-cover lg:bg-contain"
          style={{ backgroundImage: `url(${pitchBackground})` }}
        >
          {Object.keys(playersByPos).map(pos => (
            <div key={pos} className="flex justify-center items-center gap-x-8 sm:gap-x-12">
              {playersByPos[pos].map(p => (
                <div key={p.id} onClick={() => handlePlayerClick(p, false)} className={cn("cursor-pointer rounded-md transition-all", selectedPlayer?.id === p.id && "ring-2 ring-fpl-highlight-teal ring-offset-2 ring-offset-transparent")}>
                  <PlayerCard player={p} />
                </div>
              ))}
            </div>
          ))}
        </main>
        <footer className="flex-shrink-0 p-3 bg-[#23003F] border-t-2 border-gray-700">
          <div className="grid grid-cols-3 gap-4 place-items-center">
            {squad.bench.map(player => (
              <div key={player.id} onClick={() => handlePlayerClick(player, true)} className={cn("cursor-pointer rounded-md transition-all", selectedPlayer?.id === player.id && "ring-2 ring-fpl-highlight-teal ring-offset-2 ring-offset-transparent")}>
                <PlayerCard player={player} isBench={true} />
              </div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Team;
