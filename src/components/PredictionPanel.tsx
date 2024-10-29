import React from 'react';

interface PredictionPanelProps {
  prediction: string;
}

export function PredictionPanel({ prediction }: PredictionPanelProps) {
  return (
    <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-400/30">
      <h3 className="font-semibold mb-2 text-blue-400">Prediction</h3>
      <p className="text-gray-300">{prediction}</p>
    </div>
  );
}