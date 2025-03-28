import { motion } from "framer-motion"
import { Section } from "./Section"
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import type React from "react";


export const AboutMe : React.FC = () => {

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const { themeColors } = useTheme();
  const { t } = useLanguage();

  return (
      <motion.div variants={itemVariants} className="relative z-10">
        <Section id="sobre" title={t('about.title')}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: themeColors.text }}
              >
                {t('about.description')}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div
                  className="p-6 rounded-lg relative overflow-hidden group"
                  style={{
                    backgroundColor: themeColors.glassBg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${themeColors.cardBorder}`
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-16 h-16 opacity-30"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, ${themeColors.accent}66 100%)`
                    }}
                  ></div>

                  <h4
                    className="font-semibold mb-4 flex items-center"
                    style={{ color: themeColors.text }}
                  >
                    <span
                      className="w-8 h-8 mr-2 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${themeColors.primary}33`,
                        border: `1px solid ${themeColors.primary}66`
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Back End
                  </h4>
                  <ul className="space-y-3">
                    {['Java', 'Spring Boot', 'JPA/Hibernate', 'Maven', 'NodeJs', 'N8N'].map((skill, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        style={{ color: `${themeColors.text}dd` }}
                      >
                        <span
                          className="inline-block w-2 h-2 mr-2 rounded-full"
                          style={{ backgroundColor: themeColors.accent }}
                        ></span>
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div
                  className="p-6 rounded-lg relative overflow-hidden group"
                  style={{
                    backgroundColor: themeColors.glassBg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${themeColors.cardBorder}`
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-16 h-16 opacity-30"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, ${themeColors.accent}66 100%)`
                    }}
                  ></div>

                  <h4
                    className="font-semibold mb-4 flex items-center"
                    style={{ color: themeColors.text }}
                  >
                    <span
                      className="inline-block w-8 h-8 mr-2 rounded-full items-center justify-center"
                      style={{
                        backgroundColor: `${themeColors.primary}33`,
                        border: `1px solid ${themeColors.primary}66`
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Front End
                  </h4>
                  <ul className="space-y-3">
                    {['React', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Weweb'].map((skill, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        style={{ color: `${themeColors.text}dd` }}
                      >
                        <span
                          className="inline-block w-2 h-2 mr-2 rounded-full"
                          style={{ backgroundColor: themeColors.accent }}
                        ></span>
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="absolute -inset-1 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`
                  }}
                ></div>
                <div className="relative rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0 z-10 opacity-20"
                    style={{
                      backgroundImage: `
                       linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                       linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                     `,
                      backgroundSize: '20px 20px'
                    }}
                  ></div>
                  <img
                    src="me2.png"
                    alt="About Me"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </Section>
      </motion.div>
  )
}
