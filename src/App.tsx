import { useEffect, useState } from 'react';
import { Header } from './components/HeroSection';
import { Section } from './components/Section';
import { ProjectCard } from './components/ProjectCard';
import { Settings } from './components/Settings';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Nav } from './components/Nav';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { SmoothScrollProvider } from './components/SmoothScroll';
import { Roadmap } from './components/Roadmap';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { ReceiveEmail } from './components/SendEmail';

// Animation variants
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

// Main app content
const AppContent = () => {
  const { themeColors, theme } = useTheme();
  const { t } = useLanguage();
  const [currentSection, setCurrentSection] = useState('');

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  const handleParticlesLoaded = (container: Container | undefined) => {
    if (!container) return;

    container.canvas.element?.addEventListener('click', () => {
      setTimeout(() => {
        const count = container.particles.count;

        const removeCount = Math.floor(count * 0.3);

        for (let i = 0; i < removeCount; i++) {
          const randomIndex = Math.floor(Math.random() * container.particles.count);
          container.particles.removeAt(randomIndex);
        }
      }, 15000);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Se estiver no início da página (Hero), define a seção ativa como 'hero'
      if (scrollPosition < 300) {
        setCurrentSection('hero');
        return;
      }

      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const element = section as HTMLElement;
        const sectionTop = element.offsetTop - 150;
        const sectionBottom = sectionTop + element.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          current = element.getAttribute('id') || '';
        }
      });
      setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verifica a seção inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: themeColors.background, color: themeColors.text }}>
      <SmoothScrollProvider>
        <Nav activeSection={currentSection} />
        <div
          className="min-h-screen relative"
          style={{
            background: `linear-gradient(135deg, ${themeColors.background}, ${themeColors.primary}33)`
          }}
        >
          <Header />
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              fullScreen: false,
              background: {
                color: { value: "transparent" },
              },
              fpsLimit: 45, // Limite para reduzir a carga da renderização
              particles: {
                color: {
                  value: theme === "dark"
                    ? ["#00eaff"]
                    : ["#004466"],
                },
                links: {
                  enable: true,
                  distance: 120,
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  opacity: 0.1,
                  width: 0.8,
                  shadow: {
                    enable: false,
                  },
                },
                move: {
                  enable: true,
                  speed: 0.5, // Movimento mais suave e lento
                  direction: "none",
                  outModes: { default: "out" },
                  random: false,
                },
                number: {
                  density: { enable: true, area: 800 },
                  value: 30, // Menos partículas para melhor performance
                },
                opacity: {
                  value: 0.5,
                  random: false,
                  animation: {
                    enable: false, // Desativa a animação de opacidade
                  },
                },
                shape: {
                  type: "circle", // Use apenas um tipo para reduzir o processamento
                },
                size: {
                  value: { min: 1, max: 3 },
                  random: true,
                  animation: {
                    enable: false, // Desativa animação de tamanho
                  },
                },
                twinkle: {
                  particles: { enable: false }, // Desabilita o efeito twinkle
                  links: { enable: false },
                },
                roll: {
                  enable: false, // Desabilita o roll para reduzir processamento
                },
                rotate: {
                  enable: false, // Desabilita a rotação
                },
              },
              interactivity: {
                detectsOn: "canvas",
                events: {
                  onHover: { enable: false }, // Mantém as partículas estáticas ao passar o mouse
                  onClick: { enable: true, mode: "push" },
                  resize: true,
                },
                modes: {
                  push: { quantity: 3 },
                },
              },
              detectRetina: true,
            }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          />

          <motion.main
            className="container mx-auto px-4 py-16 space-y-24 relative"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
          </motion.main>
          <Settings />


          {/* Futuristic grid background for the main content */}
          <motion.main
            className="container mx-auto px-4 py-16 space-y-24 relative"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Background grid pattern */}
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

            {/* About Section */}
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
                        {/* Accent corner */}
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
                            className="inline-block w-8 h-8 mr-2 rounded-full flex items-center justify-center"
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
                        {/* Accent corner */}
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
                            className="inline-block w-8 h-8 mr-2 rounded-full flex items-center justify-center"
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
                        {/* Tech grid overlay */}
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
                          src="/about.jpg"
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
                    image="/project1.jpg"
                    technologies={['Java', 'Spring Boot', 'JWT', 'Swagger']}
                    link="https://github.com/vitorlana45/api-project"
                  />
                  <ProjectCard
                    title={'project2.title'}
                    description={'project2.description'}
                    image="/project2.jpg"
                    technologies={['React', 'TypeScript', 'Tailwind CSS']}
                    link="https://github.com/vitorlana45/portfolio"
                  />
                </div>
              </Section>
            </motion.div>

            {/* Skills Section */}
            <motion.div variants={itemVariants} className="relative z-10">
              <Section id="habilidades" title={t('skills.title')}>
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Back End */}
                    <motion.div
                      className="p-6 rounded-lg text-center relative overflow-hidden"
                      style={{
                        backgroundColor: themeColors.glassBg,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${themeColors.cardBorder}`
                      }}
                      whileHover={{
                        y: -5,
                        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px ${themeColors.glowAccent}`
                      }}
                    >
                      <div
                        className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${themeColors.primary}66, ${themeColors.accent}66)`,
                          border: `1px solid ${themeColors.accent}66`
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                      </div>
                      <h4 className="font-semibold">Back End</h4>
                      <p className="mt-2 text-sm opacity-80">Java, Spring Boot, JPA, NodeJs, N8N, RESTful APIs</p>
                    </motion.div>

                    {/* Front End */}
                    <motion.div
                      className="p-6 rounded-lg text-center relative overflow-hidden"
                      style={{
                        backgroundColor: themeColors.glassBg,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${themeColors.cardBorder}`
                      }}
                      whileHover={{
                        y: -5,
                        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px ${themeColors.glowAccent}`
                      }}
                    >
                      <div
                        className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${themeColors.primary}66, ${themeColors.accent}66)`,
                          border: `1px solid ${themeColors.accent}66`
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold">Front End</h4>
                      <p className="mt-2 text-sm opacity-80">React, TypeScript, Tailwind CSS, WEWEB</p>
                    </motion.div>

                    {/* Database */}
                    <motion.div
                      className="p-6 rounded-lg text-center relative overflow-hidden"
                      style={{
                        backgroundColor: themeColors.glassBg,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${themeColors.cardBorder}`
                      }}
                      whileHover={{
                        y: -5,
                        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px ${themeColors.glowAccent}`
                      }}
                    >
                      <div
                        className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${themeColors.primary}66, ${themeColors.accent}66)`,
                          border: `1px solid ${themeColors.accent}66`
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.338 4-8 4s-8-1.79-8-4" />
                        </svg>
                      </div>
                      <h4 className="font-semibold">Database</h4>
                      <p className="mt-2 text-sm opacity-80">MySQL, PostgreSQL, MongoDB, Supabase</p>
                    </motion.div>

                    {/* DevOps */}
                    <motion.div
                      className="p-6 rounded-lg text-center relative overflow-hidden"
                      style={{
                        backgroundColor: themeColors.glassBg,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${themeColors.cardBorder}`
                      }}
                      whileHover={{
                        y: -5,
                        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px ${themeColors.glowAccent}`
                      }}
                    >
                      <div
                        className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${themeColors.primary}66, ${themeColors.accent}66)`,
                          border: `1px solid ${themeColors.accent}66`
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h4 className="font-semibold">DevOps</h4>
                      <p className="mt-2 text-sm opacity-80">Git, Docker, CI/CD</p>
                    </motion.div>
                  </div>
                </div>
              </Section>
            </motion.div>

            {/* Career Roadmap Section */}
            <motion.div variants={itemVariants} className="relative z-10">
              <Roadmap />
            </motion.div>

            {/* Contact Section */}
            <motion.div variants={itemVariants} className="relative z-10">
              <Section id="contato" title={t('contact.title')}>
                <div className="max-w-2xl mx-auto">
                  <p
                    className="text-lg text-center mb-8"
                    style={{ color: themeColors.text }}
                  >
                    {t('contact.message')}
                  </p>
                  <div className="flex justify-center space-x-8">
                    <motion.a
                      href="https://github.com/vitorlana45"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative p-4 rounded-full flex items-center justify-center"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: `0 0 15px ${themeColors.glowAccent}`
                      }}
                      style={{
                        backgroundColor: themeColors.glassBg,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${themeColors.cardBorder}`,
                        color: themeColors.text
                      }}
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/vitorlana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative p-4 rounded-full flex items-center justify-center"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: `0 0 15px ${themeColors.glowAccent}`
                      }}
                      style={{
                        backgroundColor: themeColors.glassBg,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${themeColors.cardBorder}`,
                        color: themeColors.text
                      }}
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                      </svg>
                    </motion.a>
                  </div>

                  <div className="space-y-8">
                    <div className="flex justify-center space-x-8"></div>
                    <div className="flex items-center justify-center my-8">
                      <hr
                        className="w-1/4 border-t border-gray-300"
                        style={{ borderColor: themeColors.cardBorder }}
                      />
                      <span
                        className="mx-4 text-gray-500 text-sm uppercase tracking-wide"
                        style={{ color: themeColors.text }}
                      >
                        {t('contact.divider')}
                      </span>
                      <hr
                        className="w-1/4 border-t border-gray-300"
                        style={{ borderColor: themeColors.cardBorder }}
                      />
                    </div>
                    <div className="flex justify-center space-x-4">
                    </div>
                  </div>

                  <div>
                    <ReceiveEmail onSubmit={(email) => console.log(email)}>

                    </ReceiveEmail>
                  </div>

                </div>
              </Section>
            </motion.div>
          </motion.main>
        </div>
      </SmoothScrollProvider>
    </div>
  );
};

// Main App component
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