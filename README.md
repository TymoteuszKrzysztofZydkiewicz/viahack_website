# VIA Hackathon

A responsive Next.js App Router site built with TypeScript, React, Tailwind CSS, Lucide, and Framer Motion. The home page looks ahead to 2027; edition archives and the photo gallery have their own routes.

## Development

```sh
npm install
npm run dev
```

`npm run build` creates the production build and runs strict TypeScript validation. `npm start` serves it. `npm run typecheck` checks types separately.

## Pages and reusable components

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | 2027 hero, experience, edition previews, organizers, collaboration |
| `app/2026/page.tsx`, `app/2025/page.tsx` | Archive pages using `components/edition-page.tsx` |
| `app/gallery/page.tsx` | Year filters, masonry grid, and photo viewer |
| `lib/types.ts` | `Edition`, `Sponsor`, `TeamMember`, `WinningProject`, `GalleryPhoto` interfaces |
| `lib/hackathon.ts` | Email links, edition data, sponsors, organizers, photo captions |
| `components/sponsor-card.tsx` | Adaptive sponsor surface with contained, consistently sized artwork |
| `components/team-card.tsx` | Uniform 3:4 portrait and accessible LinkedIn link |
| `components/lightbox.tsx` | Controlled, accessible photo dialog |
| `components/photo-carousel.tsx` | Continuously looping photo previews with in-place lightbox |

The shared layout owns the sticky navigation, skip link, main landmark, footer, and `site-background` theme. Every route uses the same smooth gradient from `#4a237a` to `#0a0410`, fading over 120rem (or the viewport height when taller) before continuing in the dark base color. This keeps the background stable when navigating or filtering the gallery. Content panels share the `surface` opacity; text and accents use the `foreground`, `muted-foreground`, `primary`, `secondary`, and `accent` theme colors.

## Sponsor and team data

`SponsorCard` accepts `logo`, `name`, `tier`, `theme`, and an optional `href`. The `theme` is the **card surface**: choose `light` for dark artwork and `dark` for light artwork. Logos are never recolored. MainAI's SVG viewport and a viewport wrapper around the original KB Software bitmap remove excess whitespace without altering the artwork.

```tsx
<SponsorCard
  logo="/assets/sponsors/example.svg"
  name="Example"
  tier="Gold"
  theme="light"
  href="https://example.com"
/>
```

`TeamCard` accepts `name`, `image`, `role`, and `href` (the LinkedIn profile). Update `organizers` in `lib/hackathon.ts` for the confirmed 2027 team.

## Adding photos

1. Place original images in `images/2026/` or `images/2025/`. Nested folders and JPEG, PNG, and WebP files are supported. HEIC, HEIF, AVIF, and GIF files are ignored. There is no fixed photo limit. Keep these original folders in the deployment's source checkout.
2. Run `npm run gallery:generate`, or restart `npm run dev`. The same scan runs automatically before every production build.
3. Optionally add a `galleryPhotos` entry in `lib/hackathon.ts` with the public `src`, `year`, descriptive `alt`, and `caption`. This is editorial metadata; a photo must also exist on disk to appear.

`scripts/generate-gallery.mjs` preserves the originals and generates browser-ready JPEGs under `public/images/<year>/`, at most 1920 pixels along either dimension. It auto-orients and compresses the supported images and strips embedded metadata. Unsupported formats are ignored. A local cache avoids reconverting unchanged originals on every startup. Generated images and the cache are ignored by Git and regenerated during the build.

The script records public URLs and dimensions in `public/assets/gallery-manifest.json`. Output filenames retain the original extension before `.jpg` to prevent name collisions, for example `/images/2025/IMG_1447.JPG.jpg`. `getGalleryPhotos()` merges that manifest with optional captions, with simple year-based captions when no editorial metadata is provided. The deployed site needs no filesystem scan. Rebuild and redeploy after adding photos to a production site.

The gallery renders 24 photos at a time with native lazy loading. Year filters are shareable (`/gallery?year=2026`). The lightbox can browse the entire selected year, even before more thumbnails are loaded. It supports previous/next buttons, wrapping arrow-key navigation, Escape, and horizontal touch swipes. Radix manages focus trapping, screen-reader isolation, and body scroll locking; closing returns focus to the originating photo. Animations respect reduced motion.

Home and edition previews share `PhotoCarousel({ photos, label?, compact? })`. Home selects a small mix from both years; edition previews use only that edition's photos. The carousel loops continuously and opens each photo in the same full-screen lightbox without navigation. Playback pauses on hover, photo focus, dragging, manual navigation, hidden browser tabs, scrolling offscreen, and while the lightbox is open. Pause/play controls are available, and reduced-motion preferences disable automatic movement. Mouse dragging, touch swipes, arrow buttons, and keyboard arrows support manual browsing.

## Archive content

The original photo folders contain browser-supported photos from 2025 and 2026. Empty collections display a minimal empty state. Add descriptive editorial captions as needed.

Each edition highlights one winning project: ViaLive for 2026 and AI Recipe App for 2025. The next event is planned for February 2027.

## Browser verification

```sh
npm run build
npm run test:e2e
```

Playwright checks desktop and mobile layouts, all four routes, image loading, sponsor counts, gallery filters, modal keyboard controls, focus trapping/return, mobile navigation, and touch swipes. Tests use Google Chrome (`channel: "chrome"`); install it locally or use `npx playwright install chrome` in CI. A production test server starts on port 3100. Screenshots and failure traces are written to the ignored `test-results/` directory.
