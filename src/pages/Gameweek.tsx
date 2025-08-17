import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import PlayerCard from '@/components/layout/PlayerCard'; 

// --- ASSET IMPORTS ---
import pitchBackground from '@/assets/images/pitch.svg';

// --- MOCK DATA & CONFIGURATION ---
const mockUserSquad = {
  starting: [
    { id: 1, name: 'Raya', team: 'Satan', pos: 'GK', fixture: 'MUN(A)', points: 6, isCaptain: false, isVice: false, matchesPlayed: 14, goals: 0, assists: 0, cleansheets: 5, ppg: 4.5 },
    { id: 2, name: 'Saliba', team: 'Satan', pos: 'DEF', fixture: 'MUN(A)', points: 7, isCaptain: false, isVice: false, matchesPlayed: 14, goals: 1, assists: 0, cleansheets: 5, ppg: 5.1 },
    { id: 3, name: 'Shaw', team: 'Bandra United', pos: 'DEF', fixture: 'SAT(H)', points: 5, isCaptain: false, isVice: false, matchesPlayed: 13, goals: 0, assists: 2, cleansheets: 4, ppg: 4.8 },
    { id: 4, name: 'Trippier', team: 'Southside', pos: 'DEF', fixture: 'TIT(H)', points: 8, isCaptain: false, isVice: false, matchesPlayed: 14, goals: 1, assists: 4, cleansheets: 6, ppg: 6.2 },
    { id: 5, name: 'Fernandes', team: 'Bandra United', pos: 'MID', fixture: 'SAT(H)', points: 12, isCaptain: true, isVice: false, matchesPlayed: 14, goals: 5, assists: 6, cleansheets: 4, ppg: 7.1 },
    { id: 6, name: 'Son', team: 'Mumbai Hotspurs', pos: 'MID', fixture: 'UMA(A)', points: 9, isCaptain: false, isVice: true, matchesPlayed: 14, goals: 8, assists: 3, cleansheets: 5, ppg: 8.5 },
    { id: 7, name: 'Joelinton', team: 'Southside', pos: 'MID', fixture: 'TIT(H)', points: 4, isCaptain: false, isVice: false, matchesPlayed: 12, goals: 2, assists: 1, cleansheets: 6, ppg: 3.9 },
    { id: 8, name: 'Haaland', team: 'Titans', pos: 'FWD', fixture: 'SOU(A)', points: 13, isCaptain: false, isVice: false, matchesPlayed: 14, goals: 18, assists: 3, cleansheets: 7, ppg: 12.1 },
  ],
  bench: [
    { id: 9, name: 'Pope', team: 'Umaag Foundation Trust', pos: 'GK', fixture: 'MHS(H)', points: 1, matchesPlayed: 14, goals: 0, assists: 0, cleansheets: 7, ppg: 5.5 },
    { id: 10, name: 'Maddison', team: 'Mumbai Hotspurs', pos: 'MID', fixture: 'UMA(A)', points: 5, matchesPlayed: 13, goals: 6, assists: 5, cleansheets: 5, ppg: 6.8 },
    { id: 11, name: 'Watkins', team: 'Titans', pos: 'FWD', fixture: 'SOU(A)', points: 2, matchesPlayed: 14, goals: 7, assists: 4, cleansheets: 7, ppg: 6.5 },
  ]
};

const mockFixtures = [
    { homeTeam: 'Satan', awayTeam: 'Bandra United', homeScore: 2, awayScore: 1 },
    { homeTeam: 'Mumbai Hotspurs', awayTeam: 'Southside', homeScore: 1, awayScore: 1 },
    { homeTeam: 'Titans', awayTeam: 'Umaag Foundation Trust', homeScore: 3, awayScore: 0 },
];

const mockLeagueStandings = [
    { rank: 1, teamName: 'FC Salah', manager: 'Mo Salah', points: 1250 },
    { rank: 2, teamName: 'Eric Ten Hoes', manager: 'Arjun Dangle', points: 1245 },
    { rank: 3, teamName: 'KDBs Crew', manager: 'Kevin De Bruyne', points: 1230 },
];

