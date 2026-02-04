# Upgrade Path: Next.js 14 + Sanity 3 → Next.js 16 + Sanity 5

## Current State

| Package | Current Version |
|---------|-----------------|
| `next` | 14 |
| `next-sanity` | 5.5.4 |
| `sanity` | ^3.0.0 |
| `@sanity/client` | ^6.4.9 |
| `react` | ^18.0.0 |
| `typescript` | ^5.0.4 |

## Target State

| Package | Target Version |
|---------|----------------|
| `next` | ^16.x |
| `react` / `react-dom` | ^19.2.x |
| `sanity` | ^5.x |
| `@sanity/client` | ^7.x |
| `next-sanity` | ^12.x |
| `typescript` | ^5.x |
| Node.js | >=20.19 |

---

## Consensus from Pro + GPT-5.2

### Key Agreements

- **No big bang upgrade** - too risky to debug multiple breaking changes
- **Incremental approach required** - validate at each step
- **Next.js 15 is the danger zone** - async APIs + caching default flip
- **deskTool → structureTool** - do early with codemod
- **Explicit caching required** - after Next 15, nothing cached by default

### Key Disagreement

| Model | Order |
|-------|-------|
| Pro | Sanity-First: full Sanity upgrade on Next 14, then Next 15→16 |
| GPT-5.2 | Next-First: deskTool cleanup → Next 14→15→16 → full Sanity |

**Resolution:** GPT-5.2's approach is more practical because `next-sanity` v12 *requires* Next 16 + React 19.2, so full Sanity upgrade must wait until after Next.js is done.

---

## Upgrade Phases

### Phase 0: Prerequisites

```bash
# Upgrade Node to >=20.19
nvm install 20 && nvm use 20

# Update TypeScript (have 5.0.4, need >=5.1)
yarn add -D typescript@latest
```

**Validation:**
- [ ] Node version >=20.19
- [ ] TypeScript >=5.1
- [ ] CI/Vercel uses same Node version

---

### Phase 1: Low-Risk Sanity Cleanup (on Next 14)

```bash
npx @sanity/cli codemod deskRename
```

**Changes:**
- `import { deskTool } from 'sanity/desk'` → `import { structureTool } from 'sanity/structure'`
- `deskTool({ ... })` → `structureTool({ ... })`

**Files affected:**
- `sanity.config.ts` (lines 8, 19)

**Validation:**
- [ ] Studio mounts at `/studio`
- [ ] Can create/edit content
- [ ] No deprecation warnings

---

### Phase 2: Next.js 14 → 15

```bash
npx @next/codemod@canary upgrade 15
```

**Critical Breaking Changes:**

#### 1. Async Request APIs
`params`, `searchParams`, `cookies`, `headers`, `draftMode` become async:

```typescript
// Before (Next 14)
export default function Page({ params }) {
  const { slug } = params
}

// After (Next 15+)
export default async function Page({ params }) {
  const { slug } = await params
}
```

#### 2. Fetch Caching Default Flip
`fetch` defaults to `no-store` (was cached). ISR breaks if not explicit:

```typescript
// Before: implicitly cached
const data = await client.fetch(query)

// After: must be explicit
const data = await client.fetch(query, {}, {
  next: { revalidate: 60 }  // ISR with 60s
})

// Or use tags
const data = await client.fetch(query, {}, {
  next: { tags: ['posts'] }
})
```

**Files requiring async API changes:**

| File | Changes |
|------|---------|
| `app/(frontend)/[lang]/layout.tsx` | `await params` in `RootLayout` |
| `app/(frontend)/[lang]/page.tsx` | `await params` in `FrontPage` + `generateMetadata` |
| `app/(frontend)/[lang]/[slug]/page.tsx` | `await params` in `Page` |
| `app/(frontend)/[lang]/propiedad/[slug]/page.tsx` | `await params` in `Propiedad` |
| `app/(frontend)/[lang]/propiedades/page.tsx` | `await params` + `await searchParams` |

**Sanity fetch calls requiring explicit caching (`lib/sanity.client.ts`):**

| Function | Lines | Fix |
|----------|-------|-----|
| `getFiltersDropdownValues` | 45-52 | Add `{ next: { revalidate: 60 } }` to all 8 fetches |
| `getAllPropiedadesSlug` | 148 | Add `{ next: { revalidate: 60 } }` |
| `getAllPagesSlug` | 175 | Add `{ next: { revalidate: 60 } }` |
| `getPageBySlug` | 182 | Add `{ next: { revalidate: 60 } }` |

*Note: `getFrontPage`, `getSearchProperties`, `getPropiedadBySlug` already have ISR caching.*

**Validation:**
- [ ] `yarn build` succeeds
- [ ] All dynamic routes render
- [ ] ISR behavior verified (same page twice = cached)
- [ ] Sanity API usage not spiking (check dashboard)

---

### Phase 3: Next.js 15 → 16

```bash
npx @next/codemod upgrade 16
```

