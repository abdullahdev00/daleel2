# Islamic Books Library - Design Guidelines (Nusuk Inspired)

## Design System

### Color Palette
```
Primary Colors:
- Primary Dark: #2C3E3F (Deep teal-black)
- Primary Teal: #3D5556 (Medium teal)
- Accent Gold: #C9A96E (Soft gold/beige)
- Accent Green: #5A7A6B (Muted sage green)

Backgrounds:
- BG Dark: #1F2A2B (Main dark background)
- BG Card Dark: #2A3738 (Card background)
- BG Card Darker: #242F30 (Slightly darker cards)

Text:
- Primary: #FFFFFF (Pure white)
- Secondary: #B8C5C6 (Light gray-teal)
- Muted: #7A8B8C (Muted gray)
- Gold: #D4C5A0 (Light gold)

Accents:
- Highlight Blue: #5B8FA3 (Timers)
- Border Subtle: #3A4748
- Border Light: #4A5859
```

### Typography
- Arabic Font: 'Noto Naskh Arabic', 'Scheherazade New', serif
- English Font: 'Inter', 'SF Pro Display', sans-serif
- Heading Font: 'Playfair Display', 'Amiri', serif
- Sizes: 10px (xs), 12px (sm), 14px (base), 16px (lg), 18px (xl), 24px (2xl), 32px (3xl), 40px (4xl)
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Line Heights: 1.2 (tight), 1.5 (normal), 1.8 (relaxed), 2.0 (loose - for reading)

### Spacing
Use Tailwind units: 4px (1), 8px (2), 12px (3), 16px (4), 24px (6), 32px (8), 48px (12), 64px (16)

### Border Radius
- Small: 8px (buttons, inputs)
- Medium: 12px (cards, search bars)
- Large: 16px (large cards)
- XL: 20px (hero sections, prayer widget)
- 2XL: 24px (special cards)
- Full: 9999px (circular buttons)

### Shadows & Effects
- Small: 0 2px 8px rgba(0,0,0,0.15)
- Medium: 0 4px 16px rgba(0,0,0,0.20)
- Large: 0 8px 24px rgba(0,0,0,0.25)
- XL: 0 12px 32px rgba(0,0,0,0.30)
- Gold Glow: 0 0 20px rgba(201,169,110,0.3)

## Page Layouts

### Home Page
**Hero Section:**
- Background: #1F2A2B with subtle golden geometric pattern overlay (5% opacity)
- Height: 40vh minimum
- Centered text: "Your journey begins here" (Playfair Display, 40px, white)
- Subtitle: 16px, #B8C5C6
- Soft fade-in animation (0.8s)

**Status Bar (Sticky Top):**
- Height: 60px
- Background: #2C3E3F (95% opacity)
- Shows: Time | Prayer (Fajr - 05:21) | Location (Makkah) | Icons
- Gold icons (#C9A96E)

**Quick Actions Grid:**
- 3 columns desktop, 2 tablet, 1 mobile
- Card gradients:
  - Hajj: linear-gradient(135deg, #3A4748, #2C3E3F)
  - Umrah: linear-gradient(135deg, #6B5D4F, #5A4A3A)
  - Rawdah: linear-gradient(135deg, #3D5556, #2F4445)
- Border radius: 16px, padding: 20px, height: 120px
- Plus icon: top-right, circular (32px), gold
- Hover: scale 1.02, shadow increase

**Prayer Times Widget:**
- Background: Image with dark overlay (70% opacity)
- Height: 280px, border radius: 20px
- Timer: 48px, white, bold, monospace
- Prayer names: 11px, small caps, gold
- Minimal Islamic symbols below names

**Bottom Navigation:**
- Background: #242F30, height: 70px
- 5 tabs: Home, Explore, Card, Discover, Services
- Active: gold underline (2px), white text
- Inactive: gray icons/text
- Border-top: 1px solid #3A4748

### Books Listing Page
**Header:**
- Background: #1F2A2B
- Back arrow + "Al-Kutub Library" title
- Search bar: #2A3738 background, #4A5859 border, 12px radius, gold icon

**Filter Tabs:**
- Horizontal scroll: All, Tafseer, Hadith, Fiqh, Seerah
- Active: gold underline (#C9A96E, 2px)
- Font: 14px, padding: 8px 16px

**Book Cards (List View):**
- Background: #2A3738, border: 1px solid #3A4748
- Border radius: 12px, padding: 16px, margin: 12px bottom
- Icon: gradient (64px) - green (Tafseer), gold (Hadith), blue (Fiqh)
- Title: 16px semibold, author: 14px secondary color
- Arrow: gold, 20px, right-aligned
- Hover: background #2F3E3F

### Book Reader Page
**Header Bar:**
- Sticky, background: #2C3E3F, height: 56px
- Back button (circle, 40px), book title, search/menu icons (gold)

**Layout:**
- Sidebar (280px desktop, drawer mobile): #242F30
- Current chapter: 3px gold left bar, checkmarks for completed
- Chapter hover: #2A3738

**Reading Area:**
- Themes:
  - Dark: #1F2A2B background, white text
  - Light: #FAF9F6 background, #1F2937 text
  - Sepia: #F4ECD8 background
- Font: 18px (adjustable 16-22px), line-height 2.0
- Padding: 48px 32px, text-align: right (RTL)
- Max-width: 800px centered

**Bottom Controls:**
- Semi-transparent (#2C3E3F, 95%), fixed bottom
- Previous/Next buttons, page indicator (1/500)
- Border radius: 12px, floating above text

**Floating Actions (Right Side):**
- Circular buttons: A-, A+, Bookmark, Theme toggle
- Background: #2A3738, gold icons
- Spacing: 12px between

## Images
No hero images required. Use:
- Subtle geometric Islamic patterns (overlays at 5% opacity)
- Book cover gradients (category-specific colors)
- Prayer times background with 70% dark overlay for readability

## Animations
- Fade-in: 0.8s ease for hero
- Hover effects: scale 1.02, shadow increase
- Tab transitions: smooth underline slide
- Theme switch: 0.3s ease
- Minimal, purposeful animations only