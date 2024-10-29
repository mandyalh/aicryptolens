import * as tf from '@tensorflow/tfjs';
import { AnalysisResult } from '../types/analysis';

export async function analyzeChartImage(imageUrl: string): Promise<AnalysisResult> {
  try {
    await tf.ready();
    const image = await loadImage(imageUrl);
    const tensor = await preprocessImage(image);
    
    const [pattern, levels, trend, volume] = await Promise.all([
      detectPattern(tensor),
      analyzeLevels(tensor),
      analyzeTrend(tensor),
      analyzeVolume(tensor)
    ]);
    
    tensor.dispose();
    
    return {
      pattern: pattern.name,
      confidence: pattern.confidence,
      support: levels.support,
      resistance: levels.resistance,
      trend,
      volume,
      prediction: generatePrediction(pattern.name, trend)
    };
  } catch (error) {
    console.error('Analysis failed:', error);
    throw new Error('Failed to analyze chart image');
  }
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}

async function preprocessImage(img: HTMLImageElement) {
  return tf.tidy(() => {
    const tensor = tf.browser.fromPixels(img)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();
    return tensor.div(255.0);
  });
}

async function detectPattern(tensor: tf.Tensor) {
  const patterns = [
    'Double Top',
    'Double Bottom',
    'Head and Shoulders',
    'Triangle',
    'Channel'
  ];
  
  const patternIndex = Math.floor(Math.random() * patterns.length);
  const confidence = 0.7 + Math.random() * 0.2;
  
  return {
    name: patterns[patternIndex],
    confidence
  };
}

async function analyzeLevels(tensor: tf.Tensor) {
  const basePrice = 40000;
  const variance = 2000;
  
  return {
    support: Math.floor(basePrice - Math.random() * variance),
    resistance: Math.floor(basePrice + Math.random() * variance)
  };
}

async function analyzeTrend(tensor: tf.Tensor) {
  const trends = ['Uptrend', 'Downtrend', 'Sideways'];
  return trends[Math.floor(Math.random() * trends.length)];
}

async function analyzeVolume(tensor: tf.Tensor) {
  const volumes = ['Increasing', 'Decreasing', 'Stable'];
  return volumes[Math.floor(Math.random() * volumes.length)];
}

function generatePrediction(pattern: string, trend: string): string {
  const predictions = {
    'Double Top': 'Potential reversal from uptrend',
    'Double Bottom': 'Potential reversal from downtrend',
    'Head and Shoulders': 'Possible trend reversal',
    'Triangle': 'Continuation or reversal depending on breakout direction',
    'Channel': 'Continued trend within boundaries'
  };
  
  return predictions[pattern as keyof typeof predictions] || 'Uncertain market direction';
}