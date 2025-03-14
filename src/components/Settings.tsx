import { useTheme } from '../contexts/ThemeContext';
import { useLanguage, Language } from '../contexts/LanguageContext';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const languages: { value: Language; label: string }[] = [
    { value: 'pt', label: 'PT' },
    { value: 'en', label: 'EN' },
    { value: 'es', label: 'ES' }
  ];

  return (
    <div className="fixed top-8 right-8 z-50 flex items-center gap-4">
      {/* Language Selector */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-900 dark:to-blue-800 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="appearance-none bg-slate-800/30 dark:bg-slate-900/30 backdrop-blur-sm text-slate-200 px-4 py-2 pr-10 rounded-xl cursor-pointer hover:bg-slate-800/50 dark:hover:bg-slate-900/50 transition-colors duration-300 ring-1 ring-slate-700/50 dark:ring-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-700"
            aria-label={t('language.select')}
          >
            {languages.map((lang) => (
              <option
                key={lang.value}
                value={lang.value}
                className="bg-slate-900 dark:bg-gray-950 text-slate-200"
              >
                {lang.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-200">
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
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="group relative"
        aria-label={t('theme.toggle')}
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-900 dark:to-blue-800 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
        <div className="relative w-10 h-10 rounded-xl bg-slate-800/30 dark:bg-slate-900/30 backdrop-blur-sm flex items-center justify-center text-slate-200 hover:bg-slate-800/50 dark:hover:bg-slate-900/50 transition-colors duration-300 ring-1 ring-slate-700/50 dark:ring-blue-900/50">
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
        </div>
      </button>
    </div>
  );
};
