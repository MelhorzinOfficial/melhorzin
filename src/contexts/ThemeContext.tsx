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
}

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  themeColors: ThemeColors;
}

const themes: Record<Theme, ThemeColors> = {
  light: {
    background: '#e3e6f3', // Azul clarinho, remetendo ao céu de manhã
    text: '#2c2c54', // Azul escuro elegante, fácil de ler
    primary: '#5b6ef5', // Azul elétrico inspirado no céu estrelado
    secondary: '#9c27b0', // Roxo nebuloso, trazendo um ar celestial
    accent: '#ff9800', // Alaranjado quente, como o brilho de uma estrela
    cardBg: 'rgba(255, 255, 255, 0.9)', // Fundo dos cards mais translúcido
    cardBorder: 'rgba(92, 107, 192, 0.3)', // Contorno em azul suave
    glassBg: 'rgba(240, 245, 255, 0.5)', // Efeito de vidro com leve transparência
    gradientStart: '#5b6ef5', // Gradiente começando no azul estelar
    gradientEnd: '#9c27b0', // Finalizando no roxo nebuloso
    glowAccent: 'rgba(255, 152, 0, 0.5)', // Brilho laranja para destaque
    glowPrimary: 'rgba(91, 110, 245, 0.4)', // Brilho sutil no azul principal
    navBg: 'rgba(255, 255, 255, 0.8)', // Fundo da navegação mais clean
  },
  dark: {
    background: '#0a0a23', // Azul bem escuro, como o espaço profundo
    text: '#c3c7f3', // Lilás claro, semelhante a brilhos estelares
    primary: '#7d5fff', // Roxo vibrante, inspirado em nebulosas
    secondary: '#ff6bcb', // Rosa cósmico, parecido com auroras espaciais
    accent: '#00e5ff', // Azul neon, trazendo um brilho futurista
    cardBg: '#161629', // Fundo dos cards bem escuro, mas com leve brilho
    cardBorder: 'rgba(125, 95, 255, 0.5)', // Contorno roxo vibrante
    glassBg: 'rgba(26, 26, 50, 0.5)', // Fundo de vidro translúcido
    gradientStart: '#7d5fff', // Gradiente roxo espacial
    gradientEnd: '#00e5ff', // Azul neon, como um brilho sideral
    glowAccent: 'rgba(255, 107, 203, 0.5)', // Brilho rosa nebuloso
    glowPrimary: 'rgba(0, 229, 255, 0.4)', // Brilho azul neon
    navBg: 'rgba(5, 5, 25, 0.8)', // Fundo da navegação quase preto, para imersão
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