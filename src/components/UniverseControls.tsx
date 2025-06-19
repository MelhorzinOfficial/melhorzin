import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp, Settings2, Play, Pause, Eye, EyeOff, Globe, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Portfolio } from "@/types/universe";

interface UniverseControlsProps {
  portfolios: Portfolio[];
  onUpdatePlanetSpeed: (id: number, speed: number) => void;
  onUpdatePlanetSize: (id: number, size: number) => void;
  onTogglePlanetVisibility: (id: number) => void;
  onUpdateGlobalSpeed: (speed: number) => void;
  onToggleOrbitLines: () => void;
  onToggleNebulas: () => void;
  onUpdateSunIntensity: (intensity: number) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function UniverseControls({
  portfolios,
  onUpdatePlanetSpeed,
  onUpdatePlanetSize,
  onTogglePlanetVisibility,
  onUpdateGlobalSpeed,
  onToggleOrbitLines,
  onToggleNebulas,
  onUpdateSunIntensity,
  isOpen,
  onToggleOpen
}: UniverseControlsProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  const [hiddenPlanets, setHiddenPlanets] = useState<number[]>([]);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showNebulas, setShowNebulas] = useState(true);

  const handleTogglePlanetVisibility = (id: number) => {
    setHiddenPlanets(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
    onTogglePlanetVisibility(id);
  };

  const handleToggleOrbits = () => {
    setShowOrbits(!showOrbits);
    onToggleOrbitLines();
  };

  const handleToggleNebulas = () => {
    setShowNebulas(!showNebulas);
    onToggleNebulas();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute -top-16 right-0 bg-black/80 border border-white/20"
        onClick={onToggleOpen}
      >
        <Settings2 className="h-4 w-4" />
      </Button>

      {/* Main Controls Panel */}
      <div
        className={cn(
          "bg-black/90 border border-white/20 rounded-lg transition-all duration-300 overflow-hidden backdrop-blur-lg",
          isOpen ? "w-80 h-96" : "w-0 h-0"
        )}
      >
        {isOpen && (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              Controles do Sistema
            </h3>

            <ScrollArea className="flex-1 pr-4">
              {/* Global Controls */}
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm text-white/70 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Velocidade Global
                  </label>
                  <Slider
                    defaultValue={[1]}
                    max={2}
                    min={0}
                    step={0.1}
onValueChange={(values) => onUpdateGlobalSpeed(values[0])}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70 flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    Intensidade do Sol
                  </label>
                  <Slider
                    defaultValue={[1.5]}
                    max={3}
                    min={0.5}
                    step={0.1}
onValueChange={(values) => onUpdateSunIntensity(values[0])}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "flex-1",
                      showOrbits ? "bg-white/10" : "bg-transparent"
                    )}
                    onClick={handleToggleOrbits}
                  >
                    {showOrbits ? "Ocultar Órbitas" : "Mostrar Órbitas"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "flex-1",
                      showNebulas ? "bg-white/10" : "bg-transparent"
                    )}
                    onClick={handleToggleNebulas}
                  >
                    {showNebulas ? "Ocultar Nebulosas" : "Mostrar Nebulosas"}
                  </Button>
                </div>
              </div>

              {/* Planet Controls */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white/70 mb-2">Controle dos Planetas</h4>
                {portfolios.map((portfolio) => (
                  <div
                    key={portfolio.id}
                    className="border border-white/10 rounded-lg p-2 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: portfolio.color }}
                        />
                        <span className="text-white text-sm">{portfolio.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleTogglePlanetVisibility(portfolio.id)}
                      >
                        {hiddenPlanets.includes(portfolio.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {!hiddenPlanets.includes(portfolio.id) && (
                      <div className="space-y-2 pl-5">
                        <div className="space-y-1">
                          <label className="text-xs text-white/50">Velocidade</label>
                          <Slider
                            defaultValue={[portfolio.orbitSpeed]}
                            max={0.01}
                            min={0.001}
                            step={0.001}
onValueChange={(values) => onUpdatePlanetSpeed(portfolio.id, values[0])}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-white/50">Tamanho</label>
                          <Slider
                            defaultValue={[portfolio.size]}
                            max={10}
                            min={2}
                            step={0.5}
onValueChange={(values) => onUpdatePlanetSize(portfolio.id, values[0])}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
