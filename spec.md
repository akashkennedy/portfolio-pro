# Akash Kennedy — Portfolio Website Design Spec

## Project Overview

A business-focused portfolio website for **Akash Kennedy**, a freelance web designer and developer targeting local businesses in Tamil Nadu, India. The goal of this site is to sell web design services to local business owners — not to get a job. All copy, structure, and design decisions should reflect that.

**Framework:** Next.js (latest, App Router)
**Styling:** Tailwind CSS (latest)
**Animations:** Framer Motion
**Background:** tsparticles (`@tsparticles/react`, `@tsparticles/slim`)
**Icons:** Lucide React
**Deploy target:** Vercel

---

## Brand Identity

**Name:** Akash Kennedy
**Logo mark:** `ak.` — lowercase, medium weight
**Tagline:** "Your business deserves a great website"
**Tone:** Friendly, confident, professional. Speaks directly to business owners, not developers.
**No tech jargon anywhere on the site.** No mention of React, Tailwind, TypeScript, or any stack.

---

## Color System

### Dark Mode (default)
| Token | Hex | Usage |
|---|---|---|
| `bg-base` | `#111016` | Page background |
| `bg-surface` | `#18151f` | Cards, navbar, contact section |
| `bg-surface-2` | `#1e1a2a` | Image placeholders, hover states |
| `border` | `#2a2535` | All borders |
| `accent` | `#7F77DD` | Buttons, icons, active links, stars |
| `accent-dark` | `#534AB7` | Hover state for accent |
| `accent-muted` | `#AFA9EC` | Featured badges, secondary accent text |
| `accent-bg` | `#2a2040` | Accent-tinted surfaces (avatars, featured card bg) |
| `text-primary` | `#e0daf5` | Headings, names, labels |
| `text-secondary` | `#9d97c0` | Body text, quotes |
| `text-muted` | `#5a5270` | Placeholder labels, nav links, meta text |

### Light Mode
| Token | Hex | Usage |
|---|---|---|
| `bg-base` | `#faf9ff` | Page background |
| `bg-surface` | `#ffffff` | Cards, navbar, contact section |
| `bg-surface-2` | `#f5f3fd` | Image placeholders, hover states |
| `border` | `#e4e0f4` | All borders |
| `accent` | `#534AB7` | Buttons, icons, active links, stars |
| `accent-dark` | `#3C3489` | Hover state for accent |
| `accent-muted` | `#7F77DD` | Secondary accent, featured badges |
| `accent-bg` | `#EEEDFE` | Accent-tinted surfaces |
| `text-primary` | `#1a1530` | Headings, names, labels |
| `text-secondary` | `#8880a8` | Body text, quotes |
| `text-muted` | `#8880a8` | Placeholder labels, nav links, meta text |

### Tailwind Config additions
```js
// tailwind.config.js
extend: {
  colors: {
    accent: {
      DEFAULT: '#7F77DD',  // dark mode
      dark:    '#534AB7',  // light mode / hover
      muted:   '#AFA9EC',
      bg:      '#2a2040',
      light:   '#EEEDFE',  // light mode bg tint
    }
  }
}
```

---

## Typography

- **Font:** System font stack via Tailwind (`font-sans`)
- **Headings:** `font-medium` (500 weight only — never bold/700)
- **Body:** `font-normal` (400)
- **No ALL CAPS anywhere except the eyebrow label in the Hero**
- **Eyebrow:** uppercase, tracked, small, accent color

---

## Custom Cursor

Two-layer animated cursor — replaces the default OS cursor site-wide.

**Layer 1 — dot:**
- Size: 6×6px circle
- Color: accent (`#7F77DD` dark / `#534AB7` light)
- Follows mouse position exactly with no delay
- Has a soft glow: `box-shadow: 0 0 8px currentColor`

**Layer 2 — ring:**
- Size: 28×28px circle
- Border: 1.5px solid accent at 60% opacity
- Follows mouse with ~80ms easing delay (lerp)
- On hover over any button, link, or card: ring expands to 44×44px, fills with accent at 10% opacity

