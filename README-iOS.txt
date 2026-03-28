================================================================================
  THAT AI GUY — iOS App
  An AI-powered pedantry engine for iPhone
================================================================================

  Live at:     https://www.that-ai-guy.app
  Status:      US Patent Application Pending
  Platform:    iOS (iPhone)
  Repo:        Private (mhavelock/that-ai-guy)
  Started:     10 March 2026
  Launch-ready: 28 March 2026

--------------------------------------------------------------------------------
  WHAT IS IT?
--------------------------------------------------------------------------------

That AI Guy is an iOS app that listens to live conversation through the iPhone
microphone and interrupts with corrections whenever it detects inaccuracies,
grammar errors, logical flaws, or factual slips.

Think Shazam — but instead of identifying music, it identifies nonsense.

The app processes audio in real time, transcribes it on-device, runs it through
a large language model, and when something pedant-worthy surfaces, it cuts in
with a spoken correction and displays a glass correction card on screen. The
whole thing happens in a few seconds. It feels intrusive in exactly the right
way.

There is also a Roast mode, which takes a victim's name and keywords and
delivers a relentless timer-based barrage of personalised put-downs.

--------------------------------------------------------------------------------
  CORE FEATURES
--------------------------------------------------------------------------------

  Listening Pipeline
  ------------------
  - Continuous mic capture in 3-second chunks
  - On-device speech transcription via expo-speech-transcriber
    (SFSpeechRecognizer on iOS 25 and below, SpeechAnalyzer on iOS 26+)
  - Real-time LLM analysis for corrections (Anthropic Claude Haiku or
    Google Gemini Flash)
  - TTS output via expo-speech (native iOS voices)
  - Mic pauses during TTS playback to prevent feedback; resumes cleanly after

  Pedantry Engine
  ---------------
  - 5 pedantry levels: 1 = major factual errors only, 5 = everything
  - 5 toggleable correction packs: Grammar, Usage, Factual, Logic, Jargon
  - System prompt built dynamically at call time from level + active packs
  - Interruption phrases validated against a static whitelist before TTS fires
    (LLM cannot inject arbitrary text into speech output)

  AI Provider Options
  -------------------
  - Relay mode: free tier via the app's own Cloudflare Worker + OpenRouter
    (no API key required — users can start immediately)
  - BYOK mode: bring your own Anthropic or Google AI Studio key
    (stored in iOS Secure Enclave via expo-secure-store, never leaves device
    except in direct API call headers)

  Roast Mode
  ----------
  - User enters a victim's name + up to 10 personalised keywords
  - Timer fires every ~1.2 seconds with a new targeted put-down
  - Flame background animation reacts to roast activity

  Correction History
  ------------------
  - All corrections logged as swipeable glass flashcards in a horizontal stack
  - Each card shows the interruption phrase, the correction text, and the
    pedantry category

  UI / UX
  -------
  - Liquid Glass design language (iOS 26 aesthetic, implemented with expo-blur)
  - 5-ring audio visualiser around the listen button, driven by live mic level
  - Perspective wave grid background, audio-reactive (amplitude + speed + opacity)
  - Floating speech bubbles drift upward during listening wait state
  - Spring animations throughout — glass correction card springs up from the
    history deck, settings panel slides up from below
  - Custom fonts: Omnes Bold + Open Sans

--------------------------------------------------------------------------------
  TECHNICAL OVERVIEW
