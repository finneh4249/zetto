# Zetto Adaptive Context System

## What This Is

Zetto's Adaptive Context System personalizes training sessions by threading the learner's real interests, plans, and cultural context into the language they're practicing. Instead of generic textbook scenarios, vocabulary and roleplay are anchored to things the learner actually cares about.

This is opt-in. Always. Zetto never silently profiles a user. The system requires explicit consent before activating, and inferred interests require confirmation before being used.

## Why It Matters

Second language acquisition research is clear: contextually relevant input is processed more deeply and retained longer than generic material. Learning 予選 (yosen: qualifying) in the context of "Piastri took pole at Albert Park" sticks harder than learning it from a textbook sentence, because the learner already has an emotional and cognitive framework for the content. The vocabulary isn't floating in a vacuum; it's bolted onto something they already understand and care about.

This also solves a motivation problem. The gap between "I should study Japanese" and "I want to open the app" is where most learners drop off. If Zetto is the place where you find out the F1 results *and* learn Japanese at the same time, the pull is stronger.

## How Zetto Learns About You

### Explicit Interests (all tiers)

During onboarding or at any point in a session, the learner can tell Zetto what they're into. This goes into the user's Interest Profile.

**Onboarding integration:**
After the stealth placement test, Zetto asks one casual follow-up:

> "By the way, what are you into outside of Japanese? Could be anything: sports, cooking, music, tech, whatever. I'll try to work it into our sessions so you're learning words you'll actually use."

This is optional. The learner can skip it. If they answer, Zetto stores the stated interests as explicit entries. No confirmation needed; they told you directly.

**In-session declaration:**
At any point, a learner can say "I'm really into Formula 1" or "I'm going to Osaka next month." Zetto picks this up, confirms it ("Cool, want me to work F1 into our practice?"), and adds it to the profile.

### Inferred Interests (all tiers, requires confirmation)

Zetto pays attention to topics the learner brings up organically. If someone keeps steering roleplay conversations toward food, or asks what a word means in the context of anime, Zetto notices.

**Inference rules:**
- A topic must come up naturally in **3+ separate sessions** before Zetto infers an interest.
- Zetto never silently acts on an inference. It always confirms:
  > "I've noticed you bring up cooking a lot. Want me to focus some vocabulary on food and kitchen stuff?"
- If the learner says no, the inference is discarded and Zetto won't ask again about that topic for at least 30 days.
- If the learner says yes, it's promoted to an explicit interest.

**What Zetto never infers:**
- Political views or affiliations
- Religious beliefs
- Health conditions or medical topics
- Relationship status or family details (unless explicitly shared)
- Financial situation
- Anything that could be sensitive if wrong

These categories can only enter the profile through explicit declaration, never inference.

## Interest Profile Structure

```json
{
  "interests": [
    {
      "topic": "formula_1",
      "source": "explicit",
      "added": "2026-03-15",
      "subtopics": ["Australian GP", "Oscar Piastri", "race strategy"],
      "vocab_generated": 47,
      "last_used_in_session": "2026-03-20"
    },
    {
      "topic": "cooking",
      "source": "inferred_confirmed",
      "added": "2026-03-18",
      "subtopics": ["Japanese home cooking", "ramen"],
      "vocab_generated": 23,
      "last_used_in_session": "2026-03-19"
    }
  ],
  "personal_context": {
    "trip_planned": {
      "destination": "Osaka",
      "dates": "2026-05-10 to 2026-05-20",
      "source": "explicit"
    },
    "job": "software developer",
    "neighborhood_interest": "Kayabacho, Tokyo"
  },
  "declined_inferences": [
    { "topic": "anime", "declined": "2026-03-16", "cooldown_until": "2026-04-15" }
  ]
}
```

## Content Tiers

This is where tiering comes in. The personalization *feature* is available to everyone. The *depth and freshness* of contextual content scales by tier.

### Free Tier: Static Context Bank

**What it gets:** Personalized topic selection from a pre-built content library. If you say you like F1, Zetto pulls from a bank of F1-related vocabulary, scenarios, and cultural context that's been pre-generated and stored.

**What it doesn't get:** Real-time current events. Free-tier Zetto won't know who won last weekend's race. It will know F1 vocabulary, team names, circuit terminology, and can run roleplay scenarios about watching a race or explaining strategy, but the content isn't live.

**Why:** The static bank costs nothing per session. It's pre-generated, stored in the database, and injected into the system prompt as text. No additional API calls, no web grounding, no content pipeline.

**How it feels:** "Zetto knows I like F1 and teaches me racing vocabulary." Still personalized, still relevant, still better than generic content.

### Plus Tier: Refreshed Context

**What it gets:** Everything in Free, plus the content bank is refreshed weekly with recent events and developments. Zetto knows the broad strokes of what happened this week in topics you care about.

**How:** A weekly batch job fetches recent content for each topic in active user profiles, summarizes it, generates vocabulary lists and scenario prompts, and stores them. Cost is amortized across all Plus users with that interest.

**How it feels:** "Zetto mentioned the race last weekend and taught me how to say 'pit stop strategy' in Japanese." Content is recent but not live.

### Pro Tier: Live Context

**What it gets:** Everything in Plus, plus real-time web-grounded content. Zetto can reference things that happened today. If there was a Grand Prix this morning, Zetto knows who won and can build the session around discussing it.

