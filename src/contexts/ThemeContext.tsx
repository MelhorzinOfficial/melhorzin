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
  sectionBackground: string;
  glowAccent: string;
  glowPrimary: string;
  glassBg: string;
  gradientStart: string;
  gradientEnd: string;
}

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  themeColors: ThemeColors;
}

const themes = {
  light: {
    background: '#f0f4ff',
    text: '#1a1b4b',
    primary: '#4361ee',
    secondary: '#3f37c9',
    accent: '#00e0f3',
    cardBackground: 'rgba(255, 255, 255, 0.8)',
    cardBorder: 'rgba(148, 163, 184, 0.2)',
    buttonBackground: '#4361ee',
    buttonText: '#ffffff',
    navBackground: 'rgba(255, 255, 255, 0.85)',
    navText: '#1a1b4b',
    footerBackground: '#e0e7ff',
    footerText: '#1a1b4b',
    sectionBackground: '#f0f4ff',
    glowAccent: 'rgba(0, 224, 243, 0.6)',
    glowPrimary: 'rgba(67, 97, 238, 0.6)',
    glassBg: 'rgba(255, 255, 255, 0.25)',
    gradientStart: '#4361ee',
    gradientEnd: '#00e0f3'
  },
  dark: {
    background: '#0f172a',
    text: '#e2e8f0',
    primary: '#4f46e5',
    secondary: '#2563eb',
    accent: '#06b6d4',
    cardBackground: 'rgba(15, 23, 42, 0.7)',
    cardBorder: 'rgba(71, 85, 105, 0.3)',
    buttonBackground: '#4f46e5',
    buttonText: '#ffffff',
    navBackground: 'rgba(15, 23, 42, 0.85)',
    navText: '#e2e8f0',
    footerBackground: '#0f172a',
    footerText: '#e2e8f0',
    sectionBackground: '#0f172a',
    glowAccent: 'rgba(6, 182, 212, 0.6)',
    glowPrimary: 'rgba(79, 70, 229, 0.6)',
    glassBg: 'rgba(15, 23, 42, 0.5)',
    gradientStart: '#4f46e5',
    gradientEnd: '#06b6d4'
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