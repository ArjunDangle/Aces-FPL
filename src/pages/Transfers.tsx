
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, Plus, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/fpl-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/fpl-card";
import { PillToggle } from "@/components/ui/pill-toggle";

const Transfers: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"pitch" | "list">("pitch");
  
  const viewOptions = [
    { value: "pitch", label: "Pitch" },
    { value: "list", label: "List" },
  ];

  const freeTransfers = 2;
  const cost = 0;
  const budget = 50.5;

  return (
    <div className="min-h-screen bg-pl-purple">
      {/* Header */}
      <div className="border-b border-pl-border">
        <div className="container mx-auto px-6 py-4 max-w-[1100px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="text-pl-white/80"
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-pl-white/80"
              >
                <RotateCcw className="size-4" />
                Reset
              </Button>
            </div>
            
            <div className="text-center">
              <h1 className="text-h2 font-bold text-pl-white mb-1">Transfers</h1>
              <div className="flex items-center space-x-4 text-caption text-pl-white/80">
                <span>Gameweek 15</span>
                <span>•</span>
                <span className="text-pl-pink">Deadline: Fri 22 Aug, 23:00</span>
              </div>
            </div>

            <PillToggle
              options={viewOptions}
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "pitch" | "list")}
              size="sm"
            />
          </div>
          
          {/* Transfer stats */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-6 text-caption">
              <div className="flex items-center space-x-2">
                <span className="text-pl-white/60">Free transfers:</span>
                <span className="bg-pl-green text-pl-purple font-bold px-2 py-1 rounded-full">
                  {freeTransfers}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-pl-white/60">Cost:</span>
                <span className="text-pl-white font-semibold">£{cost}m</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-pl-white/60">Budget:</span>
                <span className="bg-pl-green text-pl-purple font-bold px-2 py-1 rounded-full">
                  £{budget}m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-[1100px]">
        {/* Transfer info */}
        <Card variant="glass" className="mb-6">
          <CardContent className="p-6 text-center">
            <p className="text-body text-pl-white/80">
              Make your transfers for Gameweek 15. You have <span className="text-pl-green font-semibold">{freeTransfers} free transfers</span> remaining.
            </p>
          </CardContent>
        </Card>

        {/* Main content based on view mode */}
        {viewMode === "pitch" ? (
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

              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center">
                  <ArrowUpDown className="size-16 text-pl-white/40 mx-auto mb-4" />
                  <h3 className="text-h3 text-pl-white mb-2">Select players to transfer</h3>
                  <p className="text-body text-pl-white/60">
                    Tap on any player to start making transfers
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-pl-white">Transfer List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <ArrowUpDown className="size-16 text-pl-white/40 mx-auto mb-4" />
                <h3 className="text-h3 text-pl-white mb-2">No transfers yet</h3>
                <p className="text-body text-pl-white/60">
                  Start by selecting players from your squad to transfer
                </p>
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
            disabled
            className="opacity-50"
          >
            Confirm Transfers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Transfers;
