# Zetto

Zetto is a low-latency voice-first Japanese language acquisition engine. It abandons passive gamification and translates Second Language Acquisition principles into a real-time conversational interface.

## The Core Problem

Legacy language apps rely on cognitive offloading. You tap translated bubbles and build a false sense of fluency. When you need to ask for train directions or navigate a city under pressure, passive recognition fails. You need spontaneous active recall.

## The Solution

Zetto operates entirely on voice using the Gemini Live API. It tracks your retrieval latency, forces spaced production, and applies dynamic scaffolding. It is built to keep you in the Zone of Proximal Development.

## Technical Stack

 * **Framework:** Expo (React Native) — single codebase targeting iOS, Android, and Web
 * **Navigation:** Expo Router (file-based, App-Router style)
 * **Styling:** NativeWind v4 (Tailwind CSS for React Native)
 * **AI Engine:** Gemini 2.5 Flash (Native Audio) via WebSockets
 * **State Management:** TanStack Query v5
 * **Audio:** expo-av for microphone capture
 * **Database:** Cloudflare KV (or Supabase) for user Skill Map persistence

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
 * Run `npm install`.
 * Configure your `.env.local` with your Google GenAI API key and database credentials.
 * Run `npm start` to open the Expo dev server.
 * Press `w` for web, `a` for Android emulator, `i` for iOS simulator.

## Deployment

### GitHub Pages (automatic, recommended)

1. Push to the `main` branch — the [deploy workflow](.github/workflows/deploy.yml) will build the static web bundle and publish it automatically.
2. In your repository **Settings → Pages**, set the source to **GitHub Actions**.
3. Your live URL will be `https://<your-github-username>.github.io/zetto`.

> The `experiments.baseUrl` in `app.json` is already set to `/zetto` to match the GitHub Pages subdirectory.

### Netlify (zero-config)

1. Connect the repository in the [Netlify dashboard](https://app.netlify.com).
2. Netlify auto-detects the `netlify.toml` — no extra configuration needed.
3. Build command: `npm run build:web` — publish directory: `dist`.

### Vercel (zero-config)

1. Import the repository in the [Vercel dashboard](https://vercel.com/new).
2. Vercel reads `vercel.json` automatically — no extra configuration needed.
3. Build command: `npm run build:web` — output directory: `dist`.

> **Note:** For Netlify and Vercel deployments the app is served from the root (`/`), so remove the `experiments.baseUrl` key from `app.json` before deploying to those platforms.

### Manual / self-hosted

```bash
npm run build:web   # outputs a static bundle to dist/
npx serve dist      # preview locally on http://localhost:3000
```

Copy the `dist/` directory to any static host (S3, Cloudflare Pages, Firebase Hosting, etc.).
