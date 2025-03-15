import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';


interface HeroSectionProps {
  id: string;
}

export function HeroSection({ id }: HeroSectionProps) {
  const { t } = useLanguage();
  const { theme, themeColors } = useTheme();

  return (
    <main id={id} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <iframe name="iframe_download" className="hidden"></iframe>

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full" style={{
          background: themeColors.glowPrimary,
          filter: 'blur(80px)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full" style={{
          background: themeColors.glowAccent,
          filter: 'blur(100px)',
          animation: 'float 10s ease-in-out infinite alternate'
        }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-12"
          initial="hidden"
          animate="visible"
        >
          <div className="w-full md:w-1/2 text-left">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ color: themeColors.text }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span style={{ color: themeColors.accent }}>Hi.</span> {t('hero.title')}
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: themeColors.text }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('hero.subtitle')}
            </motion.h2>
            <motion.p
              className="text-lg mb-8 max-w-lg"
              style={{ color: theme === 'dark' ? 'rgba(226, 232, 240, 0.8)' : 'rgba(26, 27, 75, 0.8)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('hero.description')}
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >

              {/* Download Resume Button */}
              <motion.a
                href="/VitorLana.pdf"
                download
                className="group relative inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div
                  className="absolute -inset-2 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`
                  }}
                ></div>
                <div
                  className="relative px-6 py-3 rounded-lg text-white transition-colors duration-300 ring-1 ring-opacity-30"
                  style={{
                    backgroundColor: themeColors.glassBg,
                    backdropFilter: 'blur(10px)',
                    borderColor: themeColors.accent
                  }}
                >
                  {t('hero.resume')}
                </div>
              </motion.a>

              <motion.a
                href="#projetos"
                className="px-6 py-3 rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                style={{
                  backgroundColor: 'transparent',
                  color: themeColors.text,
                  border: `1px solid ${themeColors.accent}`
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {t('hero.projects')}
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Animated glow effect */}
              <div className="absolute -inset-1 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"
                style={{ background: `linear-gradient(135deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})` }}></div>

              {/* Avatar container */}
              <div className="relative w-96 h-96 rounded-full overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.accent})`,
                  boxShadow: `0 0 30px ${themeColors.glowAccent}`
                }}>
                {/* Futuristic frame overlay */}
                <div className="absolute inset-0 z-10 rounded-full"
                  style={{
                    border: `2px solid ${themeColors.accent}`,
                    boxShadow: `inset 0 0 20px ${themeColors.glowAccent}`
                  }}></div>

                <img
                  src="/../public/me2.png"
                  alt="Vitor Lana"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Social Media Bar - updated with futuristic style */}
      <motion.div
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* LinkedIn */}
        <motion.a
          href="https://linkedin.com/in/vitor-lana-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundColor: themeColors.glassBg,
            border: `1px solid ${themeColors.accent}`,
            color: themeColors.text,
          }}
          whileHover={{ scale: 1.2, y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full -z-10"
            style={{
              background: `linear-gradient(45deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
              opacity: 0,
            }}
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          />
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </motion.a>

        {/* Email */}
        <motion.a
          href="mailto:vitorlana45@gmail.com"
          className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundColor: themeColors.glassBg,
            border: `1px solid ${themeColors.accent}`,
            color: themeColors.text,
          }}
          whileHover={{ scale: 1.2, y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full -z-10"
            style={{
              background: `linear-gradient(45deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
              opacity: 0,
            }}
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          />
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </motion.a>

        {/* GitHub */}
        <motion.a
          href="https://github.com/vitorlana45"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundColor: themeColors.glassBg,
            border: `1px solid ${themeColors.accent}`,
            color: themeColors.text,
          }}
          whileHover={{ scale: 1.2, y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full -z-10"
            style={{
              background: `linear-gradient(45deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
              opacity: 0,
            }}
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          />
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </motion.a>
      </motion.div>

      {/* Add keyframes for floating animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </main>
  );
}