# Cybersecurity Dark Mode - Visual Style Guide

## 🎨 Color Palette System

### Primary Colors

```
CYAN (Primary Accent)
  └─ 50: #cffafe   └─ 400: #22d3ee
  └─ 100: #a5f3fc  └─ 500: #06b6d4  ← Use this
  └─ 200: #67e8f9  └─ 600: #0891b2
  └─ 300: #22d3ee  └─ 700: #0e7490
```

```
BLUE (Secondary Accent)
  └─ 400: #60a5fa
  └─ 500: #3b82f6  ← Use this
  └─ 600: #2563eb
  └─ 700: #1d4ed8
```

### Semantic Colors

```
SUCCESS (Emerald)         WARNING (Amber)         ERROR (Rose)
├─ 300: #86efac          ├─ 400: #fbbf24        ├─ 300: #fda4af
├─ 400: #4ade80          ├─ 500: #f59e0b        ├─ 400: #f87171
├─ 500: #10b981 ✓        ├─ 600: #d97706        ├─ 500: #f43f5e ✓
└─ 600: #059669          └─ 700: #b45309        └─ 600: #e11d48
```

### Neutral (Background & Text)

```
SLATE (Backgrounds)
└─ 50: #f8fafc    (Text only)
└─ 100: #f1f5f9   (Text only)
└─ 200: #e2e8f0   (Text only)
└─ 300: #cbd5e1   (Text light)
└─ 400: #94a3b8   (Text muted)
└─ 500: #64748b   (Text muted)
└─ 600: #475569   (Hover states)
└─ 700: #334155   (Borders)
└─ 800: #1e293b   (Cards)
└─ 900: #0f172a   (Dark surfaces)
└─ 950: #020617 ✓ (Background)
```

## 🔵 Component Color Schemes

### Navigation & Header
```
Background:     bg-slate-950 (body)
                bg-slate-950/95 (header)
Borders:        border-cyan-500/20
Text Primary:   text-slate-100
Text Secondary: text-slate-400
Accents:        text-cyan-400
Shadow:         shadow-cyan-500/10
```

### Buttons

```
PRIMARY BUTTON
┌─ Background:  from-cyan-500 to-blue-500
├─ Hover:       from-cyan-400 to-blue-400
├─ Active:      scale-95
├─ Text:        text-white
└─ Shadow:      shadow-cyan-500/20

SECONDARY BUTTON
┌─ Background:  bg-slate-900/70
├─ Border:      border-cyan-500/20
├─ Hover:       border-cyan-500/50
├─ Text:        text-slate-200
└─ Shadow:      none

GHOST BUTTON
┌─ Background:  transparent
├─ Text:        text-cyan-400
├─ Hover:       bg-cyan-500/10
└─ Shadow:      none
```

### Cards

```
GLASS CARD (Default)
┌─ Background:    from-slate-900/80 to-slate-950
├─ Border:        border-cyan-500/30
├─ Shadow:        shadow-cyan-500/10
├─ Blur:          backdrop-blur-xl
├─ Radius:        rounded-2xl
└─ Glow Accent:   20% opacity cyan blob top-right

STAT CARD
┌─ Background:    from-slate-900/80 to-slate-950
├─ Border:        border-[status-color]/30
├─ Icon BG:       gradient (cyan/blue/emerald/amber/rose)
├─ Icon Shadow:   shadow-[status-color]/30
└─ Text:          text-slate-100 (number), text-slate-400 (label)

TABLE CARD
┌─ Background:    from-slate-950/80 with border-cyan-500/20
├─ Header:        bg-slate-950/80 border-cyan-500/20
├─ Rows:          divide-slate-700/50
├─ Hover:         bg-slate-900/30
└─ Text:          text-slate-200 (data), text-slate-300 (header)
```

### Status Badges

