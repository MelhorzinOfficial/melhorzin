import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  status?: 'completed' | 'in-progress';
}

export function ProjectCard({
  title,
  description,
  image,
  link,
  technologies,
  status = 'completed'
}: ProjectCardProps) {
  const { t } = useLanguage();
  const { themeColors } = useTheme();

  return (
    <motion.div
      className="group w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block rounded-xl overflow-hidden h-full"
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
        {/* Indicador de status */}
        {status === 'completed' ? (
          <div className="absolute top-4 right-4 z-30 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${themeColors.accent}22`,
              color: themeColors.accent,
              border: `1px solid ${themeColors.accent}66`
            }}
          >
            {t('statusProjectCompleted' as any)}
          </div>
        ) : status === 'in-progress' ? (
          <div className="absolute top-4 right-4 z-30 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${themeColors.primary}22`,
              color: themeColors.primary,
              border: `1px solid ${themeColors.primary}66`
            }}
          >
            {t('statusProjectInProgress' as any)}
          </div>
        ) : null}

        {/* Acento de borda simplificado */}
        <div className="absolute inset-0 rounded-xl z-0" style={{
          background: `linear-gradient(135deg, transparent 70%, ${themeColors.accent}66 100%)`,
          opacity: 0.2
        }}></div>

        <div className="relative z-10 p-5">
          {/* Imagem do projeto com overlay */}
          <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
            <motion.div
              className="absolute inset-0 z-10"
              style={{
                background: `linear-gradient(to top, ${themeColors.gradientStart}cc, transparent)`,
                opacity: 0.7
              }}
              whileHover={{ opacity: 0.4 }}
            />

            <motion.img
              src={image}
              alt={t('renitAlert')}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Project content */}
          <div className=" relative z-20">
            <h3 className="text-xl font-bold mb-2" style={{ color: themeColors.text }}>{t(title as any)}</h3>
            <p className="mb-4" style={{ color: `${themeColors.text}cc` }}>{t(description as any)}</p>

            {/* Tecnologias - layout mais compacto */}
            <div className="flex flex-wrap gap-1 mb-3 ">
              {technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-2 py-0.5 text-xs rounded-full"
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

            {/* Botão de visualização simplificado */}
            <motion.div
              className="inline-flex items-center gap-1 text-sm font-medium"
              style={{ color: themeColors.accent }}
              whileHover={{ x: 5 }}
            >
              {status === 'completed' ? t('viewProject') : t('viewProgress')}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}