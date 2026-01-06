'use client';

import React, { useState } from 'react';

interface TextInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export default function TextInput({ onAnalyze, isLoading }: TextInputProps) {
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

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label
            htmlFor="urduText"
            className="block text-sm font-medium text-gray-800 mb-3 transition-smooth"
          >
            <span className="inline-block animate-fadeInUp">✍️ Enter Your Poetry</span>
          </label>
          <div
            className={`relative rounded-2xl transition-smooth duration-300 ${
              isFocused
                ? 'ring-2 ring-blue-500 ring-offset-2'
                : ''
            }`}
          >
            <textarea
              id="urduText"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="پوری نئی دنیا کھول دے میرے خواب کو..."
              className={`w-full h-48 p-5 border-2 rounded-2xl focus:outline-none transition-all duration-300 resize-none font-urdu text-lg text-gray-900 ${
                isFocused
                  ? 'border-blue-500 bg-blue-50/30 shadow-lg'
                  : 'border-gray-200 bg-white/80'
              }`}
              disabled={isLoading}
            />
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent)',
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className={`w-full relative overflow-hidden rounded-xl font-semibold py-4 text-white transition-all duration-300 group ${
            isLoading || !text.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover-lift hover:shadow-2xl active:scale-95'
          }`}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Decoding Your Poetry...
              </>
            ) : (
              <>
                <span className="text-xl">🔮</span>
                Decode Poetry
              </>
            )}
          </span>
        </button>
      </form>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-800 animate-fadeInLeft">
          💫 Try Sample Poems:
        </p>
        <div className="grid grid-cols-1 gap-3">
          {sampleTexts.map((sample, index) => (
            <button
              key={index}
              onClick={() => setText(sample.text)}
              disabled={isLoading}
              className={`group relative p-4 rounded-xl text-left transition-all duration-300 animate-fadeInUp transform hover-lift disabled:opacity-50 disabled:cursor-not-allowed ${
                index % 2 === 0
                  ? 'bg-gradient-to-r from-purple-100 to-blue-100 hover:shadow-lg'
                  : 'bg-gradient-to-r from-pink-100 to-orange-100 hover:shadow-lg'
              }`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${0.1 * (index + 1)}s both`,
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl group-hover:animate-floatUp transition-transform">
                  {sample.emoji}
                </span>
                <p className="text-sm text-gray-800 font-medium line-clamp-2">
                  {sample.text}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
