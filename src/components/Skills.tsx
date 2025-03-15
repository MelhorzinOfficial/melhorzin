import { motion } from "framer-motion";
import { Section } from "./Section";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Skills = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const themeColors = useTheme().themeColors;
  const { t } = useLanguage();

  const skills = [
    {
      title: "Back End",
      description: "Java, Spring Boot, JPA, NodeJs, N8N, RESTful APIs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
    },
    {
      title: "Front End",
      description: "React, TypeScript, Tailwind CSS, WEWEB",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Database",
      description: "MySQL, PostgreSQL, MongoDB, Supabase",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.338 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
    },
    {
      title: "DevOps",
      description: "Git, Docker, CI/CD",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <motion.div variants={itemVariants} className="relative z-10">
      <Section id="habilidades" title={t("skills.title")}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg text-center relative overflow-hidden"
                style={{
                  backgroundColor: themeColors.glassBg,
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${themeColors.cardBorder}`,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.05,
                  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px ${themeColors.glowAccent}`,
                }}
              >
                <div
                  className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${themeColors.primary}66, ${themeColors.accent}66)`,
                    border: `1px solid ${themeColors.accent}66`,
                  }}
                >
                  {skill.icon}
                </div>
                <h4 className="font-semibold text-lg">{skill.title}</h4>
                <p className="mt-2 text-sm opacity-80">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </motion.div>
  );
};

export default Skills;
