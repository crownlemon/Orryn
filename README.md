# The Orryn Chronicles

An evolving, source-conscious Westeros wiki for the Orryn game, built with [Astro Starlight](https://starlight.astro.build/).

## Run locally

Requires Node.js 22 or newer.

```sh
npm install
npm run dev
```

Production build: `npm run build`. Output: `dist/`.

## Publish for free with Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** → connect GitHub.
2. Select `crownlemon/Orryn` and branch `main`.
3. Choose the **Astro** framework preset (or configure manually).
4. Build command: `npm run build`; output directory: `dist`; Node.js version: `22`.
5. Deploy. Cloudflare provides a free `*.pages.dev` address.

This repository is public and the deployed website will also be public unless access protection is separately configured.

## Content

Wiki articles live in `src/content/docs/`:

- `houses/`: noble houses and vassalage
- `characters/`: biographies and relationships
- `realm/`: regions and places
- `events/`: political affairs and historical developments
- `chapters/`: complete narrative archive (to be migrated)
- `about/`: source and editorial policy

The first pages are **prototypes** based on limited Orryn notes. They are not a validated migration of the full game. Preserve original documents and do not publish game-master secrets without review.

## Updating

Add or edit a Markdown page in the appropriate folder and commit to `main`. Once Cloudflare Pages is connected, commits to the deployment branch automatically rebuild the website.

No Cloudflare account, domain or paid feature is required to edit the source code; publishing requires the owner's one-time hosting setup.
