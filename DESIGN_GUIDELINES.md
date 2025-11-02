# Islamic Knowledge App - Design Guidelines

## Professional Spacing System

This document defines the **exact spacing standards** used throughout the application to ensure pixel-perfect consistency across all components.

### Base Unit: 4px

All spacing values are multiples of 4px for mathematical consistency and visual harmony.

### Spacing Tokens (CSS Variables)

```css
--spacing-xs: 0.5rem;   /* 8px  */
--spacing-sm: 0.75rem;  /* 12px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.25rem;  /* 20px */
--spacing-xl: 1.5rem;   /* 24px */
--spacing-2xl: 2rem;    /* 32px */
```

---

## Header Standards

### Universal Header Specifications
**ALL headers across the application MUST use these exact values:**

```css
height: 4rem;           /* 64px - h-16 */
padding-left: 1rem;     /* 16px - px-4 */
padding-right: 1rem;    /* 16px - px-4 */
padding-top: 0.75rem;   /* 12px - py-3 */
padding-bottom: 0.75rem; /* 12px - py-3 */
```

**Tailwind Classes:** `h-16 px-4 py-3 flex items-center justify-between border-b border-border`

### Components Using This Header Standard:

1. **Hamburger Sidebar Header** (`AppSidebar.tsx`)
   - Contains menu icon
   - Height: **64px**

2. **Page Headers** (`QuranReader.tsx`, `HadithReader.tsx`)
   - Contains back button, title/subtitle, settings button
   - Height: **64px**

3. **Settings Sheets** (`QuranSettingsSheet.tsx`, `HadithSettingsSheet.tsx`)
   - Contains title and close button
   - Height: **64px**

4. **All Drawers** (`AddToDaleelDrawer.tsx`, `TafseerDrawer.tsx`, `TranslationDrawer.tsx`, etc.)
   - Contains title and close button
   - Height: **64px**

---

## Button Standards

### Header Buttons

All interactive buttons in headers (back, settings, close, menu) use:

```css
width: 2.5rem;   /* 40px - w-10 */
height: 2.5rem;  /* 40px - h-10 */
```

**Icon Size Inside Buttons:**
```css
width: 1.25rem;  /* 20px - w-5 */
height: 1.25rem; /* 20px - h-5 */
```

**Tailwind Classes:** `w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center`

**Icon Classes:** `w-5 h-5`

---

## Content Padding

### Standard Content Sections

All content areas below headers use:

```css
padding-left: 1rem;   /* 16px - px-4 */
padding-right: 1rem;  /* 16px - px-4 */
padding-top: 1.5rem;  /* 24px - py-6 */
padding-bottom: 1.5rem; /* 24px - py-6 */
```

**Tailwind Classes:** `px-4 py-6`

### Vertical Spacing Between Elements

- Tight spacing: `space-y-4` (16px)
- Standard spacing: `space-y-6` (24px)
- Loose spacing: `space-y-8` (32px)

---

## Typography Standards

### Header Titles
- Font size: `text-xl` (20px)
- Line height: `leading-6` (24px)
- Font weight: `font-semibold` (600)

### Subtitles
- Font size: `text-sm` (14px)
- Line height: `leading-5` (20px)
- Color: `text-muted-foreground`

### Body Text
- Font size: `text-base` (16px)
- Line height: `leading-relaxed` (1.625)

### Arabic Text
- Font family: `font-arabic` (Indopak Quran)
- Adjust sizes using: `text-lg`, `text-xl`, `text-2xl`, etc.

---

## Elevation System

### Interactive States

```css
/* Hover state */
.hover-elevate:hover::after {
  background-color: var(--elevate-1);  /* rgba(0,0,0, .03) in light mode */
}

/* Active/Pressed state */
.active-elevate-2:active::after {
  background-color: var(--elevate-2);  /* rgba(0,0,0, .08) in light mode */
}
```

---

## Border Standards

All borders use: `border-b border-border` or `border border-border`

Border color automatically adjusts for light/dark mode via CSS variables.

---

## Consistency Checklist

When creating new components:

- [ ] Headers use `h-16 px-4 py-3`
- [ ] Buttons use `w-10 h-10` with `w-5 h-5` icons
- [ ] Content uses `px-4 py-6`
- [ ] Spacing uses multiples of 4px
- [ ] Border uses `border-border` variable
- [ ] Interactive elements use `hover-elevate active-elevate-2`

---

## Zero Tolerance Policy

**All headers MUST be exactly 64px.** No exceptions.
**All header buttons MUST be exactly 40px.** No exceptions.
**All header icons MUST be exactly 20px.** No exceptions.

Any deviation creates visual inconsistency and is considered a bug.

---

Last Updated: November 2, 2025
