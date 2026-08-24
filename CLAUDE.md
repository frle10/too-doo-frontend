# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

`too-doo-frontend` — a React 19 + TypeScript SPA for shareable to-do lists, built
with Vite and deployed to Netlify. It talks to a separate NestJS backend
(`too-doo-backend`) over a small REST API. There is no auth and no client-side
persistence: a list is identified purely by the uuid in its URL, and anyone with
the URL can edit it.

## Commands

Package manager is **pnpm**, pinned by the `packageManager` field in
`package.json` and installed through corepack. `pnpm-lock.yaml` is committed;
never introduce `yarn.lock` or `package-lock.json`, and never run `npm install`
or `yarn` in this repo. Node >= 22.12 (`.nvmrc` pins the version CI uses).

| Task                   | Command                                   |
| ---------------------- | ----------------------------------------- |
| Dev server (port 5173) | `pnpm dev`                                |
| Type check only        | `pnpm typecheck`                          |
| Lint                   | `pnpm lint`                               |
| Tests (once)           | `pnpm test`                               |
| Tests (watch)          | `pnpm test:watch`                         |
| Tests + coverage       | `pnpm test:coverage`                      |
| Single test file       | `pnpm vitest run src/pages/Home.test.tsx` |
| Production build       | `pnpm build` (runs `tsc --noEmit` first)  |
| Format                 | `pnpm format`                             |

Before declaring work done, run `pnpm lint && pnpm typecheck && pnpm test` —
that is what CI (`.github/workflows/ci.yml`) runs on every push and PR, plus
`pnpm build`.

`node_modules` is pnpm's strict symlinked layout, and there is deliberately no
`.npmrc`: nothing here needs `shamefully-hoist`. If a new dependency fails to
resolve a transitive package, add that package as a real dependency rather than
turning on hoisting.

## Architecture

```
src/
  main.tsx              entry; mounts <App>
  App.tsx               page-level layout padding only
  ApplicationRouter.tsx BrowserRouter + routes: /, /:uuid, /NotFound
  pages/Home.tsx        the entire application state machine
  components/           presentational; state comes in via props
  util/apiUtil.ts       the only place that calls fetch()
  util/constants.ts     BACKEND_DOMAIN, breakpoints, emptyList
  util/styles.ts        shared emotion styles (buttonReset, newListButtonStyle)
  util/types.ts         TodoList, Todo, ListView
  util/uuid.ts          isUuid / newUuid, replacing the `uuid` package
  vite-env.d.ts         types the VITE_ env vars this app reads
```

`Home.tsx` owns all state; everything under `components/` is a presentational
component that receives data and callbacks as props. Keep it that way — new
network calls belong in `apiUtil.ts`, not in components.

## Conventions that are easy to get wrong

**Styling is @emotion/css, not @emotion/react.** Styles are module-level `css({...})`
objects composed with `cx(...)`, applied via `className`. No styled-components,
no `styled.div`, no CSS-in-JSX props. Responsive rules use the `mqMax` / `mqMin`
arrays from `util/constants.ts` (`[mqMax[1]]: { ... }`), never hand-written
media-query strings.

**`buttonReset` goes first in `cx(...)`.** Anything interactive must be a real
`<button>`; `buttonReset` strips the UA styling, and listing it first lets the
component's own styles win where they overlap.

**Empty response body means "not found".** The backend returns 200 with an empty
body for a missing list. `request()` in `apiUtil.ts` maps both that and a 404 to
`null`; `requireBody()` turns an unexpected `null` into an `ApiError` for calls
that must return content. Do not "simplify" the empty-body branch away.

**Errors surface as `ApiError`.** Callers catch and pass through `describe()` in
`Home.tsx`, which shows `error.message` for `ApiError` and a generic string for
anything else. Never let a raw fetch rejection reach the UI.

**Lazy list creation.** A list is not persisted until the user names it or adds
a to-do. The pending uuid lives in `createdUuidRef` so two quick actions on a
fresh list share one uuid instead of creating two lists. State in `Home.tsx` is
derived from the URL (`loaded.uuid === currentUuid`), so navigation needs no
reset effect — preserve that property when editing.

**The UI renders `ListView`, not `TodoList`.** A list that has not been saved
yet has no server-assigned `id` or `uuid`, so `Home` holds
`Pick<TodoList, 'name' | 'todos'>` and `emptyList` carries no placeholder ids.
`TodoList` stays the wire type returned by `apiUtil`.

**Lint is type-aware** (`tseslint.configs.recommendedTypeChecked`). Two
consequences: `navigate(...)` returns a promise in react-router 7 and must be
prefixed with `void`, and an async handler passed to a `() => void` prop is
wrapped at the JSX boundary (`(id) => void changeCompleted(id)`) because the
component fires and forgets — `Home` renders every failure itself.

**Single quotes, including in JSX** (`.prettierrc`: `singleQuote`,
`jsxSingleQuote`, `trailingComma: es5`). Run `pnpm format` rather than matching
by hand.

**`import type` for type-only imports** — `verbatimModuleSyntax` is on.

## Testing

Vitest + jsdom + Testing Library, globals enabled, setup in `src/setupTests.ts`.
Tests sit next to the code (`Header.test.tsx` beside `Header.tsx`).

Query by role and accessible name (`getByRole('checkbox', { name: '...' })`),
never by class or test id. Drive interaction with `userEvent.setup()`, not
`fireEvent`. Mock at the `util/apiUtil` module boundary with `vi.mock`; do not
stub global `fetch`. The single exception is `apiUtil.test.ts`, which is the
test _of_ that boundary and stubs `fetch` with `vi.stubGlobal` — nothing else
should.

## Environment and deploy

`VITE_API_URL` is the backend base URL, read once as `BACKEND_DOMAIN` in
`util/constants.ts`. `.env.development` points at `http://localhost:3000`;
`.env.production` at the deployed backend. It is a public URL that is
deliberately inlined into the bundle — never put a secret in a `VITE_`
variable.

`netlify.toml` is the source of truth for the build command, publish directory,
Node version, and headers; it overrides the Netlify UI. The SPA fallback lives
in `public/_redirects` (not in `netlify.toml`) so it survives a host change.
`NODE_VERSION` in `netlify.toml` and `.nvmrc` must be kept in sync.

## Git

Primary branch is `main`. Branch off it for changes; do not commit directly to
`main`.
