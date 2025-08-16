import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  Target, 
  TrendingUp, 
  Shirt, 
  ArrowUpDown,
  ChevronRight,
  Trophy,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/fpl-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/fpl-card";
import { PillToggle } from "@/components/ui/pill-toggle";
import { Countdown } from "@/components/ui/countdown";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("fantasy");
  
  const gameweekDeadline = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days from now
  
  const tabOptions = [
    { value: "fantasy", label: "Fantasy" },
    { value: "challenge", label: "Challenge" },
    { value: "draft", label: "Draft" },
  ];

  const quickLinks = [
    { name: "Fixtures", icon: Calendar },
    { name: "Fixture Difficulty Rating", icon: Target },
    { name: "Player Statistics", icon: TrendingUp },
    { name: "Set Piece Taker", icon: Users },
  ];

  const leaderboardData = [
    { rank: 1, manager: "John Smith", team: "Smith United", gwPoints: 85, total: 1245 },
    { rank: 2, manager: "Sarah Wilson", team: "Wilson FC", gwPoints: 82, total: 1198 },
    { rank: 3, manager: "Mike Johnson", team: "Johnson City", gwPoints: 78, total: 1176 },
    { rank: 4, manager: "Emma Davis", team: "Davis Athletic", gwPoints: 76, total: 1145 },
    { rank: 5, manager: "Tom Brown", team: "Brown Rangers", gwPoints: 74, total: 1132 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-[1100px]">
        {/* Top Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <PillToggle
            options={tabOptions}
            value={activeTab}
            onValueChange={setActiveTab}
            size="lg"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Gameweek Hero Card */}
          <motion.div variants={itemVariants}>
            <Card variant="hero" className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pl-cyan/20 to-pl-green/20" />
              <CardContent className="relative z-10 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  {/* Team Info */}
                  <div className="text-center lg:text-left">
                    <h2 className="text-h1 font-bold text-pl-purple mb-2">
                      Aces United
                    </h2>
                    <p className="text-body text-pl-purple/80">
                      Manager: John Doe
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center lg:justify-between gap-8">
                    <div className="text-center">
                      <p className="text-caption text-pl-purple/60 mb-1">Average</p>
                      <motion.p 
                        className="text-h2 font-bold text-pl-purple tabular-nums"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 24 }}
                      >
                        58
                      </motion.p>
                    </div>
                    <div className="text-center">
                      <p className="text-caption text-pl-purple/60 mb-1">Your Points</p>
                      <motion.p 
                        className="text-display font-bold text-pl-purple tabular-nums"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 24 }}
                      >
                        73
                      </motion.p>
                    </div>
                    <div className="text-center">
                      <p className="text-caption text-pl-purple/60 mb-1">Highest</p>
                      <motion.p 
                        className="text-h2 font-bold text-pl-purple tabular-nums"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 24 }}
                      >
                        95
                      </motion.p>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="text-center lg:text-right">
                    <div className="flex flex-col items-center lg:items-end space-y-2">
                      <div className="flex items-center space-x-2 text-pl-purple/80">
                        <span className="text-body font-semibold">Gameweek 15</span>
                        <span>•</span>
                        <span className="text-body">
                          <span className="text-pl-pink font-semibold">Deadline:</span> Fri 22 Aug, 23:00
                        </span>
                      </div>
                      <Countdown 
                        targetDate={gameweekDeadline} 
                        size="default"
                        className="text-pl-purple font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    pill
                    onClick={() => navigate("/team")}
                    className="border-pl-purple/20 text-pl-purple hover:bg-pl-purple/10"
                  >
                    <Shirt className="size-5" />
                    Pick Team
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    pill
                    onClick={() => navigate("/transfers")}
                    className="border-pl-purple/20 text-pl-purple hover:bg-pl-purple/10"
                  >
                    <ArrowUpDown className="size-5" />
                    Transfers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Links Card */}
            <motion.div variants={itemVariants}>
              <Card variant="glass" className="h-full">
                <CardHeader>
                  <CardTitle className="text-pl-white">Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {quickLinks.map((link, index) => (
                      <motion.button
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="w-full flex items-center justify-between p-3 rounded-xl glass hover:bg-pl-white/10 transition-all duration-200 group"
                        onClick={() => navigate(`/${link.name.toLowerCase().replace(/\s+/g, '-')}`)}
                      >
                        <div className="flex items-center space-x-3">
                          <link.icon className="size-5 text-pl-cyan" />
                          <span className="text-body text-pl-white">{link.name}</span>
                        </div>
                        <ChevronRight className="size-4 text-pl-white/60 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Leagues & Cups Card */}
            <motion.div variants={itemVariants}>
              <Card variant="glass" className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-pl-white">Leagues & Cups</CardTitle>
                    <Settings className="size-5 text-pl-white/60" />
                  </div>
                  <div className="flex space-x-1 mt-4">
                    <Button variant="ghost" size="sm" className="text-pl-cyan border-b-2 border-pl-cyan rounded-none">
                      Leagues
                    </Button>
                    <Button variant="ghost" size="sm" className="text-pl-white/60">
                      Cups
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Global League Preview */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-h3 text-pl-white font-semibold">Global League</h4>
                        <Trophy className="size-5 text-pl-green" />
                      </div>
                      
                      <div className="space-y-2">
                        {leaderboardData.slice(0, 3).map((entry, index) => (
                          <motion.div
                            key={entry.rank}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 + index * 0.1 }}
                            className="flex items-center justify-between p-2 rounded-lg glass text-caption"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="size-6 bg-pl-green/20 text-pl-green rounded-full flex items-center justify-center text-mini font-bold">
                                {entry.rank}
                              </span>
                              <div>
                                <p className="text-pl-white font-medium">{entry.team}</p>
                                <p className="text-pl-white/60">{entry.manager}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-pl-white font-semibold tabular-nums">{entry.total}</p>
                              <p className="text-pl-green tabular-nums">+{entry.gwPoints}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        onClick={() => navigate("/leaderboard")}
                      >
                        View Full Leaderboard
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
  );
};

export default Dashboard;
