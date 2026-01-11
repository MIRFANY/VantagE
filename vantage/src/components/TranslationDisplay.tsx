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

interface TranslationDisplayProps {
  inputText: string;
  analysis: Analysis;
  darkMode: boolean;
  languageMode: 'urdu' | 'english';
  setLanguageMode: (mode: 'urdu' | 'english') => void;
  onNew: () => void;
}

export default function TranslationDisplay({
  inputText,
  analysis,
  darkMode,
  languageMode,
  setLanguageMode,
  onNew,
}: TranslationDisplayProps) {
  const [copiedSide, setCopiedSide] = useState<'urdu' | 'english' | null>(null);
  const [playingSide, setPlayingSide] = useState<'urdu' | 'english' | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const copyToClipboard = (text: string, side: 'urdu' | 'english') => {
    navigator.clipboard.writeText(text);
    setCopiedSide(side);
    setTimeout(() => setCopiedSide(null), 2000);
  };

  const handleListen = async (text: string, language: 'urdu' | 'english') => {
    try {
      setPlayingSide(language);
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate speech');
      }

      const data = await response.json();

      // Create or reuse audio element
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      audioRef.current.src = data.audio;
      audioRef.current.onended = () => setPlayingSide(null);
      audioRef.current.onerror = () => {
        console.error('Audio playback error');
        setPlayingSide(null);
        alert('Error playing audio');
      };
      await audioRef.current.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setPlayingSide(null);
      const errorMsg = error instanceof Error ? error.message : 'Failed to play audio';
      alert(`Error: ${errorMsg}`);
    }
  };

  const bgClass = 'bg-transparent';
  const textClass = darkMode ? 'text-gray-200' : 'text-gray-900';
  const borderClass = darkMode ? 'border-slate-700' : 'border-gray-200';
  const cardBg = darkMode ? 'bg-slate-800/50 backdrop-blur-sm' : 'bg-gray-50/50 backdrop-blur-sm';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300 py-6 sm:py-8 md:py-12`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Controls */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Language Toggle */}
          <div className={`flex gap-2 p-2 rounded-lg ${cardBg} border ${borderClass} w-full sm:w-auto`}>
            <button
              onClick={() => setLanguageMode('urdu')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded text-sm sm:text-base font-semibold transition-all duration-300 ${
                languageMode === 'urdu'
                  ? 'bg-amber-500 text-white'
                  : darkMode
                    ? 'bg-transparent text-gray-300 hover:text-gray-200'
                    : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              From: Urdu
            </button>
            <button
              onClick={() => setLanguageMode('english')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded text-sm sm:text-base font-semibold transition-all duration-300 ${
                languageMode === 'english'
                  ? 'bg-amber-500 text-white'
                  : darkMode
                    ? 'bg-transparent text-gray-300 hover:text-gray-200'
                    : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              To: English
            </button>
          </div>

          {/* New Analysis Button */}
          <button
            onClick={onNew}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm sm:text-base font-semibold hover:shadow-lg active:scale-95 transition-all duration-300 touch-manipulation"
          >
            ✨ New Analysis
          </button>
        </div>

        {/* Translation Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Urdu Side */}
          <div
            className={`rounded-lg sm:rounded-2xl border-2 overflow-hidden ${borderClass} ${
              languageMode === 'urdu'
                ? 'ring-2 ring-amber-500 ring-offset-2 ' + (darkMode ? 'ring-offset-slate-900' : 'ring-offset-white')
                : ''
            } transition-all duration-300`}
          >
            <div
              className={`p-4 sm:p-6 md:p-8 min-h-80 sm:min-h-96 flex flex-col justify-between ${cardBg}`}
              style={{
                backgroundImage: darkMode
                  ? 'linear-gradient(135deg, rgba(180, 83, 9, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(251, 146, 60, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
              }}
            >
              <div>
                <p className={`text-xs sm:text-sm font-semibold mb-3 sm:mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                  اردو متن
                </p>
                <p
                  className={`text-lg sm:text-xl md:text-2xl leading-relaxed font-urdu ${textClass}`}
                  style={{ direction: 'rtl' }}
                >
                  {inputText}
                </p>
              </div>

              {/* Urdu Controls */}
              <div className="flex gap-2 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t text-sm sm:text-base" style={{ borderColor: darkMode ? '#475569' : '#e5e7eb' }}>
                <button
                  onClick={() => copyToClipboard(inputText, 'urdu')}
                  className={`flex-1 py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                    copiedSide === 'urdu'
                      ? 'bg-green-500 text-white'
                      : darkMode
                        ? 'bg-slate-700 text-gray-300 hover:bg-slate-600 active:scale-95'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95'
                  }`}
                >
                  {copiedSide === 'urdu' ? '✓ Copied' : '📋 Copy'}
                </button>
                <button
                  onClick={() => handleListen(inputText, 'urdu')}
                  disabled={playingSide === 'urdu'}
                  className={`flex-1 py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm touch-manipulation ${
                    playingSide === 'urdu'
                      ? 'bg-blue-500 text-white'
                      : darkMode
                        ? 'bg-slate-700 text-gray-300 hover:bg-slate-600 active:scale-95'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95'
                  }`}
                >
                  {playingSide === 'urdu' ? '⏸ Playing...' : '🔊 Listen'}
                </button>
              </div>
            </div>
          </div>

          {/* English Side */}
          <div
            className={`rounded-lg sm:rounded-2xl border-2 overflow-hidden ${borderClass} ${
              languageMode === 'english'
                ? 'ring-2 ring-amber-500 ring-offset-2 ' + (darkMode ? 'ring-offset-slate-900' : 'ring-offset-white')
                : ''
            } transition-all duration-300`}
          >
            <div
              className={`p-4 sm:p-6 md:p-8 min-h-80 sm:min-h-96 flex flex-col justify-between ${cardBg}`}
              style={{
                backgroundImage: darkMode
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
              }}
            >
              <div>
                <p className={`text-xs sm:text-sm font-semibold mb-3 sm:mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  English Translation
                </p>
                <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${textClass}`}>
                  {analysis.englishTranslation || 'No English translation provided'}
                </p>
              </div>

              {/* English Controls */}
              <div className="flex gap-2 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t text-sm sm:text-base" style={{ borderColor: darkMode ? '#475569' : '#e5e7eb' }}>
                <button
                  onClick={() => copyToClipboard(analysis.englishTranslation || '', 'english')}
                  className={`flex-1 py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                    copiedSide === 'english'
                      ? 'bg-green-500 text-white'
                      : darkMode
                        ? 'bg-slate-700 text-gray-300 hover:bg-slate-600 active:scale-95'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95'
                  }`}
                >
                  {copiedSide === 'english' ? '✓ Copied' : '📋 Copy'}
                </button>
                <button
                  onClick={() => handleListen(analysis.englishTranslation || '', 'english')}
                  disabled={playingSide === 'english'}
                  className={`flex-1 py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm touch-manipulation ${
                    playingSide === 'english'
                      ? 'bg-blue-500 text-white'
                      : darkMode
                        ? 'bg-slate-700 text-gray-300 hover:bg-slate-600 active:scale-95'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95'
                  }`}
                >
                  {playingSide === 'english' ? '⏸ Playing...' : '🔊 Listen'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Details */}
        <div className={`rounded-lg sm:rounded-2xl border-2 ${borderClass} ${cardBg} p-4 sm:p-6 md:p-8 mb-8 sm:mb-12`}>
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Literary Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Summary */}
            <div className={`p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-2 sm:mb-3 text-sm sm:text-base ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>Summary</h3>
              <p className={`text-sm leading-relaxed ${textClass}`}>{analysis.summary}</p>
            </div>

            {/* Meaning */}
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Meaning & Essence</h3>
              <p className={`text-sm leading-relaxed italic ${textClass}`}>{analysis.meaning}</p>
            </div>

            {/* Emotional Tone */}
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Emotional Tone</h3>
              <p className={`text-sm leading-relaxed ${textClass}`}>{analysis.emotionalTone}</p>
            </div>

            {/* Historical Context */}
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Historical Context</h3>
              <p className={`text-sm leading-relaxed ${textClass}`}>{analysis.historicalContext}</p>
            </div>

            {/* Poetic Devices */}
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>Poetic Devices</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.poeticDevices.map((device, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-3 py-1 rounded-full ${
                      darkMode
                        ? 'bg-purple-500/30 text-purple-200'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {device}
                  </span>
                ))}
              </div>
            </div>

            {/* Themes */}
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Themes</h3>
              <ul className="space-y-2">
                {analysis.themes.map((theme, idx) => (
                  <li key={idx} className={`text-sm ${textClass}`}>
                    • {theme}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deep Interpretation */}
            <div className={`p-5 rounded-xl md:col-span-2 ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Deep Interpretation</h3>
              <p className={`text-sm leading-relaxed ${textClass}`}>{analysis.interpretation}</p>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center">
          <p className={`text-sm italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            ✨ "In poetry, words dance with meaning." ✨
          </p>
        </div>
      </div>
    </div>
  );
}
