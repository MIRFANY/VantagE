'use client';

import React, { useState } from 'react';

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

interface AnalysisResultProps {
  analysis: Analysis;
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const ResultCard = ({
    title,
    emoji,
    children,
    bgColor,
    borderColor,
    isExpandable = false,
    sectionId = '',
  }: {
    title: string;
    emoji: string;
    children: React.ReactNode;
    bgColor: string;
    borderColor: string;
    isExpandable?: boolean;
    sectionId?: string;
  }) => {
    const isExpanded = expandedSections.has(sectionId);

    return (
      <div
        className={`group rounded-2xl overflow-hidden border-2 transition-all duration-300 animate-slideUp hover-lift ${bgColor} ${borderColor}`}
        style={{
          background: `linear-gradient(135deg, var(--tw-from, transparent) 0%, var(--tw-to, transparent) 100%)`,
        }}
      >
        <div
          className={`p-6 cursor-pointer transition-all duration-300 ${
            isExpandable ? 'hover:bg-white/10' : ''
          }`}
          onClick={() => isExpandable && toggleSection(sectionId)}
        >
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {emoji}
              </span>
              {title}
            </h3>
            {isExpandable && (
              <button className="text-gray-400 transition-transform duration-300">
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            )}
          </div>

          {(!isExpandable || isExpanded) && (
            <div className="mt-4 animate-slideUp">
              <div className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 opacity-50" />
              {children}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Summary */}
      <ResultCard
        title="Summary"
        emoji="📖"
        bgColor="bg-gradient-to-br from-blue-50/50 dark:from-blue-900/20"
        borderColor="border-blue-200 dark:border-blue-800"
      >
        <p className="text-gray-800 leading-relaxed text-lg">
          {analysis.summary}
        </p>
      </ResultCard>

      {/* Meaning */}
      <ResultCard
        title="Meaning & Essence"
        emoji="✨"
        bgColor="bg-gradient-to-br from-green-50/50 dark:from-green-900/20"
        borderColor="border-green-200 dark:border-green-800"
      >
        <p className="text-gray-800 leading-relaxed text-lg italic">
          {analysis.meaning}
        </p>
      </ResultCard>

      {/* English Translation */}
      {analysis.englishTranslation && (
        <ResultCard
          title="English Translation"
          emoji="🌍"
          bgColor="bg-gradient-to-br from-purple-50/50 dark:from-purple-900/20"
          borderColor="border-purple-200 dark:border-purple-800"
        >
          <p className="text-gray-800 leading-relaxed text-lg italic">
            "{analysis.englishTranslation}"
          </p>
        </ResultCard>
      )}

      {/* Poetic Devices */}
      <ResultCard
        title="Poetic Devices"
        emoji="🎨"
        bgColor="bg-gradient-to-br from-yellow-50/50 dark:from-yellow-900/20"
        borderColor="border-yellow-200 dark:border-yellow-800"
      >
        <div className="flex flex-wrap gap-3">
          {analysis.poeticDevices.map((device, index) => (
            <span
              key={index}
              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-900 font-semibold text-sm hover-lift animate-slideUp"
              style={{
                animation: `slideUp 0.6s ease-out ${0.05 * index}s both`,
              }}
            >
              {device}
            </span>
          ))}
        </div>
      </ResultCard>

      {/* Themes */}
      <ResultCard
        title="Themes Explored"
        emoji="🔮"
        bgColor="bg-gradient-to-br from-red-50/50 dark:from-red-900/20"
        borderColor="border-red-200 dark:border-red-800"
      >
        <ul className="space-y-3">
          {analysis.themes.map((theme, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-gray-800 animate-slideUp"
              style={{
                animation: `slideUp 0.6s ease-out ${0.05 * index}s both`,
              }}
            >
              <span className="text-red-500 text-lg mt-0.5 flex-shrink-0">
                ◆
              </span>
              <span className="text-base leading-relaxed">{theme}</span>
            </li>
          ))}
        </ul>
      </ResultCard>

      {/* Emotional Tone */}
      <ResultCard
        title="Emotional Resonance"
        emoji="❤️"
        bgColor="bg-gradient-to-br from-pink-50/50 dark:from-pink-900/20"
        borderColor="border-pink-200 dark:border-pink-800"
      >
        <p className="text-gray-800 text-lg leading-relaxed">
          {analysis.emotionalTone}
        </p>
      </ResultCard>

      {/* Historical Context */}
      <ResultCard
        title="Historical & Cultural Context"
        emoji="🕰️"
        bgColor="bg-gradient-to-br from-indigo-50/50 dark:from-indigo-900/20"
        borderColor="border-indigo-200 dark:border-indigo-800"
      >
        <p className="text-gray-800 text-lg leading-relaxed">
          {analysis.historicalContext}
        </p>
      </ResultCard>

      {/* Word Analysis */}
      <ResultCard
        title="Word-by-Word Decoding"
        emoji="📚"
        bgColor="bg-gradient-to-br from-cyan-50/50 dark:from-cyan-900/20"
        borderColor="border-cyan-200 dark:border-cyan-800"
        isExpandable={true}
        sectionId="wordAnalysis"
      >
        <div className="space-y-4">
          {Object.entries(analysis.wordAnalysis).map(([word, meaning], index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/40 border border-cyan-200 hover-lift animate-slideUp transition-all duration-300"
              style={{
                animation: `slideUp 0.6s ease-out ${0.05 * index}s both`,
              }}
            >
              <p className="font-bold text-cyan-800 text-lg mb-2">
                {word}
              </p>
              <p className="text-gray-800 text-base leading-relaxed">
                {meaning}
              </p>
            </div>
          ))}
        </div>
      </ResultCard>

      {/* Deep Interpretation */}
      <ResultCard
        title="Deep Literary Interpretation"
        emoji="🌟"
        bgColor="bg-gradient-to-br from-orange-50/50 dark:from-orange-900/20"
        borderColor="border-orange-200 dark:border-orange-800"
      >
        <p className="text-gray-800 text-lg leading-relaxed">
          {analysis.interpretation}
        </p>
      </ResultCard>

      {/* Footer Message */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-300/50 text-center animate-slideUp">
        <p className="text-gray-800 text-sm italic">
          ✨ "In poetry, words dance with meaning." ✨
        </p>
      </div>
    </div>
  );
}
