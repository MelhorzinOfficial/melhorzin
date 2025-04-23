"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, Code } from "lucide-react";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";
import { useLocale } from "next-intl";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  githubUrl?: string;
  homepage?: string | null;
  stars?: number;
  language?: string | null;
  updatedAt?: string;
  isLink?: boolean;
}

export function ProjectCard({ title, description, image, tags, githubUrl, homepage, stars = 0, language, updatedAt, isLink = false }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const locale = useLocale();
  const dateLocale = locale === "pt-br" ? ptBR : enUS;

  const formattedDate = updatedAt ? format(new Date(updatedAt), "PP", { locale: dateLocale }) : null;

  // Gera um hash baseado na string
  const hashString = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Lista de imagens de alta qualidade para os projetos
  const projectImagesList = [
    "https://images.unsplash.com/photo-1557853197-aefb550b6fdc?q=80&w=1740",
    "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=1740",
    "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=1740",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1740",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1740",
    "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1740",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1740",
    "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1740",
    "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1740",
    "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1740",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1740",
    "https://images.unsplash.com/photo-1550645612-83f5d594b671?q=80&w=1740",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1740",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1740",
    "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1740",
    "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?q=80&w=1740",
    "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1740",
    "https://images.unsplash.com/photo-1573495612937-f22e7f5dbb68?q=80&w=1740",
    "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1740",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1740",
  ];

  // Selecionamos uma imagem baseada no título+linguagem, tornando a seleção consistente
  const getProjectImage = (title: string, language: string | null): string => {
    if (image) return image;

    const hashValue = hashString(title + (language || ""));
    const imageIndex = hashValue % projectImagesList.length;

    return projectImagesList[imageIndex];
  };

  // Cria gradientes de cores bonitos baseados no título do projeto
  const getGradientStyle = (title: string): string => {
    const gradients = [
      "linear-gradient(to bottom, rgba(30, 64, 175, 0.4), rgba(17, 24, 39, 0.6))", // Azul profundo
      "linear-gradient(to bottom, rgba(79, 70, 229, 0.4), rgba(45, 16, 83, 0.6))", // Indigo
      "linear-gradient(to bottom, rgba(168, 85, 247, 0.4), rgba(91, 33, 182, 0.6))", // Roxo
      "linear-gradient(to bottom, rgba(236, 72, 153, 0.4), rgba(136, 19, 55, 0.6))", // Rosa
      "linear-gradient(to bottom, rgba(239, 68, 68, 0.4), rgba(153, 27, 27, 0.6))", // Vermelho
      "linear-gradient(to bottom, rgba(249, 115, 22, 0.4), rgba(154, 52, 18, 0.6))", // Laranja
      "linear-gradient(to bottom, rgba(16, 185, 129, 0.4), rgba(4, 120, 87, 0.6))", // Esmeralda
      "linear-gradient(to bottom, rgba(6, 182, 212, 0.4), rgba(14, 116, 144, 0.6))", // Ciano
    ];

    const hashValue = hashString(title);
    const gradientIndex = hashValue % gradients.length;

    return gradients[gradientIndex];
  };

  const projectImage = getProjectImage(title, language);
  const gradientStyle = getGradientStyle(title);

  const cardContent = (
    <>
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={projectImage} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="absolute inset-0 backdrop-blur-[2px]" style={{ background: gradientStyle }} />

        {language && (
          <Badge className="absolute right-2 top-2 bg-black/40 backdrop-blur-sm text-white font-medium">
            <Code className="mr-1 h-3 w-3" />
            {language}
          </Badge>
        )}
      </div>
      <CardContent className="flex h-[180px] flex-col p-5">
        <h3 className="mb-2 text-xl font-bold text-white line-clamp-1">{title}</h3>
        <p className="mb-3 text-sm text-gray-300 line-clamp-2 flex-grow">{description || "Sem descrição disponível"}</p>

        {formattedDate && <p className="mb-2 text-xs text-gray-400">Atualizado em: {formattedDate}</p>}

        <div className="mb-3 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="bg-blue-900/20 text-blue-300">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="bg-blue-900/20 text-blue-300">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex gap-2">
            {homepage && (
              <Button size="sm" variant="ghost" className="h-8 p-2" asChild>
                <a href={homepage} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <ExternalLink className="mr-1 h-4 w-4" />
                  <span className="text-xs">Demo</span>
                </a>
              </Button>
            )}
          </div>

          {stars > 0 && (
            <Badge variant="outline" className="flex items-center bg-amber-900/20 text-amber-300">
              <Star className="mr-1 h-3 w-3 fill-amber-300" />
              {stars}
            </Badge>
          )}
        </div>
      </CardContent>
    </>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="h-full">
      {isLink && githubUrl ? (
        <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
          <Card className="group h-full cursor-pointer overflow-hidden border-blue-800/30 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-blue-500/70 hover:shadow-lg hover:shadow-blue-500/20" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {cardContent}
          </Card>
        </Link>
      ) : (
        <Card className="group h-full overflow-hidden border-blue-800/30 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {cardContent}
        </Card>
      )}
    </motion.div>
  );
}
