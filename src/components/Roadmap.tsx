import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface TimelineNode {
  id: string;
  title: string;
  items: {
    period?: string;
    description: string;
    technologies?: string[];
  }[];
  isLeft: boolean;
}


const TimelineItem: React.FC<{ node: TimelineNode }> = ({ node }) => {
  const { themeColors } = useTheme();

  return (
    <div className={`relative flex ${node.isLeft ? 'justify-start' : 'justify-end'} w-full`}>
      {/* Marcador da timeline */}
      <div className="absolute left-1/2 -ml-3 top-1/2 transform -translate-y-1/2">
        <div
          className="w-6 h-6 rounded-full border-4 bg-white"
          style={{ borderColor: themeColors.accent }}
        ></div>
      </div>

      {/* Card do evento */}
      <motion.div
        className="w-full md:w-5/12 p-6 rounded-xl shadow-lg text-left md:ml-8"
        style={{
          backgroundColor: themeColors.glassBg,
          border: `1px solid ${themeColors.cardBorder}`,
        }}
        initial={{ opacity: 0, x: node.isLeft ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-2xl font-semibold mb-4" style={{ color: themeColors.accent }}>
          {node.title}
        </h4>

        {/* Renderiza a lista de períodos e descrições com separador */}
        <div className="flex flex-col">
          {node.items.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="w-full">
                {item.period && (
                  <span className="block text-sm font-bold" style={{ color: themeColors.text }}>
                    {item.period}
                  </span>
                )}
                <p className="text-base mt-1" style={{ color: themeColors.text }}>
                  {item.description}
                </p>
              </div>
              {/* Pequena linha separadora entre os itens */}
              {index !== node.items.length - 1 && (
                <div
                  className={`w-0.5 h-6 my-2 ml-10 ${themeColors.separatorItemRoadMap}`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};


export const Roadmap: React.FC = () => {
  const { themeColors } = useTheme();
  const { t } = useLanguage();

  const nodes = useMemo(
    () => [
      {
        id: t('career.education'),
        title: t('career.education'),
        items: t('career.education.items'),
      },
      {
        id: 'career.experience',
        title: t('career.experience'),
        items: t('career.experience.items'),
      },
      {
        id: 'career.learning_growth',
        title: t('career.learning_growth'),
        items: t('career.learning_growth.items'),
      },
      {
        id: 'currently',
        title: t('career.currently'),
        items: t('career.currently.items'),
      },
    ],
    [t]
  );

  return (
    <div className="py-16 relative" id="jornada">
      {/* Title of the roadmap */}
      <h3 className="text-4xl font-bold mb-12 text-center" style={{ color: themeColors.text }}>
        {t('career.title')}
      </h3>

      {/* Timeline container */}
      <div className="relative container mx-auto px-2">
        {/* Linha vertical central */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2"
          style={{ backgroundColor: themeColors.accent }}
        />
        <div className="space-y-12">
          {nodes.map((node, index) => (
            <TimelineItem key={node.id} node={{ ...node as unknown as TimelineNode, isLeft: index % 2 === 0 }} />
          ))}
        </div>
      </div>
    </div>
  );
};
