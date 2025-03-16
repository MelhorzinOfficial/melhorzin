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
          {Array.isArray(node.items) ? node.items.map((item, index) => (
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
          )) : null}
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
    <div className="py-8 sm:py-16 relative" id="jornada">
      {/* Container da timeline */}
      <div className="relative container mx-auto px-2">
        {/* Linha vertical principal - visível apenas em telas médias e maiores */}
        <div
          className={`absolute top-0 bottom-0 left-4 xs:left-0 md:left-[50%] w-1 hidden md:block`}
          style={{
            backgroundColor: themeColors.accent,
            marginLeft: '-2px',
          }}
        />
        {/* Mobile Timeline - visível apenas em telas pequenas */}
        <div
          className={`absolute hidden sm:hidden top-0 bottom-0 left-4 w-1 block md:hidden`}
          style={{
            backgroundColor: themeColors.accent,
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
