import { motion } from "framer-motion"
import { Section } from "./Section"
import { ProjectCard } from "./ProjectCard"
import { useLanguage } from "../contexts/LanguageContext";



export const Projects: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const { t } = useLanguage();

  return (
    <motion.div variants={itemVariants} className="relative z-10">
      <Section id="projetos" title={t('projects.title')}>
        {/* Projetos Concluídos */}
        <div>
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-accent/20">
            {t('completedProjects')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            <ProjectCard
              title={'ProjectPetx.title'}
              description={'ProjectPetx.description'}
              image="../public/projeto-petx.png"
              technologies={['Java', 'Spring Boot', 'JWT', 'Postgres']}
              link="https://github.com/vitorlana45/BackEnd-Petx"
              status="completed"
            />
            <ProjectCard
              title={'projectReservas.title'}
              description={'projectReservas.description'}
              image="../public/cap-reservas-page.png"
              technologies={['Angular', 'TypeScript', 'CSS']}
              link="https://github.com/vitorlana45/Reservas.com"
              status="completed"
            />
          </div>
        </div>

        {/* Projetos em Andamento */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-accent/20">
            {t('inProgressProjects')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Exemplo de projeto em andamento */}
            <ProjectCard
              title={'renitAlert'}
              description={'renitAlertDesc'}
              image="../public/chatbot-project.jpg"
              technologies={['Java', 'Springboot', 'Postgres']}
              link=""
              status="in-progress"
            />
          </div>
        </div>
      </Section>
    </motion.div>
  )


}