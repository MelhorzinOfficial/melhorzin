import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  const { themeColors } = useTheme();
  
  return (
    <motion.section 
      id={id} 
      className="relative rounded-2xl p-8 md:p-12 overflow-hidden mb-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      style={{ 
        backgroundColor: themeColors.glassBg,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${themeColors.cardBorder}`
      }}
    >

      
      {/* Glow accent in corner */}
      <div 
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${themeColors.glowPrimary} 0%, transparent 20%)`,
          filter: 'blur(20px)'
        }}
      ></div>
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-8 relative inline-block"
            style={{ color: themeColors.text }}
          >
            {title}
            <span 
              className="absolute -bottom-2 left-0 h-0.5 w-full"
              style={{ 
                background: `linear-gradient(90deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
                opacity: 0.8
              }}
            ></span>
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}
