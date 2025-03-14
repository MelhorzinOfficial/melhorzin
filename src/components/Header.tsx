import { useCallback, useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { motion } from 'framer-motion';

export function Header() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (_container: Container | undefined) => {
    // console.log(container);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {mounted && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fullScreen: {
              enable: false,
            },
            background: {
              color: {
                value: 'transparent',
              },
            },
            fpsLimit: 120,
            particles: {
              color: {
                value: theme === 'dark' ? '#ef4444' : '#dc2626',
              },
              links: {
                color: theme === 'dark' ? '#ef4444' : '#dc2626',
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              move: {
                direction: 'none',
                enable: true,
                outModes: {
                  default: 'bounce',
                },
                random: true,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: 'circle',
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 w-full h-full"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-red-950 to-red-900 dark:from-red-950 dark:to-red-900 opacity-90"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="w-full md:w-1/2 text-left">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              variants={itemVariants}
            >
              <span className="text-red-400 dark:text-red-300">Hi.</span> {t('header.title')}
            </motion.h1>
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold text-red-200 dark:text-red-200 mb-6"
              variants={itemVariants}
            >
              {t('header.subtitle')}
            </motion.h2>
            <motion.p 
              className="text-lg text-red-100/90 dark:text-red-100/80 mb-8 max-w-lg"
              variants={itemVariants}
            >
              {t('header.description')}
            </motion.p>
            <motion.div 
              className="flex gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="#projetos"
                className="group relative inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-red-400 dark:from-red-700 dark:to-red-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative px-6 py-3 rounded-lg bg-red-900/50 dark:bg-red-900/30 backdrop-blur-sm text-white hover:text-white transition-colors duration-300 ring-1 ring-red-800/50 dark:ring-red-800/30">
                  {t('header.cta')}
                </div>
              </motion.a>
              <motion.a
                href="#contato"
                className="px-6 py-3 rounded-lg text-red-300 hover:text-red-200 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {t('header.contact')}
              </motion.a>
            </motion.div>
          </div>

          <motion.div 
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            variants={itemVariants}
          >
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 dark:from-red-700 dark:to-red-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-red-900 to-red-950 dark:from-red-950 dark:to-black ring-1 ring-red-700/50 dark:ring-red-800/50 overflow-hidden">
                <img
                  src="/avatar.png"
                  alt="Vitor Lana"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Social Media Bar */}
      <motion.div 
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.a
          href="https://linkedin.com/in/vitor-lana-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-red-900/30 dark:bg-red-900/20 backdrop-blur-sm flex items-center justify-center text-red-300 hover:text-red-200 transition-colors duration-300 ring-1 ring-red-800/50 dark:ring-red-800/30"
          whileHover={{ scale: 1.2, y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </motion.a>
        <motion.a
          href="mailto:vitorlana45@gmail.com"
          className="w-10 h-10 rounded-full bg-red-900/30 dark:bg-red-900/20 backdrop-blur-sm flex items-center justify-center text-red-300 hover:text-red-200 transition-colors duration-300 ring-1 ring-red-800/50 dark:ring-red-800/30"
          whileHover={{ scale: 1.2, y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </motion.a>
        <motion.a
          href="https://github.com/vitorlana45"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-red-900/30 dark:bg-red-900/20 backdrop-blur-sm flex items-center justify-center text-red-300 hover:text-red-200 transition-colors duration-300 ring-1 ring-red-800/50 dark:ring-red-800/30"
          whileHover={{ scale: 1.2, y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </motion.a>
      </motion.div>
    </header>
  );
}
