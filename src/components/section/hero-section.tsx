"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("HeroSection");

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex min-h-[90vh] flex-col items-center justify-center text-center"
    >
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400">
            {t("title")}
          </span>
        </h1>
      </motion.div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
        <p className="mb-8 max-w-2xl text-xl text-gray-300">{t("subtitle")}</p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Link href={"#about"}>{t("button")}</Link>
        </Button>
        {/* Botão para download */}
        <Button variant="outline" className="border-purple-500 text-white hover:bg-purple-900/20" asChild>
          <a href="/Raposo_Curriculo.pdf" download>
            {t("contactButton")} {/* Ex.: "Baixar Currículo" */}
          </a>
        </Button>
        {/* Botão para visualização */}
        <Button variant="outline" className="border-purple-500 text-white hover:bg-purple-900/20" asChild>
          <a href="/Raposo_Curriculo.pdf" target="_blank" rel="noopener noreferrer">
            Visualizar Currículo
          </a>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToNext}
          className="animate-bounce rounded-full text-white hover:bg-white/10"
        >
          <ChevronDown className="h-6 w-6" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}