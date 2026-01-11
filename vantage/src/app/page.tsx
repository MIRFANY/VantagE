'use client';

import React, { useState, useEffect } from 'react';
import TextInput from '@/components/TextInput';
import TranslationDisplay from '@/components/TranslationDisplay';

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
  const [darkMode, setDarkMode] = useState(true);
  const [languageMode, setLanguageMode] = useState<'urdu' | 'english'>('urdu');

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
    <main 
      className={`relative min-h-screen w-full transition-colors duration-300`}
      style={{
        backgroundImage: `url('/image-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/60 pointer-events-none" />

      <div className="relative z-10">
        {/* Header - Transparent */}
        <div className="py-3 sm:py-4 px-4 sm:px-6">
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
            لفظ
          </h1>
        </div>

        {/* Floating Dark Mode Toggle - Bottom Right - Mobile Optimized */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`fixed bottom-6 sm:bottom-8 right-6 sm:right-8 p-2.5 sm:p-3 rounded-full transition-all duration-300 z-50 shadow-lg hover:scale-110 active:scale-95 ${
            darkMode
              ? 'bg-slate-800 hover:bg-slate-700 text-amber-400'
              : 'bg-amber-200 hover:bg-amber-300 text-slate-900'
          }`}
          aria-label="Toggle dark mode"
        >
          <span className="text-lg sm:text-xl">{darkMode ? '☀️' : '🌙'}</span>
        </button>

        {/* Main Content */}
        {!analysis ? (
          <>
            {/* Input Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
              <TextInput onAnalyze={handleAnalyze} isLoading={isLoading} darkMode={darkMode} />
            </div>

            {/* Error Message */}
            {error && (
              <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 ${
                darkMode
                  ? 'bg-red-900/30 border-red-700'
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-sm sm:text-base ${darkMode ? 'text-red-200' : 'text-red-700'}`}>
                  ⚠️ {error}
                </p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-spin" />
                    <div className={`absolute inset-2 rounded-full ${darkMode ? 'bg-slate-900' : 'bg-white'}`} />
                    <span className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl animate-pulse">
                      ✨
                    </span>
                  </div>
                </div>
                <p className={`text-base sm:text-lg md:text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Decoding Your Poetry...
                </p>
              </div>
            )}
          </>
        ) : (
          <TranslationDisplay
            inputText={inputText}
            analysis={analysis}
            darkMode={darkMode}
            languageMode={languageMode}
            setLanguageMode={setLanguageMode}
            onNew={() => {
              setAnalysis(null);
              setInputText('');
              setError(null);
            }}
          />
        )}

        {/* Footer */}
        <div className={`mt-12 sm:mt-20 py-6 sm:py-8 border-t ${darkMode ? 'border-slate-700/50 bg-slate-900/30' : 'border-gray-300/50 bg-white/30'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              عرفان کے قلم سے، اردو کا جدید روپ
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
