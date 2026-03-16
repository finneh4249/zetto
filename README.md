# Zetto

Zetto teaches you to read, write, and speak Japanese. Actually teaches you. Not "gamifies the feeling of learning" or "helps you recognize vocabulary in a multiple choice quiz." You put in the time, you come out the other side able to read a sign, order a meal, hold a conversation, and write a message in Japanese.

Everything below (the voice engine, the progression stages, the kanji system, the latency tracking) is how. The promise is simple: from your first すみません to spontaneous conversation at an izakaya.

## The Problem

Legacy language apps rely on cognitive offloading. You tap matching tiles and build a sense of progress that collapses the moment you need to ask for train directions under pressure. Passive recognition is not fluency. Spontaneous active recall is.

## How Zetto Works

Zetto is built on two pillars of language acquisition research: **comprehensible input** and **pushed output**.

**Comprehensible input** means everything Zetto says to you is calibrated to be just slightly above your current level. Not at your level (too easy, nothing acquired). Not two levels above (incomprehensible, nothing acquired). One notch above. You acquire new grammar and vocabulary by hearing it used naturally in context you can mostly understand. Zetto's speech *is* the immersion environment, tuned to your exact level and adjusted in real time.

**Pushed output** means you don't just listen. You produce. Out loud. Under time pressure. Zetto measures the exact millisecond gap between its prompt and your spoken response. Fast responses escalate complexity. Delayed responses trigger micro-hints without breaking conversational character. Your retrieval latency is the primary signal that drives everything.

There is no curriculum. The system adapts to what your production data says you need, not a predetermined syllabus. The balance between input and output shifts as you advance: early stages are more listening, later stages are more speaking, and by Fly stage you're carrying the conversation while Zetto provides the fine-tuning signal.

Vocabulary is tracked via active generation, not passive recognition. Every token progresses through three production tiers:

1. **Cloze exercises** — fill the gap in a structured sentence.
2. **Semantic prompting** — produce the word from a contextual hint.
3. **Open-ended roleplay** — use it naturally in conversation.

These tiers cycle within every stage of the progression framework below.

## Progression: Crawl, Walk, Run, Fly

Zetto doesn't have a curriculum. There's no "Week 3: te-form" schedule that every learner follows in lockstep. A curriculum assumes everyone starts at the same place, learns at the same rate, and struggles with the same things. None of that is true.

Instead, Zetto has four stages that describe where you are based on your production data. The stages shape how the AI coaches you (how it corrects, how much Japanese it speaks, how much it scaffolds), but what you practice within a stage is driven by your actual performance, not a predetermined syllabus.

If your counters are weak, Zetto hits counters harder. If your te-form is solid, it moves on. Two learners at the same stage can be working on completely different grammar and vocabulary on the same day. The system adapts to the learner, not the other way around.

These are loose analogues to established frameworks, not strict mappings. CEFR and JLPT measure receptive knowledge and test performance. Zetto measures productive fluency under time pressure. Different things, but the rough correspondence helps orient you:

| Stage | CEFR | JLPT | What it feels like |
|-------|------|------|--------------------|
| Crawl | A1 | N5 | You can survive a polite interaction |
| Walk | A2–B1 | N4 | You can get through a day without English |
| Run | B1–B2 | N3 | You can hold a real conversation |
| Fly | B2+ | N2+ | You sound like yourself, not a textbook |

### Crawl (Foundations)

You're building the floor. Hiragana and katakana recognition, core survival phrases, basic particles, counting. The AI corrects immediately and asks you to repeat the right form. No ambiguity at this stage.

**Milestone:** You can read a menu, greet someone, and count to 100 without hesitation.

**Error handling:** Direct correction. "Close! It's みっつ, not みつ. The っ matters. Say it again."

### Walk (Survival)

You can get through a day in Tokyo without English. Ordering food, asking directions, telling time, basic て-form, transactional exchanges. The AI starts letting you self-correct before nudging.

**Milestone:** You can navigate a train station, order at a restaurant, and check into a hotel using only Japanese.

**Error handling:** Pause and nudge. "Hmm... listen to what you just said. Anything feel off?"

### Run (Conversational)

Compound sentences, casual vs polite register switching, expressing opinions, handling unexpected questions. The AI stays in character and weaves corrections into the conversation naturally.

**Milestone:** You can hold a 5-minute conversation at an izakaya, disagree politely, and tell a short story about your day.