**How:** Web-grounded Gemini calls at session start, fetching current content for the user's interest profile. This adds ~$0.01-0.03 per session in grounding costs.

**How it feels:** "Zetto brought up Piastri's podium from this morning and we spent the session talking about it in Japanese." The tutor feels genuinely aware of your world.

### Why This Isn't Feature-Gating

The feature (personalized context based on your interests) is available at every tier. What scales is the freshness of the content:

| Tier | Personalization | Content Freshness |
|------|----------------|-------------------|
| Free | Full interest profile, topic selection | Static bank (evergreen content) |
| Plus | Full interest profile, topic selection | Weekly refresh |
| Pro | Full interest profile, topic selection | Live / same-day |

A free user who says "I like F1" gets F1 vocabulary and scenarios. A Pro user who says "I like F1" gets F1 vocabulary and scenarios *about what happened today*. The training is personalized at both tiers. The Pro user just gets a more current version.

This preserves the no-paywall rule: no feature is locked. The underlying capability (interest profiling, personalized topic injection, confirmed inference) works identically across tiers. Content freshness is a capacity/cost lever, same as voice minutes.

## Context Categories

### 1. Personal Context
- Trip plans (destination, dates, activities)
- Job/profession (for business Japanese vocabulary)
- Neighborhood interest (for location-specific scenarios)
- Living situation (moving to Japan vs visiting vs remote interest)

**How Zetto uses it:** "You're going to Osaka in May. Let's make sure you can navigate Namba station and order at a kushikatsu place."

### 2. Cultural Interests
- Anime / manga (specific series if mentioned)
- Japanese music
- Food and cooking
- Traditional culture (tea ceremony, festivals, martial arts)
- Gaming

**How Zetto uses it:** Vocabulary is drawn from the domain. Roleplay scenarios are set in relevant contexts. "You're at Comiket. The booth you want is sold out. Ask the staff if they're restocking."

### 3. Sports and Current Events
- F1, football, baseball, tennis, etc.
- Tech news
- General current events (filtered for safety)

**How Zetto uses it:** "ペレスが予選で落ちたのを見た？ What do you think happened?" (At Run/Fly stages, this becomes a genuine discussion prompt in Japanese.)

### 4. Japanese Culture
- Festivals and holidays (upcoming ones prioritized)
- Social customs and etiquette
- Regional differences
- Seasonal content (cherry blossom season, obon, new year)

**How Zetto uses it:** Always-on at all tiers. This isn't personalization; it's core cultural competency training. Zetto naturally mentions upcoming festivals, seasonal vocabulary, and cultural context. "It's almost obon. Do you know what that is? Let's talk about it."

## Privacy and Data Guardrails

### Storage
- Interest profiles are stored in the user's account data (Cloudflare KV or Supabase).
- Interest data is never shared with third parties.
- Interest data is never used for ad targeting (even on the free tier, ads are generic interstitials, not interest-targeted).

### User Control
- Users can view their full interest profile at any time.
- Users can delete individual interests or clear the entire profile.
- Users can disable the Adaptive Context System entirely. Sessions revert to generic content.
- Users can disable inference specifically while keeping explicit interests active.

### Data Minimization
- Only topic-level interests are stored, not conversation transcripts.
- Subtopics are generated from interests, not extracted from conversation logs.
- No audio recordings are stored beyond the active session.
- The interest profile is lightweight metadata, not a behavioral dossier.

### Opt-In Flow
On first encounter (either during onboarding or when Zetto first detects an opportunity to personalize), the user sees:

> "I can personalize your sessions based on your interests, like sports, food, travel plans, or whatever you're into. I'll only use what you tell me or confirm. You can turn this off anytime. Want to try it?"

If they say no, Adaptive Context stays off. Zetto trains generically. The option to enable it later is available in settings. No nag screens, no "are you sure?" prompts, no periodic re-asks.

## Integration with Existing Systems

### System Prompt Injection
The user's active interests are injected into the session system prompt as a compact JSON block:

```
{{USER_INTERESTS}}  — JSON array of active interests with recency
{{PERSONAL_CONTEXT}} — trip plans, job, location context
{{CONTENT_BANK}}     — pre-fetched relevant content for this session's topics
```

The system prompt instructions tell Zetto how to use this data:
- Work interests into conversation naturally, don't force them.
- At Crawl stage, use interests for vocabulary selection (teach F1 words alongside survival words).
- At Walk+, use interests to shape roleplay scenarios.
- At Run/Fly, use interests as genuine discussion topics in Japanese.
- Never bring up the same interest in back-to-back sessions unless the learner initiates it. Rotate.

### Spaced Production Pipeline Integration
Interest-derived vocabulary feeds into the same Cloze → Semantic → Roleplay pipeline as all other tokens. The only difference is where the words come from. Instead of a generic frequency list, they're pulled from the learner's interest domains. The struggle counts, latency tracking, and tier progression work identically.

### Weekly Audit Integration
The weekly coaching audit includes a brief interest check:
- "Are you still into [topic]? Want to keep it in rotation?"
- "You haven't used [topic] context in 3 weeks. Should I drop it?"
- Surface which interest-derived vocabulary is sticking vs struggling.
