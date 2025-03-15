import { useState, useEffect } from 'react';
import { Header } from './components/HeroSection';
import { Section } from './components/Section';
import { ProjectCard } from './components/ProjectCard';
import { Settings } from './components/Settings';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { translations } from './translations';
import { motion } from 'framer-motion';
import { Nav } from './components/Nav';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { SmoothScrollProvider } from './components/SmoothScroll';

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

const AppContent = () => {
  const { themeColors, theme } = useTheme();
  if (!themeColors) {
    throw new Error('ThemeColors must be available within ThemeProvider');
  }

  const { t } = useLanguage();
  const [currentSection, setCurrentSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Determinar qual seção está ativa com base na posição de rolagem
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setCurrentSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Chamar imediatamente para definir o estado inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ backgroundColor: themeColors.background, color: themeColors.text }}>
      <SmoothScrollProvider>
        <Nav activeSection={currentSection} />
        <div 
          className="min-h-screen"
          style={{ 
            background: `linear-gradient(135deg, ${themeColors.background}, ${themeColors.primary}33)` 
          }}
        >
          <Settings />
          <Header />
          
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
                  linear-gradient(${theme === 'dark' ? 'rgba(15, 23, 42, 0.1)' : 'rgba(255, 255, 255, 0.1)'} 1px, transparent 1px),
                  linear-gradient(90deg, ${theme === 'dark' ? 'rgba(15, 23, 42, 0.1)' : 'rgba(255, 255, 255, 0.1)'} 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
                opacity: 0.3
              }}
            ></div>
            
            {/* About Section */}
            <motion.div variants={itemVariants} className="relative z-10">
              <Section id="sobre" title={t('about.title')}>
                <div className="flex flex-col md:flex-row items-center gap-8">
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
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: themeColors.accent }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
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
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: themeColors.accent }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        {/* Tech grid overlay */}
                        <div 
                          className="absolute inset-0 z-10 opacity-20" 
                          style={{
                            backgroundImage: `
                              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
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
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: themeColors.text }}>
                          <path d="M12 14.016q1.266 0 2.133-0.867t0.867-2.133-0.867-2.133-2.133-0.867-2.133 0.867-0.867 2.133 0.867 2.133 2.133 0.867zM12 3q3.75 0 6.375 2.625t2.625 6.375-2.625 6.375-6.375 2.625-6.375-2.625-2.625-6.375 2.625-6.375 6.375-2.625z"></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: themeColors.text }}>Back End</h3>
                      <ul className="space-y-2">
                        {['Java', 'Spring Boot', 'JPA/Hibernate', 'Maven'].map((skill, index) => (
                          <li key={index} style={{ color: `${themeColors.text}dd` }}>{skill}</li>
                        ))}
                      </ul>
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
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: themeColors.text }}>
                          <path d="M12 2l-5.5 9h11L12 2zm0 20l5.5-9h-11L12 22z"></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: themeColors.text }}>Front End</h3>
                      <ul className="space-y-2">
                        {['React', 'TypeScript', 'HTML/CSS', 'Tailwind CSS'].map((skill, index) => (
                          <li key={index} style={{ color: `${themeColors.text}dd` }}>{skill}</li>
                        ))}
                      </ul>
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
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: themeColors.text }}>
                          <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.71 0 6 1.29 6 2s-2.29 2-6 2-6-1.29-6-2 2.29-2 6-2zM4 9v3c0 1.68 2.37 3.08 5.5 3.71C8.69 15.44 8 14.75 8 14v-2c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2c0 .75-.69 1.44-1.5 1.71 3.13-.63 5.5-2.03 5.5-3.71V9c0 2.21-3.58 4-8 4s-8-1.79-8-4z"></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: themeColors.text }}>Database</h3>
                      <ul className="space-y-2">
                        {['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'].map((skill, index) => (
                          <li key={index} style={{ color: `${themeColors.text}dd` }}>{skill}</li>
                        ))}
                      </ul>
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
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: themeColors.text }}>
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                          <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                          <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: themeColors.text }}>DevOps</h3>
                      <ul className="space-y-2">
                        {['Docker', 'Kubernetes', 'CI/CD', 'AWS'].map((skill, index) => (
                          <li key={index} style={{ color: `${themeColors.text}dd` }}>{skill}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </Section>
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
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
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
                    <motion.a 
                      href="mailto:vitorlana45@gmail.com" 
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
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                      </svg>
                    </motion.a>
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