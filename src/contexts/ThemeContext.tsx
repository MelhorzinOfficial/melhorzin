import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  cardBackground: string;
  cardBorder: string;
  buttonBackground: string;
  buttonText: string;
  navBackground: string;
  navText: string;
  footerBackground: string;
  footerText: string;
}

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  themeColors: ThemeColors;
}

const themes = {
  light: {
    background: '#f5f5f5',
    text: '#222222',
    primary: '#4a90e2',
    secondary: '#50e3c2',
    accent: '#f5a623',
    cardBackground: '#ffffff',
    cardBorder: '#dddddd',
    buttonBackground: '#4a90e2',
    buttonText: '#ffffff',
    navBackground: 'rgba(255, 255, 255, 0.8)',
    navText: '#222222',
    footerBackground: '#f5f5f5',
    footerText: '#222222',
    sectionBackground: '#f5f5f5'
  },
  dark: {
    background: '#191970',       // Cor base (Midnight Blue)
    text: '#e0e0e0',
    primary: '#1e3a8a',          // Deep blue
    secondary: '#0e1621',        // Quase preto com toque azul
    accent: '#f50057',           // Rosa neon para destaques
    cardBackground: '#262626',   // Card com fundo uniforme
    cardBorder: '#404040',       // Borda discreta
    buttonBackground: '#1e3a8a',
    buttonText: '#ffffff',
    navBackground: 'rgba(25, 25, 112, 0.9)',
    navText: '#e0e0e0',
    footerBackground: '#0e1621',
    footerText: '#e0e0e0',
    sectionBackground: '#191970' // Usado para todas as seções
  },
};


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const themeColors = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};