**Implementation notes:**
- Use `useEffect` to track `mousemove` on `window`
- Store mouse position in `useRef` for the dot (no lag)
- Store lerp position in `useRef` updated via `requestAnimationFrame` for the ring
- Hide on mobile (`pointer: coarse`) — show only on desktop
- Set `cursor: none` on `html` globally
- Both layers use `position: fixed`, `pointer-events: none`, `z-index: 9999`

---

## Animated Background

Subtle particle network that sits behind all content.

**Library:** `@tsparticles/react` with `@tsparticles/slim`

**Config:**
- Particle count: 60
- Particle color: accent at 25% opacity
- Particle size: 1.5–2.5px random
- Movement: slow drift, speed 0.4
- Line links: enabled, distance 120px, opacity 0.08, width 0.5px
- Interactivity: on hover, nearby particles move slightly toward cursor (grab effect, distance 100px)
- Background: transparent (sits behind page content)
- Responsive: reduce to 30 particles on mobile

---

## Layout & Sections

Single-page layout with smooth scroll. All sections scroll vertically. No page routing except `/akash-admin`.

**Section order:**
1. Navbar
2. Hero
3. Services
4. Work (Projects)
5. Testimonials
6. Contact

---

## Section 1 — Navbar

**Behavior:**
- Fixed to top, full width
- On load: transparent background, no border
- On scroll (>60px): background transitions to `bg-surface` with `backdrop-blur-sm`, border-bottom appears
- Transition: 300ms ease

**Left:** `ak.` logo in `text-primary`, medium weight, ~16px. Clicking scrolls to top.

**Center:** Nav links — `home`, `services`, `work`, `contact`
- Default color: `text-muted`
- Active (in-view section): `text-primary`, medium weight
- Hover: `text-secondary`, 200ms transition
- Active link gets a 2px underline in accent color

**Right:**
- Dark/light mode toggle — pill toggle, 36×20px, knob slides left/right
- `get a quote` button — filled accent button, rounded-md, 10px font, links to contact section

---

## Section 2 — Hero

Full-width section, vertically centered, min-height 90vh.

**Background:** tsparticles component rendered absolutely behind content.

**Content layout:** Two columns on desktop, stacked on mobile.

**Left column:**

Eyebrow label:
```
WEB DESIGN & DEVELOPMENT
```
- Uppercase, tracked, 11px, accent color, medium weight

Headline (large, animated — typewriter effect on load):
```
Your business deserves
a great website
```
- 40px desktop / 28px mobile
- `text-primary`, medium weight
- Line 2 has a subtle accent color underline decoration (not the text, a decorative line beneath)

Subheading:
```
I help local businesses get online with fast, professional
websites that bring in customers — not just look good.
```
- 14px, `text-secondary`, line-height 1.75

**CTA buttons (row):**
- Primary: `See my work` — filled accent, scrolls to Work section
- Secondary: `Let's talk` — outline, `text-secondary`, scrolls to Contact section

**Trust bar** (below buttons, separated by a top border):
Three stats in a row:
| Value | Label |
|---|---|
| 6+ | Projects delivered |
| Fast | Turnaround |
| 100% | Satisfaction |
- Stat value: 18px, accent color, medium weight
- Stat label: 10px, `text-muted`

**Right column:**
- Avatar circle: 96×96px, rounded-2xl
- Background: `accent-bg`, border: 1px solid accent at 30%
- Shows initials `AK` in accent color, 26px, medium weight
- On desktop: subtle floating animation (up/down, 6px travel, 3s ease infinite)

**Entry animations (Framer Motion):**
- Eyebrow fades in + slides up, 0ms delay
- Headline fades in + slides up, 100ms delay
- Subheading fades in + slides up, 200ms delay
- Buttons fade in + slide up, 300ms delay
- Trust bar fades in, 400ms delay
- Avatar fades in + scales from 0.9, 200ms delay

---

## Section 3 — Services

Section title: `What I offer`
- 18px, `text-primary`, medium weight
- Small accent line/dot decoration to the left

**Grid:** 2×2 on desktop, 1 column on mobile, gap 12px

**4 service cards:**

| Icon | Name | Description |
|---|---|---|
| `layout` | Landing pages | A single, powerful page that tells your story and converts visitors into customers. |
| `world` | Business websites | Multi-page sites with everything your business needs — about, services, contact and more. |
| `refresh` | Website redesigns | Got an old or ugly site? I'll rebuild it clean, fast, and mobile-friendly. |
| `device-mobile` | Mobile-first design | Most customers browse on their phones. Every site I build looks perfect on all screens. |

