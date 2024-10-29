import React, { useState, useEffect } from 'react';
import { BarChart3, AlertTriangle } from 'lucide-react';
import { AnalysisResult } from '../types/analysis';
import { analyzeChartImage } from '../services/analysisService';
import { AnalysisCard } from './AnalysisCard';
import { PredictionPanel } from './PredictionPanel';
import { ChartPreview } from './ChartPreview';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

interface AnalysisProps {
  imageUrl: string;
}

export function ImageAnalysis({ imageUrl }: AnalysisProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const performAnalysis = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await analyzeChartImage(imageUrl);
        setAnalysis(result);
      } catch (err) {
        setError('Failed to analyze chart. Please try again.');
        console.error('Analysis error:', err);
      } finally {
        setLoading(false);
      }
    };

    performAnalysis();
  }, [imageUrl]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!analysis) return null;

  return (
    <div className="mt-8 space-y-6 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-semibold">Analysis Results</h2>
        </div>
        <ChartPreview imageUrl={imageUrl} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnalysisCard
          title="Pattern"
          value={analysis.pattern}
          confidence={analysis.confidence}
          color="cyan"
        />
        <AnalysisCard
          title="Key Levels"
          support={analysis.support}
          resistance={analysis.resistance}
          color="green"
        />
        <AnalysisCard
          title="Trend"
          value={analysis.trend}
          color="yellow"
        />
        <AnalysisCard
          title="Volume"
          value={analysis.volume}
          color="purple"
        />
      </div>
      
      <PredictionPanel prediction={analysis.prediction} />
    </div>
  );
}