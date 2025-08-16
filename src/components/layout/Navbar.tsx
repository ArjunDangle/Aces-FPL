import React from "react";
import { motion } from "framer-motion";
import { LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/fpl-button";
import acesLogo from "@/assets/aces-logo.png";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 glass border-b border-pl-border"
    >
      <div className="container mx-auto px-6 py-4 max-w-[1100px]">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <img src={acesLogo} alt="Aces FPL" className="size-8" />
            <div>
              <h1 className="text-h3 font-bold text-pl-white">Aces FPL</h1>
              <p className="text-caption text-pl-white/60">{user.teamName || "Fantasy Manager"}</p>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="size-8 bg-gradient-to-br from-pl-cyan to-pl-green rounded-full flex items-center justify-center">
                <User className="size-4 text-pl-purple" />
              </div>
              <div className="text-right">
                <p className="text-caption text-pl-white font-medium">{user.name}</p>
                <p className="text-mini text-pl-white/60">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-pl-white/60 hover:text-pl-white"
              >
                <Settings className="size-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-pl-white/60 hover:text-pl-pink"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline ml-2">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;