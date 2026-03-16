# Zetto Unit Economics & Tier Structure

## API Cost Reality

### Gemini 2.5 Flash Native Audio (Live API) Pricing

| Direction | Token Type | Cost per 1M tokens |
|-----------|-----------|-------------------|
| Input | Text | $0.30 |
| Input | Audio | $1.00 |
| Output | Text + Audio | $2.50 |

Audio streams at **25 tokens per second** (input and output).

### Critical: Live API Session Billing

The Live API charges **per turn for all tokens in the session context window**. This means tokens accumulate. Turn 1 costs X. Turn 2 costs X + Y. Turn 10 costs X + Y + Z + ... everything. Earlier turns get re-billed on every subsequent turn.

This is the cost killer. A 10-minute voice session isn't a flat rate; it's a triangle that grows with every exchange.

### Per-Session Cost Estimate

**Assumptions for a typical Zetto session:**

- Session length: 10 minutes
- User speaks ~40% of the time (4 min = 240s of audio input)
- Zetto speaks ~30% of the time (3 min = 180s of audio output)
- Silence/thinking: ~30%
- Average ~20 conversational turns
- System prompt: ~3,000 text tokens (cached)
- Per-turn text overhead (state injection, token data): ~500 tokens

**Raw token consumption per session:**

Audio input: 240s × 25 TPS = **6,000 tokens**
Audio output: 180s × 25 TPS = **4,500 tokens**
System prompt: ~3,000 tokens (cacheable)
Text overhead: ~500 × 20 turns = **10,000 tokens**

**But with context accumulation across turns:**

The session context window grows per turn. By turn 20, you're re-processing all prior audio and text. Rough estimate for accumulated input billing:

- Turns 1-5: ~15,000 accumulated input tokens
- Turns 6-10: ~45,000 accumulated input tokens
- Turns 11-15: ~90,000 accumulated input tokens
- Turns 16-20: ~150,000 accumulated input tokens

Total billed input tokens across session: **~300,000 tokens** (mix of audio and text)
Total billed output tokens across session: **~50,000 tokens**

**Cost per 10-minute session:**

| Component | Tokens | Rate | Cost |
|-----------|--------|------|------|
| Audio input (accumulated) | ~200,000 | $1.00/1M | $0.20 |
| Text input (accumulated) | ~100,000 | $0.30/1M | $0.03 |
| Audio output | ~30,000 | $2.50/1M | $0.075 |
| Text output | ~20,000 | $2.50/1M | $0.05 |
| **Total** | | | **~$0.35** |

**With context caching on system prompt:**

Cache the ~3,000 token system prompt. Cached reads cost 10% of base input. Saves maybe $0.01-0.02 per session. Worth doing but not transformative.

**Conservative estimate: $0.30–0.50 per 10-minute session.**

Let's use **$0.40** as the working number.

---

## Revenue Model

### Ad Revenue (Free Tier)

Mobile interstitial ads in language learning apps typically generate:

| Ad Type | eCPM (revenue per 1,000 impressions) | Notes |
|---------|--------------------------------------|-------|
| Interstitial (full screen) | $5–15 | Shown between sessions |
| Rewarded video | $10–30 | "Watch ad for 1 more session" |
| Banner (persistent) | $0.50–2 | Low revenue, high annoyance |
| Native in-feed | $2–5 | Between UI elements |

**Strategy: Rewarded video + interstitial only. No banners.**

Banners would violate the brand (disciplined, minimal UI). Rewarded video is the best fit because it aligns incentives: the user *wants* more training time and is willing to watch an ad to get it. That's a much better experience than interrupting a session.

**Ad placement for free tier:**

1. **Pre-session interstitial**: One full-screen ad before each session starts. User sees it, taps to dismiss, session begins. ~$8 eCPM average.
2. **Rewarded video for extra session**: After hitting daily session cap, offer "Watch a short video for 1 more session." ~$15 eCPM average.
3. **Post-session interstitial**: After session ends, before returning to home screen. ~$8 eCPM average.

**Revenue per free user per day (assuming 2 sessions + 1 rewarded):**

- 2 pre-session interstitials: 2 × $0.008 = $0.016
- 2 post-session interstitials: 2 × $0.008 = $0.016
- 1 rewarded video: $0.015
- **Total: ~$0.047/day**

**Cost per free user per day (2 sessions × 10 min):**

- 2 × $0.40 = **$0.80/day**

**The gap: ~$0.75/day per active free user.**

This is the bleed. At 2 full 10-minute sessions per day, ads don't come close to covering API costs. So we need to be aggressive on free tier limits.