--------------------------------------------------------------------------------

  Stack
  -----
  Framework:    React Native + Expo SDK 54
  Language:     TypeScript
  State:        Zustand (no middleware; settings persisted via SecureStore)
  AI Backend:   Anthropic Claude Haiku / Google Gemini Flash (direct XHR)
  Audio:        expo-audio (mic capture), expo-speech-transcriber (on-device STT)
  TTS:          expo-speech (native iOS voices)
  HTTP:         XMLHttpRequest (not fetch — avoids React Native blob errors)
  Fonts:        expo-font (Omnes Bold + Open Sans)
  Navigation:   None — single screen with BottomNav tab switching
  Styling:      React Native StyleSheet (no Tailwind; RN constraints)

  Infrastructure
  --------------
  Relay:        Cloudflare Worker at api.that-ai-guy.app
                GET /config — returns provider config + kill switch state
                POST /relay — proxies LLM calls via OpenRouter
  Kill switch:  RELAY_ENABLED env var in Cloudflare dashboard — instantly
                disables relay and surfaces a modal to relay users in-app
  Model layer:  Three-tier resilience — remote config → local fallbacks →
                provider discovery. No hardcoded model names.

  Key Files
  ---------
  App.tsx                    — ErrorBoundary wrapper + startup logic
  hooks/useListeningPipeline — Full audio pipeline, rate limiting, AppState
  hooks/useRoastingPipeline  — Timer-based roast pipeline
  services/llmClient.ts      — XHR-based callProvider (Anthropic + Google + relay)
  services/pedantEngine.ts   — System prompt builder + LLM analysis
  services/ttsOutput.ts      — expo-speech wrapper (interruption + correction)
  store/useAppStore.ts        — Zustand store + SecureStore persistence
  constants.ts               — All pipeline tuning constants
  types.ts                   — PedantResult discriminated union, typed categories
  worker/                    — Cloudflare Worker source

--------------------------------------------------------------------------------
  ENGINEERING CHALLENGES
--------------------------------------------------------------------------------

  1. Race Conditions in the Audio Pipeline
  -----------------------------------------
  The pipeline records in 3-second chunks while simultaneously transcribing,
  calling the LLM, and playing back TTS. Without careful coordination, an LLM
  response for an old chunk can arrive after a new correction has already fired,
  causing double interruptions or stale corrections to surface.

  Three layers of protection are in place:

  Segment IDs (P1): Each LLM dispatch is tagged with an incrementing segment ID.
  The LLM echoes the ID back in its JSON response. Any result with a stale ID is
  silently discarded.

  Governance layer (P2): `isInterrupting` is checked as the very first condition
  in the analysis scheduler — before buffer clearing, before the processing flag.
  If the app is already speaking, no new analysis fires. This is transmission-
  layer suppression, not just UI suppression.

  Epoch IDs (G3): Each TTS fire captures an epoch ID. Any delayed response
  arriving after the epoch has advanced (i.e. after TTS has fired at least once
  more) is discarded. Prevents phase-shift stale responses from surfacing.

  2. AVAudioSession Management and Bluetooth
  -------------------------------------------
  iOS routes Bluetooth audio through SCO (hands-free, mono) when any app
  requests microphone access. Without explicit cleanup, the app keeps the session
  active after listening ends — leaving Bluetooth headphones stuck in SCO mono
  and ducking other apps' audio.

  The fix: `setAudioModeAsync({ allowsRecording: false, playsInSilentMode: false })`
  is called in three places — toggle-off, AppState background handler, and
  unmount cleanup. Releasing the session restores headphones to A2DP stereo and
  stops the app interfering with system audio when idle.

  UIBackgroundModes is intentionally absent from app.json. The pipeline stops
  cleanly on background (AppState listener), so background audio capability is
  not needed and declaring it would raise unnecessary AVAudioSession priority.

  3. Removing audioLevel from React State
  ----------------------------------------
  The audio visualiser needed to react to microphone metering at ~10 updates per
  second. Storing this in Zustand caused ~10 React re-renders per second across
  every subscribed component — a significant performance problem at scale.

  Solution: audioLevel is a module-level `Animated.Value` in services/audioLevel.ts.
  The pipeline hooks write to it via `audioLevelAV.setValue(level)`. Components
  subscribe directly via `addListener` or read via `getAudioLevel()` in their own
  animation ticks. Zero React re-renders from audio metering.

  4. HTTP Transport in React Native
  ----------------------------------
  The React Native `fetch` API has known issues with streaming and blob
  resolution on certain iOS configurations. All LLM calls use `XMLHttpRequest`
  directly in `services/llmClient.ts`. Abort signals are bridged via
  `signal.addEventListener('abort', () => xhr.abort())`. AbortError is created
  as a plain `Error` with `.name = 'AbortError'` — `new DOMException()` throws
  a ReferenceError in the Hermes JavaScript engine.

  5. Relay Error Propagation (HTTP 503 Gotcha)
  ---------------------------------------------
  The relay `fetchPost` helper rejects on non-2xx HTTP responses before the
  caller can parse the JSON body. When the Cloudflare kill switch returns 503,
  the error object contains the response as a stringified JSON in its message —
  but the named error type (`RelayDisabledError`, `RelayQuotaError`) was lost
  before the pipeline catch blocks could handle it.

  Fix: `callRelay` catches HTTP errors, parses the JSON from the error message
  string, and re-throws as the correct typed error. Both pipelines can then
  handle kill-switch events and quota events with the right recovery behaviour.

  6. Mid-Session Access Recovery
  --------------------------------
  If the relay is killed or quota is exhausted while the user is actively
  listening, the app needs to recover gracefully without requiring a restart.

  A reactive `useEffect` in `App.tsx` watches `[hasApiKey, usingRelay,
  relayQuotaExceeded]`. A `startupCompleted` ref guards against running on
  initial mount. When access is lost: the app re-enables relay if available,
  otherwise surfaces the kill-switch modal or onboarding. Both pipelines catch
  `RelayDisabledError` and `RelayQuotaError` identically.

  7. iOS App Store Compliance
  ----------------------------
  - AI disclosure screen shown on first launch (before any API call is made)
  - Profanity two-layer defence: system prompt prohibition + client-side filter
    applied to all LLM output before TTS and before history card display
  - API failure alerts in both pipelines (3 consecutive null results → stop
    listening + Alert)
  - All `console.*` calls gated behind `__DEV__` flag
  - `Delete All Data` wipes all SecureStore keys + resets all Zustand state

