# Urdu Literary Companion 📚

An AI-powered literary companion that decodes Urdu poetry and prose with deep analytical insights.

## Features ✨

- **Urdu Text Analysis**: Paste any Urdu poetry, couplet, or prose for comprehensive AI analysis
- **Poetic Devices Recognition**: Identifies metaphors, similes, alliteration, personification, and more
- **Meaning Extraction**: Decodes literal and figurative meanings
- **Theme Identification**: Explores main themes in the text
- **Word Analysis**: Breaks down key words and their significance
- **Historical Context**: Provides cultural and historical background
- **English Translation**: Offers poetic translations
- **Emotional Tone**: Analyzes the mood and emotional resonance

## Tech Stack 🛠️

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **AI**: OpenAI GPT-4
- **HTTP Client**: Axios

## Installation 🚀

1. Clone the repository:

```bash
git clone <repository-url>
cd vantage
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Get your OpenAI API key from: https://platform.openai.com/api-keys

## Running the Application 🎯

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure 📁

```
src/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts         # AI analysis API endpoint
│   ├── page.tsx                 # Main page component
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── TextInput.tsx            # Text input component with samples
│   └── AnalysisResult.tsx       # Analysis results display component
```

## How It Works 🔍

1. **Enter Text**: Users paste Urdu poetry or prose into the text area
2. **AI Processing**: The text is sent to OpenAI's GPT-4 model
3. **Analysis**: The model performs comprehensive literary analysis
4. **Display Results**: Results are parsed and displayed in an organized format

## Analysis Components 📖

Each analysis includes:

- **Summary**: Overview of the text
- **Meaning**: Literal and figurative interpretations
- **Poetic Devices**: Literary techniques used
- **Themes**: Main themes explored
- **Emotional Tone**: Mood and emotional resonance
- **Historical Context**: Cultural and historical background
- **Word Analysis**: Significance of key words
- **Deep Interpretation**: Literary significance
- **English Translation**: Poetic translation (when applicable)

## Sample Texts 📝

The application comes with sample Urdu texts for testing:

- "میری سانسیں اتنی رفتار سے چل رہی ہیں"
- "تمہاری یادیں میرے دل میں رہتی ہیں"
- "رات بھر جاگا ہوں تمہاری سوچ میں"

## API Endpoints 🔌

### POST /api/analyze

Analyzes Urdu text and returns comprehensive literary analysis.

**Request:**

```json
{
  "text": "Urdu text to analyze"
}
```

**Response:**

```json
{
  "analysis": {
    "summary": "...",
    "meaning": "...",
    "poeticDevices": ["..."],
    "themes": ["..."],
    "emotionalTone": "...",
    "historicalContext": "...",
    "wordAnalysis": {...},
    "interpretation": "...",
    "englishTranslation": "..."
  }
}
```

## Dark Mode Support 🌙

The application includes full dark mode support using Tailwind CSS's dark mode utilities.

## Responsive Design 📱

- Mobile-first design
- Responsive grid layout
- Works seamlessly on desktop, tablet, and mobile devices

## Error Handling ⚠️

- Input validation
- API error handling
- User-friendly error messages
- Loading states

## Performance Optimizations ⚡

- Server-side rendering with Next.js
- Static page generation where possible
- Optimized bundle size
- CSS-in-JS optimization via Tailwind

## Future Enhancements 🚀

- Multi-language support
- Audio pronunciation guide
- Comparison of multiple texts
- User accounts and saved analyses
- Community comments and discussions
- Advanced search and filtering
- Export analyses to PDF
- Integration with Urdu poetry databases

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

MIT License - See LICENSE file for details

## Contact 📧

For questions or suggestions, please reach out through the repository.

---

**Made with ❤️ for Urdu literature enthusiasts**
