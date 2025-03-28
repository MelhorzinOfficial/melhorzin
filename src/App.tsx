import { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { Settings } from './components/Settings';
import { Nav } from './components/Nav';
import { Roadmap } from './components/Roadmap';
import Skills from './components/Skills';
import { ParticlesR } from './components/Particles';
import { AnimatedMain } from './components/AnimatedMain';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { motion } from 'framer-motion';
import { AboutMe } from './components/AboutMe';
import { Projects } from './components/Projects';
import ModalEmail, { } from './components/ModalEmail';
import { SocialMedia } from './components/SocialMedia';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

function AppContent() {
  const { themeColors } = useTheme();
  const [currentSection, setCurrentSection] = useState("inicio");

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("[id]");
    const observerOptions = {
      root: null,
      threshold: 0.6
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const scrollY = window.scrollY;
      const documentHeight = document.body.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Força "inicio" se estiver quase no topo
      if (scrollY <= 10) {
        setCurrentSection("inicio");
        return;
      }

      // Força "jornada" se estiver quase no final da página
      if (viewportHeight + scrollY >= documentHeight - 5) {
        setCurrentSection("jornada");
        return;
      }

      let bestMatch: string | null = null;
      let highestRatio = 0;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          bestMatch = entry.target.getAttribute("id");
        }
      });

      if (bestMatch) {
        setCurrentSection(bestMatch);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: themeColors.background, color: themeColors.text }}>

        <Nav activeSection={currentSection} />
        <Settings />
        <SocialMedia onEmailClick={() => setModalOpen(true)} />

        {/* Email */}
        <motion.a>
          <ModalEmail isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </motion.a>
        <div
          className="min-h-screen relative"
          style={{
            background: `linear-gradient(135deg, ${themeColors.background}, ${themeColors.primary}33)`
          }}
        >
          <ParticlesR />
          <HeroSection id="inicio" />


          {/* Grid de fundo para toda a página */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(${themeColors.accent}11 1px, transparent 1px),
                linear-gradient(to right, ${themeColors.accent}11 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              opacity: 0.3
            }}
          ></div>

          <AnimatedMain variants={containerVariants}>
            <motion.main
              className="container mx-auto px-4 py-16 space-y-24 relative"
              initial={false}
              animate="visible"
              variants={containerVariants}
            >

              {/* About Me Section */}
              <AboutMe />

              {/* Projects Section */}
              <Projects />

              {/* Skills */}
              <Skills />

              {/* Career Roadmap Section */}
              <motion.div id="jornada" variants={itemVariants} className="relative z-10">
                <Roadmap />
              </motion.div>

            </motion.main>
          </AnimatedMain>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;