import { motion } from "framer-motion"
import { useTheme } from "../contexts/ThemeContext";

interface SocialMediaProps {
  onEmailClick: () => void;
}

export const SocialMedia: React.FC<SocialMediaProps> = ({ onEmailClick }) => {

  const { themeColors } = useTheme();

  return (
    <motion.div
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.a
        href="/VitorLana.pdf"
        download
        className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: themeColors.glassBg,
          border: `1px solid ${themeColors.accent}`,
          color: themeColors.text,
        }}
        whileHover={{ scale: 1.2, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full -z-10"
          style={{
            background: `linear-gradient(45deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
            opacity: 0,
          }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-.5 7V3.5L18.5 9H13.5zM12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-2-4.5h4v-1h-4v1z" />
        </svg>
      </motion.a>

      {/* LinkedIn */}
      <motion.a
        href="https://linkedin.com/in/vitor-lana-dev"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundColor: themeColors.glassBg,
          border: `1px solid ${themeColors.accent}`,
          color: themeColors.text,
        }}
        whileHover={{ scale: 1.2, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full -z-10"
          style={{
            background: `linear-gradient(45deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
            opacity: 0,
          }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </motion.a>

      {/* Email */}
      <motion.button
        className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundColor: themeColors.glassBg,
          border: `1px solid ${themeColors.accent}`,
          color: themeColors.text,
        }}
        whileHover={{ scale: 1.2, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        onClick={() => onEmailClick()}
      >
        <motion.div
          className="absolute inset-0 rounded-full -z-10"
          style={{
            background: `linear-gradient(45deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
            opacity: 0,
          }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </motion.button>


      {/* GitHub */}
      <motion.a
        href="https://github.com/vitorlana45"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundColor: themeColors.glassBg,
          border: `1px solid ${themeColors.accent}`,
          color: themeColors.text,
        }}
        whileHover={{ scale: 1.2, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full -z-10"
          style={{
            background: `linear-gradient(45deg, ${themeColors.gradientStart}, ${themeColors.gradientEnd})`,
            opacity: 0,
          }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </motion.a>
    </motion.div>
  )
}