**Card design:**
- Background: `bg-surface`
- Border: 0.5px `border`
- Border-radius: rounded-lg
- Padding: 16px 18px
- Icon: Lucide icon, 20px, accent color, margin-bottom 10px
- Service name: 13px, `text-primary`, medium weight
- Description: 11px, `text-secondary`, line-height 1.65
- On hover: border color transitions to accent at 40% opacity, card lifts slightly (`translateY(-2px)`), 200ms ease

**Entry animation:** Cards stagger in from bottom, 80ms apart, triggered when section enters viewport (Framer Motion `whileInView`).

---

## Section 4 — Work (Projects)

Section title: `Recent work`

**Filter bar** (above grid):
Two filter rows:

Row 1 — Category: `All` · `Landing page` · `Business website` · `Redesign`
Row 2 — Type: `All` · `Single page` · `Multi-page`

- Active filter: accent-bg background, accent border, accent text
- Inactive: transparent background, `border` color, `text-muted`
- Border-radius: rounded-full (pill)
- Font: 10px

**Grid:** 2×N on desktop, 1 column on mobile

**Project card design:**
- Background: `bg-surface`
- Border: 0.5px `border`, rounded-lg
- Featured cards: 1px border in `accent-muted` color
- Image area: 120px tall, `bg-surface-2`, shows project screenshot (or placeholder with project icon)
- Featured badge: top-right of image, `accent-muted` text, `accent-bg` background, `accent` border

**Card body:**
- Project name: 12px, `text-primary`, medium weight
- Description: 10px, `text-secondary`, 2 lines max
- CTA link: `View project →` in accent color, 10px, medium weight. Opens live link in new tab.

**Projects data** (stored in `src/data/projects.js`):
```js
export const projects = [
  {
    id: 1,
    title: "Restaurant website",
    description: "Modern multi-page site for a local restaurant with menu and booking.",
    image: "/images/projects/restaurant.png",
    category: "Business website",
    type: "Multi-page",
    liveUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Salon landing page",
    description: "Clean landing page for a local beauty salon with services and booking CTA.",
    image: "/images/projects/salon.png",
    category: "Landing page",
    type: "Single page",
    liveUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Retail store site",
    description: "Product showcase and contact page for a local clothing shop.",
    image: "/images/projects/retail.png",
    category: "Business website",
    type: "Multi-page",
    liveUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Gym website",
    description: "Bold one-page site for a local gym with class schedule and membership plans.",
    image: "/images/projects/gym.png",
    category: "Landing page",
    type: "Single page",
    liveUrl: "#",
    featured: false,
  },
]
```

**Filter logic:**
- Both filters work simultaneously (AND condition)
- `All` resets that filter group
- Filtered cards animate out/in using Framer Motion layout animations (`AnimatePresence` + `layout` prop)

**Entry animation:** Grid fades in when section enters viewport.

---

## Section 5 — Testimonials

Section title: `What clients say`

**Grid:** 2 columns on desktop, 1 column on mobile

**Testimonial card design:**
- Background: `bg-surface`
- Border: 0.5px `border`, rounded-lg
- Padding: 14px 16px

**Card content:**
- Quote text: 11px, `text-secondary`, italic, line-height 1.7, margin-bottom 12px
- Divider: 0.5px `border`
- Bottom row (below divider):
  - Avatar circle: 28×28px, `accent-bg` background, initials in `accent-muted`, 9px, rounded-full
  - Name: 11px, `text-primary`, medium weight
  - Business name: 9px, `text-muted`
  - Stars: `★★★★★` right-aligned, accent color, 11px

