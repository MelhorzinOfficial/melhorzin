// components/CustomChatButton.tsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SocialIcon } from '../components/SocialIcons';
import EmailModal from '../components/ModalEmail';
import { useTheme } from '../contexts/ThemeContext';
import { FaFileAlt, FaGithub, FaLinkedinIn, FaQuestionCircle } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';


export default function SocialMedias() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const { themeColors } = useTheme();
  const { glassBg, border } = themeColors;

  const toggleMenu = () => setMenuOpen(o => !o);
  const openEmailModal = () => {
    setEmailModalOpen(true);
    setMenuOpen(false);
  };

  const defaultSize = "text-4xl"

  const actions = [
    {
      key: 'curriculo',
      icon: <FaFileAlt className={defaultSize} />,
      href: '/VitorLana.pdf',
    },
    {
      key: 'github',
      icon: <FaGithub className={defaultSize} />,
      href: 'https://github.com/vitorlana45',
    },
    {
      key: 'email',
      icon: <AiOutlineMail className={defaultSize} />,
      onClick: openEmailModal,
    },
    {
      key: 'linkedin',
      icon: <FaLinkedinIn className={defaultSize} />,
      href: 'https://linkedin.com/in/vitor-lana-dev',
    }
  ];

  return (
    <>
      <EmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
      />

      <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-3 z-50">
        <AnimatePresence>
          {menuOpen &&
            actions.map((action, i) => (
              <motion.div
                key={action.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.05 }}
              >
                <SocialIcon
                  borderColor={border}
                  backgroundColor={glassBg}
                  href={action.href}
                  onClick={action.onClick}
                  ariaLabel={action.key}
                >
                  {action.icon}
                </SocialIcon>
              </motion.div>
            ))}
        </AnimatePresence>

        <SocialIcon
          borderColor={border}
          backgroundColor={glassBg}
          onClick={toggleMenu}
          ariaLabel={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <FaQuestionCircle  className="w-8 h-8 rounded-full" />
        </SocialIcon>
      </div>
    </>
  );
}
