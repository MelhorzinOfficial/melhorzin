import { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { Section } from './components/Section';
import { ProjectCard } from './components/ProjectCard';
import { Settings } from './components/Settings';
import { Nav } from './components/Nav';
import { Roadmap } from './components/Roadmap';
import Skills from './components/Skills';
import { ParticlesR } from './components/Particles';
import { AnimatedMain } from './components/AnimatedMain';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { motion } from 'framer-motion';

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
    transition: {
      duration: 0.5
    }
  }
};

function AppContent() {
  const { themeColors } = useTheme();
  const { t } = useLanguage();
  const [currentSection, setCurrentSection] = useState("inicio");

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
    <div style={{ backgroundColor: themeColors.background, color: themeColors.text }}>
      <Nav activeSection={currentSection} />

      <div
        className="min-h-screen relative"
        style={{
          background: `linear-gradient(135deg, ${themeColors.background}, ${themeColors.primary}33)`
        }}
      >
        <ParticlesR />
        <HeroSection id="inicio" />
        <Settings />

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
            className="container abc mx-auto px-4 py-16 space-y-24 relative"
            initial={false}
            animate="visible"
            variants={containerVariants}
          >
            {/* Seção Sobre */}
            <motion.div variants={itemVariants} className="relative z-10">
              <Section id="sobre" title={t('about.title')}>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2">
                    <p
                      className="text-lg leading-relaxed mb-8"
                      style={{ color: themeColors.text }}
                    >
                      {t('about.description')}
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div
                        className="p-6 rounded-lg relative overflow-hidden group"
                        style={{
                          backgroundColor: themeColors.glassBg,
                          backdropFilter: 'blur(10px)',
                          border: `1px solid ${themeColors.cardBorder}`
                        }}
                      >
                        <div
                          className="absolute top-0 right-0 w-16 h-16 opacity-30"
                          style={{
                            background: `linear-gradient(135deg, transparent 50%, ${themeColors.accent}66 100%)`
                          }}
                        ></div>

                        <h4
                          className="font-semibold mb-4 flex items-center"
                          style={{ color: themeColors.text }}
                        >
                          <span
                            className="w-8 h-8 mr-2 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: `${themeColors.primary}33`,
                              border: `1px solid ${themeColors.primary}66`
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                          Back End
                        </h4>
                        <ul className="space-y-3">
                          {['Java', 'Spring Boot', 'JPA/Hibernate', 'Maven'].map((skill, index) => (
                            <motion.li
                              key={index}
                              className="flex items-center"
                              whileHover={{ x: 5 }}
                              style={{ color: `${themeColors.text}dd` }}
                            >
                              <span
                                className="inline-block w-2 h-2 mr-2 rounded-full"
                                style={{ backgroundColor: themeColors.accent }}
                              ></span>
                              {skill}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div
                        className="p-6 rounded-lg relative overflow-hidden group"
                        style={{
                          backgroundColor: themeColors.glassBg,
                          backdropFilter: 'blur(10px)',
                          border: `1px solid ${themeColors.cardBorder}`
                        }}
                      >
                        <div
                          className="absolute top-0 right-0 w-16 h-16 opacity-30"
                          style={{
                            background: `linear-gradient(135deg, transparent 50%, ${themeColors.accent}66 100%)`
                          }}
                        ></div>

                        <h4
                          className="font-semibold mb-4 flex items-center"
                          style={{ color: themeColors.text }}
                        >
                          <span
                            className="inline-block w-8 h-8 mr-2 rounded-full items-center justify-center"
                            style={{
                              backgroundColor: `${themeColors.primary}33`,
                              border: `1px solid ${themeColors.primary}66`
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </span>
                          Front End
                        </h4>
                        <ul className="space-y-3">
                          {['React', 'TypeScript', 'HTML/CSS', 'Tailwind CSS'].map((skill, index) => (
                            <motion.li
                              key={index}
                              className="flex items-center"
                              whileHover={{ x: 5 }}
                              style={{ color: `${themeColors.text}dd` }}
                            >
                              <span
                                className="inline-block w-2 h-2 mr-2 rounded-full"
                                style={{ backgroundColor: themeColors.accent }}
                              ></span>
                              {skill}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div
                        className="absolute -inset-1 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                        style={{ background: `linear-gradient(135deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})` }}
                      ></div>
                      <div className="relative rounded-lg overflow-hidden">
                        <div
                          className="absolute inset-0 z-10 opacity-20"
                          style={{
                            backgroundImage: `
                              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '20px 20px'
                          }}
                        ></div>

                        <img
                          src="/../public/me2.png"
                          alt="About Me"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Section>
            </motion.div>

            {/* Projects Section */}
            <motion.div variants={itemVariants} className="relative z-10">
              <Section id="projetos" title={t('projects.title')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ProjectCard
                    title={'project1.title'}
                    description={'project1.description'}
                    image="../public/projeto-petx.png"
                    technologies={['Java', 'Spring Boot', 'JWT', 'Postgres']}
                    link="https://github.com/vitorlana45/BackEnd-Petx"
                  />
                  <ProjectCard
                    title={'project2.title'}
                    description={'project2.description'}
                    image="../public/cap-reservas-page.png"
                    technologies={['React', 'TypeScript', 'Tailwind CSS']}
                    link="https://github.com/vitorlana45/Reservas.com"
                  />
                </div>
              </Section>
            </motion.div>

            <Skills />

            {/* Career Roadmap Section */}
            <motion.div id="jornada" variants={itemVariants} className="relative z-10">
              <Roadmap />
            </motion.div>
            
          </motion.main>
        </AnimatedMain>
      </div>
    </div>
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