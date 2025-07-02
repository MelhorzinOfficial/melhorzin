
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import ProfileSection from '@/components/ProfileSection';
import Timeline from '@/components/Timeline';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    // Adicionar suavidade à rolagem
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (href?.startsWith('#')) {
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', smoothScroll as EventListener);
    });

    // Animação de scroll reveal
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.scroll-reveal');
      const windowHeight = window.innerHeight;
      
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on initial load

    return () => {
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', smoothScroll as EventListener);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-screen"
      >
        <Header />
        <main className="flex-1">
          <ProfileSection />
          <Timeline />
          <Skills />
          
          <section id="contato" className="py-12 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="max-w-xl mx-auto text-center scroll-reveal">
                <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    Vamos Conversar
                  </span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Estou aberto a novas oportunidades e colaborações. Entre em contato através das redes sociais.
                </p>
                <div className="flex justify-center">
                  <a 
                    href="mailto:josepaulomarinho2@gmail.com" 
                    className="btn-hover inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow transition-all duration-300 ease-out hover:translate-y-[-2px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Enviar Email
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