---

## Tier Structure (Revised for Sustainability)

### Option A: Aggressive Limits

| | Free | Plus | Pro |
|---|---|---|---|
| Price | $0 (ad-supported) | $7.99/mo | $14.99/mo |
| Session length | 5 min | 15 min | 30 min |
| Sessions/day | 1 | 3 | Unlimited* |
| All features | Yes | Yes | Yes |
| Ads | Yes (interstitial + rewarded) | No | No |
| Weekly audit | Yes | Yes | Yes |
| Offline review | No | Token review only | Full analytics |

*Unlimited = soft cap at 10 sessions/day to prevent abuse. That's 5 hours of voice AI per day, which nobody will hit.

**Free tier cost: 1 session × 5 min = ~$0.20/day**
**Free tier ad revenue: ~$0.03/day** (1 pre + 1 post interstitial + occasional rewarded)
**Free tier bleed: ~$0.17/day per active user**

Still bleeding, but manageable. Key insight: most free users won't be daily active. If average free user trains 3x/week, monthly bleed per user is ~$2.04. At scale (100K free users, 30% weekly active), that's ~$61K/month in API costs for free users.

**Plus tier cost: 3 sessions × 15 min = ~$1.80/day max**
**Plus tier revenue: $7.99/mo = ~$0.27/day**
**Plus tier bleed at max usage: ~$1.53/day**

Plus tier bleeds too at max usage. But most users won't max out every day. If average Plus user does 1.5 sessions/day at 12 min average:
- Cost: ~$0.72/day → $21.60/mo
- Revenue: $7.99/mo
- Still underwater by $13.61/mo at this usage pattern.

**Pro tier cost: 5 avg sessions × 20 min = ~$4.00/day**
**Pro tier revenue: $14.99/mo = ~$0.50/day**
**Pro tier bleed at avg usage: ~$3.50/day**

Pro is also underwater. Voice AI sessions are expensive.

### Option B: Tighter Limits, Higher Prices

| | Free | Plus | Pro |
|---|---|---|---|
| Price | $0 (ad-supported) | $12.99/mo | $24.99/mo |
| Session length | 5 min | 10 min | 20 min |
| Sessions/day | 1 | 3 | 5 |
| Daily voice minutes | 5 min | 30 min | 100 min |
| All features | Yes | Yes | Yes |
| Ads | Yes | No | No |

**Free: 5 min/day = ~$0.20/day, ~$6/mo per active user, ~$2/mo per avg user**
**Plus: 30 min/day max = ~$1.20/day max, ~$36/mo max. Revenue $12.99/mo.**
**Pro: 100 min/day max = ~$4.00/day max, ~$120/mo max. Revenue $24.99/mo.**

Still underwater at max usage on paid tiers. The math is brutal for voice AI.

### Option C: Minutes-Based (Most Honest)

| | Free | Plus | Pro |
|---|---|---|---|
| Price | $0 (ad-supported) | $9.99/mo | $19.99/mo |
| Voice minutes/month | 60 min | 300 min | 900 min |
| Minutes/day (averaged) | ~2 min | ~10 min | ~30 min |
| All features | Yes | Yes | Yes |
| Ads | Interstitial + rewarded | No | No |
| Bonus minutes | Watch rewarded ad = +3 min | N/A | N/A |

**Free: 60 min/mo = ~24 sessions at 2.5 min avg = ~$4.80/mo cost**
Ad revenue at ~$0.03/session = $0.72/mo. Bleed: ~$4.08/mo per active user.

**Plus: 300 min/mo = $0.40/10min × 30 sessions = ~$12/mo cost. Revenue $9.99/mo.**
Close to breakeven if average usage is ~250 min. Slight loss.

**Pro: 900 min/mo = ~$36/mo cost. Revenue $19.99/mo.**
Still underwater by ~$16/mo at full usage.

---

## The Hard Truth

Voice AI sessions are expensive. At $0.30–0.50 per 10-minute session, no ad-supported free tier will break even. Paid tiers can get *close* to breakeven only if:

1. Session limits are tight enough that most users don't max out
2. Prices are high enough ($15-25/mo range)
3. You use context window compression aggressively to reduce accumulated token billing
4. Google continues to drop prices (they have been, historically)

### Cost Reduction Strategies

**1. Context window compression (biggest lever)**
Use sliding window compression. Don't let the full conversation history accumulate. Summarize older turns into compressed context. This could cut accumulated input billing by 50-70%.

Revised cost with compression: **~$0.15–0.25 per 10-minute session.**

