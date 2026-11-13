# Vendored Midnite UI

Source: [bilo-io/midnite-ui](https://github.com/bilo-io/midnite-ui), `packages/ui`
(`@bilo-io/ui`), commit **`9e0f817`**. MIT licence, see `LICENSE`.

## Why vendored

`@bilo-io/ui` is a React library published only to GitHub Packages, which needs an
auth token at install time. This app is Angular, so it takes midnite-ui's design
layer (tokens, brand styles and Tailwind theme) as files and rebuilds the few
components it needs as Angular components in `src/app/shared/midnite/`. To update,
re-copy the files below from a newer midnite-ui commit and bump the hash above.

## What is here

| Path | From `packages/ui` | Changed? |
| --- | --- | --- |
| `styles/tokens.css` | `src/styles/tokens.css` | no |
| `styles/brand.css`, `styles/brand/*` | `src/styles/brand.css`, `src/styles/brand/*` | no |
| `tailwind.config.ts` | `tailwind.config.ts` | no |
| `LICENSE` | repo `LICENSE` | no |

The root `tailwind.config.ts` extends the vendored one. The app's own styling lives
in `src/styles.css` and the components, not in these files.

## Not from midnite-ui

The icon paths in `src/app/shared/midnite/mn-icon.ts` are from Lucide (v1.70.0, ISC
licence), the icon set midnite-ui uses through `lucide-react`.
