'use client';

import React, { useState, useEffect } from 'react';
import TextInput from '@/components/TextInput';
import AnalysisResult from '@/components/AnalysisResult';

interface Analysis {
  summary: string;
  meaning: string;
  poeticDevices: string[];
  themes: string[];
  emotionalTone: string;
  historicalContext: string;
  wordAnalysis: Record<string, string>;
  interpretation: string;
  englishTranslation?: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnalyze = async (text: string) => {
    setInputText(text);
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze text');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred during analysis'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="animate-slideInDown space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-slideUp" />
              <span className="text-sm font-bold uppercase tracking-widest text-purple-700">
                Literary AI Companion
              </span>
              <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-slideUp" />
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 leading-tight animate-fadeInUp">
              Urdu Poetry
              <br />
              <span className="text-4xl sm:text-5xl lg:text-6xl">Decoded</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-800 max-w-3xl mx-auto leading-relaxed animate-fadeInUp mt-6">
              Discover the profound beauty and hidden meanings within Urdu
              poetry and prose. Let AI guide you through the layers of literary
              artistry.
            </p>

            <div className="flex items-center justify-center gap-4 mt-8 flex-wrap animate-fadeInUp">
              <div className="px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200">
                <span className="text-sm font-semibold text-gray-700">
                  ✨ AI-Powered Analysis
                </span>
              </div>
              <div className="px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200">
                <span className="text-sm font-semibold text-gray-700">
                  📚 Deep Insights
                </span>
              </div>
              <div className="px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200">
                <span className="text-sm font-semibold text-gray-700">
                  🌟 Cultural Context
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="relative animate-slideUp">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-4xl animate-floatUp">✍️</span>
                  Enter Your Text
                </h2>
                <TextInput onAnalyze={handleAnalyze} isLoading={isLoading} />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur opacity-0 hover:opacity-25 transition duration-300" />
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-white/20 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">🎯</span>
                How It Works
              </h2>

              <ol className="space-y-5">
                {[
                  {
                    num: '1',
                    title: 'Paste Poetry',
                    desc: 'Enter any Urdu text',
                    emoji: '📄',
                  },
                  {
                    num: '2',
                    title: 'AI Analysis',
                    desc: 'Decode meanings',
                    emoji: '🤖',
                  },
                  {
                    num: '3',
                    title: 'Get Insights',
                    desc: 'Understand themes',
                    emoji: '💡',
                  },
                ].map((step, idx) => (
                  <li
                    key={idx}
                    className="flex gap-4 animate-slideUp"
                    style={{ animationDelay: `${0.15 + idx * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      {step.num}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 flex items-center gap-2">
                        <span className="text-xl">{step.emoji}</span>
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-700">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                <p className="text-sm text-gray-700 italic flex items-start gap-2">
                  <span className="text-lg flex-shrink-0">💡</span>
                  <span>
                    Paste complete poems, ghazals, or prose for richer analysis
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="animate-slideUp mb-8">
            <div className="relative bg-red-50 rounded-3xl shadow-lg p-6 border-2 border-red-200">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">⚠️</span>
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">
                    Analysis Error
                  </h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="animate-slideUp">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-white/20 mb-8">
              <div className="flex justify-between items-start mb-8">
                <div className="animate-fadeInLeft">
                  <h2 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <span className="text-4xl animate-floatUp">📚</span>
                    Analysis Complete
                  </h2>
                  <p className="text-sm text-gray-600 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
                    Input: "{inputText.substring(0, 60)}
                    {inputText.length > 60 ? '...' : ''}"
                  </p>
                </div>
                <button
                  onClick={() => setAnalysis(null)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 group"
                >
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <AnalysisResult analysis={analysis} />
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="animate-slideUp">
            <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl p-16 border-2 border-blue-200 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin" />
                  <div className="absolute inset-2 bg-white rounded-full" />
                  <span className="absolute inset-0 flex items-center justify-center text-2xl animate-floatUp">
                    🔮
                  </span>
                </div>
              </div>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                Decoding Your Poetry...
              </p>
              <p className="text-sm text-gray-600">
                Analyzing meanings, devices, and cultural context
              </p>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        {!analysis && !isLoading && (
          <div className="text-center mt-16 animate-fadeInUp">
            <div className="inline-block">
              <div className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200">
                <p className="text-lg font-semibold text-gray-800">
                  ✨ Ready to explore Urdu poetry? ✨
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Decorative Elements */}
      <div className="fixed bottom-10 right-10 text-5xl opacity-20 animate-floatUp pointer-events-none">
        🌙
      </div>
      <div className="fixed top-1/4 right-5 text-4xl opacity-15 animate-pulse-glow pointer-events-none">
        ⭐
      </div>
      <div className="fixed top-3/4 left-5 text-4xl opacity-15 animate-floatUp pointer-events-none">
        📖
      </div>
    </main>
  );
}