**2. Shorter free sessions**
5-minute sessions cost roughly half of 10-minute sessions. The context accumulation curve is less steep with fewer turns.

**3. Text-mode fallback for writing system training**
Kanji radical training, hiragana/katakana recognition, and reading exercises don't need voice. Run these through standard Gemini 2.5 Flash text API at $0.30/1M input, $2.50/1M output. Orders of magnitude cheaper. This could constitute 30-40% of a learner's training time, especially at Crawl stage.

**4. Pre-generated content for Cloze exercises**
Cloze exercises at Crawl/Walk stages are structured enough to be pre-generated in batches. Generate 1,000 exercises offline, serve them from your database, only hit the Live API for semantic and roleplay tiers. Massively reduces API calls for early-stage learners.

**5. Rewarded ads as the primary free tier monetization**
"Watch a 30-second ad for 3 more minutes of training" is the cleanest conversion. The user is motivated (they want to keep going), the ad revenue is high ($15-30 eCPM for rewarded video), and it doesn't interrupt the training flow.

**6. Cache system prompts aggressively**
The ~3,000 token system prompt is identical across sessions. Context caching at 10% of input price is free money.

---

## Competitive Pricing Intelligence

### Tenmin (closest competitor)

Voice-first AI language tutor. 25+ languages. 30K+ users.

| | Free | Pro |
|---|---|---|
| Price (AUD) | $0 | $28.99/mo or $329.99/yr |
| First-load offer | N/A | 53% off: A$165/yr (no free trial) |
| Voice time | 5 min (once) | Unlimited |
| Features | Single taste session | Full access |

Tenmin charges **A$28.99/mo** at full price. That's roughly **US$19/mo**. Their free tier is essentially non-existent: 5 minutes, once, ever. After that it's pay or leave. No ad support, no rewarded video, no ongoing free access. The 53% first-load discount is a hard paywall conversion tactic.

### Pingo AI (YC-backed, fastest growing)

AI conversation practice. 25+ languages. 3M+ users. **$200K MRR** as of mid-2025. Google Play Best of 2025 winner.

| | Free Trial | Unlimited |
|---|---|---|
| Price (USD) | $0 (limited) | $14.99/mo or $99.99/yr (45% off $179.99) |
| Features | Sample lessons only | 200+ scenarios, custom conversations, full analytics |

Pingo is essentially a hard paywall after a brief trial. $14.99/mo, $99.99/yr. No ongoing free tier. No writing system training. No progressive overload system. Recent reviews flag that their speech recognition is too lenient (accepts nonsense syllables) and content is shallow beyond beginner level.

### Pricing Implications for Zetto

Both competitors charge $15-29/mo with minimal or no free tier. Zetto's advantage is threefold:

1. **Genuine free tier** (ad-supported, limited but real) is a massive differentiation in a market where "free" means "one taste then paywall."
2. **Japanese-only focus** means deeper content per dollar than multi-language apps spreading thin.
3. **Writing systems + progressive overload** are features neither competitor offers.

Zetto can price at or slightly below Pingo ($12.99-14.99 USD/mo) and still be competitive, because the free tier does acquisition work that Tenmin and Pingo have to pay for through marketing.

---

## The No Hard Paywall Rule

This is non-negotiable product policy, not a marketing position.

**Zetto will never require payment to use any feature.** Every feature ships to every user. Free users get the same AI tutor, the same CWRF stages, the same writing systems, the same acoustic telemetry, the same weekly audits as paying users. No exceptions. No "premium-only" labels. No greyed-out buttons with lock icons.

**What paid tiers buy is capacity, not capability:**
- More voice minutes per day
- Longer individual sessions
- More sessions per day
- No ads
- Deeper analytics views

**What paid tiers also get is priority:**
- New features ship to Pro first, Plus second, Free third
- The gap is days to weeks, not months. Nobody's waiting a quarter for a feature they can see others using.
- This rewards paying users without punishing free users. It's "early access," not "exclusive access."

**The levers Zetto will use to manage costs:**
1. Adjust free tier limits (daily voice minutes, session count, session length)
2. Adjust pricing on paid tiers
3. Adjust ad frequency/format on free tier

**The levers Zetto will never pull:**
1. Feature-gate anything behind a paywall
2. Require payment to continue using the app
3. Degrade the free experience to force conversion
4. Show a paywall screen that blocks the user from proceeding
5. Remove features from the free tier that were previously available

If the economics get tight, the response is to tighten limits or raise prices, not to wall off functionality. A free user with 5 minutes of daily voice time and the full feature set is infinitely more valuable (as a potential convert, as word-of-mouth, as a human being learning a language) than a frustrated user staring at a paywall screen.

