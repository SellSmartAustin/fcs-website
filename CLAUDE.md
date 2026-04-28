# Full Calendar Systems — Website Build Brief

## Project
Build a single-page marketing website for Full Calendar Systems (FCS), a done-for-you AI lead management service for roofing companies.

## Tech Stack
- Pure HTML/CSS/JavaScript — no frameworks, no npm, no build tools
- Single `index.html` file + `styles.css` + `script.js`
- Must be fully mobile-responsive (works on phone and desktop browser)
- Fonts loaded from Google Fonts (Barlow + Inter)
- SVG logos already in this directory — use them

## Brand Identity
- **Company name:** Full Calendar Systems
- **Tagline:** "We answer. You close."
- **Background (dark):** `#0F1923`
- **Primary navy:** `#1C3557`
- **Accent amber/orange:** `#E87722`
- **White:** `#FFFFFF`
- **Cool gray (subtext):** `#94A3B8`
- **Surface/cards:** `#1E293B`
- **Success/stats:** `#22C55E`
- **Headlines font:** Barlow Bold 700
- **Body font:** Inter Regular 400 / Medium 500
- **Logo file:** `FCS_Block_Light.svg` (use on dark backgrounds)
- **Design feel:** Dark, premium, professional, industrial — like a contractor's serious business partner. No robot icons, no AI imagery, no futuristic graphics. Think Stripe meets a blue-collar operator.

## Critical Positioning Rules
- NEVER use the word "AI" in any headline, hero text, or section header
- AI only appears in the FAQ section
- No tech jargon anywhere
- Language: "estimates" not "demos," "jobs" not "pipeline," "leads" not "conversions"
- Positioning: FCS is a **service**, not software. "We do it" not "our tool does it"
- The AI agent is named "Echo" internally — do NOT put this name on the website
- Say "we" and "our team" throughout

## CTA Button
- All "Book a Demo" / "Book a Free Demo" / "Claim Your Spot" CTAs link to: **https://api.leadconnectorhq.com/widget/booking/mLNB1w6cOmezTKSYCTDc**
- Replace with actual GHL calendar URL when provided
- Button style: amber `#E87722` background, white text, bold, rounded corners, slight shadow

## Page Structure (single long scroll page)

---

### SECTION 1: NAV
- Logo (FCS_Block_Light.svg) — left aligned
- Nav links: How It Works | What You Get | Pricing | FAQ
- CTA button top right: "Book a Free Demo" → booking link
- Sticky nav on scroll
- Mobile: hamburger menu

---

### SECTION 2: HERO
- Full-width dark background (`#0F1923`)
- **Headline:** "Every Lead Gets a Response in 60 Seconds. Even at 2AM."
- **Subheadline:** "Full Calendar Systems handles all your lead follow-up — texts back, qualifies, and books estimates straight onto your calendar. You just show up and close."
- Two CTAs: Primary "Book a Free Demo" (amber button) | Secondary "See How It Works" (ghost/outline button, scrolls to How It Works section)
- Trust bar directly below hero (4 items, icon + text):
  - ⚡ 60-Second Response
  - 🔁 30-Day Follow-Up
  - 🛠️ Zero Tech Setup
  - 💰 Flat $497/mo

---

### SECTION 3: THE PROBLEM
- **Headline:** "You're Losing Jobs You Already Paid For"
- **Subheadline:** "You're spending money on ads and referrals. But if nobody follows up fast enough — that lead is gone."
- 3 pain point cards (dark surface `#1E293B`, amber accent left border):
  1. 🕐 **"The average roofer takes 8+ hours to respond to a new lead"** — By then, the homeowner already hired someone else.
  2. 📵 **"40% of leads go to the first contractor to respond — not the best one"** — Speed wins the job. Not reputation. Not price. Speed.
  3. 🔁 **"Most roofers follow up once or twice, then move on"** — Studies show it takes 8+ touchpoints to book a job. Who has time for that?
- Stats row below cards (big amber numbers):
  - **9x** more likely to close if you respond in 5 min vs. 30 min
  - **27%** of incoming calls go unanswered at roofing companies
  - **$3,000+** average value of a missed roofing job

---

### SECTION 4: HOW IT WORKS
- **Headline:** "Simple. Automated. Done For You."
- **Subheadline:** "You never log into anything. You never configure anything. We handle it."
- 3 steps (numbered, large amber step numbers, clean layout):
  1. **Lead comes in** — From your ads, website, referrals, or a missed call. Doesn't matter the source.
  2. **We respond in 60 seconds** — Our team texts them back immediately, 24/7. We qualify them, handle their questions, and book the estimate appointment directly onto your calendar.
  3. **You show up and close** — That's it. Your calendar fills up. Your crews stay busy. You close the jobs.
- Below steps: subtle callout box — *"Works with every lead source. No software to learn. Live in 7 days."*

