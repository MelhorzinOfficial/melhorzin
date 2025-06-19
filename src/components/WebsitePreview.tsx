import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Code, Star, Globe2, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Portfolio } from '@/types/universe';

interface WebsitePreviewProps {
  portfolio: Portfolio | null;
  onClose: () => void;
  isVisible: boolean;
}

export function WebsitePreview({ portfolio, onClose, isVisible }: WebsitePreviewProps) {
  if (!portfolio) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="preview-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-[800px] bg-black/95 rounded-lg border border-white/20 backdrop-blur-lg shadow-xl z-50 overflow-hidden pointer-events-auto"
        >
          {/* Content remains the same... */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: portfolio.color }}
              />
              <h3 className="text-lg font-semibold text-white">
                {portfolio.name}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-white/10"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-4">
            <iframe
              src={portfolio.website.url}
              className="w-full h-[400px] rounded border-none bg-white"
              title={`Preview of ${portfolio.name}`}
            />

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {portfolio.website.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-white/5 text-white/80 text-sm border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Features
                </h4>
                <ul className="space-y-2">
                  {portfolio.website.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-white/60 text-sm flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/10">
            <Button
              className="w-full gap-2 hover:bg-white hover:text-black transition-colors"
              variant="outline"
              onClick={() => window.open(portfolio.website.url, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
