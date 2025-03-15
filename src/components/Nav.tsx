import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function Nav() {
  const { t } = useLanguage();
  const navLinks = [
    { id: 'sobre', label: t('nav.about') },
    { id: 'projetos', label: t('nav.projects') },
    { id: 'habilidades', label: t('nav.skills') },
    { id: 'contato', label: t('nav.contact') }
  ];

  return (
    <nav className="fixed top-0 w-full z-40 bg-opacity-70 backdrop-blur-sm">
      <ul className="flex justify-center space-x-8 p-4">
        {navLinks.map(link => (
          <motion.li
            key={link.id}
            whileHover={{ scale: 1.05 }}
            className="text-white"
          >
            <a href={`#${link.id}`} className="hover:text-yellow-300">
              {link.label}
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}