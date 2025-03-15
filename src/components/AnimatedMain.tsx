import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedMainProps {
    variants: any;
    children: React.ReactNode;
}

export const AnimatedMain = React.memo(({ variants, children }: AnimatedMainProps) => {
  return (
    <motion.main
      className="container mx-auto px-4 py-16 space-y-24 relative"
      initial={false}
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.main>
  );
});