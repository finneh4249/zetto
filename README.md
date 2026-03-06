# Zetto

Zetto is a low-latency voice-first Japanese language acquisition engine. It abandons passive gamification and translates Second Language Acquisition principles into a real-time conversational interface.

## The Core Problem

Legacy language apps rely on cognitive offloading. You tap translated bubbles and build a false sense of fluency. When you need to ask for train directions or navigate a city under pressure, passive recognition fails. You need spontaneous active recall.

## The Solution

Zetto operates entirely on voice using the Gemini Live API. It tracks your retrieval latency, forces spaced production, and applies dynamic scaffolding. It is built to keep you in the Zone of Proximal Development.

## Technical Stack

 * Frontend: Next.js 15 (App Router)
 * Styling: Tailwind CSS
 * AI Engine: Gemini 2.5 Flash (Native Audio) via WebSockets
 * State Management: TanStack Query
 * Database: Cloudflare KV (or Supabase) for user Skill Map persistence

## Key Features

### Acoustic Telemetry

The system measures the exact millisecond gap between the AI prompt and your response. Fast responses escalate grammar complexity. Delayed responses trigger deliberate wait time and micro-hints without breaking conversational character.

### Spaced Production Pipeline

Vocabulary is tracked via active generation. Tokens progress through three strict tiers:
 * Cloze exercises.
 * Semantic prompting.
 * Open-ended contextual roleplay.

### Focus-Optimised Interface

The UI prevents cognitive overload and maintains task initiation momentum.
 * Single-Task Display: The screen shows only the current active sentence.
 * Topic Priming: A clear English header appears before audio plays to prime working memory.
 * Furigana Decay: Hiragana brackets render only on the first instance of a Kanji per session.
 * Just-In-Time Translation: Tap any word in the transcript for an instant English translation. This increments the internal Struggle Count for that token and feeds it back into the Spaced Production Pipeline.
   
### Socratic Error-Discovery
The AI intentionally injects grammatical errors or false cognates into its speech 5% of the time. This challenges you to catch and correct the AI, forcing rigorous metacognitive error-monitoring.

### Metacognitive Weekly Audit

A weekly calibration session shifts the AI into a coaching persona. You provide an effort rating on the previous week. The algorithm adjusts the ratio of new versus familiar concepts to keep the cognitive load slightly uncomfortable but manageable.

## Local Setup
 * Clone the repository.
 * Run npm install.
 * Configure your .env.local with your Google GenAI API key and database credentials.
 * Run npm run dev to start the development server.
