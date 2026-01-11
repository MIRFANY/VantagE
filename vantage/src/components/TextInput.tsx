'use client';

import React, { useState } from 'react';

interface TextInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
  darkMode: boolean;
}

export default function TextInput({ onAnalyze, isLoading, darkMode }: TextInputProps) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  const sampleTexts = [
    { text: 'میری سانسیں اتنی رفتار سے چل رہی ہیں', emoji: '💨' },
    { text: 'تمہاری یادیں میرے دل میں رہتی ہیں', emoji: '💝' },
    { text: 'رات بھر جاگا ہوں تمہاری سوچ میں', emoji: '🌙' },
  ];

  const inputBg = darkMode
    ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500'
    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400';

  const focusRing = darkMode ? 'ring-amber-500' : 'ring-amber-400';

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="relative">
          <div
            className={`relative rounded-lg sm:rounded-2xl transition-all duration-300 border-2 ${
              isFocused
                ? `ring-2 ring-offset-2 ${focusRing} border-amber-500`
                : `${darkMode ? 'border-slate-600' : 'border-gray-200'}`
            }`}
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="پوری نئی دنیا کھول دے میرے خواب کو..."
              className={`w-full h-40 sm:h-48 md:h-56 p-4 sm:p-6 border-0 rounded-lg sm:rounded-2xl focus:outline-none transition-all duration-300 resize-none text-base sm:text-lg font-urdu ${inputBg}`}
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className={`w-full relative overflow-hidden rounded-lg font-semibold py-3 sm:py-4 text-white transition-all duration-300 text-sm sm:text-base ${
            isLoading || !text.trim()
              ? 'bg-gray-600 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-lg active:scale-95 touch-manipulation'
          }`}
        >
          <span className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <span className="text-xl">✨</span>
                Decode Poetry
              </>
            )}
          </span>
        </button>
      </form>

      <div className="space-y-3">
        <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          💫 Try Sample Poems:
        </p>
        <div className="grid grid-cols-1 gap-3">
          {sampleTexts.map((sample, index) => (
            <button
              key={index}
              onClick={() => setText(sample.text)}
              disabled={isLoading}
              className={`group relative p-4 rounded-lg text-left transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode
                  ? 'bg-slate-800 border border-slate-700 hover:border-amber-500 text-gray-200'
                  : 'bg-gray-100 border border-gray-200 hover:border-amber-400 text-gray-900'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl group-hover:animate-bounce transition-transform">
                  {sample.emoji}
                </span>
                <p className="text-sm font-medium line-clamp-2">{sample.text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
