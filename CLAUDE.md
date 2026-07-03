# nodemailer-plugin-inline-base64 — repo card

> A map, not a manual. Keep it ~1 screen; point to detail, don't inline it.

## What it is

A Nodemailer `compile`-hook plugin that rewrites base64 `data:` image URIs in an email's HTML into `cid:`-referenced inline attachments, so the images render across email clients. Published to public npm (MIT, OSS) — external consumers exist beyond the two in-org ones below.

## serves

role: Nodemailer compile plugin — registered via `transport.use('compile', inlineBase64(options))`; converts `<img src="data:image/(png|jpe?g|gif);base64,…">` and CSS `url(data:image/…;base64,…)` into `cid:` links and pushes matching inline base64 attachments onto `mail.data.attachments`.
referenced-by: [send, transactional-email]

## Code map

- Plugin entry / compile hook (dedupes by base64, mints CID via `crypto.randomBytes`, honors `options.cidPrefix`) -> src/plugin.js
- Regex rewrite of `<img>` and CSS `url()` base64 sources -> src/replaceBase64Images.js
- Tests -> test/replaceBase64ImagesSpec.js

## Conventions

- Package manager: npm (`package-lock.json`, lockfileVersion 2; no `packageManager` field).
- Test framework: jasmine-node.
- Build: none — plain CommonJS, `main: src/plugin.js`, zero runtime `dependencies`.
- CI: none (no `.github/workflows/`, no Jenkinsfile).
- Publish: manual `npm publish` to public npm (no `private`, no `publishConfig`).
- Dormant-ish: current version is 2.1.1; `mixmaxhq/send` still pins `1.0.1` (major behind) while `mixmaxhq/transactional-email` tracks `^2.1.1`.

## Run / test

- `npm install`
- `npm test`  (runs `jasmine-node test/`)

## Load the matching domain card

- Cross-cutting library — load the consuming capability's card, not a domain-* for this repo.
