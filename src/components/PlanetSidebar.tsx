"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Portfolio {
  id: number;
  name: string;
  subdomain: string;
  description: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
}

interface PlanetSidebarProps {
  portfolios: Portfolio[];
  onSelectPlanet: (id: number) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function PlanetSidebar({ portfolios, onSelectPlanet, isOpen, onToggleOpen }: PlanetSidebarProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  const [previewUrls, setPreviewUrls] = useState<{ [key: number]: string }>({});

  // Usar imagens de placeholder para mostrar os sites
  useEffect(() => {
    // Mock de imagens de preview para os sites
    const mockPreviews: { [key: number]: string } = {};
    portfolios.forEach((portfolio) => {
      mockPreviews[portfolio.id] = `https://placehold.co/600x400/${portfolio.color.replace("#", "")}/${portfolio.color === "#FFFFFF" ? "000000" : "FFFFFF"}?text=${portfolio.name.replace(/ /g, "+")}`;
    });
    setPreviewUrls(mockPreviews);
  }, [portfolios]);

  // Função para abrir o site quando clicar no botão
  const openSite = (subdomain: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://${subdomain}.melhorzin.com`, "_blank");
  };

  // Função para visualizar o planeta
  const viewPlanet = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPlanet(id);
    onSelectPlanet(id);
  };

  return (
    <div className={cn("h-full bg-black/80 text-white backdrop-blur-lg transition-all duration-300 border-r border-white/10 relative", isOpen ? "w-80" : "w-0")}>
      {/* Botão para expandir quando a barra estiver recolhida */}
      {!isOpen && (
        <Button variant="outline" size="icon" className="absolute -right-10 top-4 bg-black/80 border border-white/20" onClick={onToggleOpen}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}

      <div className={cn("flex h-full flex-col overflow-hidden", isOpen ? "opacity-100" : "opacity-0 pointer-events-none")}>
        <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
          <h2 className="font-bold text-xl">Galáxia Melhorzin</h2>
          <Button variant="ghost" size="icon" onClick={onToggleOpen}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 max-h-[calc(100vh-60px)]">
          <div className="space-y-4 p-4">
            {portfolios.map((portfolio) => (
              <div key={portfolio.id} className="relative">
                <Card className={cn("bg-black/60 border transition-all p-3", selectedPlanet === portfolio.id ? "border-white/60 shadow-lg shadow-white/10" : "border-white/20 hover:border-white/30")}>
                  <div className="flex flex-col">
                    {/* Cabeçalho do card com nome e cor do planeta */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: portfolio.color }} />
                        <CardTitle className="text-md">{portfolio.name}</CardTitle>
                      </div>
                    </div>

                    {/* Preview do site - usando imagem de fallback */}
                    <div className="w-full h-32 mb-3 overflow-hidden rounded-md bg-gray-800 relative border border-white/10">
                      {/* Fundo colorido */}
                      <div className="w-full h-full absolute inset-0" style={{ backgroundColor: portfolio.color, opacity: 0.2 }} />

                      {/* Imagem de fallback para o preview */}
                      <div className="w-full h-full flex items-center justify-center text-center p-2">
                        <img src={previewUrls[portfolio.id]} alt={`Preview de ${portfolio.name}`} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <CardDescription className="text-xs text-white/70 mb-3 line-clamp-2">{portfolio.description}</CardDescription>

                    {/* Botões de ação */}
                    <div className="flex gap-2 mt-auto">
                      <Button variant="outline" size="sm" className="flex-1 bg-black/50 border-white/20 text-white hover:bg-white/10" onClick={(e) => viewPlanet(portfolio.id, e)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Planeta
                      </Button>
                      <Button variant="default" size="sm" className="flex-1" onClick={(e) => openSite(portfolio.subdomain, e)}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visitar
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