```
VERIFIED (Success)
┌─ Background:  bg-emerald-500/10
├─ Border:      border-emerald-500/30
├─ Text:        text-emerald-300
├─ Icon:        emerald-400
└─ Shadow:      shadow-emerald-500/10

PENDING (Warning)
┌─ Background:  bg-amber-500/10
├─ Border:      border-amber-500/30
├─ Text:        text-amber-300
├─ Icon:        amber-400
└─ Shadow:      shadow-amber-500/10

FAILED (Error)
┌─ Background:  bg-rose-500/10
├─ Border:      border-rose-500/30
├─ Text:        text-rose-300
├─ Icon:        rose-400
└─ Shadow:      shadow-rose-500/10

CONNECTED (Info)
┌─ Background:  bg-cyan-500/10
├─ Border:      border-cyan-500/30
├─ Text:        text-cyan-300
├─ Icon:        cyan-400
└─ Shadow:      shadow-cyan-500/10
```

### Input Fields

```
INPUT / TEXTAREA
┌─ Background:     bg-slate-900/70
├─ Border Normal:  border-cyan-500/20
├─ Border Hover:   border-cyan-500/40
├─ Border Focus:   border-cyan-500
├─ Focus Shadow:   shadow-cyan-500/20
├─ Text:           text-slate-100
├─ Placeholder:    text-slate-500
└─ Radius:         rounded-xl
```

## ✨ Special Effects

### Glow Shadow Template
```
shadow-[size] shadow-[color]/[opacity]
└─ Examples:
   └─ shadow-lg shadow-cyan-500/10 (subtle)
   └─ shadow-xl shadow-cyan-500/20 (medium)
   └─ shadow-2xl shadow-cyan-500/30 (strong)
```

### Glassmorphism Template
```
backdrop-blur-xl
+ border border-white/10 (light)
+ border-cyan-500/20 (colored)
+ bg-slate-900/80
+ shadow-lg shadow-cyan-500/10
= Premium frosted glass effect
```

### Gradient Template
```
bg-gradient-to-[direction]
from-[color]-[shade] to-[color]-[shade]

Examples:
└─ from-cyan-500 to-blue-500
└─ from-slate-900/80 to-slate-950
└─ from-emerald-500 to-teal-500
```

## 📏 Typography Hierarchy

```
H1 - HERO TITLE
├─ Size:      text-5xl
├─ Weight:    font-black
├─ Case:      uppercase
├─ Tracking:  tracking-widest
├─ Color:     text-slate-100
└─ Example:   CERTIFICATE VERIFICATION

H2 - SECTION HEADER
├─ Size:      text-2xl
├─ Weight:    font-bold
├─ Case:      uppercase
├─ Tracking:  tracking-wide
├─ Color:     text-slate-100
└─ Example:   Verification Process

H3 - SUBSECTION
├─ Size:      text-xl
├─ Weight:    font-semibold
├─ Case:      uppercase
├─ Tracking:  tracking-wide
├─ Color:     text-slate-200
└─ Example:   Transaction Details

BODY TEXT
├─ Size:      text-base
├─ Weight:    font-medium
├─ Case:      sentence case
├─ Color:     text-slate-300
└─ Example:   Enter your certificate hash to verify...

LABEL / CAPTION
├─ Size:      text-sm
├─ Weight:    font-semibold
├─ Case:      UPPERCASE
├─ Tracking:  tracking-wider
├─ Color:     text-slate-400
└─ Example:   CERTIFICATE HASH

MICRO / TAG
├─ Size:      text-xs
├─ Weight:    font-semibold
├─ Case:      UPPERCASE
├─ Tracking:  tracking-widest
├─ Color:     text-slate-300
└─ Example:   VERIFIED
```

## 🎭 Interactive States

### Buttons

```
DEFAULT
└─ bg-gradient-to-r from-cyan-500 to-blue-500
└─ text-white
└─ shadow-lg shadow-cyan-500/20

HOVER
└─ from-cyan-400 to-blue-400
└─ shadow-xl shadow-cyan-500/30
└─ scale-105 (optional)

ACTIVE/PRESSED
└─ scale-95
└─ shadow-md shadow-cyan-500/15

DISABLED
└─ opacity-50
└─ cursor-not-allowed
└─ no-pointer-events
```

### Cards

```
DEFAULT
└─ border-cyan-500/20
└─ shadow-lg shadow-cyan-500/10

HOVER
└─ border-cyan-500/40
└─ shadow-xl shadow-cyan-500/20
└─ translate-y-(-2) (optional lift)

ACTIVE
└─ scale-95
└─ shadow-md
```

### Links / Text Buttons

