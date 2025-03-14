import { createContext, useContext, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { ProjectCard } from './components/ProjectCard';
import { Settings } from './components/Settings';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { translations } from './translations';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { Engine, Container } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { SmoothScrollProvider } from './components/SmoothScroll';

type TranslationKey = keyof typeof translations.en;

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

interface NavLink {
  id: string;
  label: TranslationKey;
}

const AppContent = () => {
  const { themeColors, theme } = useTheme();
  if (!themeColors) {
    throw new Error('ThemeColors must be available within ThemeProvider');
  }

  // Removed unused variable 'isScrolled'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Removendo referência a setIsScrolled
      
      // Determinar qual seção está ativa com base na posição de rolagem
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Chamar imediatamente para definir o estado inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks: NavLink[] = [
    { id: 'sobre', label: 'nav.about' },
    { id: 'projetos', label: 'nav.projects' },
    { id: 'habilidades', label: 'nav.skills' },
    { id: 'contato', label: 'nav.contact' }
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      console.log(container);
    }
  };

  return (
    <div style={{ backgroundColor: themeColors.background, color: themeColors.text }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: {
            enable: false
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            detect_on: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "connect",
                parallax: {
                  enable: true,
                  force: 60,
                  smooth: 10
                }
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              connect: {
                distance: 80,
                links: {
                  opacity: 0.5
                },
                radius: 60
              },
            },
          },
          particles: {
            color: {
              value: [
                "#00FFFF", // Ciano
                "#FF00FF", // Magenta
                "#00FF00", // Verde neon
                "#3366FF"  // Azul elétrico
              ]
            },
            links: {
              color: {
                value: "#FFFFFF"
              },
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
              triangles: {
                enable: false
              },
              shadow: {
                blur: 5,
                color: {
                  value: "#00FFFF"
                },
                enable: true
              }
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out",
                bottom: "out",
                left: "out",
                right: "out",
                top: "out"
              },
              random: false,
              speed: 2,
              straight: false,
              trail: {
                enable: true,
                length: 20,
                fillColor: {
                  value: "#000000"
                }
              }
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 70,
              limit: 100,
            },
            opacity: {
              animation: {
                enable: true,
                minimumValue: 0.1,
                speed: 1,
                sync: false,
              },
              random: {
                enable: true,
                minimumValue: 0.1,
              },
              value: 0.8,
            },
            shape: {
              type: ["circle", "square", "polygon"],
              options: {
                polygon: {
                  sides: 6
                },
                square: {
                  sides: 4
                }
              }
            },
            size: {
              animation: {
                enable: true,
                minimumValue: 0.5,
                speed: 1.5,
                sync: false,
              },
              random: {
                enable: true,
                minimumValue: 1,
              },
              value: 3,
            },
            stroke: {
              color: {
                value: "#00FFFF",
                animation: {
                  enable: true,
                  speed: 1,
                  sync: true
                }
              },
              width: 1
            },
            zIndex: {
              random: {
                enable: true,
                minimumValue: 0
              },
              value: 0,
              opacityRate: 1,
              sizeRate: 1,
              velocityRate: 1
            },
            reduceDuplicates: true,
            shadow: {
              blur: 5,
              color: {
                value: "#00FFFF"
              },
              enable: true,
              offset: {
                x: 3,
                y: 3
              }
            },
            twinkle: {
              lines: {
                enable: true,
                frequency: 0.005,
                opacity: 0.7,
                color: {
                  value: ["#00FFFF", "#FF00FF", "#00FF00", "#3366FF"]
                }
              },
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 0.7,
                color: {
                  value: ["#00FFFF", "#FF00FF", "#00FF00", "#3366FF"]
                }
              }
            }
          },
          detectRetina: true,
          motion: {
            disable: false,
            reduce: {
              factor: 4,
              value: true
            }
          }
        }}
      />
      <SmoothScrollProvider>
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-blue-950 to-blue-900' : 'bg-gradient-to-br from-blue-100 to-blue-200'}`}>
          <Settings />
          <Header />
          
          <motion.main 
            className="container mx-auto px-4 py-16 space-y-24"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Section id="sobre" title={t('about.title')}>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/2">
                    <p className="text-lg leading-relaxed" style={{ color: themeColors.text }}>
                      {t('about.description')}
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg" style={{ backgroundColor: themeColors.cardBackground, color: themeColors.cardText }}>
                        <h4 className="font-semibold mb-2">
                          Back End
                        </h4>
                        <ul className="space-y-2">
                          <li>Java</li>
                          <li>Spring Boot</li>
                          <li>JPA/Hibernate</li>
                          <li>Maven</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-lg" style={{ backgroundColor: themeColors.cardBackground, color: themeColors.cardText }}>
                        <h4 className="font-semibold mb-2">
                          Front End
                        </h4>
                        <ul className="space-y-2">
                          <li>React</li>
                          <li>TypeScript</li>
                          <li>HTML/CSS</li>
                          <li>Tailwind CSS</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <img 
                          src="/about.jpg" 
                          alt="About Me" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Section id="projetos" title={t('projects.title')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ProjectCard
                    title="project1.title"
                    description="project1.description"
                    image="/project1.jpg"
                    link="https://github.com/vitorlana45"
                    technologies={['Java', 'Spring Boot', 'JWT', 'Swagger']}
                  />
                  <ProjectCard
                    title="project2.title"
                    description="project2.description"
                    image="/project2.jpg"
                    link="https://github.com/vitorlana45"
                    technologies={['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion']}
                  />
                </div>
              </Section>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Section id="habilidades" title={t('skills.title')}>
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Back End */}
                    <div className="p-6 rounded-lg text-center" style={{ backgroundColor: themeColors.sectionBackground, color: themeColors.sectionText }}>
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: themeColors.cardBackground }}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14.016q1.266 0 2.133-0.867t0.867-2.133-0.867-2.133-2.133-0.867-2.133 0.867-0.867 2.133 0.867 2.133 2.133 0.867zM12 3q3.75 0 6.375 2.625t2.625 6.375-2.625 6.375-6.375 2.625-6.375-2.625-2.625-6.375 2.625-6.375 6.375-2.625z"></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Back End</h3>
                      <ul className="space-y-2">
                        <li>Java</li>
                        <li>Spring Boot</li>
                        <li>JPA/Hibernate</li>
                        <li>Maven</li>
                      </ul>
                    </div>

                    {/* Front End */}
                    <div className="p-6 rounded-lg text-center" style={{ backgroundColor: themeColors.sectionBackground, color: themeColors.sectionText }}>
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: themeColors.cardBackground }}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l-5.5 9h11L12 2zm0 20l5.5-9h-11L12 22z"></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Front End</h3>
                      <ul className="space-y-2">
                        <li>React</li>
                        <li>TypeScript</li>
                        <li>HTML/CSS</li>
                        <li>Tailwind CSS</li>
                      </ul>
                    </div>

                    {/* Database */}
                    <div className="p-6 rounded-lg text-center" style={{ backgroundColor: themeColors.sectionBackground, color: themeColors.sectionText }}>
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: themeColors.cardBackground }}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.71 0 6 1.29 6 2s-2.29 2-6 2-6-1.29-6-2 2.29-2 6-2zM4 9v3c0 1.68 2.37 3.08 5.5 3.71C8.69 15.44 8 14.75 8 14v-2c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2c0 .75-.69 1.44-1.5 1.71 3.13-.63 5.5-2.03 5.5-3.71V9c0 2.21-3.58 4-8 4s-8-1.79-8-4z"></path>
                      </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Database</h3>
                      <ul className="space-y-2">
                        <li>PostgreSQL</li>
                        <li>MongoDB</li>
                        <li>MySQL</li>
                        <li>Redis</li>
                      </ul>
                    </div>

                    {/* DevOps */}
                    <div className="p-6 rounded-lg text-center" style={{ backgroundColor: themeColors.sectionBackground, color: themeColors.sectionText }}>
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: themeColors.cardBackground }}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18s-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18s.41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9M12 4.15L5 8.09v7.82l7 3.94 7-3.94V8.09l-7-3.94z"></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">DevOps</h3>
                      <ul className="space-y-2">
                        <li>Docker</li>
                        <li>Kubernetes</li>
                        <li>CI/CD</li>
                        <li>AWS</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Section>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Section id="contato" title={t('contact.title')}>
                <div className="max-w-2xl mx-auto">
                  <p className="text-lg text-center mb-8" style={{ color: themeColors.text }}>
                    {t('contact.title')}
                  </p>
                  <div className="flex justify-center space-x-8">
                    <a 
                      href="https://github.com/vitorlana45" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-4 rounded-full transition-all duration-300"
                      style={{ backgroundColor: themeColors.cardBackground, color: themeColors.cardText }}
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                      </svg>
                    </a>
                    <a 
                      href="https://linkedin.com/in/vitorlana" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-4 rounded-full transition-all duration-300"
                      style={{ backgroundColor: themeColors.cardBackground, color: themeColors.cardText }}
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                      </svg>
                    </a>
                    <a 
                      href="mailto:vitorlana45@gmail.com" 
                      className="p-4 rounded-full transition-all duration-300"
                      style={{ backgroundColor: themeColors.cardBackground, color: themeColors.cardText }}
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                      </svg>
                    </a>
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