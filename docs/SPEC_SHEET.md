Project Zetto: Technical & Pedagogical Specification
Objective: A low-latency, voice-first Japanese language acquisition engine. Zetto abandons passive gamification in favour of dynamic scaffolding, acoustic telemetry, and forced spaced production to achieve functional fluency.
1. System Architecture & Infrastructure
 * Frontend: Next.js 15 (App Router) combined with Tailwind CSS for a high-speed, minimalist interface.
 * AI Engine: gemini-2.5-flash-native-audio accessed via WebSockets (WSS). This is mandatory to achieve the sub-second latency required for natural conversation and hesitation tracking.
 * State Management: TanStack Query for handling client-side caching of the active session.
 * Database: Cloudflare KV or Supabase. Requires low-latency read/writes to constantly update the user's "Skill Map" (vocabulary token mastery counts and grammar failure rates).
2. Core SLA (Second Language Acquisition) Engines
 * Spaced Production Pipeline: Vocabulary is tracked via active generation, not passive reading. Tokens move through three difficulty tiers:
   * Stage 1 (Max Scaffold): Cloze exercises (e.g., "The ticket office is the Kippu u___.").
   * Stage 2 (Medium Scaffold): Semantic prompts (e.g., "Where do you buy the N'EX pass?").
   * Stage 3 (Zero Scaffold): Open-ended contextual roleplay forcing spontaneous recall.
 * Acoustic Telemetry: The system measures "Retrieval Latency" (the millisecond gap between the AI prompt and the user response).
   * Fast response (<2s): Flags token as mastered, escalates complexity.
   * Delayed response (>4s): Triggers deliberate wait time, then provides a micro-hint without breaking character.
 * Socratic Error-Discovery: To lower the Affective Filter and test true comprehension, the AI intentionally injects grammatical errors or false cognates into its speech 5% of the time, challenging the user to catch and correct the AI.
3. UI/UX: The "No-Glaze" Interface
 * Topic Priming: Every interaction begins with a bold, English UI header (e.g., [TOPIC: TRANSIT TICKETS]) appearing one second before the audio plays to prime the user's working memory.
 * Single-Task Display: The screen displays only the current active sentence. Previous dialogue is collapsed into an accessible log.
 * Furigana Decay Logic: Hiragana brackets render only on the first instance of a Kanji in a session. Subsequent instances strip the brackets to force active reading.
 * JIT (Just-In-Time) Safety Net: Users can tap any word in the active transcript for an instant English translation. This action pings the database to increment the "Struggle Count" for that token, ensuring it reappears in future scaffolding.
4. The Metacognitive Loop (Weekly Audit)
 * Sunday Calibration: A weekly, 3-minute voice interaction where the AI shifts to a coaching persona.
 * Subjective Override: The system asks for an effort rating (e.g., "On a scale of 1-10, how taxing was the Te-form practice?"). The algorithm adjusts the upcoming week's ratio of new N4 concepts versus familiar N5 concepts based on this subjective feedback.
