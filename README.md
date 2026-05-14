# Lim Mengty — Personal Portfolio

Personal portfolio and blog built with Next.js 16, featuring bilingual support (English & Khmer), MDX blog, and a clean monochrome design.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4, ShadCN UI
- **i18n:** next-intl (km / en)
- **Blog:** MDX with next-mdx-remote, remark-gfm
- **Animation:** Framer Motion
- **Package Manager:** pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/          # Next.js App Router pages
src/
  views/      # Page-level view components
  shared/     # Shared UI, layout, hooks, lib
data/         # Static data (projects, experience, profile)
content/      # MDX blog posts (en/ and km/)
messages/     # i18n translation files
```

## Features

- Bilingual (English / Khmer) with locale-based routing
- MDX blog with syntax highlighting, GFM tables, TOC
- Dark / light mode
- Responsive with mobile bottom nav
- Static export ready
