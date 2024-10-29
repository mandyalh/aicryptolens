export interface AnalysisResult {
  pattern: string;
  confidence: number;
  support?: number;
  resistance?: number;
  trend: string;
  volume: string;
  prediction: string;
}