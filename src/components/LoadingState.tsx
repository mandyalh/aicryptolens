import React from 'react';

export function LoadingState() {
  return (
    <div className="mt-8 p-6 bg-gray-900/50 rounded-xl border border-gray-800 text-center">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-800 rounded w-1/3 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-800 rounded"></div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-gray-400">Analyzing chart pattern...</p>
    </div>
  );
}