import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

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
      <div
        className="absolute left-4 xs:left-0 md:left-[50%] top-1/2 transform -translate-y-1/2 md:-translate-x-1/2 hidden md:block display:none"
      >
        <div
          className="w-6 h-6 rounded-full border-4 bg-white"
          style={{ borderColor: themeColors.accent }}
        ></div>
      </div>

      {/* Card do evento - mobile: full width with padding, desktop: 45% width */}
      <motion.div
        className="w-full md:w-[45%] p-4 sm:p-6 rounded-xl shadow-lg text-left mx-2 md:mx-0"
        style={{
          backgroundColor: themeColors.glassBg,
          border: `1px solid ${themeColors.cardBorder}`,
        }}
        initial={{ opacity: 0, x: node.isLeft ? -50 : 50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h4
          className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4"
          style={{ color: themeColors.accent }}
        >
          {node.title}
        </h4>

        {/* Lista de períodos e descrições, com linha separadora entre itens */}
        <div className="flex flex-col">
          {node.items && Array.isArray(node.items) ? node.items.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="w-full">
                {item.period && (
                  <span
                    className="block text-sm font-bold"
                    style={{ color: themeColors.text }}
                  >
                    {item.period}
                  </span>
                )}
        
                <p
                  className="text-sm sm:text-base mt-1"
                  style={{ color: themeColors.text }}
                >
                  {item.description}
                </p>
              </div>
              {/* Linha separadora entre cada item (quando não for o último) */}
              {index !== node.items.length - 1 && (
                <div
                  className={`w-0.5 h-4 sm:h-6 my-2 ml-4 sm:ml-10 ${themeColors.separatorItemRoadMap}`}
                ></div>
              )}
            </div>
          )) : (
            <p>Nenhum item encontrado</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
export const Roadmap: React.FC = () => {
  const { themeColors } = useTheme();
  const { language } = useLanguage();

  const nodes = useMemo(
    () => {
      const currentTranslations = translations[language as keyof typeof translations];

      return [
        {
          id: currentTranslations['career.education'] as string,
          title: currentTranslations['career.education'] as string,
          items: currentTranslations['career.education.items'] as any[],
        },
        {
          id: currentTranslations['career.experience'] as string,
          title: currentTranslations['career.experience'] as string,
          items: currentTranslations['career.experience.items'] as any[],
        },
        {
          id: currentTranslations['career.learning_growth'] as string,
          title: currentTranslations['career.learning_growth'] as string,
          items: currentTranslations['career.learning_growth.items'] as any[],
        },
      ];
    },
    [language]
  );

  return (
    <div className="py-8 sm:py-16 relative" id="jornada">
      <div className="relative container mx-auto px-2">
        <div
          className={`absolute top-0 bottom-0 left-4 xs:left-0 md:left-[50%] w-1 hidden md:block`}
          style={{
            backgroundColor: themeColors.accent,
            marginLeft: '-2px',
          }}
        />
        <div className="space-y-8 sm:space-y-12">
          {nodes.map((node, index) => (
            <TimelineItem
              key={node.id}
              node={{
                ...node as unknown as TimelineNode,
                isLeft: index % 2 === 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
