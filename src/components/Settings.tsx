import { useTheme } from '../contexts/ThemeContext';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

export const Settings = () => {
  // Agora usamos "setSelectedTheme" em vez de toggle/getTheme.
  const { theme, setSelectedTheme, themeColors } = useTheme();
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
        />
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Theme Selector */}
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
        />
        <div className="relative">
          <select
            value={theme}
            onChange={(e) => setSelectedTheme(e.target.value as any)}
            className="appearance-none px-4 py-2 pr-10 rounded-xl cursor-pointer transition-colors duration-300 focus:outline-none"
            style={{
              backgroundColor: themeColors.glassBg,
              backdropFilter: 'blur(10px)',
              color: themeColors.text,
              border: `1px solid ${themeColors.cardBorder}`
            }}
            aria-label="Select theme"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="water">Water</option>
            <option value="galactic">Galactic</option>
            <option value="fire">Fire</option>
            <option value="earth">Earth</option>
            <option value="air">Air</option>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};