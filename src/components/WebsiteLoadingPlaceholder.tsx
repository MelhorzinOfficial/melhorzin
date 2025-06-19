import React from 'react';

interface WebsiteLoadingPlaceholderProps {
  color: string;
}

export function WebsiteLoadingPlaceholder({ color }: WebsiteLoadingPlaceholderProps) {
  return (
    <div className="w-full h-full p-4 bg-black/20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="w-8 h-8 rounded-full animate-pulse"
          style={{ backgroundColor: `${color}40` }}
        />
        <div className="flex-1">
          <div 
            className="h-3 w-32 rounded animate-pulse mb-2"
            style={{ backgroundColor: `${color}40` }}
          />
          <div 
            className="h-2 w-48 rounded animate-pulse"
            style={{ backgroundColor: `${color}20` }}
          />
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="w-full h-24 rounded mb-6 animate-pulse"
        style={{ backgroundColor: `${color}30` }}
      />

      {/* Content Sections */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 rounded animate-pulse"
            style={{ 
              backgroundColor: `${color}${20 + i * 10}`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Text Lines */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-2 rounded animate-pulse"
            style={{ 
              width: `${70 + Math.random() * 30}%`,
              backgroundColor: `${color}30`,
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
