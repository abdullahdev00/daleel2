# Islamic Books Library - Al-Kutub

## Overview

Al-Kutub is a comprehensive Islamic knowledge platform that provides access to Quranic verses, authentic Hadiths, and Islamic scholarly books. The application features a modern, Nusuk-inspired dark theme interface with bilingual support (Arabic/English) and includes prayer time tracking functionality. Users can browse and read Islamic literature across multiple categories including Tafseer (Quranic exegesis), Hadith collections, Fiqh (Islamic jurisprudence), and Seerah (biographical writings about Prophet Muhammad).

## Recent Changes

**November 2, 2025 - Professional Spacing System Implementation**
- Established comprehensive spacing system with 4px base unit for pixel-perfect consistency
- Standardized ALL headers to exactly 64px height (h-16 px-4 py-3):
  - Hamburger sidebar header
  - Page headers (Quran Reader, Hadith Reader)
  - Settings sheets (Quran Settings, Hadith Settings)
  - All drawers (Add to Daleel, Tafseer, Translation, Reference, Commentary)
- Standardized ALL header buttons to 40px (w-10 h-10) with 20px icons (w-5 h-5)
- Standardized ALL content sections to use px-4 py-6 padding (16px horizontal, 24px vertical)
- Created DESIGN_GUIDELINES.md with complete spacing specifications and zero-tolerance policy
- Added CSS spacing tokens to index.css for consistent use across the app
- Cleaned up project: removed unused examples folder, cleared attached_assets folder

**November 2, 2025 - Daleel Page & Add to Daleel Drawer Improvements**
- Fixed "All" category button styling on Daleel page to show white ring border when selected
- Added "Create Daleel" button visibility when "All" category is selected
- Added "All" option to Add to Daleel bottom sheet showing all daleels from all categories
- Implemented automatic state reset in Add to Daleel drawer - always opens with "All" selected
- Ensured all daleels created from "All" view are assigned to "General" category

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript running on Vite as the build tool and development server.

**Routing**: Client-side routing implemented using Wouter, a lightweight React router. All routes are defined in `App.tsx` with dedicated pages for Home, Library browsing, Quran reading, Hadith reading, Books library, individual book pages, and Settings.

**State Management**: TanStack Query (React Query) v5 handles all server state, data fetching, and caching. No global client state management library is used - component state is managed locally with React hooks.

**UI Component System**: Built on Radix UI primitives with shadcn/ui components following the "New York" style variant. Components are highly customizable through Tailwind CSS with a comprehensive design system defined in `design_guidelines.md`.

**Styling Approach**: Tailwind CSS with custom CSS variables for theming. The design implements a Nusuk-inspired Islamic aesthetic with three theme modes (dark, light, sepia). Custom utility classes like `hover-elevate` and `active-elevate-2` provide consistent interactive feedback across the application.

**Typography**: Multi-font system supporting Arabic script through 'Noto Naskh Arabic' and 'Scheherazade New', with 'Inter' and 'SF Pro Display' for English text, and 'Playfair Display' and 'Amiri' for headings.

**Responsive Design**: Mobile-first approach with a bottom navigation bar for mobile devices (hidden on desktop) and a sidebar navigation for desktop screens. The layout adapts based on viewport size using Tailwind breakpoints.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript. The server handles both API routes and serves the Vite-built frontend in production.

**API Design**: RESTful API structure with endpoints organized by resource type:
- `/api/quran/verses` - Quran verse retrieval with optional surah filtering
- `/api/hadiths` - Hadith collections with book-based filtering  
- `/api/books` - Islamic book metadata
- `/api/books/:id/pages` - Individual book page content

**Development vs Production**: In development, Vite middleware is integrated into Express for HMR (Hot Module Replacement). In production, Express serves pre-built static assets from the `dist/public` directory.

**Data Layer**: Currently implements an in-memory storage layer (`MemStorage` class) that initializes with mock data. The architecture is designed with an `IStorage` interface to allow easy migration to a persistent database solution.

### Data Storage Design

**Database Schema**: Defined using Drizzle ORM with PostgreSQL dialect. Four main tables:
- `quran_verses` - Stores Quranic verses with Arabic text, translations, and transliterations
- `hadiths` - Hadith narrations with book, chapter, and narrator information
- `books` - Islamic book metadata (title, author, category, page count)
- `book_pages` - Individual page content for books

**ORM Choice**: Drizzle ORM selected for its TypeScript-first approach and lightweight design. Schema definitions in `shared/schema.ts` are co-located with Zod validation schemas for runtime type safety.

**Migration Strategy**: Drizzle Kit configured for schema migrations with output directory set to `./migrations`. The `db:push` script allows direct schema synchronization during development.

**Current Implementation**: While the schema is PostgreSQL-ready, the current runtime uses in-memory storage. The `@neondatabase/serverless` package is included in dependencies, indicating preparation for Neon serverless PostgreSQL deployment.

### Authentication and Authorization

No authentication or authorization mechanisms are currently implemented. The application is designed as a public-facing knowledge library with unrestricted access to all content.

## External Dependencies

### Database Services
- **Planned**: Neon Serverless PostgreSQL (package included but not yet connected)
- Database connection configured via `DATABASE_URL` environment variable in `drizzle.config.ts`

### UI Component Libraries
- **Radix UI**: Comprehensive suite of unstyled, accessible React components (@radix-ui/react-*)
- **shadcn/ui**: Pre-configured component collection built on Radix UI primitives
- **Lucide React**: Icon library providing consistent iconography throughout the application

### Development Tools
- **Replit-specific plugins**: Vite plugins for runtime error modal, cartographer, and dev banner (development environment only)
- **TypeScript**: Full type safety across client, server, and shared code
- **ESBuild**: Production server bundling

### Font Services
- **Google Fonts**: Serving Inter, Playfair Display, and Noto Naskh Arabic font families

### Styling Utilities
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **class-variance-authority**: Type-safe variant handling for component APIs
- **clsx & tailwind-merge**: Class name utilities for conditional styling

### Form Management (Ready for use)
- **React Hook Form**: Form state management with @hookform/resolvers for validation
- Zod integration via drizzle-zod for schema-based validation

### Date Handling
- **date-fns**: Modern date utility library (v3.6.0) used for prayer time calculations

### Session Management (Configured but unused)
- **connect-pg-simple**: PostgreSQL session store for Express sessions (ready for future authentication implementation)