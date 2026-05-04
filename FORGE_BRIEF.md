# FCS Website Update Brief

## Overview
Update `index.html`, `styles.css`, and `script.js` in this directory. Do NOT modify `privacy-policy.html`, `terms.html`, or any SVG/image files.

This is a surgical update — not a rebuild. Preserve all existing structure, styles, and A2P compliance elements exactly as they are unless explicitly told to change them.

---

## CHANGE 1 — Hero: Add Animated iPhone Mockup (RIGHT SIDE)

**Current state:** Hero is single-column, text only (headline, subhead, CTAs, trust bar).

**New state:** Two-column hero grid. Left = existing text copy. Right = animated iPhone mockup showing an iMessage conversation coming in live.

### Hero grid layout
```css
.hero-grid {
  grid-template-columns: 1fr 1fr;
  max-width: 1100px;
  text-align: left; /* change from center */
}
.hero-copy {
  align-items: flex-start; /* change from center */
  text-align: left;
}
.hero-actions {
  justify-content: flex-start; /* change from center */
}
.imessage-strip {
  text-align: left;
}
```

### iPhone mockup (right side)
Reuse the existing `.phone-shell` / `.phone-screen` / `.phone-messages` CSS classes already defined in styles.css. Place it in a `.hero-phone-wrap` div.

The mockup should show this iMessage conversation with a **typewriter animation** — messages appear one by one with realistic timing:

1. Gray bubble (inbound): "Hey saw your Facebook ad — had hail damage last week, need a quote ASAP"
2. Typing indicator: three bouncing dots (`.typing-dots`) — show for 1.5s
3. Blue bubble (outbound): "Hi Mike! This is James with ABC Roofing. Are you free Thursday at 10am for a free estimate?" 
4. Read receipt: "✓✓ Read 9:42 AM" in blue
5. Gray bubble (inbound): "Thursday works perfect, see you then 👍"

**Animation sequence** (CSS keyframes + JS setTimeout):
- 0ms: gray bubble 1 appears (fade + slide up)
- 800ms: typing indicator appears
- 2300ms: typing indicator disappears, blue bubble appears
- 3200ms: read receipt appears
- 4500ms: gray bubble 2 appears
- 7000ms: restart animation loop (clear messages, replay)

### Floating stat card
Absolute positioned card overlaid bottom-left of the phone mockup:

```html
<div class="hero-stat-card">
  <div class="hero-stat-label">Response Speed</div>
  <div class="hero-stat-active"><span class="pulse-dot"></span> ACTIVE</div>
  <svg class="hero-stat-chart" viewBox="0 0 80 28" fill="none">
    <polyline points="0,24 12,18 24,20 36,10 48,14 60,6 72,8 80,4" 
      stroke="#22c55e" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <div class="hero-stat-value">Avg. Response <strong>00:52s</strong></div>
</div>
```

Style the card:
```css
.hero-phone-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-stat-card {
  position: absolute;
  bottom: -16px;
  left: -20px;
  background: rgba(30, 41, 59, 0.95);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 16px;
  padding: 14px 18px;
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(34, 197, 94, 0.08);
  min-width: 180px;
  z-index: 10;
}

.hero-stat-label {
  font-size: 0.72rem;
  color: rgba(148, 163, 184, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 4px;
}

.hero-stat-active {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #22c55e;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse-green 1.4s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse-green {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.hero-stat-chart {
  width: 80px;
  height: 28px;
  display: block;
  margin-bottom: 8px;
}

.hero-stat-value {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.75);
}

.hero-stat-value strong {
  color: #ffffff;
  font-family: "Barlow", sans-serif;
  font-size: 1rem;
}
```

### Typing indicator CSS
```css
.typing-dots {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
  background: #3a3a3c;
  border-radius: 18px;
  border-bottom-left-radius: 4px;
  align-self: flex-start;
  width: fit-content;
}

.typing-dots span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  animation: typing-bounce 1.2s ease-in-out infinite;
}

.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-5px); opacity: 1; }
}
```

### JS animation logic
In `script.js`, add the hero phone animation function. Use `setTimeout` chain. Hide/show elements with CSS classes. Loop every 7 seconds. Start on DOMContentLoaded.

---

## CHANGE 2 — iMessage Section: Remove Phone Mockup

The phone mockup now lives in the hero. Remove it from the iMessage section to avoid repetition.

- Change `.imessage-diff-grid` from 2-column to 1-column
- Remove the `.phone-mockup` div entirely from that section
- Keep all copy, eyebrow, h2, paragraph, and `.imessage-stat-row` exactly as-is
- Center the content: `text-align: center`, `max-width: 760px`, `margin: 0 auto`

---

## CHANGE 3 — Problem Cards: Rename to More Visceral Copy

Update the h3 text on the 5 problem cards only. Do NOT change icons, paragraph text, or card structure.

| Old h3 | New h3 |
|--------|--------|
| "The average roofer takes 8+ hours to respond to a new lead" | "The Ghosting Tax" |
| "40% of leads go to the first contractor to respond - not the best one" | "Speed Wins the Job" |
| "Most roofers follow up once or twice, then move on" | "The 2-Call Dropout" |
| "Green bubbles feel like spam. Blue bubbles feel like people." | "Green Bubbles Get Ignored" |
| "Most homeowners need 2–3 follow-ups after a quote before they say yes" | "Lost Estimate Leakage" |

