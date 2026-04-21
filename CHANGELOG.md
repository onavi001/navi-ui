# Changelog

All notable changes to `@navi01/react` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.7] - 2026-04-21

### Fixed

- **README on npmjs.com:** `prepack` / `postpack` scripts embed `README.md` into the `readme` field of `package.json` in the published tarball (registry metadata did not pick up the standalone file). Your working tree stays without an inlined readme after pack/publish.

[0.1.7]: https://github.com/onavi001/navi-ui/compare/v0.1.6...v0.1.7

## [0.1.6] - 2026-04-21

### Fixed

- **README on npm:** removed HTML wrappers that could render as a blank page in some clients; badges and links now use plain Markdown and absolute URLs (license, Storybook → repo).

[0.1.6]: https://github.com/onavi001/navi-ui/compare/v0.1.5...v0.1.6

## [0.1.5] - 2026-04-20

### Fixed

- **Consumer styles:** the `tailwind` entry (`import "@navi01/react/tailwind"`) now loads `tailwind.css` correctly after build (post-build link in ESM/CJS).
- **`package.json` exports:** added `./styles.css` → `dist/tailwind.css` for CSS-only imports; `./tailwind` now declares TypeScript types.

### Changed

- **`sideEffects`:** narrowed from `false` to explicit CSS and `tailwind` chunks so bundlers do not drop style imports.

### Added

- **`@source` in theme CSS:** Tailwind v4 scans the published package output so utilities used by components are generated in host apps without extra config.
- **Documentation:** README installation and Vite + Tailwind v4 setup (peers, plugin, style import).

[0.1.5]: https://github.com/onavi001/navi-ui/compare/v0.1.4...v0.1.5