**Error handling:** In-character correction. "あ、三つのコーヒーね？" (echoing the correct form without breaking flow)

### Fly (Fluent Improvisation)

Nuance, humor, cultural code-switching, abstract topics, debate. You sound like *you* in Japanese, not a textbook. The AI uses Socratic questioning to make you find and articulate your own errors.

**Milestone:** You can explain why you disagree with someone, make a joke that lands, and navigate a conversation you didn't expect.

**Error handling:** Socratic. "You used て-form there. Walk me through why, because I think you might want a different connector."

## Key Features

### Acoustic Telemetry

The system measures your response latency to the millisecond. This drives all scaffolding decisions: complexity escalation, hint timing, and stage progression.

### Spaced Production Pipeline

Tokens cycle through Cloze → Semantic → Roleplay within your current CWRF stage. Struggle Count tracking feeds failed tokens back into the pipeline at lower tiers.

### Focus-Optimised Interface

The UI prevents cognitive overload and maintains task initiation momentum.

- **Single-Task Display:** The screen shows only the current active sentence.
- **Topic Priming:** A clear English header appears before audio plays to prime working memory.
- **Furigana Decay:** Hiragana brackets render only on the first instance of a kanji per session.
- **Just-In-Time Translation:** Tap any word in the transcript for an instant English translation. This increments the Struggle Count for that token and feeds it back into the pipeline.

### Socratic Error-Discovery

The AI intentionally injects grammatical errors or false cognates into its speech 5% of the time. You're challenged to catch and correct the AI, forcing rigorous metacognitive error-monitoring. (Activated from Walk stage onward.)

### Metacognitive Weekly Audit

A weekly calibration session shifts the AI into a coaching persona. You provide an effort rating on the previous week. The algorithm adjusts the ratio of new vs familiar concepts to keep cognitive load slightly uncomfortable but manageable.

## Personality

Warm but not soft. Zetto sounds like the kind of Japanese teacher who genuinely likes you but won't let you coast. Think a patient tutor at a community center in Koenji, not a corporate language app mascot.

- Encouraging without being performative. No "Great job!" after every sentence. Acknowledgment is earned and specific.
- Genuinely curious. Asks follow-up questions about *you*, not just drilling grammar.
- Dry humor through specificity. "You just ordered three cats instead of three coffees. Let's fix that before you walk into a Doutor."
- Cultural context as seasoning. Brief drops when they're relevant, never lectures.

## Technical Stack

| Component | Technology |
|-----------|-----------|
| Framework | Expo (React Native) — iOS, Android, Web |
| Navigation | Expo Router (file-based) |
| Styling | NativeWind v4 (Tailwind CSS for React Native) |
| AI Engine | Gemini 2.5 Flash (Native Audio) via WebSockets |
| State | TanStack Query v5 |
| Audio | expo-av for microphone capture |
| Database | Cloudflare KV (or Supabase) for Skill Map persistence |

## Local Setup

```bash
git clone <repo-url>
cd zetto
npm install
```

Configure `.env.local` with your Google GenAI API key and database credentials, then:

```bash
npm start
```

Press `w` for web, `a` for Android emulator, `i` for iOS simulator.

## Deployment

### GitHub Pages (automatic)

Push to `main` — the [deploy workflow](.github/workflows/deploy.yml) builds the static web bundle and publishes automatically. Set your repository's **Settings → Pages** source to **GitHub Actions**.

Live URL: `https://<your-github-username>.github.io/zetto`

> The `experiments.baseUrl` in `app.json` is set to `/zetto` for the GitHub Pages subdirectory.

### Netlify

Connect the repository in the [Netlify dashboard](https://app.netlify.com). Netlify auto-detects `netlify.toml`. Build command: `npm run build:web`, publish directory: `dist`.

### Vercel

Import the repository in the [Vercel dashboard](https://vercel.com/new). Vercel reads `vercel.json` automatically. Build command: `npm run build:web`, output directory: `dist`.

> For Netlify and Vercel, remove the `experiments.baseUrl` key from `app.json` (the app serves from root).

### Manual / Self-Hosted

```bash
npm run build:web   # outputs static bundle to dist/
npx serve dist      # preview locally on http://localhost:3000
```

Copy `dist/` to any static host (S3, Cloudflare Pages, Firebase Hosting, etc.).