**Testimonials data** (stored in `src/data/testimonials.js`):
```js
export const testimonials = [
  {
    id: 1,
    quote: "Akash built our restaurant website in under a week. Customers keep complimenting it and we've seen more bookings since launch.",
    name: "Ravi Kumar",
    business: "Spice Garden, Nagercoil",
    initials: "RK",
  },
  {
    id: 2,
    quote: "Very professional and easy to work with. He understood exactly what we needed and delivered something better than we imagined.",
    name: "Priya Menon",
    business: "Glow Salon, Marthandam",
    initials: "PM",
  },
  {
    id: 3,
    quote: "Our online presence completely changed after the redesign. We get calls from new customers every week now.",
    name: "Samuel John",
    business: "JS Textiles, Kanyakumari",
    initials: "SJ",
  },
  {
    id: 4,
    quote: "Fast delivery, great communication, and the result was exactly what we wanted. Highly recommend Akash.",
    name: "Leela Devi",
    business: "FitZone Gym, Nagercoil",
    initials: "LD",
  },
]
```

**Entry animation:** Cards stagger in from bottom, 80ms apart, on viewport entry.

---

## Section 6 — Contact

Background: `bg-surface` (slightly different from page bg to visually close the page)
Padding: 40px 0

**Headline:**
```
Ready to grow your business online?
```
- 20px, `text-primary`, medium weight

**Subtext:**
```
Let's talk about your project. I'll get back to you the same day.
```
- 12px, `text-secondary`

**Contact links row:**
Three buttons side by side:
- `WhatsApp` — outline button with WhatsApp icon (Lucide `MessageCircle`), opens `https://wa.me/[number]`
- `Instagram` — outline button with Instagram icon (Lucide `Instagram`), opens profile
- `Email me` — filled accent button with Mail icon, opens `mailto:akashkennedy@email.com`



**No footer. No copyright line. Page ends here.**

---

## Dark / Light Mode Toggle

**Storage:** Save preference to `localStorage` key `theme`
**Default:** `dark`
**Implementation:**
- Use a `ThemeProvider` context wrapping the entire app in `layout.jsx`
- Apply `dark` class to `<html>` element when dark mode is active
- Tailwind's `darkMode: 'class'` strategy
- Toggle button in navbar updates context and persists to localStorage
- On first load, read from localStorage; if absent, default to dark

---

## Custom Animated Cursor Component

File: `src/components/cursor/Cursor.jsx`

```
"use client"

Two divs — dot and ring — both position: fixed, pointer-events: none, z-index: 9999.

Track mousemove on window.
Dot follows exactly (transform: translate).
Ring uses requestAnimationFrame with linear interpolation (lerp factor 0.12).

On mouseenter of [data-hover] elements: add expanded class to ring.
On mouseleave: remove expanded class.

Add data-hover attribute to all buttons, links, and project cards.

Hide both elements on touch devices using a useEffect that checks
window.matchMedia('(pointer: coarse)').
```

---

## Admin Panel

**Route:** `/akash-admin`
**File:** `src/app/akash-admin/page.jsx`

**Authentication:**
- Single hardcoded password stored as an env variable: `NEXT_PUBLIC_ADMIN_PASSWORD`
- On login, store a token in `localStorage`: `admin_auth = true`
- If token present on load, skip login screen
- Logout clears the token

**Login screen:**
- Centered card, password input, `Login` button
- Wrong password: shake animation + error message

**Admin panel features:**

1. **Project management:**
   - Table listing all projects from `projects.js` + any added via admin
   - Add new project: form with fields — Title, Description, Image URL, Category, Type, Live URL, Featured toggle
   - Delete project: confirmation before delete
   - Toggle featured on/off per project

2. **Testimonial management:**
   - Table listing all testimonials
   - Add new testimonial: form with fields — Quote, Name, Business, Initials
   - Delete testimonial

**Data persistence:**
- Admin-added projects and testimonials saved to `localStorage` as `admin_projects` and `admin_testimonials`
- The main site merges `projects.js` + `localStorage` data at runtime using a `useProjects` hook
- Same pattern for testimonials with a `useTestimonials` hook

**Admin panel design:**
- Plain, functional — dark bg matching site, white/muted text
- No need to be fancy — only you will ever see it
- Simple table + form layout

---

## Folder Structure

