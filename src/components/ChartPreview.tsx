import React from 'react';

interface ChartPreviewProps {
  imageUrl: string;
}

export function ChartPreview({ imageUrl }: ChartPreviewProps) {
  return (
    <div className="relative group">
      <img 
        src={imageUrl} 
        alt="Analyzed Chart"
        className="h-16 rounded-lg border border-gray-700 cursor-zoom-in transition-transform group-hover:scale-105"
      />
      <div className="hidden group-hover:block absolute right-0 top-full mt-2 z-10">
        <img 
          src={imageUrl} 
          alt="Enlarged Chart"
          className="max-w-md rounded-lg border border-gray-700 shadow-2xl"
        />
      </div>
    </div>
  );
}