import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Brain, Upload, Link2, ChevronRight, BarChart3 } from 'lucide-react';
import { ImageAnalysis } from './components/ImageAnalysis';
import { UploadArea } from './components/UploadArea';

function App() {
  const [analysisMethod, setAnalysisMethod] = useState<'url' | 'upload'>('url');
  const [url, setUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  }, []);

  const handleFile = (file?: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setShowAnalysis(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setShowAnalysis(false);
  };

  const handleAnalyze = () => {
    setShowAnalysis(true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Hero Section */}
      <header className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 pt-24 pb-16 text-center"
        >
          <div className="inline-block mb-6">
            <Brain className="w-16 h-16 text-cyan-400 animate-pulse" />
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
            CryptoLens
          </h1>
          <p className="text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            AI Analysis of Your Crypto Chart
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="cyberpunk-card rounded-xl p-8 max-w-3xl mx-auto"
        >
          {/* Analysis Method Selector */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setAnalysisMethod('url')}
              className={`flex-1 p-4 rounded-lg transition-all ${
                analysisMethod === 'url'
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-400'
                  : 'bg-gray-800/50 hover:bg-gray-800'
              }`}
            >
              <Link2 className="w-6 h-6 mb-2 mx-auto" />
              <span>Enter URL</span>
            </button>
            <button
              onClick={() => setAnalysisMethod('upload')}
              className={`flex-1 p-4 rounded-lg transition-all ${
                analysisMethod === 'upload'
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-400'
                  : 'bg-gray-800/50 hover:bg-gray-800'
              }`}
            >
              <Upload className="w-6 h-6 mb-2 mx-auto" />
              <span>Upload Chart</span>
            </button>
          </div>

          {/* Input Area */}
          {analysisMethod === 'url' ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter TradingView chart URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-4 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>
          ) : (
            <UploadArea
              dragActive={dragActive}
              image={image}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onFileInput={handleFileInput}
              onRemoveImage={removeImage}
            />
          )}

          {/* Analysis Button */}
          <button 
            onClick={handleAnalyze}
            className={`w-full mt-8 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white py-4 px-8 rounded-lg font-bold transition-all flex items-center justify-center gap-2 group ${
              (analysisMethod === 'url' && !url) || (analysisMethod === 'upload' && !image)
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:opacity-90'
            }`}
            disabled={(analysisMethod === 'url' && !url) || (analysisMethod === 'upload' && !image)}
          >
            <BarChart3 className="w-5 h-5" />
            Analyze Chart
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Analysis Results */}
          {showAnalysis && image && (
            <ImageAnalysis imageUrl={image} />
          )}

          {/* Features Preview */}
          {!showAnalysis && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-800">
                <h3 className="text-lg font-semibold mb-2 text-cyan-400">
                  Support & Resistance
                </h3>
                <p className="text-gray-400">
                  AI-powered identification of key price levels
                </p>
              </div>
              <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-800">
                <h3 className="text-lg font-semibold mb-2 text-fuchsia-400">
                  Trend Analysis
                </h3>
                <p className="text-gray-400">
                  Advanced pattern recognition and trend forecasting
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
            <p>© 2024 CryptoLens. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Imprint
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Legal
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;