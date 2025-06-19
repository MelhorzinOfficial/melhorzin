import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Rocket,
  Star, 
  ChevronLeft,
  Grid2x2,
  List as ListIcon,
  SortAsc,
  Sparkles
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Portfolio } from "@/types/universe";

interface PlanetSidebarProps {
  portfolios: Portfolio[];
  onSelectPlanet: (id: number) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function PlanetSidebar({
  portfolios,
  onSelectPlanet,
  isOpen,
  onToggleOpen,
}: PlanetSidebarProps) {
  const [search, setSearch] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<'name' | 'color'>('name');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Get unique technologies
  const allTechnologies = Array.from(
    new Set(portfolios.flatMap(p => p.website.technologies))
  ).sort();

  // Filter and sort portfolios
  const filteredPortfolios = portfolios
    .filter(portfolio => {
      const matchesSearch = portfolio.name.toLowerCase().includes(search.toLowerCase()) ||
        portfolio.description.toLowerCase().includes(search.toLowerCase());
      const matchesTech = !selectedTech || portfolio.website.technologies.includes(selectedTech);
      return matchesSearch && matchesTech;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.color.localeCompare(b.color);
    });

  const toggleFavorite = (id: number) => {
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const favoritePlanets = filteredPortfolios.filter(p => favoriteIds.includes(p.id));
  const otherPlanets = filteredPortfolios.filter(p => !favoriteIds.includes(p.id));

  return (
    <motion.div
      initial={false}
      animate={{
        width: isOpen ? 320 : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 left-0 h-screen bg-background/95 border-r border-border overflow-hidden backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Explorador</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleOpen}
              className="hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar planetas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="p-2 border-b flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-2", viewMode === 'grid' && "bg-accent")}
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <ListIcon className="h-4 w-4" /> : <Grid2x2 className="h-4 w-4" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-2", sortBy === 'color' && "bg-accent")}
            onClick={() => setSortBy(sortBy === 'name' ? 'color' : 'name')}
          >
            <SortAsc className="h-4 w-4" />
          </Button>

          <select
            className="flex-1 px-2 py-1 rounded-md border bg-transparent text-sm"
            value={selectedTech || ''}
            onChange={(e) => setSelectedTech(e.target.value || null)}
          >
            <option value="">Todas as Tecnologias</option>
            {allTechnologies.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>

        {/* Planet List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {/* Favorites */}
            {favoritePlanets.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2 flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  Favoritos
                </h3>
                <div className={cn(
                  "grid gap-2",
                  viewMode === 'grid' ? "grid-cols-2" : "grid-cols-1"
                )}>
                  {favoritePlanets.map((portfolio) => (
                    <PlanetItem
                      key={portfolio.id}
                      portfolio={portfolio}
                      onSelect={onSelectPlanet}
                      isFavorite={true}
                      onToggleFavorite={() => toggleFavorite(portfolio.id)}
                      layout={viewMode}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Planets */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Planetas
              </h3>
              <div className={cn(
                "grid gap-2",
                viewMode === 'grid' ? "grid-cols-2" : "grid-cols-1"
              )}>
                {otherPlanets.map((portfolio) => (
                  <PlanetItem
                    key={portfolio.id}
                    portfolio={portfolio}
                    onSelect={onSelectPlanet}
                    isFavorite={false}
                    onToggleFavorite={() => toggleFavorite(portfolio.id)}
                    layout={viewMode}
                  />
                ))}
              </div>

              {filteredPortfolios.length === 0 && (
                <div className="text-muted-foreground text-sm text-center py-8">
                  Nenhum planeta encontrado
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}

interface PlanetItemProps {
  portfolio: Portfolio;
  onSelect: (id: number) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  layout: 'grid' | 'list';
}

function PlanetItem({ portfolio, onSelect, isFavorite, onToggleFavorite, layout }: PlanetItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        "group relative rounded-lg overflow-hidden transition-all hover:bg-accent cursor-pointer",
        layout === 'list' ? 'flex items-center p-2' : 'p-3'
      )}
      onClick={() => onSelect(portfolio.id)}
    >
      {/* Planet Icon */}
      <div
        className={cn(
          "rounded-full shadow-lg transition-transform group-hover:scale-110",
          layout === 'list' ? 'w-8 h-8' : 'w-12 h-12 mx-auto mb-2'
        )}
        style={{
          background: `linear-gradient(45deg, ${portfolio.color}, ${portfolio.color}dd)`,
          boxShadow: `0 0 20px ${portfolio.color}40`
        }}
      />
      
      {/* Info */}
      <div className={cn(
        "min-w-0",
        layout === 'list' ? 'flex-1 ml-3' : 'text-center mt-2'
      )}>
        <h4 className="font-medium truncate">{portfolio.name}</h4>
        {layout === 'list' && (
          <p className="text-sm text-muted-foreground truncate">{portfolio.description}</p>
        )}
      </div>

      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute h-8 w-8 hover:bg-accent",
          layout === 'list' ? 'right-2 top-1/2 -translate-y-1/2' : 'right-2 top-2',
          "opacity-0 group-hover:opacity-100 transition-opacity"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
      >
        <Star
          className={cn(
            "h-4 w-4 transition-colors",
            isFavorite ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
          )}
        />
      </Button>

      {/* Technologies */}
      {layout === 'grid' && (
        <div className="mt-2 flex flex-wrap gap-1 justify-center">
          {portfolio.website.technologies.slice(0, 2).map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 rounded text-[10px] bg-accent/50 text-accent-foreground"
            >
              {tech}
            </span>
          ))}
          {portfolio.website.technologies.length > 2 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-accent/50 text-accent-foreground">
              +{portfolio.website.technologies.length - 2}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