```
portfolio/
├── public/
│   └── images/
│       └── projects/          ← project screenshots go here
├── src/
│   ├── app/
│   │   ├── layout.jsx         ← ThemeProvider, global cursor, metadata
│   │   ├── page.jsx           ← All sections assembled here
│   │   └── akash-admin/
│   │       └── page.jsx       ← Admin panel
│   ├── components/
│   │   ├── cursor/
│   │   │   └── Cursor.jsx
│   │   ├── background/
│   │   │   └── Background.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Work.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Contact.jsx
│   │   ├── ui/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── TestimonialCard.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── ThemeToggle.jsx
│   │   └── admin/
│   │       ├── AdminPanel.jsx
│   │       └── ProjectForm.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   ├── projects.js
│   │   └── testimonials.js
│   └── hooks/
│       ├── useCursor.js
│       ├── useProjects.js
│       └── useTestimonials.js
├── tailwind.config.js
└── next.config.js
```

---

## Component Responsibilities

| Component | Responsibility |
|---|---|
| `layout.jsx` | Wraps app in ThemeProvider, renders Cursor and Background globally, sets metadata |
| `page.jsx` | Assembles all sections in order: Navbar, Hero, Services, Work, Testimonials, Contact |
| `Cursor.jsx` | Two-layer custom cursor, desktop only |
| `Background.jsx` | tsparticles animated background, client component |
| `Navbar.jsx` | Fixed nav with scroll-aware styling, theme toggle, smooth scroll links |
| `Hero.jsx` | Headline, subtext, CTAs, trust stats, avatar, typewriter animation |
| `Services.jsx` | 2×2 service card grid with hover animations |
| `Work.jsx` | Filter bar + project card grid with AnimatePresence filtering |
| `Testimonials.jsx` | Staggered testimonial card grid |
| `Contact.jsx` | Headline, contact buttons, location note |
| `ThemeContext.jsx` | Provides `theme` state and `toggleTheme` function globally |
| `useProjects.js` | Merges static projects.js with localStorage admin projects |
| `useTestimonials.js` | Merges static testimonials.js with localStorage admin testimonials |

---

## Animations Summary

| Element | Animation | Library |
|---|---|---|
| Hero text (each line) | Fade up, staggered | Framer Motion |
| Hero avatar | Fade in + scale, then float loop | Framer Motion |
| Section headings | Fade up on viewport entry | Framer Motion `whileInView` |
| Service cards | Stagger up on viewport entry | Framer Motion |
| Project cards | Layout animation on filter change | Framer Motion `AnimatePresence` |
| Testimonial cards | Stagger up on viewport entry | Framer Motion |
| Cursor dot | Instant follow | `requestAnimationFrame` |
| Cursor ring | Lerp follow + expand on hover | `requestAnimationFrame` |
| Navbar bg | Fade in on scroll | CSS transition |
| Page background | Particle drift | tsparticles |
| Service card hover | Lift + border glow | CSS transition |

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| Mobile (`< 768px`) | Single column layout everywhere, cursor hidden, particles reduced to 30 |
| Tablet (`768px–1024px`) | 2-column services, 2-column projects |
| Desktop (`> 1024px`) | Full layout as designed |

---

## SEO & Metadata (in layout.jsx)

```js
export const metadata = {
  title: "Akash Kennedy — Web Designer for Local Businesses",
  description: "I build fast, professional websites for local businesses. Landing pages, business websites, and redesigns. Get in touch today.",
  keywords: ["web designer", "website for business", "landing page", "local business website"],
  openGraph: {
    title: "Akash Kennedy — Web Designer",
    description: "Fast, professional websites for local businesses.",
    url: "https://akashkennedy.vercel.app",
  }
}
```

---

## Environment Variables (.env.local)

```
NEXT_PUBLIC_ADMIN_PASSWORD=your_password_here
```

---

## Build & Run Commands

```bash
# Install dependencies
npm install framer-motion @tsparticles/react @tsparticles/slim lucide-react

# Run dev server
npm run dev

# Build for production
npm run build

# Deploy (push to GitHub, Vercel auto-deploys)
```

---

## Notes for Antigravity

- All interactive components need `"use client"` at the top
- Background and Cursor components must be client components
- tsparticles `init` function must be called once using `useCallback` inside the component
- Use `next/image` for all project screenshot images with `fill` or explicit `width`/`height`
- Smooth scroll: add `scroll-behavior: smooth` to `html` in globals.css
- The admin route `/akash-admin` should NOT appear in the navbar or anywhere on the public site
- All section `id` attributes must match navbar scroll targets: `#services`, `#work`, `#testimonials`, `#contact`
