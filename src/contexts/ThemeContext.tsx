import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  cardBg: string;
  cardBorder: string;
  glassBg: string;
  gradientStart: string;
  gradientEnd: string;
  glowAccent: string;
  glowPrimary: string;
  navBg: string;
  overlay: string;
  border: string;
  inputText: string;
  inputBackground: string;
  buttonText: string;
  buttonBackground: string;
  closeButton: string;
  buttonHover: string;
  sendButtonBackground: string;
  sendButtonHover: string;
  separatorItemRoadMap: string;
}

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  themeColors: ThemeColors;
}
const themes: Record<Theme, ThemeColors> = {
  light: {
    background: '#e3e6f3',
    text: '#2c2c54',
    primary: '#5b6ef5',
    secondary: '#9c27b0',
    accent: '#ff9800',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    cardBorder: 'rgba(92, 107, 192, 0.3)',
    glassBg: 'rgba(240, 245, 255, 0.5)',
    gradientStart: '#5b6ef5',
    gradientEnd: '#9c27b0',
    glowAccent: 'rgba(255, 152, 0, 0.5)',
    glowPrimary: 'rgba(91, 110, 245, 0.4)',
    navBg: 'rgba(255, 255, 255, 0.8)',
    
    overlay: 'rgba(0, 0, 0, 0.8)', 
    border: 'rgba(92, 107, 192, 0.3)',
    inputText: '#2c2c54', 
    inputBackground: '#f0f2f5', 
    buttonText: '#ffffff',
    buttonBackground: '#5b6ef5', 
    closeButton: '#d32f2f', 
    buttonHover: '#3d49d3', 
    sendButtonBackground: '#28a745', 
    sendButtonHover: '#218838',
    separatorItemRoadMap: 'bg-orange-400'
  },
  dark: {
    background: '#0a0a23',
    text: '#c3c7f3',
    primary: '#7d5fff',
    secondary: '#ff6bcb',
    accent: '#00e5ff',
    cardBg: '#161629',
    cardBorder: 'rgba(125, 95, 255, 0.5)',
    glassBg: 'rgba(26, 26, 50, 0.5)',
    gradientStart: '#7d5fff',
    gradientEnd: '#00e5ff',
    glowAccent: 'rgba(255, 107, 203, 0.5)',
    glowPrimary: 'rgba(0, 229, 255, 0.4)',
    navBg: 'rgba(5, 5, 25, 0.8)',

    overlay: 'rgba(0, 0, 0, 0.6)', 
    border: 'rgba(125, 95, 255, 0.5)', 
    inputText: '#ffffff',
    inputBackground: '#1c1c3a',
    buttonText: '#ffffff',
    buttonBackground: '#7d5fff', 
    closeButton: '#ff5252', 
    buttonHover: '#5a2be3', 
    sendButtonBackground: '#2ecc38', 
    sendButtonHover: '#2ddc84' ,
    separatorItemRoadMap: 'bg-cyan-400'

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