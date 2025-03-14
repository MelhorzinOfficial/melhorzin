import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeColors {
  background: string;
  text: string;
  cardBackground: string;
  cardText: string;
  sectionBackground: string;
  sectionText: string;
}

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  themeColors: ThemeColors;
}

const lightTheme: ThemeColors = {
  background: '#E0F7FA',
  text: '#01579B',
  cardBackground: '#B2EBF2',
  cardText: '#006064',
  sectionBackground: '#80DEEA',
  sectionText: '#004D40',
};

const darkTheme: ThemeColors = {
  background: '#0A1929',
  text: '#E3F2FD',
  cardBackground: '#1E3A5F',
  cardText: '#BBDEFB',
  sectionBackground: '#2A4A6E',
  sectionText: '#90CAF9',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
