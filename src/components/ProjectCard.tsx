import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { translations } from '../translations';

type TranslationKey = keyof typeof translations.en;

interface ProjectCardProps {
  title: TranslationKey;
  description: TranslationKey;
  image: string;
  link: string;
  technologies: string[];
}

export function ProjectCard({ title, description, image, link, technologies }: ProjectCardProps) {
  const { t } = useLanguage();
  const { themeColors } = useTheme();

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block rounded-xl overflow-hidden"
        style={{
          backgroundColor: themeColors.glassBg,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${themeColors.cardBorder}`,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: `0 20px 40px rgba(0, 0, 0, 0.2), 0 0 20px ${themeColors.glowAccent}`
        }}
      >
        {/* Futuristic border effect */}
        <div className="absolute inset-0 rounded-xl z-0" style={{
          background: `linear-gradient(135deg, transparent 40%, ${themeColors.accent}66 100%)`,
          opacity: 0.3
        }}></div>
        
        {/* Futuristic corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 z-0" style={{
          background: `linear-gradient(135deg, transparent 50%, ${themeColors.accent}66 100%)`
        }}></div>
        
        <div className="relative z-10 p-6">
          {/* Project image with futuristic overlay */}
          <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
            <motion.div
              className="absolute inset-0 z-10"
              style={{
                background: `linear-gradient(to top, ${themeColors.gradientStart}cc, transparent)`,
                opacity: 0.7
              }}
              whileHover={{ opacity: 0.4 }}
            />
            
            {/* Tech grid overlay */}
            <div className="absolute inset-0 z-20 opacity-20" style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}></div>
            
            <motion.img
              src={image}
              alt={t(title)}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Project content */}
          <div className="relative z-20">
            <h3 className="text-xl font-bold mb-2" style={{ color: themeColors.text }}>{t(title)}</h3>
            <p className="mb-4" style={{ color: `${themeColors.text}cc` }}>{t(description)}</p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full"
                  style={{ 
                    backgroundColor: `${themeColors.glassBg}`,
                    color: themeColors.text,
                    border: `1px solid ${themeColors.accent}66`
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 0 8px ${themeColors.glowAccent}`
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            
            {/* View project button with futuristic style */}
            <motion.div 
              className="inline-flex items-center gap-1 font-medium"
              style={{ color: themeColors.accent }}
              whileHover={{ x: 5 }}
            >
              {t('viewProject')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}