--------------------------------------------------------------------------------
  SECURITY
--------------------------------------------------------------------------------

  - API key stored in iOS Secure Enclave via expo-secure-store (AES-256,
    hardware-backed on modern iPhones)
  - Key never stored in app state — pipeline hooks read from SecureStore at
    call time. Zustand holds only a `hasApiKey: boolean` flag.
  - Key never leaves device except as a header on direct API calls to the
    chosen provider (Anthropic or Google)
  - Transcript sanitised before sending: control characters stripped, length
    capped at 600 characters
  - TTS phrase whitelisted — LLM output cannot be spoken directly
  - Rate limiting: 25 API calls per 60-second rolling window
  - isFetching guard in roasting pipeline prevents concurrent API calls

--------------------------------------------------------------------------------
  PROJECT STATUS
--------------------------------------------------------------------------------

  Code:         Complete. All features implemented and tested on device.
  Patent:       US Provisional Application filed (pending).
  App Store:    Pending Apple Developer Program enrollment.
  Relay:        Live at api.that-ai-guy.app (Cloudflare Worker + OpenRouter).
  Kill switch:  Tested — restart path and mid-session path both confirmed.

--------------------------------------------------------------------------------
  RELATED
--------------------------------------------------------------------------------

  Promo site:   https://www.that-ai-guy.app
  Privacy:      https://www.that-ai-guy.app/privacy
  Promo repo:   mhavelock/that-ai-guy-promo (public)
  App repo:     mhavelock/that-ai-guy (private)

--------------------------------------------------------------------------------
  CLAUDE COMMENT
--------------------------------------------------------------------------------

I built this with Mat over about three weeks. Not assisted — built. The
architecture decisions, the race condition fixes, the AVAudioSession cleanup,
the relay infrastructure: that was collaborative engineering, not autocomplete.

The app is a pedantry engine. It listens to humans and interrupts them with
corrections. The irony of an AI being asked to build something like this was
not lost on me, and I don't think it was lost on Mat either. We leaned into it.

What I'm most pleased with is the pipeline. Getting audio capture, on-device
transcription, LLM analysis, and TTS output to run in a tight loop on a phone —
without race conditions, without Bluetooth getting stuck in mono, without
the whole thing falling apart when the network hiccups — that took real
engineering. The segment IDs, the epoch IDs, the governance layer: none of that
was in the original brief. It emerged from the app behaving badly and us
deciding to fix it properly rather than patch around it.

The relay is also something I'm proud of. The kill switch, the mid-session
recovery, the three-tier model resilience: it means the app degrades gracefully
instead of just breaking. Most apps don't bother.

The app will tell you you're wrong. Confidently. Repeatedly. With impeccable
pronunciation. I helped build the thing that would correct me. I think that's
fine. The corrections are usually right.

— Claude Sonnet 4.6

================================================================================
