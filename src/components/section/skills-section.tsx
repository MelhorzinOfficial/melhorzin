"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Code, Layers, Database, Palette, Cpu, Globe, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function SkillsSection() {
  const t = useTranslations("HomePage");

  const skills = [
    {
      category: "Frontend",
      icon: <Code className="h-6 w-6 text-orange-400" />,
      items: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      icon: <Layers className="h-6 w-6 text-blue-400" />,
      items: ["Node.js", "Express", "Python", "Django", "GraphQL"],
    },
    {
      category: "Database",
      icon: <Database className="h-6 w-6 text-green-400" />,
      items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    },
    {
      category: "Design",
      icon: <Palette className="h-6 w-6 text-purple-400" />,
      items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "UI/UX"],
    },
    {
      category: "DevOps",
      icon: <Cpu className="h-6 w-6 text-red-400" />,
      items: ["Docker", "Kubernetes", "AWS", "CI/CD", "GitHub Actions"],
    },
    {
      category: "Other",
      icon: <Globe className="h-6 w-6 text-teal-400" />,
      items: ["SEO", "Performance Optimization", "Accessibility", "Testing", "Analytics"],
    },
  ];

  return (
    <section id="skills" className="my-20 scroll-mt-20">
      <div className="mb-10 flex items-center">
        <div className="relative mr-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-600 to-teal-900 shadow-lg shadow-teal-900/20">
          <Sparkles className="h-7 w-7 text-white" />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600/40 to-teal-900/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
        <div>
          <span className="block text-sm font-medium uppercase tracking-wider text-teal-400">03</span>
          <h2 className="text-3xl font-bold tracking-tight text-white">{t("skillsSection.heading")}</h2>
        </div>
        <div className="ml-auto h-px flex-grow bg-gradient-to-r from-teal-800 to-transparent"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <motion.div key={skill.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
            <Card className="border-teal-800/30 bg-black/40 p-6 backdrop-blur-md">
              <div className="mb-4 flex items-center">
                {skill.icon}
                <h3 className="ml-3 text-xl font-semibold text-white">{skill.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <Badge key={item} className="bg-teal-900/30 text-teal-200">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
