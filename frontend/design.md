# UI/UX & Frontend Analysis: Skinly AI Reference, Mapped to the Lumière Skin PRD

**Note on the source material.** The six screenshots show one design system across a marketing landing page (hero, concept diagram, how-it-works, skin analysis, pricing, testimonial, FAQ, contact, giant wordmark footer) and a logged-in app (home dashboard and AI chat). Screenshots 4–6 are rotated 90°, but their content is readable. Font and library identifications below are visual estimates, not confirmed from source code.

---

## 1. Aesthetics & Design Style

The reference is a **modern AI-SaaS aesthetic that blends soft Glassmorphism with an editorial, almost fashion-magazine layout**. It is not Bento grid or Brutalism. The glass is restrained: a frosted translucent panel sits over a blurred mesh gradient, while everything else is flat white cards with hairline borders and very light shadows. The result feels like a premium wellness or beauty brand rather than a typical enterprise tool.

The layout composition is generous. Sections are centred on a single column with large vertical gaps (roughly 96–128px between sections), short centred headlines, and tiny pill-shaped eyebrow labels above each heading ("Your personal AI skincare companion", "FAQ", "AI Skin Analysis"). The hero ends in a **curved, bowl-shaped bottom edge** instead of a straight line, which makes the transition to the white section feel organic. The concept section ("Skincare Advice Shouldn't Start With Everyone Else") uses a **hub-and-spoke diagram**: a central circular node connected by dashed curved lines to five floating chips (skin type, goal, concern, preference, budget). It visualises "personalisation" as an idea rather than describing it. Elsewhere the page alternates two-column layouts (the FAQ pairs a visual card on the left with an accordion on the right) with four-up card rows (the steps and the support categories).

The dashboard uses a classic **left sidebar + top search bar + card grid** structure. A gradient greeting banner with a photograph anchors the page, followed by white cards for the routine, AI insight, weekly consistency (82%), and program progress. The overall tone is calm, reassuring, feminine-leaning, and trustworthy, with a deliberately clinical-but-soft feel. That tone matters for a product whose core promise is safe, non-medical guidance.

## 2. Typography

The system is a **two-family pairing: an expressive serif for display text and a neutral sans for everything functional.** The headlines ("Your Skin Changes", "Skincare Advice Shouldn't Start…") look like **Playfair Display**, a high-contrast transitional/Didone-style serif with sharp hairlines and ball terminals. The second line of nearly every headline switches to the **italic cut in the brand purple** ("Your Routine Should Too", "With Everyone Else", "Grows With You"). This roman-plus-italic accent is the signature typographic move of the whole design. The oversized "Skinly AI" footer wordmark is the same serif in a heavy italic, cropped by the viewport edge as a decorative element. Comparable fonts that would work are Fraunces, Cormorant Garamond, or DM Serif Display.

Body copy, navigation, buttons, form labels, card text, and the whole dashboard are set in a **neo-grotesque/UI sans, almost certainly Inter**, with small sizes (11–14px) and generous tracking on the eyebrow labels. Dashboard headings ("Good Morning, Samirh", "Today's Routine") use Inter semibold at around 20–28px rather than the serif, so the serif is reserved for marketing moments and the app stays utilitarian. Large stat numerals ("82%") are in the purple brand colour at a bold weight.

## 3. Color Palette & Visual FX

The palette is built on a **lime-to-lavender duality** over a near-white canvas. The estimated values are:

| Role | Estimate |
|---|---|
| Primary / CTA purple | ~`#6F42A8` to `#7A4DB0` (buttons, italic headline accents, links, active nav) |
| Lavender gradient | ~`#C9A6F2` to `#B785EE` (hero base, dashboard backdrop, pricing section) |
| Lime glow | ~`#D9F7A1` to `#E4FBC0` (hero top, eyebrow dots, "Most Popular" card) |
| Page background | ~`#F7F6FA` (app) and `#FFFFFF` (cards) |
| Text | Near-black `#111` for headlines; grey `#6B6B7B` for body |
| Secondary accents | Soft aqua/ice blue (the FAQ visual card), warm orange (goal icon), green success ticks, amber stars |

The visual effects are carefully layered. The hero background is a **mesh gradient** (a green radial glow bleeding into a purple lower half) with a central **blurred lime blob** behind the chat input. The input sits inside a **frosted glass container** (semi-transparent white, subtle white border, backdrop blur), and the input itself has a **purple-to-lime gradient border** with a solid purple circular send button. Cards use a **1px hairline border plus a very diffuse, low-opacity shadow**, never a hard drop shadow. Border radii are generous and consistent: about 8–12px on small elements, 16–24px on cards, and fully round pills and avatars. The skin analysis visual overlays a **face-mesh/scan grid with corner brackets and dashed connector lines** onto a portrait, and the FAQ card uses a **translucent, holographic 3D face render** in icy blue. Dashed SVG lines, tiny sparkle icons (✦), and thin-line icons round out the details.

## 4. Estimated Tech Stack

**Framework & styling.** The most probable stack is **React with Tailwind CSS**, with **shadcn/ui (Radix primitives)** for interactive components, **Framer Motion** for scroll and entrance animation, and **lucide-react** for icons, plus a font loader for Playfair Display and Inter. The original may well be a Next.js build, but nothing visible requires it.

**Rationale.** Several visual indicators support this estimate:

