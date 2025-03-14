import { useLanguage } from '../contexts/LanguageContext';
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
        className="relative block rounded-xl bg-blue-900/30 dark:bg-blue-900/20 backdrop-blur-sm p-6 ring-1 ring-blue-800/50 dark:ring-blue-800/30 transition-all duration-300 overflow-hidden"
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
        }}
      >
        {/* Glow effect on hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-blue-400/20 dark:from-blue-700/20 dark:to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        {/* Project image */}
        <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-70 z-10"
            whileHover={{ opacity: 0.4 }}
          />
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
          <h3 className="text-xl font-bold text-white mb-2">{t(title)}</h3>
          <p className="text-slate-300 dark:text-slate-300/90 mb-4">{t(description)}</p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-blue-800/50 dark:bg-blue-800/30 text-blue-200 dark:text-blue-200/90 ring-1 ring-blue-700/50 dark:ring-blue-700/30"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(37, 99, 235, 0.5)" 
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          {/* View project button */}
          <motion.div 
            className="inline-flex items-center gap-1 text-blue-300 dark:text-blue-300/90 font-medium group-hover:text-blue-200 transition-colors duration-300"
            whileHover={{ x: 5 }}
          >
            {t('viewProject')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.div>
        </div>
      </motion.a>
    </motion.div>
  );
}