---

### SECTION 5: WHAT YOU GET
- **Headline:** "Everything You Need to Stop Losing Leads"
- 2-column feature grid (icon + bold title + short description):
  - ⚡ **60-Second Response, 24/7/365** — Every lead gets a text back within 60 seconds. Nights, weekends, holidays. No exceptions.
  - 📅 **Appointments Booked to Your Calendar** — Estimates land on your calendar automatically. No back-and-forth, no phone tag.
  - 🔁 **30-Day Follow-Up Sequence** — We follow up with every lead for 30 days until they book or tell us no. Most roofers give up after 2 attempts.
  - 🛠️ **Full Setup Done For You** — We build everything. You're live in 7 days. You never touch a single setting.
  - 📍 **Roofing-Specific Scripts** — Our scripts are built for storm damage, insurance claims, and callbacks — not generic templates.
  - 💰 **One Flat Monthly Fee** — No per-message fees. No usage caps. No surprises. $497/mo covers everything.

---

### SECTION 6: PRICING
- **Headline:** "Simple, Transparent Pricing"
- Single pricing card (centered, premium look, amber accent):
  - Badge: "BETA PRICING — Limited Spots"
  - **$497 /month**
  - Subtext: *"Full price at launch: $1,500/mo. Lock in beta pricing now."*
  - Feature checklist (green checkmarks):
    - ✅ 60-second lead response, 24/7
    - ✅ 30-day automated follow-up
    - ✅ Estimate appointments booked to your calendar
    - ✅ Roofing-specific scripts & qualification
    - ✅ Full setup done for you
    - ✅ Works with any lead source
    - ✅ Live in 7 days
    - ✅ No contracts — cancel anytime with 30 days notice
    - ✅ No setup fees
  - CTA: "Claim Your Beta Spot" → booking link
- Small subtext below card: *"We're accepting a limited number of beta clients. Price will increase to $1,500/mo at full launch."*

---

### SECTION 7: LEAD QUALIFIER FORM
- **Headline:** "See If Your Business Qualifies"
- **Subheadline:** "We work best with roofing companies spending $2,000+/month on lead generation. Answer a few quick questions to see if we're a fit."
- Form fields:
  1. Your Name (text, required)
  2. Business Name (text, required)
  3. City & State (text, required)
  4. Phone Number (tel, required) — label: "Phone Number" with subtext "(We'll text you to confirm your demo)"
  5. How many leads do you get per month? (dropdown: Under 20 / 20–50 / 50–100 / 100+, required)
  6. Where do most of your leads come from? (dropdown: Facebook Ads / Google Ads / Door Knocking / Referrals / Multiple Sources, required)
  7. What's your biggest lead follow-up challenge? (textarea, optional)

- **SMS CONSENT BLOCK** (required for A2P compliance — TWO separate optional checkboxes, both unchecked by default, NOT required to submit):

  **Checkbox 1 — Transactional:**
  *"I agree to receive transactional or conversational communications from Full Calendar Systems LLC via text messages, phone calls, and emails related to my inquiry, such as demo confirmations, appointment scheduling, and service updates. Message frequency varies. Reply STOP to opt out. Reply HELP for help. Msg & data rates may apply. Your information is secure and will not be sold or shared with third parties or affiliates for promotional purposes."*

  **Checkbox 2 — Marketing:**
  *"I agree to receive marketing communications from Full Calendar Systems LLC via text messages, phone calls, and emails, including service offers, updates, and related marketing content. Message frequency varies. Reply STOP to opt out. Reply HELP for help. Msg & data rates may apply. Your information is secure and will not be sold or shared with third parties or affiliates for promotional purposes."*

  - Both checkboxes: unchecked by default, optional (not required to submit)
  - Style: small gray text, checkbox left-aligned, links underlined in amber
  - Links to Privacy Policy and Terms of Service at bottom of consent block

- Submit button: "Check My Eligibility" (amber — submits regardless of checkbox state)
- On submit: redirect to **https://api.leadconnectorhq.com/widget/booking/mLNB1w6cOmezTKSYCTDc**
- Note: Simple HTML form — no server-side processing. Redirect on submit. GHL wired later.

---

### SECTION 8: FAQ
- **Headline:** "Common Questions"
- Accordion-style (click to expand):
  1. **Will my customers know it's AI?** — Our responses are written to sound natural and professional. Most homeowners don't know and don't care — they just appreciate getting a fast, helpful reply when they reach out.
  2. **What happens if a lead has a complex question?** — If something requires your personal attention, we flag it immediately and you step in. We handle the 80% of standard follow-up so you only deal with the 20% that needs you.
  3. **How long does setup take?** — Most clients are fully live within 7 days of signing up. We handle all the setup — you don't need to do anything technical.
  4. **Do I need to change my current software or CRM?** — No. We plug into what you already use. If you don't use a CRM, that's fine too — we handle everything on our end.
  5. **What if I want to cancel?** — Cancel anytime with 30 days written notice. No penalties, no long-term contracts. We keep your business because the results speak for themselves.
  6. **What kinds of roofing companies do you work with?** — We work best with residential roofing companies that are actively running ads or generating leads and want to stop losing jobs to slow follow-up. Ideal fit: $2K+/month in lead spend, owner-operated.

