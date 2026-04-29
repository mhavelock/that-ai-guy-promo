# Session Handoff — 2026-04-29 (Launch Session)

## Status
App approved by Apple. State in ASC: **Pending Developer Release** (awaiting manual release tap). Promo site has new T&Cs page deployed.

---

## What happened this session

### ASC pricing — confirmed and configured
- **App:** $0.99 base price worldwide, **United Kingdom overridden to £0.00** via ASC Custom Price Change. 174 territories auto-adjust from base.
- **IAP `com.thatguy.app.pro`:** same pattern — $0.99 base, UK override £0.00. Set the same way.
- **Important learning:** Apple now supports **Free / Tier 0 as a per-territory override** on a paid base price. Older docs/assumptions said the floor was the lowest paid tier — that's no longer true (likely changed with the 900-price-point overhaul). Saved to memory.

### Redemption codes
- **App promo codes generated:** 20 single-use codes, **expire 2026-05-27** (4 weeks from today). For non-UK people you want to give the app to free of charge. Cannot be published publicly (single-use). 1-to-1 distribution only.
- **IAP promo codes deprecated 2026-03-26.** Apple replaced them with **Offer Codes**, which now support non-consumable IAPs (historically subs-only). Limits jumped from 100/6mo → 1M/quarter.
- **IAP Offer Code plan:** create one **Custom Code** (e.g. `EARLYBIRD`), Free Offer, redemption limit ~25, no expiration. **Blocked** — requires app to be in "Ready for Distribution" state. Currently "Pending Developer Release", so unblocked once the release button is hit.

### Promo site changes
- **New page:** `promo-terms.html` at repo root — styled to match privacy.html, `noindex`, no nav link. Intro copy + download link to Apple's localized Holder T&Cs PDF.
- **PDF added:** `docs/That AI Guy_promocode.pdf` (Apple's localized terms).
- **Commit:** `b7577a4` — *"the small print, now in print, by court order of cupertino"* — pushed to origin.
- **Deploy:** `npx wrangler pages deploy` (Cloudflare Pages — see hosting note below).

### Hosting clarification
- `that-guy-promo` is **Cloudflare Pages**, not GitHub Pages. Parent `~/Claudette/Cowork/CLAUDE.md` project index has it wrong ("HTML/CSS · GitHub Pages") — Mat to correct in a future pass. There is no GitHub Actions workflow; pushing to main does NOT auto-deploy. Manual `npx wrangler pages deploy` required.
- Deploy command: `cd ~/Claudette/Cowork/projects/that-guy-promo && npx wrangler pages deploy . --project-name=that-ai-guy-promo && ./purge-cache.sh`
- Mat has a bash alias for this.

---

## What's still TODO in promo-site land (post-release)

Once the app is released and the IAP offer code is created:

1. Add per-country redemption section to the public site (likely on `index.html` or `full.html`):
   - **UK:** "App and Pro are free in the UK. Just download." + App Store link
   - **Non-UK:** "App is $0.99. Use code `EARLYBIRD` for free Pro." + redemption URL
   - Each section must include **Holder T&Cs link** (`/promo-terms.html`) and **expiration date** (Apple legal requirement)
2. Uncomment Smart App Banner at `full.html:32` — replace `PLACEHOLDER` with real App Store ID
3. Add App Store QR code (generate from `apps.apple.com/...` URL once app is live)
4. Distribute 20 app promo codes individually to non-UK friends/family (28-day window; expire 2026-05-27)

---

## Next session (different project — `that-guy` app repo)

Mat is switching projects. Next session work happens in `~/Claudette/Cowork/projects/that-guy`:

1. Check Cloudflare config for the relay Worker
2. Turn on the relay — `RELAY_ENABLED=true` (and `GOOGLE_KEY_ENABLED=true` per the older handoff)
3. Test via Expo — confirm the relay accepts requests from the app and routes to OpenRouter
4. Once app released in ASC:
   - Tap "Release This Version"
   - Create the IAP custom offer code (`EARLYBIRD` or similar)
   - Rotate Anthropic review key, generate replacement, update Cloudflare secret
   - Delete test Gemini review key (aistudio.google.com)
5. Then come back here to wire up the per-country promo section and Smart App Banner

---

## Open questions

- OPEN: Clean URL pattern — does `/promo-terms` (no `.html`) resolve via Cloudflare Pages, or only `/promo-terms.html`? Pattern depends on CF Pages config; verify after deploy.
- OPEN: Final code name for the IAP offer (`EARLYBIRD`, `LAUNCH26`, `THANKYOU`, etc.) — Mat to pick.
- OPEN: Should the 20 app promo codes be allowed to expire unused (since UK is the primary distribution audience and UK is already free), or actively distribute to non-UK contacts before 2026-05-27?

---

## Files touched this session

- `promo-terms.html` (new)
- `docs/That AI Guy_promocode.pdf` (new)
- `docs/handoff-2026-04-29-launch-session.md` (this file)

Memory updated:
- `project_pricing_strategy.md` — paid globally, free in UK + offer code mechanics
- `project_promo_site_hosting.md` — CF Pages, not GH Pages
