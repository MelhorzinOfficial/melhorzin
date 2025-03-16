import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';


interface HeroSectionProps {
  id: string;
}

export function HeroSection({ id }: HeroSectionProps) {
  const { t } = useLanguage();
  const { themeColors } = useTheme();

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
                    background: `linear-gradient(1deg, ${themeColors.gradientEnd}, ${themeColors.gradientStart})`
                  }}
                ></div>
                <div
                  className="relative px-6 py-3 rounded-lg text-white transition-colors duration-300 ring-1 ring-opacity-30"
                  style={{
                    backgroundColor: themeColors.buttonResume,
                    backdropFilter: 'blur(10px)',
                    borderColor: themeColors.border
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