import React from "react";
import { motion, MotionProps } from "framer-motion";

interface SocialIconProps {
  borderColor: string;
  backgroundColor: string;
  href?: string;
  ariaLabel?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const SocialIcon: React.FC<SocialIconProps> = ({
  borderColor,
  backgroundColor,
  href,
  ariaLabel,
  children,
  onClick,
}) => {
  const motionProps: MotionProps = {
    whileHover: { scale: 1.15, y: -5, boxShadow: `0 4px 16px ${borderColor}33` },
    transition: { duration: 0.2 },
  };

  const content = (
    <motion.div
      {...motionProps}
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border shadow-md"
      style={{
        border: `1.5px solid ${borderColor}`,
        backgroundColor,
      }}
    >
      {children}
    </motion.div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};