- The thin 1.5px rounded line icons (home, bell, chevrons, mic, plus, log-out, calendar) match the lucide icon set exactly.
- The FAQ accordion, with its chevron toggles and expanding answer panel, and the "What can we help you with?" select in the contact form have the shape and spacing of Radix/shadcn Accordion and Select.
- The hairline-border cards, consistent radii, and ghost/outline/solid button variants are typical of shadcn's token system.
- The layered gradients, blurs, and rounded-full pills map directly onto Tailwind utilities (`backdrop-blur`, `bg-gradient-to-*`, `rounded-3xl`).
- The smooth stacked testimonial card with up/down controls and the 3-up pricing cards suggest Framer Motion transitions rather than a heavy carousel library.

**Compatibility with the PRD.** The Lumière Skin PRD already specifies **React 18 + Vite + Tailwind CSS + Recharts**, so there is no reason to switch to Next.js. Everything above can be done inside the existing Vite project by adding shadcn/ui, Framer Motion, and lucide-react.

## 5. Replication Recommendations

**Alignment with the PRD theme.** The PRD defines Lumière Skin as a B2B complaint-intelligence tool for UMKM skincare teams (CS Agent, Admin, and Brand Manager personas), with a **Lumière Cyan `#00F2FE` primary, Deep Cyber Violet `#051424` base, Soft Rose Pearl `#FFF0F5` accent, and Inter** as the font. The reference is a consumer routine-coaching app in lime and purple. So I recommend **borrowing its structure, composition, and typographic system, not its colours or its copy.** Both products are AI skincare assistants with a non-medical disclaimer ("Skinly is designed to provide personalized skincare guidance, not medical diagnosis" maps directly to the PRD's Human-in-the-Loop and BPOM stance), and both need a calm, trustworthy tone. The reference's chat and insight cards also map almost one-to-one onto PRD features:

- Skinly's "AI Skincare Insight" card becomes the Lumière AI Insights widget.
- "Today's Routine" with its step timeline becomes the CS Dashboard's priority tickets list.
- The "82% routine consistency" card becomes a resolution rate or SLA card.
- The Chat Skinly AI screen becomes the AI Analysis and Suggested Response page.
- The hub-and-spoke diagram becomes "One complaint, fully understood", with product, batch, symptom, severity, and sentiment chips around a central node.
- The 1/3/6-month plans become UMKM pricing tiers (anchored to the PRD's Rp 299rb/month).

**Recommended colour translation.** Keep the structure of the lime-to-lavender mesh but retune it to the PRD tokens: replace the lime glow with Lumière Cyan (`#00F2FE`, softened to roughly 35–45% opacity for large areas), replace the lavender with a violet derived from the Deep Cyber Violet family (for example `#7C5CFF` for primary buttons and `#C9B8FF` for gradient washes), and use Soft Rose Pearl `#FFF0F5` as the warm card or section tint. Use `#051424` for text and for dark sections (a dark hero or sidebar is an optional departure from the reference that would reinforce the "Cyber Violet" identity). Check contrast on the cyan: it fails WCAG as text on white, so use it only for glows, borders, and icons, never for body text.

**Most efficient build approach, in order:**

1. **Tokens first.** Put colours, radii (8/16/24/full), shadows, and the two font families into `tailwind.config.js` and CSS variables. Add a `font-display` utility (Playfair Display) and keep Inter as the default.
2. **A reusable `<AccentHeading>` component.** It takes a roman line and an italic line (`<h1>Your Skin Changes <em>Your Routine Should Too</em></h1>`) with `em` styled as `font-display italic text-primary`. This one component recreates the signature look across every section.
3. **Hero background.** Stack 2–3 absolutely positioned `div`s with `radial-gradient` and `blur-3xl`, then add the curved bottom edge with an SVG clip-path or a large `border-radius` on the bottom corners (e.g. `rounded-b-[50%/80px]`).
4. **Glass chat input.** Wrap the input in a container with `bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl`. For the gradient border, use a 1–2px padded wrapper with `bg-gradient-to-r` and a white inner element.
5. **Concept diagram.** Build it with absolutely positioned chips plus a single inline SVG of `stroke-dasharray` bezier paths, then animate `stroke-dashoffset` or fade the chips in with Framer Motion `whileInView`.
6. **Cards and sections.** Use shadcn `Card`, `Accordion`, `Select`, `Tabs` (for AM/PM or ticket filters), and `Badge` (restyled as eyebrow pills). Use CSS grid for the 4-up rows (`grid-cols-1 md:grid-cols-4`).
7. **App shell.** A fixed 240px sidebar, a top bar with search and avatar, and a card grid. This matches the existing `DashboardLayout` and `Sidebar` components in the PRD, so restyle them rather than rebuilding.
8. **Footer wordmark.** A single oversized text element (`text-[18vw] italic leading-none`) clipped by the container with `overflow-hidden`, so the cropped effect is free.
9. **Motion.** Keep it minimal: fade-up on scroll, a small hover lift on cards, and a subtle slow drift on the gradient blobs. Respect `prefers-reduced-motion`.
10. **Assets.** Generate or source the imagery listed in `skinly-asset-prompts.json`. The face-scan overlay can be done in SVG over a portrait, which is more flexible than baking it into the image.

**Things to avoid.** Do not copy the reference's photography, copy, logo, or the "Skinly" name, since the screenshots are someone else's portfolio work. Take the compositional ideas and build original assets. For the competition, make sure the landing page speaks to UMKM owners and CS teams, not individual consumers.