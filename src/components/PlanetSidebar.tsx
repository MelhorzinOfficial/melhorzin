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
  const [loadingPreviews, setLoadingPreviews] = useState<{ [key: number]: boolean }>({});
  const [previewError, setPreviewError] = useState<{ [key: number]: boolean }>({});

  // Carregar previews reais dos sites
  useEffect(() => {
    const initialLoadingState: { [key: number]: boolean } = {};
    const initialErrorState: { [key: number]: boolean } = {};

    portfolios.forEach((portfolio) => {
      initialLoadingState[portfolio.id] = true;
      initialErrorState[portfolio.id] = false;
    });

    setLoadingPreviews(initialLoadingState);
    setPreviewError(initialErrorState);

    // Criar URLs para screenshots dos sites
    const fetchPreviews = async () => {
      const previews: { [key: number]: string } = {};

      for (const portfolio of portfolios) {
        try {
          // Tente carregar um screenshot do site usando um serviço de captura de tela
          // Aqui usamos o serviço PageScreenshot.com (gratuito para demonstração)
          const screenshotUrl = `https://api.apiflash.com/v1/urltoimage?access_key=38a824c737db490ca0853318356f603f&url=https://${portfolio.subdomain}.melhorzin.com&format=jpeg&quality=70&width=600&height=400`;

          // Verificar se a imagem carrega corretamente
          const img = new Image();
          img.onload = () => {
            setPreviewUrls((prev) => ({
              ...prev,
              [portfolio.id]: screenshotUrl,
            }));
            setLoadingPreviews((prev) => ({
              ...prev,
              [portfolio.id]: false,
            }));
          };

          img.onerror = () => {
            // Fallback para o placeholder se o screenshot falhar
            const fallbackUrl = `https://placehold.co/600x400/${portfolio.color.replace("#", "")}/${portfolio.color === "#FFFFFF" ? "000000" : "FFFFFF"}?text=${portfolio.name.replace(/ /g, "+")}`;
            setPreviewUrls((prev) => ({
              ...prev,
              [portfolio.id]: fallbackUrl,
            }));
            setLoadingPreviews((prev) => ({
              ...prev,
              [portfolio.id]: false,
            }));
            setPreviewError((prev) => ({
              ...prev,
              [portfolio.id]: true,
            }));
          };

          img.src = screenshotUrl;

          // Inicialmente, defina o URL como o placeholder
          previews[portfolio.id] = `https://placehold.co/600x400/${portfolio.color.replace("#", "")}/${portfolio.color === "#FFFFFF" ? "000000" : "FFFFFF"}?text=Carregando...`;
        } catch (error) {
          // Fallback para o placeholder em caso de erro
          previews[portfolio.id] = `https://placehold.co/600x400/${portfolio.color.replace("#", "")}/${portfolio.color === "#FFFFFF" ? "000000" : "FFFFFF"}?text=${portfolio.name.replace(/ /g, "+")}`;
          setLoadingPreviews((prev) => ({
            ...prev,
            [portfolio.id]: false,
          }));
          setPreviewError((prev) => ({
            ...prev,
            [portfolio.id]: true,
          }));
        }
      }

      // Definir os URLs iniciais (placeholders)
      setPreviewUrls(previews);
    };

    fetchPreviews();
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
    <div className={cn("h-full bg-black/80 text-white backdrop-blur-lg transition-all duration-300 border-r border-white/10 relative", isOpen ? "w-96" : "w-0")}>
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

                    {/* Preview do site - agora com screenshot real ou fallback */}
                    <div className="w-full h-32 mb-3 overflow-hidden rounded-md bg-gray-800 relative border border-white/10">
                      {/* Indicador de carregamento */}
                      {loadingPreviews[portfolio.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}

                      {/* Imagem de preview */}
                      <div className="w-full h-full flex items-center justify-center text-center p-0">
                        <img src={previewUrls[portfolio.id]} alt={`Preview de ${portfolio.name}`} className="w-full h-full object-cover" />
                      </div>

                      {/* Indicador de erro (opcional) */}
                      {previewError[portfolio.id] && <div className="absolute bottom-0 right-0 bg-black/70 text-xs text-white/70 px-1.5 py-0.5 rounded-tl">Preview não disponível</div>}
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
