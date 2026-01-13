'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Analysis {
  _id: string;
  text: string;
  summary: string;
  meaning: string;
  poeticDevices: string[];
  themes: string[];
  emotionalTone: string;
  historicalContext: string;
  wordAnalysis: Record<string, string>;
  interpretation: string;
  englishTranslation?: string;
  createdAt: string;
}

export default function AnalysisDetail() {
  const params = useParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/analyses?id=${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
        <div className="text-gray-400 text-xl">Loading analysis...</div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-6 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
          >
            ← Back
          </button>
          <div className="bg-red-900/30 p-6 rounded-lg border border-red-700">
            <p className="text-red-200">{error || 'Analysis not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition"
          >
            ← Back to History
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Original Text */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-400 mb-2">ORIGINAL TEXT</h2>
          <p className="text-xl text-amber-300 font-serif">{analysis.text}</p>
          <p className="text-xs text-gray-500 mt-4">
            {new Date(analysis.createdAt).toLocaleDateString()} at{' '}
            {new Date(analysis.createdAt).toLocaleTimeString()}
          </p>
        </div>

        {/* Summary */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-amber-400 mb-3">📝 Summary</h2>
          <p className="text-gray-300 leading-relaxed">{analysis.summary}</p>
        </div>

        {/* Meaning */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-amber-400 mb-3">🔍 Meaning</h2>
          <p className="text-gray-300 leading-relaxed">{analysis.meaning}</p>
        </div>

        {/* Poetic Devices */}
        {analysis.poeticDevices && analysis.poeticDevices.length > 0 && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-amber-400 mb-3">🎭 Poetic Devices</h2>
            <div className="flex flex-wrap gap-2">
              {analysis.poeticDevices.map((device, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-amber-600/30 border border-amber-600 text-amber-200 rounded-full text-sm"
                >
                  {device}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Themes */}
        {analysis.themes && analysis.themes.length > 0 && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-amber-400 mb-3">🎯 Themes</h2>
            <div className="flex flex-wrap gap-2">
              {analysis.themes.map((theme, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-600/30 border border-blue-600 text-blue-200 rounded-full text-sm"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Emotional Tone */}
        {analysis.emotionalTone && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-amber-400 mb-3">💭 Emotional Tone</h2>
            <p className="text-gray-300">{analysis.emotionalTone}</p>
          </div>
        )}

        {/* Historical Context */}
        {analysis.historicalContext && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-amber-400 mb-3">📚 Historical Context</h2>
            <p className="text-gray-300 leading-relaxed">{analysis.historicalContext}</p>
          </div>
        )}

        {/* Word Analysis */}
        {analysis.wordAnalysis && Object.keys(analysis.wordAnalysis).length > 0 && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-amber-400 mb-3">📖 Word Analysis</h2>
            <div className="space-y-3">
              {Object.entries(analysis.wordAnalysis).map(([word, meaning], idx) => (
                <div key={idx} className="border-l-4 border-amber-600 pl-4">
                  <p className="text-amber-300 font-semibold">{word}</p>
                  <p className="text-gray-300 text-sm mt-1">{meaning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interpretation */}
        {analysis.interpretation && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-amber-400 mb-3">✨ Interpretation</h2>
            <p className="text-gray-300 leading-relaxed">{analysis.interpretation}</p>
          </div>
        )}

        {/* English Translation */}
        {analysis.englishTranslation && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-amber-400 mb-3">🌍 English Translation</h2>
            <p className="text-gray-300 leading-relaxed italic">{analysis.englishTranslation}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            href="/history"
            className="text-gray-400 hover:text-gray-300 transition"
          >
            ← Back to History
          </Link>
        </div>
      </div>
    </div>
  );
}
