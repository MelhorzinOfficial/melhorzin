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
  buttonResume: string;
}

export type Theme = 'light' | 'water' | 'dark' | 'fire' | 'earth' | 'air' | 'galactic';

interface ThemeContextType {
  theme: Theme;
  setSelectedTheme: (theme: Theme) => void;
  themeColors: ThemeColors;
}
const themes: Record<Theme, ThemeColors> = {
  light: {
    background: '#FAFAFA',
    text: '#212121',
    primary: '#2196F3',
    secondary: '#607D8B',
    accent: '#FFC107',
    cardBg: '#FFFFFF',
    cardBorder: '#E0E0E0',
    glassBg: 'rgba(255, 255, 255, 0.8)',
    gradientStart: '#E3F2FD',
    gradientEnd: '#FAFAFA',
    glowAccent: 'rgba(255, 193, 7, 0.3)',
    glowPrimary: 'rgba(33, 150, 243, 0.3)',
    navBg: '#FAFAFA',
    overlay: 'rgba(0, 0, 0, 0.5)',
    border: '#E0E0E0',
    inputText: '#424242',
    inputBackground: '#FFFFFF',
    buttonText: '#FFFFFF',
    buttonBackground: '#2196F3',
    closeButton: '#F44336',
    buttonHover: '#1565C0',
    sendButtonBackground: '#4CAF50',
    sendButtonHover: '#388E3C',
    separatorItemRoadMap: '#E0E0E0',
    buttonResume: '#2196F3',
  },
  fire: {
    background: '#2B1B17', // Marrom escuro vulcânico mais suave
    text: '#F5F5F5', // Texto quase branco para melhor leitura
    primary: '#F9A826', // Amarelo âmbar mais suave
    secondary: '#FF7043', // Laranja mais suave
    accent: '#FFEB3B', // Amarelo vivo para acentos
    cardBg: 'rgba(70, 39, 30, 0.65)', // Cartões marrom-avermelhado mais transparentes
    cardBorder: 'rgba(249, 168, 38, 0.3)', // Borda âmbar bem leve
    glassBg: 'rgba(43, 27, 23, 0.6)', // Vidro com efeito de calor suave
    gradientStart: '#F9A826', // Início do gradiente âmbar
    gradientEnd: '#FF7043', // Final em laranja
    glowAccent: 'rgba(255, 235, 59, 0.4)', // Brilho amarelo mais sutil
    glowPrimary: 'rgba(249, 168, 38, 0.3)', // Brilho âmbar mais sutil
    navBg: 'rgba(43, 27, 23, 0.85)', // Navegação mais translúcida
    overlay: 'rgba(0, 0, 0, 0.5)', // Overlay mais claro
    border: 'rgba(249, 168, 38, 0.25)', // Borda âmbar mais suave
    inputText: '#F5F5F5', // Texto claro para entrada
    inputBackground: 'rgba(70, 39, 30, 0.5)', // Fundo de entrada mais suave
    buttonText: '#FFFFFF', // Texto branco
    buttonBackground: '#F9A826', // Botões âmbar
    closeButton: '#FF5252', // Botão de fechar vermelho
    buttonHover: '#FF7043', // Hover em laranja
    sendButtonBackground: '#FFEB3B', // Botão de envio amarelo
    sendButtonHover: '#F9A826', // Hover em âmbar
    separatorItemRoadMap: 'bg-amber-400', // Separador âmbar
    buttonResume: '#F9A826', // Botão de currículo âmbar
  },
  galactic: {
    background: '#010B14', // Azul-negro espacial profundo
    text: '#D0D0D0', // Cinza claro como poeira estelar
    primary: '#7B00FF', // Roxo cósmico intenso
    secondary: '#E91E63', // Rosa magenta como energia astral
    accent: '#FFAB00', // Dourado como radiação solar
    cardBg: 'rgba(8, 24, 36, 0.75)', // Cartões em azul-negro com transparência
    cardBorder: 'rgba(123, 0, 255, 0.25)', // Borda roxa cósmica sutil
    glassBg: 'rgba(1, 11, 20, 0.75)', // Vidro com efeito de vácuo espacial
    gradientStart: '#7B00FF', // Início do gradiente roxo cósmico
    gradientEnd: '#E91E63', // Final em rosa magenta
    glowAccent: 'rgba(255, 171, 0, 0.25)', // Brilho dourado como radiação solar
    glowPrimary: 'rgba(123, 0, 255, 0.25)', // Brilho roxo cósmico
    navBg: 'rgba(1, 11, 20, 0.9)', // Navegação espacial
    overlay: 'rgba(0, 0, 0, 0.75)', // Overlay como vácuo espacial
    border: 'rgba(123, 0, 255, 0.2)', // Borda roxa cósmica muito sutil
    inputText: '#D0D0D0', // Texto cinza claro
    inputBackground: 'rgba(8, 24, 36, 0.7)', // Fundo de entrada espacial
    buttonText: '#FFFFFF', // Texto branco
    buttonBackground: '#7B00FF', // Botões roxo cósmico
    closeButton: '#FF1744', // Botão de fechar vermelho
    buttonHover: '#6200EA', // Hover em roxo mais escuro
    sendButtonBackground: '#FFAB00', // Botão de envio dourado
    sendButtonHover: '#7B00FF', // Hover em roxo cósmico
    separatorItemRoadMap: 'bg-purple-700', // Separador roxo
    buttonResume: '#7B00FF', // Botão de currículo roxo cósmico
  },
  earth: {
    background: '#1B3A2F',
    text: '#C8E6C9',
    primary: '#4CAF50',
    secondary: '#2E7D32',
    accent: '#8BC34A',
    cardBg: '#2E7D32',
    cardBorder: '#388E3C',
    glassBg: 'rgba(27, 58, 47, 0.75)',
    gradientStart: '#4CAF50',
    gradientEnd: '#8BC34A',
    glowAccent: 'rgba(139, 195, 74, 0.5)',
    glowPrimary: 'rgba(76, 175, 80, 0.5)',
    navBg: '#1B3A2F',
    overlay: 'rgba(0, 0, 0, 0.6)',
    border: '#388E3C',
    inputText: '#C8E6C9',
    inputBackground: '#2E7D32',
    buttonText: '#FFFFFF',
    buttonBackground: '#4CAF50',
    closeButton: '#FF6B6B',
    buttonHover: '#2E7D32',
    sendButtonBackground: '#8BC34A',
    sendButtonHover: '#4CAF50',
    separatorItemRoadMap: '#2E7D32',
    buttonResume: '#4CAF50',
  },
  water: {
    background: '#001C30', // Azul marinho profundo como o abismo oceânico
    text: '#E6F2F5', // Branco azulado como espuma do mar
    primary: '#0ACDFF', // Azul ciano elétrico como água tropical
    secondary: '#2E8BC0', // Azul médio oceânico
    accent: '#80DEEA', // Turquesa claro como lagoa rasa
    cardBg: 'rgba(5, 48, 78, 0.7)', // Cartões em tom abissal com transparência
    cardBorder: 'rgba(10, 205, 255, 0.25)', // Borda ciano elétrico suave
    glassBg: 'rgba(0, 28, 48, 0.75)', // Vidro com efeito subaquático
    gradientStart: '#0ACDFF', // Início do gradiente azul ciano
    gradientEnd: '#2E8BC0', // Final em azul médio oceânico
    glowAccent: 'rgba(128, 222, 234, 0.3)', // Brilho turquesa suave como bioluminescência
    glowPrimary: 'rgba(10, 205, 255, 0.25)', // Brilho azul ciano elétrico sutil
    navBg: 'rgba(0, 28, 48, 0.85)', // Navegação abissal
    overlay: 'rgba(0, 0, 0, 0.6)', // Overlay como água profunda
    border: 'rgba(10, 205, 255, 0.2)', // Borda ciano elétrico muito sutil
    inputText: '#E6F2F5', // Texto branco azulado
    inputBackground: 'rgba(5, 48, 78, 0.7)', // Fundo de entrada abissal
    buttonText: '#FFFFFF', // Texto branco
    buttonBackground: '#0ACDFF', // Botões azul ciano elétrico
    closeButton: '#F44336', // Botão de fechar vermelho
    buttonHover: '#2E8BC0', // Hover em azul médio oceânico
    sendButtonBackground: '#80DEEA', // Botão de envio turquesa claro
    sendButtonHover: '#0ACDFF', // Hover em azul ciano elétrico
    separatorItemRoadMap: 'bg-cyan-500', // Separador ciano
    buttonResume: '#0ACDFF', // Botão de currículo azul ciano elétrico
  },
  dark: {
    background: '#111111', // Preto profundo espacial
    text: '#E0E0E0', // Texto quase branco para alta legibilidade
    primary: '#4D7AFF', // Azul estelar intenso
    secondary: '#8E24AA', // Roxo nebuloso
    accent: '#00E5FF', // Turquesa brilhante como estrela distante
    cardBg: 'rgba(30, 30, 35, 0.75)', // Cartões cinza escuro espacial
    cardBorder: 'rgba(77, 122, 255, 0.2)', // Borda azul estelar sutil
    glassBg: 'rgba(17, 17, 17, 0.8)', // Vidro com efeito espacial profundo
    gradientStart: '#4D7AFF', // Início do gradiente azul estelar
    gradientEnd: '#8E24AA', // Final em roxo nebuloso
    glowAccent: 'rgba(0, 229, 255, 0.25)', // Brilho turquesa sutil
    glowPrimary: 'rgba(77, 122, 255, 0.2)', // Brilho azul estelar sutil
    navBg: 'rgba(17, 17, 17, 0.85)', // Navegação espacial
    overlay: 'rgba(0, 0, 0, 0.7)', // Overlay escuro
    border: 'rgba(77, 122, 255, 0.2)', // Borda azul estelar sutil
    inputText: '#E0E0E0', // Texto quase branco
    inputBackground: 'rgba(30, 30, 35, 0.75)', // Fundo de entrada espacial
    buttonText: '#FFFFFF', // Texto branco
    buttonBackground: '#4D7AFF', // Botões azul estelar
    closeButton: '#F44336', // Botão de fechar vermelho
    buttonHover: '#3D5ACD', // Hover em azul mais escuro
    sendButtonBackground: '#00E5FF', // Botão de envio turquesa
    sendButtonHover: '#00B8D4', // Hover em turquesa mais escuro
    separatorItemRoadMap: 'bg-blue-600', // Separador azul
    buttonResume: '#4D7AFF', // Botão de currículo azul estelar
  },
  air: {
    background: '#EDF6F9', // Azul céu muito claro
    text: '#006D77', // Verde-azulado escuro
    primary: '#83C5BE', // Verde-água suave
    secondary: '#FFDDD2', // Pêssego claro
    accent: '#E29578', // Coral suave
    cardBg: '#FFFFFF', // Fundo branco como nuvens
    cardBorder: '#83C5BE', // Borda verde-água 
    glassBg: 'rgba(237, 246, 249, 0.85)', // Vidro quase transparente
    gradientStart: '#EDF6F9', // Início em azul céu claro
    gradientEnd: '#83C5BE', // Fim em verde-água
    glowAccent: 'rgba(226, 149, 120, 0.4)', // Brilho coral
    glowPrimary: 'rgba(131, 197, 190, 0.4)', // Brilho verde-água
    navBg: 'rgba(237, 246, 249, 0.95)', // Navegação quase transparente
    overlay: 'rgba(0, 109, 119, 0.3)', // Overlay verde-azulado suave
    border: '#83C5BE', // Borda verde-água
    inputText: '#006D77', // Texto verde-azulado
    inputBackground: '#FFFFFF', // Fundo branco
    buttonText: '#FFFFFF', // Texto branco
    buttonBackground: '#006D77', // Botões verde-azulado escuro
    closeButton: '#E29578', // Botão fechar coral
    buttonHover: '#83C5BE', // Hover verde-água
    sendButtonBackground: '#E29578', // Botão envio coral
    sendButtonHover: '#006D77', // Hover verde-azulado escuro
    separatorItemRoadMap: '#83C5BE', // Separador verde-água
    buttonResume: '#006D77', // Botão currículo verde-azulado
  },
};
  
  

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'galactic';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'dark', 'water', 'fire', 'earth', 'air', 'galactic');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Função para selecionar um novo tema
  const setSelectedTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const themeColors = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, setSelectedTheme, themeColors }}>
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
}