# Cyber Theme - Quick Reference Guide

## Color Palette Quick Reference

### Primary Colors
```
Cyan/Electric Blue: #06b6d4 | #0ea5e9 | #38bdf8
Deep Blue: #3b82f6 | #2563eb
Navy Background: #020617 | #0f172a | #1e293b
Slate Surfaces: #0f172a | #1e293b | #334155 | #475569
```

### Semantic Colors
```
Success: #10b981 (emerald) / #22c55e (bright)
Warning: #f59e0b (amber) / #fbbf24 (bright)
Error: #ef4444 (red) / #f43f5e (rose)
Info: #06b6d4 (cyan) / #0ea5e9 (bright)
```

### Text Colors
```
Primary: #f8fafc (white)
Secondary: #cbd5e1 (light slate)
Tertiary: #94a3b8 (slate)
Muted: #64748b (dark slate)
```

## Component Classes Cheat Sheet

### Backgrounds
```html
<!-- Dark surfaces -->
bg-slate-950          <!-- Deep dark -->
bg-slate-900/80       <!-- Semi-transparent dark -->
bg-slate-900/70       <!-- More transparent -->

<!-- Gradients -->
bg-gradient-to-r from-cyan-500 to-blue-500
bg-gradient-to-br from-slate-900/80 to-slate-950
```

### Borders & Shadows
```html
<!-- Borders -->
border-cyan-500/20    <!-- Subtle cyan -->
border-cyan-500/30    <!-- Moderate cyan -->
border-slate-700/50   <!-- Subtle dark -->

<!-- Shadows -->
shadow-lg shadow-cyan-500/10
shadow-xl shadow-blue-500/20
shadow-2xl shadow-cyan-500/10
```

### Text & Typography
```html
<!-- Size -->
text-5xl              <!-- Hero titles -->
text-3xl              <!-- Large numbers -->
text-lg               <!-- Body text -->
text-sm               <!-- Labels -->

<!-- Style -->
font-black text-slate-100           <!-- Bold headings -->
font-semibold uppercase tracking-widest <!-- Section titles -->
font-mono text-cyan-300             <!-- Code/hashes -->
text-slate-400                      <!-- Muted text -->
```

### Buttons
```html
<!-- Primary CTA -->
<button class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 
               text-white font-semibold px-8 py-3 rounded-xl 
               shadow-lg shadow-cyan-500/20 active:scale-95 transition-all">
  Click Me
</button>

<!-- Secondary CTA -->
<button class="bg-slate-900/70 border border-cyan-500/20 hover:border-cyan-500/50
               text-slate-200 font-semibold px-6 py-2.5 rounded-xl
               transition-all active:scale-95">
  Secondary
</button>

<!-- Ghost Button -->
<button class="text-cyan-400 hover:text-cyan-300 
               p-2 hover:bg-cyan-500/10 rounded-lg transition-colors">
  Icon
</button>
```

### Cards
```html
<div class="p-8 bg-gradient-to-br from-slate-900/80 to-slate-950 
            border-2 border-cyan-500/30 rounded-2xl 
            shadow-2xl shadow-cyan-500/10 
            relative overflow-hidden backdrop-blur-xl">
  <div class="absolute -top-20 -right-20 w-48 h-48 
              bg-cyan-500/10 rounded-full blur-3xl"></div>
  <div class="relative z-10">
    Content goes here
  </div>
</div>
```

### Status Badges
```html
<!-- Success -->
<div class="inline-flex items-center gap-2 px-3 py-1.5 
            bg-emerald-500/10 border border-emerald-500/30 
            rounded-full text-emerald-300 text-xs font-semibold 
            shadow-lg shadow-emerald-500/10">
  <CheckCircle size={16} />
  <span>Verified</span>
</div>

<!-- Warning -->
<div class="inline-flex items-center gap-2 px-3 py-1.5 
            bg-amber-500/10 border border-amber-500/30 
            rounded-full text-amber-300 text-xs font-semibold 
            shadow-lg shadow-amber-500/10">
  <AlertTriangle size={16} />
  <span>Pending</span>
</div>

<!-- Error -->
<div class="inline-flex items-center gap-2 px-3 py-1.5 
            bg-rose-500/10 border border-rose-500/30 
            rounded-full text-rose-300 text-xs font-semibold 
            shadow-lg shadow-rose-500/10">
  <XCircle size={16} />
  <span>Failed</span>
</div>
```

