import React, { createContext, useContext, useEffect } from 'react';

interface SmoothScrollContextType {
  scrollTo: (element: HTMLElement) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(undefined);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Add scroll-padding-top to account for fixed header
    document.documentElement.style.scrollPaddingTop = '80px';

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      document.documentElement.style.scrollPaddingTop = '';
    };
  }, []);

  const scrollTo = (element: HTMLElement) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      <div className="overflow-y-auto">
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (context === undefined) {
    throw new Error('useSmoothScroll must be used within a SmoothScrollProvider');
  }
  return context;
};
