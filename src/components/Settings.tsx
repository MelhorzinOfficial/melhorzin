import { useTheme } from '../contexts/ThemeContext';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

export const Settings = () => {
  const { theme, toggleTheme, themeColors } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const languages: { value: Language; label: string }[] = [
    { value: 'pt', label: 'PT' },
    { value: 'en', label: 'EN' },
    { value: 'es', label: 'ES' }
  ];

  return (
    <motion.div 
      className="fixed top-8 right-8 z-50 flex items-center gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {/* Language Selector */}
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
      >
        <div 
          className="absolute -inset-0.5 rounded-xl opacity-75"
          style={{ 
            background: `linear-gradient(135deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
            filter: 'blur(4px)'
          }}
        ></div>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="appearance-none px-4 py-2 pr-10 rounded-xl cursor-pointer transition-colors duration-300 focus:outline-none"
            style={{ 
              backgroundColor: themeColors.glassBg,
              backdropFilter: 'blur(10px)',
              color: themeColors.text,
              border: `1px solid ${themeColors.cardBorder}`
            }}
            aria-label={t('language.select')}
          >
            {languages.map((lang) => (
              <option
                key={lang.value}
                value={lang.value}
                style={{ 
                  backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
                  color: themeColors.text
                }}
              >
                {lang.label}
              </option>
            ))}
          </select>
          <div 
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: themeColors.text }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('theme.toggle')}
      >
        <div 
          className="absolute -inset-0.5 rounded-xl opacity-75"
          style={{ 
            background: `linear-gradient(135deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
            filter: 'blur(4px)'
          }}
        ></div>
        <div 
          className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
          style={{ 
            backgroundColor: themeColors.glassBg,
            backdropFilter: 'blur(10px)',
            color: themeColors.text,
            border: `1px solid ${themeColors.cardBorder}`
          }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ duration: 0.5 }}
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  );
};
