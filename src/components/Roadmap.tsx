import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface TimelineNode {
  id: string;
  title: string;
  period: string;
  description: string;
}

export const Roadmap: React.FC = () => {
  const { themeColors } = useTheme();
  const { t } = useLanguage();

  const nodes: TimelineNode[] = [
    {
      id: 'education',
      title: t('career.education'),
      period: '2018 - 2022',
      description:
        'Bacharelado em Ciência da Computação. Foco em algoritmos, estruturas de dados e OOP.',
    },
    {
      id: 'experience',
      title: t('career.experience'),
      period: '2022 - 2023',
      description:
        'Desenvolvedor Back-End Jr. APIs RESTful com Java e Spring Boot. Implementação de autenticação JWT.',
    },
    {
      id: 'current',
      title: t('career.current'),
      period: '2023 - Presente',
      description:
        'Desenvolvedor Full Stack. Trabalhando com React, TypeScript e Spring Boot, criando interfaces responsivas.',
    },
  ];

  return (
    <div className="py-16 relative">
      <h3
        className="text-4xl font-bold mb-12 text-center"
        style={{ color: themeColors.text }}
      >
        {t('career.title')}
      </h3>
      <div className="relative container mx-auto px-4">
        {/* Linha vertical central */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-1"
          style={{
            backgroundColor: themeColors.accent,
            transform: 'translateX(-50%)',
          }}
        />
        <div className="space-y-12">
          {nodes.map((node, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={node.id} className="relative">
                <motion.div
                  className={`w-full md:w-1/2 p-6 rounded-xl shadow-lg ${
                    isLeft
                      ? 'md:pr-8 md:ml-0 text-right'
                      : 'md:pl-8 md:mr-0 text-left'
                  }`}
                  style={{
                    backgroundColor: themeColors.glassBg,
                    border: `1px solid ${themeColors.cardBorder}`,
                  }}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <h4
                    className="text-2xl font-semibold"
                    style={{ color: themeColors.accent }}
                  >
                    {node.title}
                  </h4>
                  <span
                    className="block mt-1 text-sm"
                    style={{ color: themeColors.text }}
                  >
                    {node.period}
                  </span>
                  <p
                    className="mt-2 text-base"
                    style={{ color: themeColors.text }}
                  >
                    {node.description}
                  </p>
                </motion.div>
                {/* Marcador da timeline reposicionado */}
                <div
                  className="absolute top-0"
                  style={
                    isLeft
                      ? { left: 'calc(50% - 10px)' }
                      : { left: 'calc(50% + 10px)' }
                  }
                >
                  <div
                    className="w-6 h-6 bg-white rounded-full border-4"
                    style={{ borderColor: themeColors.accent }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};