import React from 'react';
import { TrendingUp, ArrowUpDown, Activity } from 'lucide-react';

interface AnalysisCardProps {
  title: string;
  value?: string;
  confidence?: number;
  support?: number;
  resistance?: number;
  color: string;
}

const icons = {
  Pattern: TrendingUp,
  'Key Levels': ArrowUpDown,
  Trend: TrendingUp,
  Volume: Activity,
};

export function AnalysisCard({ title, value, confidence, support, resistance, color }: AnalysisCardProps) {
  const Icon = icons[title as keyof typeof icons];
  const textColor = `text-${color}-400`;

  return (
    <div className="p-4 bg-black/30 rounded-lg border border-gray-800">
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`w-5 h-5 ${textColor}`} />
        <h3 className="font-medium">{title}</h3>
      </div>
      
      {value && (
        <div className={`text-2xl font-bold mb-2 ${textColor}`}>
          {value}
        </div>
      )}
      
      {confidence && (
        <p className="text-sm text-gray-400">
          Confidence: {(confidence * 100).toFixed(1)}%
        </p>
      )}
      
      {(support || resistance) && (
        <div className="space-y-2">
          <p className="text-green-400">
            Support: ${support?.toLocaleString()}
          </p>
          <p className="text-red-400">
            Resistance: ${resistance?.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}