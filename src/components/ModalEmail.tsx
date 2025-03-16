import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { AiOutlineClose } from 'react-icons/ai';
import { useLanguage } from '../contexts/LanguageContext';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose }) => {
  const { themeColors } = useTheme();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
   const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples do email e verificação dos campos
    const emailValid = /\S+@\S+\.\S+/.test(email);
    if (!emailValid) {
      setError('Insira um email válido.');
      return;
    }
    if (!subject.trim() || !message.trim()) {
      setError('Preencha todos os campos.');
      return;
    }
    
    setEmail('');
    setSubject('');
    setMessage('');
    setError('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: themeColors.overlay }}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <motion.div
        className="relative rounded-lg shadow-lg p-6 z-50 flex flex-col md:flex-row max-w-4xl w-full mt-2"
        style={{ backgroundColor: themeColors.background }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Formulário */}
        <div className="w-full md:w-2/3 p-4">
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: themeColors.primary }}
          >
            {t('email')}
          </h2>
          {error && (
            <p className="mb-3 text-sm" style={{ color: 'red' }}>
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: themeColors.secondary }}
              >
                {t('yourEmail')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
                style={{
                  borderColor: themeColors.border,
                  backgroundColor: themeColors.inputBackground,
                  color: themeColors.inputText,
                }}
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: themeColors.secondary }}
              >
                {t('subject')}
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border rounded px-3 py-2"
                style={{
                  borderColor: themeColors.border,
                  backgroundColor: themeColors.inputBackground,
                  color: themeColors.inputText,
                }}
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: themeColors.secondary }}
              >
                {t('message')}
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border rounded px-3 py-2"
                style={{
                  borderColor: themeColors.border,
                  backgroundColor: themeColors.inputBackground,
                  color: themeColors.inputText,
                  height: '150px',
                  resize: 'vertical',
                }}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 border rounded hover:shadow-md"
                style={{
                  borderColor: themeColors.border,
                  color: themeColors.buttonText,
                  backgroundColor: themeColors.buttonBackground,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    themeColors.buttonHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    themeColors.buttonBackground)
                }
              >
                {t('modalButtonClose')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded hover:shadow-md"
                style={{
                  backgroundColor: themeColors.sendButtonBackground,
                  color: themeColors.buttonText,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    themeColors.sendButtonHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    themeColors.sendButtonBackground)
                }
              >
                {t('modalButtonSend')}
              </button>
            </div>
          </form>
        </div>

        {/* Imagem ao lado */}
        <div className="w-full md:w-1/3 p-4">
          <img
            src="../../public/java-surf.png"
            alt="Ilustração do email"
            className="object-contain w-full h-full rounded-lg"
          />
        </div>

        {/* Botão para fechar */}
        <button
          className="absolute top-4 right-4 rounded-full flex items-center justify-center"
          style={{
            color: themeColors.closeButton,
            fontSize: '1.5rem',
          }}
          onClick={onClose}
          aria-label="Fechar Modal"
        >
          <AiOutlineClose />
        </button>
      </motion.div>
    </div>
  );
};

export default EmailModal;