// --- MAIN GAMEWEEK COMPONENT ---
const Gameweek: React.FC = () => {
  const { gw } = useParams();
  const [view, setView] = useState('pitch');

  const playersByPos = {
    GK: mockUserSquad.starting.filter(p => p.pos === 'GK'),
    DEF: mockUserSquad.starting.filter(p => p.pos === 'DEF'),
    MID: mockUserSquad.starting.filter(p => p.pos === 'MID'),
    FWD: mockUserSquad.starting.filter(p => p.pos === 'FWD'),
  };
  
  const allPlayers = [...mockUserSquad.starting, ...mockUserSquad.bench];

  const PitchView = () => (
    <>
      <main 
        className="flex-1 relative flex flex-col justify-around py-4 bg-center bg-no-repeat bg-cover lg:bg-contain"
        style={{ 
          backgroundImage: `url(${pitchBackground})`,
        }}
      >
        <div className="flex justify-center items-center gap-x-8 sm:gap-x-12">
          {playersByPos.FWD.map(p => <PlayerCard key={p.id} player={p} />)}
        </div>
        <div className="flex justify-center items-center gap-x-8 sm:gap-x-12">
          {playersByPos.MID.map(p => <PlayerCard key={p.id} player={p} />)}
        </div>
        <div className="flex justify-center items-center gap-x-8 sm:gap-x-12">
          {playersByPos.DEF.map(p => <PlayerCard key={p.id} player={p} />)}
        </div>
        <div className="flex justify-center items-center">
          {playersByPos.GK.map(p => <PlayerCard key={p.id} player={p} />)}
        </div>
      </main>
      <footer className="flex-shrink-0 p-3 bg-[#23003F] border-t-2 border-gray-700">
        <div className="grid grid-cols-3 gap-4 place-items-center">
          {mockUserSquad.bench.map(player => (
            <PlayerCard key={player.id} player={player} isBench={true} />
          ))}
        </div>
      </footer>
    </>
  );

  const ListView = () => (
    <div className="flex-1 p-4 min-h-0">
        <div className="bg-white rounded-lg shadow-md h-full overflow-auto">
            <table className="w-full text-left min-w-[600px]">
                <thead className="sticky top-0 bg-gray-100 z-10">
                    <tr>
                        <th className="p-3 text-xs font-bold text-gray-600 uppercase">Player</th>
                        <th className="p-3 text-xs font-bold text-gray-600 uppercase text-center">MP</th>
                        <th className="p-3 text-xs font-bold text-gray-600 uppercase text-center">G</th>
                        <th className="p-3 text-xs font-bold text-gray-600 uppercase text-center">A</th>
                        <th className="p-3 text-xs font-bold text-gray-600 uppercase text-center">CS</th>
                        <th className="p-3 text-xs font-bold text-gray-600 uppercase text-center">PPG</th>
                        <th className="p-3 text-xs font-bold text-gray-600 uppercase text-right">GW Points</th>
                    </tr>
                </thead>
                <tbody>
                    {allPlayers.map((player, index) => (
                        <tr key={player.id} className={cn("border-b border-gray-200", index % 2 === 1 && "bg-gray-50")}>
                            <td className="p-3">
                                <p className="font-bold text-sm text-black">{player.name}</p>
                                <p className="text-xs text-gray-500">{player.team} · {player.fixture}</p>
                            </td>
                            <td className="p-3 text-center font-semibold text-gray-700">{player.matchesPlayed}</td>
                            <td className="p-3 text-center font-semibold text-gray-700">{player.goals}</td>
                            <td className="p-3 text-center font-semibold text-gray-700">{player.assists}</td>
                            <td className="p-3 text-center font-semibold text-gray-700">{player.cleansheets}</td>
                            <td className="p-3 text-center font-semibold text-gray-700">{player.ppg}</td>
                            <td className="p-3 text-right font-bold text-lg text-black">
                                {player.points}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-page-purple flex flex-col lg:h-screen lg:flex-row font-sans lg:overflow-hidden">
      {/* Header Card (Left Column on Desktop - 30%) */}
      <div className="flex-shrink-0 p-4 lg:w-1/3 lg:h-full lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="bg-gradient-card-purple rounded-xl p-4 shadow-lg mb-4">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h1 className="text-white font-bold text-2xl">Eric Ten Hoes</h1>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="text-center">
                    <p className="text-fpl-text-gray text-xs">Average</p>
                    <p className="font-bold text-white text-xl">58</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-gray-300 font-bold text-lg mb-2">Gameweek {gw || 15}</p>
                    <div className="w-24 h-24 bg-gradient-highlight-teal rounded-xl flex items-center justify-center">
                        <p className="font-extrabold text-[#37003C] text-5xl">73</p>
                    </div>
                    <p className="text-white text-xs mt-1">Total Points</p>
                </div>
                <div className="text-center">
                    <p className="text-fpl-text-gray text-xs">Highest</p>
                    <p className="font-bold text-white text-xl">95</p>
                </div>
            </div>
            <div className="border-t border-white/10 my-3"></div>
            <div className="flex justify-around items-center text-center text-white">
                <div>
                    <p className="text-fpl-text-gray text-xs">GW Rank</p>
                    <p className="font-bold">1,234,567</p>
                </div>
                <div>
                    <p className="text-fpl-text-gray text-xs">Free Transfers</p>
                    <p className="font-bold">2</p>
                </div>
            </div>
            <div className="bg-[#1A0030] rounded-full p-1 flex justify-center w-fit mx-auto mt-4">
                 <button onClick={() => setView('pitch')} className={cn("px-6 py-1 text-sm font-semibold rounded-full", view === 'pitch' ? 'bg-fpl-highlight-teal text-black' : 'text-fpl-text-gray')}>Pitch</button>
                 <button onClick={() => setView('list')} className={cn("px-6 py-1 text-sm font-semibold rounded-full", view === 'list' ? 'bg-fpl-highlight-teal text-black' : 'text-fpl-text-gray')}>List</button>
            </div>
        </div>

        {/* Fixtures Card - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block bg-gradient-card-purple rounded-xl p-4 shadow-lg mb-4">
            <h2 className="text-white font-bold text-lg mb-3">Fixtures</h2>
            <div className="space-y-2">
                {mockFixtures.map((fixture, index) => (
                    <div key={index} className="grid grid-cols-3 items-center bg-black/20 p-2 rounded-md text-white">
                        <span className="font-semibold text-sm text-right">{fixture.homeTeam}</span>
                        <span className="font-bold text-lg bg-white/10 px-3 py-1 rounded-md text-center mx-auto">{fixture.homeScore} - {fixture.awayScore}</span>
                        <span className="font-semibold text-sm text-left">{fixture.awayTeam}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Leaderboard Card - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block bg-gradient-card-purple rounded-xl p-4 shadow-lg">
            <h2 className="text-white font-bold text-lg mb-3">Leaderboard</h2>
            <div className="space-y-1">
                {mockLeagueStandings.map((team) => (
                    <div key={team.rank} className={cn("flex items-center justify-between p-2 rounded-md", team.manager === 'Arjun Dangle' && 'bg-fpl-highlight-teal/20')}>
                        <div className="flex items-center">
                            <span className="text-gray-400 font-bold w-6">{team.rank}</span>
                            <div>
                                <p className="text-white font-bold text-sm">{team.teamName}</p>
                                <p className="text-gray-400 text-xs">{team.manager}</p>
                            </div>
                        </div>
                        <span className="text-white font-bold">{team.points}</span>
                    </div>
                ))}
            </div>
            <Link to="/leaderboard" className="block w-full mt-3">
                <button className="w-full bg-fpl-highlight-teal/20 text-fpl-highlight-teal font-semibold py-2 rounded-md text-sm hover:bg-fpl-highlight-teal/30 transition-colors">
                    View Full Leaderboard
                </button>
            </Link>
        </div>
      </div>

      {/* Pitch & Bench Container (Right Column on Desktop - 70%) */}
      <div className="flex-1 lg:w-2/3 flex flex-col min-h-0">
        {view === 'pitch' ? <PitchView /> : <ListView />}
      </div>
    </div>
  );
};

export default Gameweek;
