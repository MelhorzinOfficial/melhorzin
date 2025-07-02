
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';

interface ProfileSectionProps {
  className?: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ className }) => {
  return (
    <section 
      id="sobre" 
      className={cn(
        "min-h-[90vh] flex flex-col items-center justify-center py-12 md:py-24",
        className
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start animate-fade-in">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-2xl animate-pulse-soft"></div>
              <div className="relative overflow-hidden rounded-full w-56 h-56 border-4 border-white dark:border-slate-800 shadow-xl animate-float">
                <img 
                  src="/assets/47d26406-bb52-4a87-a5ef-b7ef9f1eca95.png" 
                  alt="José Marinho" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <SocialLinks className="mt-6 md:mt-8" />
          </div>
          
          <div className="w-full md:w-1/2 animate-fade-in-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tight mb-6">
              Olá, eu sou <span className="text-primary">José Marinho!</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Sou Engenheiro de Software com ampla experiência em desenvolvimento backend. 
              Especializado em Node.js (NestJS), Java, .NET e Python, foco na criação de aplicações 
              escaláveis e de alto desempenho. Tenho paixão por projetar arquiteturas robustas e 
              otimizar sistemas para máxima eficiência e manutenibilidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="public/curriculo.pdf"
                download="José_Marinho_Curriculo.pdf" 
                className="btn-hover inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow transition-all duration-300 ease-out hover:translate-y-[-2px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                onClick={(e) => {
                  e.preventDefault();
                  alert("O currículo será disponibilizado em breve.");
                }}
              >
                Baixar Currículo
              </a>
              <a 
                href="#experiencia" 
                className="btn-hover inline-flex items-center justify-center rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 text-sm font-medium shadow-sm transition-all duration-300 ease-out hover:translate-y-[-2px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Conheça meu trabalho
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;

