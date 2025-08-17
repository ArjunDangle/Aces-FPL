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
  Settings,
  Eye
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/fpl-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/fpl-card";
import { Countdown } from "@/components/ui/countdown";

// Mock user status for demonstrating dynamic CTAs
type UserStatus = "new_user" | "pre_deadline" | "post_deadline";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // This would come from your AuthContext or API
  const [userStatus] = useState<UserStatus>("pre_deadline"); 

  const gameweekDeadline = new Date("2025-08-22T23:00:00");

  const quickLinks = [
    { name: "Fixtures", icon: Calendar, path: "/fixtures" },
    { name: "Fixture Difficulty Rating", icon: Target, path: "/fdr" },
    { name: "Player Statistics", icon: TrendingUp, path: "/stats" },
    { name: "Set Piece Takers", icon: Users, path: "/set-pieces" },
  ];
  
  const leaderboardData = [
      { rank: 1, manager: "John Smith", team: "Smith United", gwPoints: 85, total: 1245 },
      { rank: 2, manager: "Sarah Wilson", team: "Wilson FC", gwPoints: 82, total: 1198 },
      { rank: 3, manager: "Mike Johnson", team: "Johnson City", gwPoints: 78, total: 1176 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const renderCTA = () => {
    switch (userStatus) {
      case "new_user":
        return (
          <div className="mt-8">
            <Button variant="hero" size="lg" fullWidth pill onClick={() => navigate("/team")}>
              <Shirt className="size-5" />
              Pick Your Team
            </Button>
          </div>
        );
      case "pre_deadline":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Button variant="secondary" size="lg" fullWidth pill onClick={() => navigate("/team")} className="border-pl-purple/20 text-pl-purple hover:bg-pl-purple/10">
              <Shirt className="size-5" />
              Pick Team
            </Button>
            <Button variant="primary" size="lg" fullWidth pill onClick={() => navigate("/transfers")}>
              <ArrowUpDown className="size-5" />
              Transfers
            </Button>
          </div>
        );
      case "post_deadline":
        return (
          <div className="mt-8">
            <Button variant="hero" size="lg" fullWidth pill onClick={() => navigate("/gameweek/15")}>
              <Eye className="size-5" />
              View Gameweek Live
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Gameweek Hero Card */}
          <motion.div variants={itemVariants}>
            <Card variant="hero" className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pl-cyan/10 to-pl-green/10 opacity-50" />
              <CardContent className="relative z-10 p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="text-center lg:text-left">
                    <h2 className="text-h1 font-extrabold text-pl-purple mb-1">
                      {user?.teamName || "Aces United"}
                    </h2>
                    <p className="text-body font-semibold text-pl-purple/80">
                      {user?.name || "John Doe"}
                    </p>
                  </div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate("/gameweek/15")}
                    className="flex flex-col items-center border-y lg:border-none border-pl-purple/20 py-4 lg:py-0 cursor-pointer rounded-2xl transition-all hover:bg-white/20"
                  >
                    <p className="text-xl font-extrabold text-pl-purple/80 mb-2">Gameweek 15</p>
                    <div className="flex justify-around items-center w-full">
                      <div className="text-center">
                        <p className="text-caption font-semibold text-pl-purple/60 mb-1">Average</p>
                        <p className="text-h1 font-extrabold text-pl-purple tabular-nums">58</p>
                      </div>
                      <div className="text-center">
                        <p className="text-caption font-semibold text-pl-purple/60 mb-1">Your Points</p>
                        <motion.p 
                          className="text-6xl font-extrabold text-pl-purple tabular-nums"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                        >
                          73
                        </motion.p>
                      </div>
                      <div className="text-center">
                        <p className="text-caption font-semibold text-pl-purple/60 mb-1">Highest</p>
                        <p className="text-h1 font-extrabold text-pl-purple tabular-nums">95</p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="text-center lg:text-right flex flex-col items-center lg:items-end space-y-2">
                    <div className="text-body font-bold text-pl-purple/90">
                      <span className="font-extrabold text-pl-pink">Deadline:</span> Fri 22 Aug, 23:00
                    </div>
                    <Countdown 
                      targetDate={gameweekDeadline} 
                      size="default"
                      className="text-pl-purple font-extrabold"
                    />
                  </div>
                </div>
                {renderCTA()}
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card variant="glass" className="h-full">
                <CardHeader>
                  <CardTitle className="text-pl-white font-bold">Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {quickLinks.map((link) => (
                      <motion.button
                        key={link.name}
                        whileHover={{ x: 2 }}
                        className="w-full flex items-center justify-between p-3 rounded-xl glass hover:bg-pl-white/10 transition-colors duration-200 group"
                        onClick={() => navigate(link.path)}
                      >
                        <div className="flex items-center space-x-3">
                          <link.icon className="size-5 text-pl-cyan" />
                          <span className="text-body font-semibold text-pl-white">{link.name}</span>
                        </div>
                        <ChevronRight className="size-4 text-pl-white/60 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="glass" className="h-full">
                <CardHeader>
                  <CardTitle className="text-pl-white font-bold">Global League</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboardData.map((entry) => (
                      <motion.div
                        key={entry.rank}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-2 rounded-lg glass text-caption"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="size-6 bg-pl-green/20 text-pl-green rounded-full flex items-center justify-center text-mini font-extrabold">
                            {entry.rank}
                          </span>
                          <div>
                            <p className="text-pl-white font-bold">{entry.team}</p>
                            <p className="text-pl-white/60 font-semibold">{entry.manager}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-pl-white font-extrabold tabular-nums">{entry.total}</p>
                          <p className="text-pl-green font-extrabold tabular-nums">+{entry.gwPoints}</p>
                        </div>
                      </motion.div>
                    ))}
                     <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        onClick={() => navigate("/leaderboard")}
                      >
                        View Full Leaderboard
                      </Button>
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