### Input Fields
```html
<input type="text" 
       placeholder="Search..."
       class="w-full pl-12 pr-4 py-3 
              bg-slate-900/70 border border-cyan-500/20 
              hover:border-cyan-500/40 focus:border-cyan-500 
              rounded-xl text-slate-100 placeholder-slate-500 
              transition-all focus:outline-none 
              focus:shadow-lg focus:shadow-cyan-500/20" />
```

### Tables
```html
<!-- Header -->
<thead class="bg-slate-950/80 border-b border-cyan-500/20">
  <tr>
    <th class="text-left py-4 px-6 text-slate-300 font-semibold 
               text-sm uppercase tracking-wider">
      Header
    </th>
  </tr>
</thead>

<!-- Body -->
<tbody class="divide-y divide-slate-700/50">
  <tr class="hover:bg-slate-900/30 transition-colors">
    <td class="py-4 px-6 text-slate-200">Data</td>
  </tr>
</tbody>
```

## Animation Classes

### Available Animations
```css
animate-fade-up         /* Fade in while moving up */
animate-pulse-glow      /* Glow pulse effect */
animate-slide-in        /* Slide in from left */
animate-spin            /* Spinning loader */
```

### Applying Animations
```html
<!-- Hero section fade in -->
<div class="animate-fade-up">Content</div>

<!-- Status glow -->
<div class="animate-pulse-glow">Active Status</div>

<!-- Dropdown animation -->
<div class="animate-slide-in">Dropdown Menu</div>
```

## Spacing & Sizing

### Standard Spacing (in 4px units)
```
p-2   = 8px    | p-4   = 16px  | p-6   = 24px  | p-8   = 32px
m-2   = 8px    | m-4   = 16px  | m-6   = 24px  | m-8   = 32px
gap-2 = 8px    | gap-4 = 16px  | gap-6 = 24px  | gap-8 = 32px
```

### Border Radius
```
rounded-lg  = 8px   (regular elements)
rounded-xl  = 12px  (buttons, inputs)
rounded-2xl = 16px  (cards, containers)
rounded-3xl = 24px  (hero elements)
```

## Gradient Examples

### Background Gradients
```html
<!-- Cyan to Blue (Primary) -->
from-cyan-500 to-blue-500

<!-- Slate gradient (Card) -->
from-slate-900/80 to-slate-950

<!-- Success gradient -->
from-emerald-500 to-teal-500

<!-- Warning gradient -->
from-amber-500 to-orange-500

<!-- Danger gradient -->
from-rose-500 to-red-500
```

## Common Patterns

### Hero Card
```html
<div class="p-8 bg-gradient-to-br from-slate-900/80 to-slate-950 
            border-2 border-cyan-500/30 rounded-2xl 
            shadow-2xl shadow-cyan-500/10 relative overflow-hidden backdrop-blur-xl">
  <div class="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
  <div class="relative z-10"><!-- Content --></div>
</div>
```

### Stat Card
```html
<div class="p-6 bg-gradient-to-br from-slate-900/80 to-slate-950 
            border-2 border-cyan-500/30 rounded-xl 
            shadow-lg shadow-cyan-500/10 backdrop-blur-xl">
  <div class="flex items-center gap-4">
    <div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 
                rounded-lg flex items-center justify-center 
                shadow-lg shadow-cyan-500/30">
      <Icon class="text-white" size={24} />
    </div>
    <div>
      <p class="text-slate-400 text-sm font-semibold uppercase">Label</p>
      <p class="text-slate-100 font-bold text-3xl">123</p>
    </div>
  </div>
</div>
```

### Search Bar
```html
<div class="relative flex-1">
  <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" size={18} />
  <input type="text" 
         placeholder="Search..."
         class="w-full pl-12 pr-4 py-3 bg-slate-900/70 border border-cyan-500/20 
                hover:border-cyan-500/40 focus:border-cyan-500 rounded-xl 
                text-slate-100 placeholder-slate-500 transition-all 
                focus:outline-none focus:shadow-lg focus:shadow-cyan-500/20" />
</div>
```

## Typography Hierarchy

```
H1: text-5xl font-black uppercase tracking-widest    → Hero titles
H2: text-2xl font-bold uppercase tracking-wide       → Section headers
H3: text-xl font-semibold uppercase tracking-wide    → Subsections
Body: text-base font-medium text-slate-200          → Regular text
Small: text-sm font-semibold text-slate-400         → Labels
Micro: text-xs font-semibold uppercase tracking-wide → Tags/Badges
```

## Mobile Responsive Pattern

```html
<!-- Desktop: 4 columns | Mobile: 1 column -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
</div>

<!-- Desktop: Row | Mobile: Column -->
<div class="flex flex-col md:flex-row gap-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

---

**Reference Version**: 1.0
**Last Updated**: November 26, 2025