---

### SECTION 9: FINAL CTA
- **Headline:** "Your Competitor Is Going to Respond to That Lead in 60 Seconds. Will You?"
- Subtext: *"Every day you wait is more leads going cold. Book a free 15-minute call and we'll show you exactly how it works for your business."*
- Big CTA button: "Book a Free Demo" → booking link
- Trust line below button: "No pressure. No contracts. 15 minutes."

---

### SECTION 10: FOOTER
- Logo (FCS_Block_Light.svg)
- Tagline: "We answer. You close."
- Nav links: How It Works | What You Get | Pricing | FAQ
- Legal links: Privacy Policy | Terms of Service
- © 2026 Full Calendar Systems LLC. All rights reserved.
- Email: james@fullcalendarsystems.com

---

## Additional Pages

### privacy-policy.html — Privacy Policy
- Full-page section with dark background, white text, readable width (max 800px centered)
- **Heading:** Privacy Policy — Full Calendar Systems LLC
- **Effective Date:** April 28, 2026
- Must include these sections:
  1. **Information We Collect** — name, business name, phone number, email, city/state submitted via our contact form
  2. **How We Use Your Information** — to contact you about our services, schedule demos, and send SMS messages you have opted into
  3. **SMS Messaging** — "By submitting our form and checking the consent box, you agree to receive SMS text messages from Full Calendar Systems LLC. Message frequency varies. Msg & data rates may apply. You may opt out at any time by replying STOP. Reply HELP for assistance. We do not sell or share your phone number with third parties for marketing purposes."
  4. **Data Sharing** — we do not sell personal information; we may share with service providers (GHL/CRM) strictly to deliver our services
  5. **Data Retention** — we retain contact info as long as needed to provide services or as required by law
  6. **Your Rights** — you may request deletion of your data by emailing james@fullcalendarsystems.com
  7. **Contact** — Full Calendar Systems LLC | james@fullcalendarsystems.com

---

### terms.html — Terms of Service
- Same dark background, readable width
- **Heading:** Terms of Service — Full Calendar Systems LLC
- **Effective Date:** April 28, 2026
- Must include:
  1. **Services** — FCS provides done-for-you lead management services for roofing companies including automated SMS follow-up and appointment booking
  2. **SMS Program Terms** — "By opting in, you consent to receive automated SMS messages from Full Calendar Systems LLC regarding our services and scheduling. Message frequency varies based on your inquiry and opt-in. Msg & data rates may apply. To opt out, reply STOP to any message. To get help, reply HELP or email james@fullcalendarsystems.com. Carriers are not liable for delayed or undelivered messages."
  3. **Payment Terms** — services billed monthly; pricing subject to change with 30 days notice to existing clients
  4. **Cancellation** — either party may cancel with 30 days written notice
  5. **Limitation of Liability** — FCS is not liable for missed leads, lost revenue, or damages beyond fees paid in the prior 30 days
  6. **Governing Law** — laws of the State of Texas
  7. **Contact** — Full Calendar Systems LLC | james@fullcalendarsystems.com

---

## Mobile Requirements
- Fully responsive at 375px, 768px, and 1200px+ breakpoints
- Nav collapses to hamburger on mobile
- Feature grid goes to single column on mobile
- Pricing card full width on mobile
- Form fields full width on mobile
- Touch-friendly tap targets (minimum 44px)
- Hero text scales down gracefully

## Quality Bar
- Pixel-perfect dark theme throughout
- No stock photo placeholders — use abstract geometric/gradient backgrounds or solid dark surfaces
- Smooth scroll between sections
- FAQ accordion with smooth expand/collapse animation
- Hover states on all buttons and nav links
- Fast load — no external dependencies except Google Fonts and SVG logos

## Files to Create
1. `index.html` — main landing page
2. `styles.css` — all styles (shared across all pages)
3. `script.js` — interactivity (nav, accordion, form)
4. `privacy-policy.html` — standalone privacy policy page, same dark theme, links back to home
5. `terms.html` — standalone terms of service page, same dark theme, links back to home

All internal links to Privacy Policy and Terms must use `href="privacy-policy.html"` and `href="terms.html"` respectively (not anchor links).

Build all three files completely. Do not leave placeholders or TODOs. The only placeholder allowed is `https://api.leadconnectorhq.com/widget/booking/mLNB1w6cOmezTKSYCTDc` for the GHL calendar URL.
