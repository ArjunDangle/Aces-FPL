import React from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/fpl-button";
import acesLogo from "@/assets/aces-logo.png"; 

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  // Don't render the navbar on login/splash pages where there is no user
  if (!user) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-pl-purple border-b border-pl-border"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo and Brand Name (wrapped in Link) */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <img src={acesLogo} alt="Aces Logo" className="h-8 w-auto" />
            <span 
              className="hidden sm:block text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pl-cyan to-pl-green tracking-tight"
              style={{ filter: 'drop-shadow(0 0 5px hsl(var(--pl-cyan) / 0.5))' }}
            >
              Fantasy
            </span>
          </Link>

          {/* Right Side: User Greeting and Sign Out */}
          <div className="flex items-center space-x-4">
            <p className="hidden sm:block text-body text-pl-white/80">
              Hello, <span className="font-semibold text-pl-white">{user.name || "Arjun"}</span>
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-pl-white/60 hover:text-pl-pink hover:bg-pl-pink/10 rounded-full"
            >
              <LogOut className="size-4" />
              <span className="ml-2">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
