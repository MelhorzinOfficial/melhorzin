"use client";

import { useEffect, useState } from "react";
import { GithubProject, getGithubProjects } from "@/lib/github";
import { ProjectCard } from "@/components/card/project-card";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ChevronDown, ChevronUp, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface GithubProjectsProps {
  username?: string;
  limit?: number;
}

export function GithubProjects({ username = "raposoG", limit = 6 }: GithubProjectsProps) {
  const [projects, setProjects] = useState<GithubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const t = useTranslations("ProjectsSection");

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const repos = await getGithubProjects(username);
      setProjects(repos);
    } catch (err) {
      setError(typeof err === "string" ? err : "Ocorreu um erro ao buscar os projetos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [username]);

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6 border-red-800/50 bg-red-900/10">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t("errorTitle")}</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
        <Button 
          onClick={fetchProjects} 
          variant="outline" 
          size="sm" 
          className="mt-2"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          {t("tryAgain")}
        </Button>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="overflow-hidden rounded-lg border border-blue-800/30 bg-black/40 backdrop-blur-md">
            <Skeleton className="h-48 w-full" />
            <div className="p-5">
              <Skeleton className="mb-2 h-6 w-3/4" />
              <Skeleton className="mb-4 h-4 w-full" />
              <Skeleton className="mb-4 h-4 w-full" />
              <div className="flex flex-wrap gap-2 mb-4">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <Alert className="mb-6 border-yellow-800/50 bg-yellow-900/10">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t("noProjectsTitle")}</AlertTitle>
        <AlertDescription>{t("noProjectsDescription")}</AlertDescription>
      </Alert>
    );
  }

  // Determinar quantos projetos mostrar
  const displayedProjects = showAllProjects 
    ? projects 
    : projects.slice(0, limit);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.1, 0.5) }}
              layout
            >
              <ProjectCard
                title={project.name}
                description={project.description || t("noDescription")}
                tags={project.topics.length > 0 ? project.topics : (project.language ? [project.language] : [])}
                githubUrl={project.html_url}
                homepage={project.homepage}
                stars={project.stargazers_count}
                language={project.language}
                updatedAt={project.updated_at}
                isLink={true} // Tornar todo o card clicável
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {projects.length > limit && (
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowAllProjects(!showAllProjects)}
            variant="outline" 
            size="lg"
            className="border-blue-500 bg-blue-900/20 px-6 text-blue-300 hover:bg-blue-900/40 hover:text-blue-100"
          >
            {showAllProjects ? (
              <>
                <ChevronUp className="mr-2 h-5 w-5" />
                {t("showLess")}
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-5 w-5" />
                {t("showAll")}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