---

## CHANGE 4 — How It Works: Add "Effort: 0%" Badge

Add a small badge to each `.step-card` showing effort level.

```html
<!-- Add inside each step-card div, after the h3 -->
<span class="effort-badge">Effort: 0%</span>
```

```css
.effort-badge {
  display: inline-block;
  margin-top: 8px;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: #22c55e;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
```

---

## CHANGE 5 — Pricing: Add Strikethrough Anchor Price

In the pricing card, change the price display to show $1,500 crossed out above $697:

```html
<!-- Replace existing h3 pricing display with: -->
<div class="pricing-anchor">
  <span class="price-was">$1,500<span>/mo at launch</span></span>
</div>
<h3>$697 <span>/month</span></h3>
```

```css
.pricing-anchor {
  margin-bottom: 4px;
}

.price-was {
  font-size: 1.1rem;
  color: rgba(148, 163, 184, 0.6);
  text-decoration: line-through;
  text-decoration-color: rgba(232, 119, 34, 0.5);
  font-family: "Barlow", sans-serif;
  font-weight: 700;
}

.price-was span {
  font-size: 0.85rem;
  font-weight: 500;
}
```

---

## CHANGE 6 — Stats Row: Fix to 4 Columns

The stats row has 4 stats but is styled as 3 columns. Fix the CSS:

```css
.stats-row {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
```

---

## CHANGE 7 — New Section: "One Roofer Per Territory"

Add this new section BETWEEN the pricing section and the qualifier form section (`#lead-qualifier`).

```html
<section class="section section-surface" id="territory">
  <div class="container">
    <div class="section-heading reveal">
      <p class="eyebrow">Exclusivity</p>
      <h2>One Roofer Per Territory. Is Yours Taken?</h2>
      <p class="section-subhead">We only work with one roofing company per service area. No lead conflicts. No competing with someone else on our system. Claim your territory before your competitor does.</p>
    </div>
    <div class="territory-grid reveal">
      <div class="territory-item">
        <span class="territory-icon">🏙️</span>
        <strong>Austin, TX</strong>
        <span class="territory-status status-open">Spots Available</span>
      </div>
      <div class="territory-item">
        <span class="territory-icon">🏙️</span>
        <strong>Dallas / Fort Worth, TX</strong>
        <span class="territory-status status-open">Spots Available</span>
      </div>
      <div class="territory-item">
        <span class="territory-icon">🏙️</span>
        <strong>Houston, TX</strong>
        <span class="territory-status status-open">Spots Available</span>
      </div>
      <div class="territory-item">
        <span class="territory-icon">🏙️</span>
        <strong>San Antonio, TX</strong>
        <span class="territory-status status-open">Spots Available</span>
      </div>
    </div>
    <div class="territory-cta reveal">
      <a class="btn btn-primary" href="https://api.leadconnectorhq.com/widget/booking/mLNB1w6cOmezTKSYCTDc">Check My Territory</a>
    </div>
  </div>
</section>
```

```css
.territory-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 32px;
}

.territory-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px 20px;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(148, 163, 184, 0.16);
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.92), rgba(23, 33, 49, 0.96));
  text-align: center;
}

.territory-icon {
  font-size: 1.8rem;
}

.territory-item strong {
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
}

.territory-status {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 999px;
}

.status-open {
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #22c55e;
}

.status-taken {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
}

.territory-cta {
  text-align: center;
}

@media (max-width: 900px) {
  .territory-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .territory-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## CHANGE 8 — Mobile Responsiveness for New Hero

Add responsive rules for the new 2-column hero:

```css
@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-copy {
    align-items: center;
    text-align: center;
  }
  .hero-actions {
    justify-content: center;
  }
  .imessage-strip {
    text-align: center;
  }
  .hero-phone-wrap {
    order: -1; /* phone above text on mobile */
  }
  .hero-stat-card {
    left: 50%;
    transform: translateX(-50%);
    bottom: -20px;
  }
}
```

---

## DO NOT CHANGE
- `privacy-policy.html`
- `terms.html`
- Any SVG logo files
- The qualifier form (`#lead-qualifier`) — consent checkboxes, privacy links, STOP/HELP language must stay exactly as-is
- Footer links to privacy-policy.html and terms.html
- All booking CTAs must continue pointing to: `https://api.leadconnectorhq.com/widget/booking/mLNB1w6cOmezTKSYCTDc`
- The FAQ section
- The final CTA section

---

## When Done
1. Verify the site renders correctly by checking index.html structure
2. Make sure no console errors exist in the JS (check for syntax errors)
3. Confirm all 7 CTAs still point to the correct booking URL
4. Run: `cd ~/Projects/fcs-website && git add -A && git commit -m "feat: hero phone animation, territory section, pricing anchor, problem card copy, effort badges"`
5. Then run: `cd ~/Projects/fcs-website && git push origin main`
6. Then notify: `openclaw system event --text "Done: FCS website updated — hero animation, territory section, pricing, problem cards" --mode now`
