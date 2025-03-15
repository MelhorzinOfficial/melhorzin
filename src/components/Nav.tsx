import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

export function Nav({ activeSection }: { activeSection: string }) {
  const { t } = useLanguage();
  const { themeColors } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { id: "inicio", label: t("nav.home") },
    { id: "sobre", label: t("nav.about") },
    { id: "projetos", label: t("nav.projects") },
    { id: "habilidades", label: t("nav.skills") },
    { id: "jornada", label: t("nav.career") },
  ];

  // Atualiza o estado de scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: isScrolled ? themeColors.glassBg : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        borderBottom: isScrolled ? `1px solid ${themeColors.cardBorder}` : "none",
      }}
    >
      <div className="container mx-auto px-4">
        <ul className="flex justify-center space-x-8">
          {navLinks.map((link) => (
            <motion.li
              key={link.id}
              whileHover={{
                scale: 1.05,
                textShadow: `0 0 8px ${themeColors.glowAccent}`,
              }}
              className="relative"
            >
              <a
                href={`#${link.id}`}
                className="relative py-2 px-1 block transition-colors duration-300"
                style={{
                  color: activeSection === link.id ? themeColors.accent : themeColors.text,
                }}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{
                      background: `linear-gradient(90deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
                      boxShadow: `0 0 8px ${themeColors.glowAccent}`,
                    }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