**Changes:**
- `middleware.ts` → `proxy.ts` deprecation: **Likely unaffected** (simple i18n locale redirect, not proxy pattern)
- Image defaults changed:
  - `qualities` default → `[75]`
  - `minimumCacheTTL` default → 4 hours
  - Redirect limits changed (affects Unsplash)
- Remove `experimental.dynamicIO` if present
- Add `cacheComponents: true` if using new caching

**Validation:**
- [ ] `yarn build` succeeds
- [ ] Images render correctly
- [ ] No middleware/proxy issues

---

### Phase 4: Full Sanity Ecosystem Upgrade

```bash
yarn add sanity@^5 @sanity/client@^7 next-sanity@^12 react@^19.2 react-dom@^19.2
```

**Import changes (next-sanity v11+):**

```typescript
// Old
import { VisualEditing } from 'next-sanity'
import { defineLive } from 'next-sanity'

// New
import { VisualEditing } from 'next-sanity/visual-editing'
import { defineLive } from 'next-sanity/live'
```

**Validation:**
- [ ] Studio mounts and works
- [ ] Visual editing works (if used)
- [ ] Live preview works (if used)
- [ ] All GROQ queries return data

---

### Phase 5: Dependency Audit

React 19 compatibility matrix:

| Package | Current | Target | Action | Priority |
|---------|---------|--------|--------|----------|
| `embla-carousel-react` | 8.0.0-rc03 | 8.6.0 | `yarn add embla-carousel-react@^8.6` | High |
| `embla-carousel-autoplay` | 8.0.0-rc03 | 8.6.0 | `yarn add embla-carousel-autoplay@^8.6` | High |
| `swr` | 2.1.5 | 2.3.8+ | `yarn add swr@^2.3` | High |
| `@radix-ui/*` | 1.x | Latest | `yarn add radix-ui` (unified package) | Medium |
| `@uiball/loaders` | 1.2.6 | — | **Replace** with `ldrs` (web components) | Medium |
| `react-slider` | 2.0.4 | — | **Remove**, use existing `@radix-ui/react-slider` | Low |
| `styled-components` | 6.0.0 | — | ✅ Already React 19 compatible | — |

**Migration notes:**

`@uiball/loaders` → `ldrs`:
```typescript
// Before
import { Ring } from '@uiball/loaders'
<Ring size={40} />

// After
import { ring } from 'ldrs'
ring.register()
<l-ring size="40"></l-ring>
```

`react-slider` → `@radix-ui/react-slider`:
- Already in deps, update imports where `react-slider` is used
- Check `components/ui/rangeslider.tsx` for usage

**Resolution strategies:**
- Use `--legacy-peer-deps` temporarily if needed during intermediate steps
- Use `overrides` in package.json for transient peer dep conflicts

---

## Testing Strategy

### At Each Phase

```bash
yarn type-check && yarn lint && yarn build && yarn start
```

### Smoke Tests

1. Homepage renders
2. Dynamic content pages render (published mode)
3. Studio route mounts (`/studio`)
4. ISR behavior validated
5. Search/filter functionality works (`/propiedades`)

### Playwright E2E (High ROI)

```typescript
test('homepage renders', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/.../)
})

test('dynamic page renders', async ({ page }) => {
  await page.goto('/some-content-page')
  await expect(page.locator('h1')).toBeVisible()
})

test('studio mounts', async ({ page }) => {
  await page.goto('/studio')
  await expect(page.locator('[data-sanity]')).toBeVisible()
})
```

---

## Risk Matrix

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Async API breaks routes | High | High | Codemod + manual review |
| Caching default breaks ISR | High | High | Audit all fetches |
| React 19 peer dep conflicts | Medium | Medium | `--legacy-peer-deps` or replace |
| styled-components hydration | Medium | Medium | Upgrade to v6.1+ |
| Studio breaks | Low | High | Test after each Sanity change |

---

## Rollback Plan

Each phase should be a separate branch/PR:

```
main
 └── upgrade/phase-1-sanity-cleanup
      └── upgrade/phase-2-next-15
           └── upgrade/phase-3-next-16
                └── upgrade/phase-4-sanity-ecosystem
```

If any phase fails:
1. Don't merge the PR
2. Fix issues on that branch
3. Re-test before proceeding

---

## Commands Reference

```bash
# Phase 1: Sanity cleanup
npx @sanity/cli codemod deskRename

# Phase 2: Next 14 → 15
npx @next/codemod@canary upgrade 15

# Phase 3: Next 15 → 16
npx @next/codemod upgrade 16

# Phase 4: Sanity ecosystem
yarn add sanity@^5 @sanity/client@^7 next-sanity@^12 react@^19.2 react-dom@^19.2

# Validation at each step
yarn type-check && yarn lint && yarn build
```

---

## Confidence: 9/10

**High confidence** on sequence, file lists, and dependency actions.

**Remaining uncertainties:**
- Exact `ldrs` component API (may need minor adjustments during execution)
- Whether unified `radix-ui` package plays well with existing `@radix-ui/*` imports (may need gradual migration)
