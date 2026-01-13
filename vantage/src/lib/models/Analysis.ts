import mongoose from 'mongoose';

const AnalysisSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  summary: String,
  meaning: String,
  poeticDevices: [String],
  themes: [String],
  emotionalTone: String,
  historicalContext: String,
  wordAnalysis: mongoose.Schema.Types.Mixed,
  interpretation: String,
  englishTranslation: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  tags: [String],
});

export const Analysis =
  mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema);
