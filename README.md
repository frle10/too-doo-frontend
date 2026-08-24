# Too Doo — Frontend

A simple, shareable to-do list. Every list lives at its own URL, so sharing a list is
just sharing a link. No accounts, no sign-up.

**Live:** [toodoo.frle.dev](https://toodoo.frle.dev)

## About this project

Too Doo started in 2020 as an interview take-home while I was still a student. The visual
design was supplied as a Figma file and the task was to build it; the CSS here is a
faithful implementation of that design.

It was modernized in 2026 — Create React App to Vite, React 17 to 19, react-router 5 to 7,
plus a test suite and an accessibility pass. **The design and the feature set were
deliberately left untouched.** Visual parity was verified by screenshot diffing every
screen and breakpoint before and after the refactor.

## Stack

|         |                                                                    |
| ------- | ------------------------------------------------------------------ |
| Build   | Vite 8                                                             |
| UI      | React 19, TypeScript 5.9                                           |
| Routing | react-router 7                                                     |
| Styling | Emotion (`@emotion/css`), object styles co-located with components |
| Tests   | Vitest 4 + React Testing Library                                   |
| HTTP    | native `fetch`                                                     |

There is no state-management library and no HTTP client dependency — at this size the
platform covers it.

## Getting started

Requires **Node 22.12+** (see `.nvmrc`) and pnpm. The exact pnpm version is pinned in
`package.json` under `packageManager`, so `corepack enable pnpm` is enough to get it.

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

The frontend needs the API to do anything useful. See **Running with the backend** below.

### Scripts

| Command           | What it does                        |
| ----------------- | ----------------------------------- |
| `pnpm dev`        | Dev server with HMR on port 5173    |
| `pnpm build`      | Typechecks, then builds to `dist/`  |
| `pnpm preview`    | Serves the production build locally |
| `pnpm test`       | Runs the test suite once            |
| `pnpm test:watch` | Runs the tests in watch mode        |
| `pnpm typecheck`  | `tsc --noEmit`                      |
| `pnpm lint`       | ESLint (flat config)                |
| `pnpm format`     | Prettier                            |

## Configuration

One environment variable, the base URL of the API:

| File               | Value                                |
| ------------------ | ------------------------------------ |
| `.env.development` | `VITE_API_URL=http://localhost:3000` |
| `.env.production`  | `VITE_API_URL=https://api.frle.net`  |

Vite inlines this at build time, so a production build is tied to the URL that was set
when it was built.

## Running with the backend

The API lives in a separate repo, [`too-doo-backend`](https://github.com/frle10/too-doo-backend)
(NestJS + PostgreSQL). Roughly:

```bash
cd ../too-doo-backend
docker compose up -d     # PostgreSQL on port 47385
yarn install
yarn start:dev           # API on port 3000
```

(The backend repo still uses Yarn; only this repo moved to pnpm.)

Then `pnpm dev` here. The dev server runs on 5173, so it does not collide with the API.

Because the two run on different origins, **the backend must allow this origin via CORS**
(`app.enableCors()` in its `src/main.ts`) or every request will be blocked by the browser.
The same applies in production for `toodoo.frle.dev` calling `api.frle.net`.

### Endpoints consumed

| Method  | Path                | Purpose                                              |
| ------- | ------------------- | ---------------------------------------------------- |
| `GET`   | `/todos/:uuid`      | Fetch a list. An empty body means "no such list".    |
| `PATCH` | `/todos/:uuid`      | Rename a list, creating it if it does not exist.     |
| `POST`  | `/todos/todo/:uuid` | Add a to-do, creating the list if it does not exist. |
| `PATCH` | `/todos/todo/:id`   | Toggle a to-do's completed flag.                     |

A list is only persisted once you name it or add the first to-do — a uuid is minted
client-side and the list is created lazily by the first write.

## Deploying

`pnpm build` emits a fully static `dist/`, so any static host works.

**The host must rewrite unknown paths to `index.html`.** Lists live at `/:uuid`, so
without an SPA fallback a refresh or a shared link 404s. `public/_redirects` carries the
rule (Vite copies it into `dist/`), which covers Netlify and Cloudflare Pages. On nginx:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Netlify

This site is hosted on Netlify. `netlify.toml` holds the build command, publish
directory, Node version and cache/security headers, and **overrides whatever is set in
the Netlify UI** for build command and publish directory.

Three things Netlify does _not_ read from `netlify.toml` and that must be set in the UI:

- **Build image** — must be Ubuntu Noble 24.04 or newer for Node 24.
- **Production branch** — the branch that publishes to the live site.
- **Environment variables** — see below.

`VITE_API_URL` is committed in `.env.production`, so it does **not** need to be set in the
Netlify UI. If you do set it there, the UI value wins. Either way the build-time value is
inlined into the bundle; `SECRETS_SCAN_OMIT_KEYS` in `netlify.toml` stops Netlify's secrets
scanner from failing the build over it.

The old `REACT_APP_API_URL` variable is dead — Vite only exposes variables prefixed
`VITE_`.

## Project structure

```
src/
  components/     Header, ToDoGenerator, ToDoList, ToDo, Footer, Spinner (+ tests)
  pages/          Home, NotFound
  util/
    apiUtil.ts    fetch wrapper, typed per endpoint
    constants.ts  breakpoints, API base URL, empty-list shape
    styles.ts     shared styles (button reset, the yellow button)
    types.ts      TodoList, Todo
    uuid.ts       uuid generation + validation
  App.tsx         Page shell
  main.tsx        Entry point
```

Responsive breakpoints are defined once in `util/constants.ts` and consumed as
`mqMax[n]` / `mqMin[n]` inside Emotion object styles.

## License

MIT — see [LICENSE](LICENSE).