---

## Recommended Tier Structure

Factoring in compression, text-mode fallback, pre-generated content, and competitive positioning:

**Effective cost per 10 min of training: ~$0.15–0.20** (blended across voice and text modes)

**Prices in USD. AUD prices set at ~1.55x conversion + rounding.**

| | Free | Plus | Pro |
|---|---|---|---|
| **Price (USD)** | $0 (ad-supported) | **$9.99/mo** | **$14.99/mo** |
| **Price (AUD)** | $0 (ad-supported) | **$15.99/mo** | **$24.99/mo** |
| **Annual (USD)** | N/A | **$79.99/yr** (~33% off) | **$119.99/yr** (~33% off) |
| **Annual (AUD)** | N/A | **$124.99/yr** | **$189.99/yr** |
| **Voice minutes/day** | 10 min | 30 min | 90 min |
| **Voice sessions/day** | 2 | 5 | Unlimited* |
| **Session length** | 5 min | 15 min | 30 min |
| **Text/writing practice** | Unlimited | Unlimited | Unlimited |
| **All CWRF stages** | Yes | Yes | Yes |
| **All writing systems** | Yes | Yes | Yes |
| **Ads** | Interstitial + rewarded | None | None |
| **Rewarded ad bonus** | +5 min per ad (max 2/day) | N/A | N/A |
| **Weekly audit** | Yes | Yes | Yes |
| **Performance analytics** | Basic (current stage + streak) | Detailed (latency trends, token progress) | Advanced + export |

*Unlimited = fair use cap at 120 min/day.

### Why This Pricing Works

**Free tier is real.** 10 voice minutes/day + unlimited writing practice is enough to make genuine progress. That's 2 sessions × 5 min. With rewarded ads, up to 20 min/day. Compare to Tenmin (5 min, once, ever) and Pingo (brief trial then paywall). Zetto's free tier is the most generous in the category by a wide margin.

**Plus at $9.99/mo undercuts Pingo by $5/mo** while offering more (writing systems, progressive overload, acoustic telemetry). This is the "I'm serious about learning" tier.

**Pro at $14.99/mo matches Pingo's price** but with 90 min/day voice (nobody will hit this consistently) plus the full analytics suite. Annual at $119.99 (~$10/mo) undercuts Pingo's annual ($99.99) by providing a Japanese-specialist tool vs Pingo's shallow multi-language approach.

**The annual discount is 33%**, not 45-53% like competitors. Steep launch discounts train users to wait for sales. A moderate, consistent discount builds trust.

### Breakeven Analysis (with optimizations)

**Free tier:**
- 10 min voice/day × 30 days = 300 min/mo max (but avg user does ~3 sessions/week)
- Realistic: ~60 min voice/mo at $0.02/min = **$1.20/mo cost**
- Ad revenue (4 ads/day × ~12 active days/mo × $0.01 avg) = **~$0.48/mo**
- **Bleed: ~$0.72/mo per active free user**
- At 100K free users (30% WAU): ~$21.6K/mo API cost.

**Plus tier:**
- Avg 150 min/mo (half of max) at $0.02/min = **$3/mo cost**
- Revenue: **$9.99/mo**
- **Margin: ~$7/mo per Plus user.** Profitable.

**Pro tier:**
- Avg 400 min/mo at $0.02/min = **$8/mo cost**
- Revenue: **$14.99/mo**
- **Margin: ~$7/mo per Pro user.** Profitable.

### Path to Breakeven

Per 100K free users (assuming 5% Plus, 2% Pro conversion):

| Segment | Users | Monthly Revenue | Monthly Cost | Net |
|---------|-------|----------------|-------------|-----|
| Free (30% active) | 30,000 active | $14,400 (ads) | $21,600 | -$7,200 |
| Plus | 5,000 | $49,950 | $15,000 | +$34,950 |
| Pro | 2,000 | $29,980 | $16,000 | +$13,980 |
| **Total** | | **$94,330** | **$52,600** | **+$41,730** |

Healthy margin at 7% conversion. Breakeven occurs at roughly **2.5% overall paid conversion**, well within industry norms (2-5%).

The free tier bleed ($7.2K/mo on 100K users) is effectively a customer acquisition cost of **$0.24/user/month** for active free users. Paid UA (App Store ads, social) typically costs $2-10 per install. The free tier is 10x cheaper as an acquisition channel, and the users it acquires are pre-qualified (they've already used the product and liked it enough to keep coming back).