```
DEFAULT
└─ text-cyan-400

HOVER
└─ text-cyan-300

ACTIVE
└─ text-cyan-500

VISITED
└─ text-slate-400
```

## 🌈 Animation States

### Entrance Animations
```
FADE UP
└─ 0%:   opacity: 0, translateY(24px), scale(0.98)
└─ 100%: opacity: 1, translateY(0), scale(1)
└─ Duration: 400-600ms

SLIDE IN
└─ 0%:   opacity: 0, translateX(-24px)
└─ 100%: opacity: 1, translateX(0)
└─ Duration: 300-400ms
```

### Emphasis Animations
```
PULSE GLOW
└─ 0%:   box-shadow: 0 0 20px rgba(6, 182, 212, 0.3)
└─ 50%:  box-shadow: 0 0 30px rgba(6, 182, 212, 0.6)
└─ 100%: box-shadow: 0 0 20px rgba(6, 182, 212, 0.3)
└─ Duration: 2s, infinite

SCALE SPRING
└─ 0%:   scale(0.8)
└─ 50%:  scale(1.1)
└─ 100%: scale(1)
└─ Duration: 300ms
```

## 🎯 Spacing System

```
COMPONENT PADDING
└─ Compact:   p-2 (8px) - internal elements
└─ Normal:    p-4 (16px) - standard cards
└─ Generous:  p-6 (24px) - content areas
└─ Spacious:  p-8 (32px) - hero sections

ELEMENT GAP
└─ Tight:     gap-2 (8px) - closely related items
└─ Normal:    gap-4 (16px) - related groups
└─ Loose:     gap-6 (24px) - separate sections
└─ Very Loose: gap-8 (32px) - major sections

MARGIN BETWEEN SECTIONS
└─ Normal:    mb-6 (24px)
└─ Large:     mb-8 (32px)
└─ Extra:     mb-12 (48px)
```

## 📐 Border Radius Scale

```
TIGHT: rounded-lg
└─ Value: 8px
└─ Use: Input fields, small elements

NORMAL: rounded-xl
└─ Value: 12px
└─ Use: Buttons, badges, small cards

GENEROUS: rounded-2xl
└─ Value: 16px
└─ Use: Main cards, containers

EXTRA: rounded-3xl
└─ Value: 24px
└─ Use: Hero sections, large elements
```

## 🎪 Layout Patterns

### Hero Section
```
┌─ Background: radial gradients + grid overlay
├─ Content: centered text + icon
├─ Icon: 24x24 in gradient circle
├─ Spacing: large vertical padding
└─ Animation: fade-up on load
```

### Stat Card Grid
```
Grid: grid-cols-1 md:grid-cols-4
├─ Mobile: 1 column
├─ Tablet: 2 columns
└─ Desktop: 4 columns

Card Structure:
├─ Left: Icon in gradient circle
├─ Right: Label + number + trend
└─ All: Glassmorphic container
```

### Table Layout
```
┌─ Header: uppercase, tracked, bold
├─ Rows: alternating hover state
├─ Borders: subtle cyan dividers
├─ Density: generous padding
└─ Status: color-coded columns
```

## 🎬 Animation Timing

```
FAST:    100-150ms  (micro interactions)
NORMAL:  200-300ms  (standard transitions)
SLOW:    400-600ms  (entrance animations)
LOOPING: 2000-3000ms (pulse effects)

TIMING FUNCTION
└─ cubic-bezier(0.4, 0, 0.2, 1) - default ease-in-out
└─ ease-out - for entrance animations
└─ ease-in-out - for transitions
```

---

## 🖼️ Design Token Summary

| Token | Value | Usage |
|-------|-------|-------|
| Primary Color | #06b6d4 | Accents, active states |
| Secondary | #3b82f6 | Hover states, gradients |
| Background | #020617 | Page background |
| Surface | #0f172a | Card backgrounds |
| Border | rgba(6, 182, 212, 0.2) | Subtle borders |
| Text Primary | #f8fafc | Main text |
| Text Secondary | #94a3b8 | Secondary text |
| Text Muted | #64748b | Disabled, muted text |
| Success | #10b981 | Success states |
| Warning | #f59e0b | Warning states |
| Error | #ef4444 | Error states |

---

**Style Guide Version**: 1.0
**Last Updated**: November 26, 2025
**Status**: Production Ready ✅

