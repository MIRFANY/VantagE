'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Analysis {
  _id: string;
  text: string;
  summary: string;
  createdAt: string;
  isFavorite: boolean;
}

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analyses');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setAnalyses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading analyses');
    } finally {
      setLoading(false);
    }
  };

  const deleteAnalysis = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const response = await fetch(`/api/analyses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      setAnalyses(analyses.filter(a => a._id !== id));
      alert('Deleted!');
    } catch (err) {
      alert('Error deleting');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400"> Saved Analyses</h1>
          <Link href="/" className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
            ← Back
          </Link>
        </div>

        {error && <div className="bg-red-900/30 p-4 rounded-lg text-red-200 mb-6">{error}</div>}

        {analyses.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>No saved analyses yet. Go analyze some poetry!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {analyses.map((analysis) => (
              <div key={analysis._id} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-2">
                      {new Date(analysis.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-amber-300 font-semibold truncate">{analysis.text}</p>
                    <p className="text-gray-300 mt-2 line-clamp-2">{analysis.summary}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/analysis/${analysis._id}`}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => deleteAnalysis(analysis._id)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}