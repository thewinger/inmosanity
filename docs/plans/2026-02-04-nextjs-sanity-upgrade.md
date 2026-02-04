# Next.js 14→16 + Sanity 3→5 Upgrade Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade from Next.js 14 + Sanity 3 to Next.js 16 + Sanity 5 with React 19.2

**Architecture:** Incremental 5-phase upgrade. Each phase is a separate PR. Next.js upgrades first (15→16), then full Sanity ecosystem. Caching defaults flip in Next 15 (fetch → no-store), so explicit ISR required.

**Tech Stack:** Next.js 16, React 19.2, Sanity 5, @sanity/client 7, next-sanity 12, TypeScript 5.x

---

## Phase 0: Prerequisites

### Task 0.1: Verify Node Version

**Files:**
- Check: System Node version

**Step 1: Verify Node ≥20.19**

Run: `node -v`
Expected: v20.x or higher (current: v23.10.0 ✓)

**Step 2: Commit (skip - no changes)**

No changes needed. Node 23.10.0 exceeds requirement.

---

### Task 0.2: Upgrade TypeScript

**Files:**
- Modify: `package.json:90`

**Step 1: Check current TypeScript version**

Run: `yarn info typescript version`
Expected: ^5.0.4 (need ≥5.1)

**Step 2: Upgrade TypeScript**

Run: `yarn add -D typescript@latest`

**Step 3: Verify type-check passes**

Run: `yarn type-check`
Expected: No errors

**Step 4: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: upgrade typescript to latest"
```

---

## Phase 1: Sanity deskTool → structureTool (on Next 14)

### Task 1.1: Run Sanity Codemod

**Files:**
- Modify: `sanity.config.ts:4,8,13`

**Step 1: Run the deskRename codemod**

Run: `npx @sanity/cli codemod deskRename`
Expected: Transforms deskTool → structureTool

**Step 2: Verify import changed**

```typescript
// Before (line 4)
import { deskTool } from 'sanity/desk'

// After
import { structureTool } from 'sanity/structure'
```

**Step 3: Verify plugin usage changed**

```typescript
// Before (line 13)
deskTool({ defaultDocumentNode, structure }),

// After
structureTool({ defaultDocumentNode, structure }),
```

**Step 4: Start dev server and verify Studio**

Run: `yarn dev`
Test: Navigate to `/studio`, verify:
- Studio mounts
- Can view documents
- No console errors

**Step 5: Commit**

```bash
git add sanity.config.ts
git commit -m "refactor: migrate deskTool to structureTool"
```

---

### Task 1.2: Validate Studio Functionality

**Files:**
- Test: `/studio` route

**Step 1: Build production**

Run: `yarn build`
Expected: Build succeeds

**Step 2: Start production server**

Run: `yarn start`

**Step 3: Test Studio**

Navigate to `http://localhost:3000/studio`
Verify:
- [ ] Studio loads
- [ ] Can browse documents
- [ ] Can create/edit content
- [ ] No deprecation warnings in console

**Step 4: Commit validation checkpoint**

```bash
git add -A
git commit -m "chore: validate studio after structureTool migration"
```

---

## Phase 2: Next.js 14 → 15

### Task 2.1: Run Next.js 15 Upgrade Codemod

**Files:**
- Modify: `package.json`
- Modify: Multiple route files (handled by codemod)

**Step 1: Run the upgrade codemod**

Run: `npx @next/codemod@canary upgrade 15`
Expected: Upgrades Next.js and transforms async APIs

**Step 2: Verify package.json updates**

```json
"next": "15",
"eslint-config-next": "15"
```

**Step 3: Install dependencies**

Run: `yarn install`

**Step 4: Commit codemod results**

```bash
git add -A
git commit -m "chore: run next.js 15 codemod"
```

---

### Task 2.2: Fix Async params in RootLayout

**Files:**
- Modify: `app/(frontend)/[lang]/layout.tsx:44-48`

**Step 1: Verify codemod applied changes**

Read the file and check if `params` is now awaited.

**Step 2: If not fixed, apply manual fix**

```typescript
// Before (lines 44-48)
type Props = {
  children?: ReactNode
  params: { lang: Locale }
}

export default async function RootLayout({ children, params }: Props) {
  const dict = await getDictionary(params.lang)

// After
type Props = {
  children?: ReactNode
  params: Promise<{ lang: Locale }>
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params
  const dict = await getDictionary(lang)
```

**Step 3: Update Header/Footer param passing**

```typescript
// Before
<Header params={params} dict={dict} />
<Footer params={params} dict={dict} />

// After
<Header params={{ lang }} dict={dict} />
<Footer params={{ lang }} dict={dict} />
```

**Step 4: Commit**

```bash
git add app/(frontend)/[lang]/layout.tsx
git commit -m "fix: async params in RootLayout"
```

---

### Task 2.3: Fix Async params in FrontPage

**Files:**
- Modify: `app/(frontend)/[lang]/page.tsx:37-42`

**Step 1: Update function signature**

```typescript
// Before
export default async function FrontPage({
  params,
}: {
  params: { lang: Locale }
}) {

// After
export default async function FrontPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
```

**Step 2: Update all params.lang references**

Replace `params.lang` with `lang` throughout the function.

**Step 3: Commit**

```bash
git add app/(frontend)/[lang]/page.tsx
git commit -m "fix: async params in FrontPage"
```

---

### Task 2.4: Fix Async params in Dynamic [slug] Page

**Files:**
- Modify: `app/(frontend)/[lang]/[slug]/page.tsx:6-19`

**Step 1: Update Props type**

```typescript
// Before (lines 6-11)
type Props = {
  params: {
    slug: string
    lang: Locale
  }
}

// After
type Props = {
  params: Promise<{
    slug: string
    lang: Locale
  }>
}
```

**Step 2: Update Page function**

```typescript
// Before (lines 13-19)
export default async function Page({ params: { slug, lang } }: Props) {
  const pageData = getPageBySlug(slug, lang)

// After
export default async function Page({ params }: Props) {
  const { slug, lang } = await params
  const pageData = getPageBySlug(slug, lang)
```

**Step 3: Update generateMetadata if present**

Same pattern: make params Promise and await it.

**Step 4: Commit**

```bash
git add app/(frontend)/[lang]/[slug]/page.tsx
git commit -m "fix: async params in [slug] page"
```

---

### Task 2.5: Fix Async params in Propiedad Page

**Files:**
- Modify: `app/(frontend)/[lang]/propiedad/[slug]/page.tsx:26-34`

**Step 1: Update function signature**

```typescript
// Before
export default async function Propiedad({
  params,
}: {
  params: { lang: Locale; slug: string }
}) {

// After
export default async function Propiedad({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}) {
  const { lang, slug } = await params
```

**Step 2: Update all params references**

Replace `params.lang` with `lang` and `params.slug` with `slug`.

**Step 3: Commit**

```bash
git add app/(frontend)/[lang]/propiedad/[slug]/page.tsx
git commit -m "fix: async params in Propiedad page"
```

---

### Task 2.6: Fix Async params + searchParams in Propiedades Page

**Files:**
- Modify: `app/(frontend)/[lang]/propiedades/page.tsx:12-25`

**Step 1: Update Props type**

```typescript
// Before (lines 12-17)
type Props = {
  params: {
    lang: Locale
  }
  searchParams: { [key: string]: string | string[] }
}

// After
type Props = {
  params: Promise<{
    lang: Locale
  }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}
```

**Step 2: Update function body**

```typescript
// Before (lines 19-25)
export default async function PropiedadesPage({ params, searchParams }: Props) {
  const dict = await getDictionary(params.lang)
  const filtersDD = await getFiltersDropdownValues(params.lang)
  const propiedades = await getSearchProperties(
    searchParams,
    params.lang as Locale
  )

// After
export default async function PropiedadesPage({ params, searchParams }: Props) {
  const { lang } = await params
  const resolvedSearchParams = await searchParams
  const dict = await getDictionary(lang)
  const filtersDD = await getFiltersDropdownValues(lang)
  const propiedades = await getSearchProperties(
    resolvedSearchParams,
    lang
  )
```

**Step 3: Commit**

```bash
git add app/(frontend)/[lang]/propiedades/page.tsx
git commit -m "fix: async params and searchParams in Propiedades page"
```

---

### Task 2.7: Add Explicit ISR Caching to Sanity Fetches

**Files:**
- Modify: `lib/sanity.client.ts:45-52,148,175,182`

**Step 1: Add caching to getFiltersDropdownValues**

```typescript
// At lines 45-52, add { next: { revalidate: 60 } } to each fetch
// Example for one fetch:
const operaciones = client.fetch(
  operacionQuery,
  { lang },
  { next: { revalidate: 60 } }
)
```

Apply to all 8 fetches in the Promise.all array.

**Step 2: Add caching to getAllPropiedadesSlug**

```typescript
// Line 148
return client.fetch(
  `*[_type == "propiedad"] { "slug": slug.current }`,
  {},
  { next: { revalidate: 60 } }
)
```

**Step 3: Add caching to getAllPagesSlug**

```typescript
// Line 175
return client.fetch(
  `*[_type == "pagina"] { "slug": slug.current }.slug`,
  {},
  { next: { revalidate: 60 } }
)
```

**Step 4: Add caching to getPageBySlug**

```typescript
// Line 182
return client.fetch(
  pageQuery,
  { slug, lang },
  { next: { revalidate: 60 } }
)
```

**Step 5: Commit**

```bash
git add lib/sanity.client.ts
git commit -m "fix: add explicit ISR caching for Next 15 fetch defaults"
```

---

### Task 2.8: Build and Validate Next 15

**Files:**
- Test: Full build

**Step 1: Type check**

Run: `yarn type-check`
Expected: No errors

**Step 2: Lint**

Run: `yarn lint`
Expected: No errors (warnings OK)

**Step 3: Build**

Run: `yarn build`
Expected: Build succeeds

**Step 4: Start and smoke test**

Run: `yarn start`
Test:
- [ ] Homepage renders
- [ ] `/en/propiedades` renders with filters
- [ ] `/en/propiedad/[any-slug]` renders
- [ ] `/studio` mounts

**Step 5: Commit validation**

```bash
git add -A
git commit -m "chore: validate Next.js 15 upgrade"
```

---

## Phase 3: Next.js 15 → 16

### Task 3.1: Run Next.js 16 Upgrade Codemod

**Files:**
- Modify: `package.json`

**Step 1: Run the upgrade codemod**

Run: `npx @next/codemod upgrade 16`

**Step 2: Install dependencies**

Run: `yarn install`

**Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: upgrade to Next.js 16"
```

---

### Task 3.2: Upgrade React to 19.2

**Files:**
- Modify: `package.json:57-58,77`

**Step 1: Upgrade React packages**

Run: `yarn add react@^19.2 react-dom@^19.2`

**Step 2: Upgrade React types**

Run: `yarn add -D @types/react@^19`

**Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: upgrade React to 19.2"
```

---

### Task 3.3: Build and Validate Next 16

**Files:**
- Test: Full build

**Step 1: Type check**

Run: `yarn type-check`
Expected: May have errors - fix React 19 type issues

**Step 2: Build**

Run: `yarn build`
Expected: Build succeeds

**Step 3: Smoke test**

Run: `yarn start`
Test all routes still work.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: validate Next.js 16 upgrade"
```

---

## Phase 4: Full Sanity Ecosystem Upgrade

### Task 4.1: Upgrade Sanity Packages

**Files:**
- Modify: `package.json:34,40-42,56,63`

**Step 1: Upgrade all Sanity packages**

Run: `yarn add sanity@^5 @sanity/client@^7 next-sanity@^12 @sanity/types@^5 @sanity/ui@^2 @sanity/vision@^5`

**Step 2: Handle peer dependency warnings**

If peer dep conflicts, use:
Run: `yarn add --legacy-peer-deps sanity@^5 @sanity/client@^7 next-sanity@^12`

**Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: upgrade Sanity ecosystem to v5"
```

---

### Task 4.2: Fix next-sanity Import Paths

**Files:**
- Check: `app/studio/[[...index]]/page.tsx`
- Check: Any files using `VisualEditing` or `defineLive`

**Step 1: Check for affected imports**

```bash
grep -r "from 'next-sanity'" --include="*.tsx" --include="*.ts" .
```

**Step 2: Update imports if found**

```typescript
// Old
import { VisualEditing } from 'next-sanity'
import { defineLive } from 'next-sanity'

// New
import { VisualEditing } from 'next-sanity/visual-editing'
import { defineLive } from 'next-sanity/live'
```

**Step 3: Commit if changes made**

```bash
git add -A
git commit -m "fix: update next-sanity import paths for v12"
```

---

### Task 4.3: Validate Sanity Studio

**Files:**
- Test: `/studio` route

**Step 1: Start dev server**

Run: `yarn dev`

**Step 2: Test Studio**

Navigate to `/studio`
Verify:
- [ ] Studio loads without errors
- [ ] Can browse all document types
- [ ] Can create new documents
- [ ] Can edit existing documents
- [ ] Structure navigation works (localizacion hierarchy)

**Step 3: Commit validation**

```bash
git add -A
git commit -m "chore: validate Sanity 5 Studio"
```

---

## Phase 5: Dependency Cleanup

### Task 5.1: Upgrade Embla Carousel

**Files:**
- Modify: `package.json:50-51`

**Step 1: Upgrade embla packages**

Run: `yarn add embla-carousel-react@^8.6 embla-carousel-autoplay@^8.6`

**Step 2: Test carousel components**

Navigate to property detail page, verify slider works.

**Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: upgrade embla-carousel to 8.6"
```

---

### Task 5.2: Upgrade SWR

**Files:**
- Modify: `package.json:68`

**Step 1: Upgrade SWR**

Run: `yarn add swr@^2.3`

**Step 2: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: upgrade swr to 2.3"
```

---

### Task 5.3: Replace @uiball/loaders with ldrs

**Files:**
- Modify: `package.json:45`
- Modify: `app/(frontend)/[lang]/propiedades/layout.tsx:1,13`

**Step 1: Install ldrs**

Run: `yarn add ldrs`

**Step 2: Remove @uiball/loaders**

Run: `yarn remove @uiball/loaders`

**Step 3: Update propiedades layout**

```typescript
// Before (app/(frontend)/[lang]/propiedades/layout.tsx)
import { ChaoticOrbit } from '@uiball/loaders'

const Fallback = () => {
  return <ChaoticOrbit size={25} speed={1.5} color='black' />
}

// After
'use client'
import { useEffect } from 'react'

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Suspense fallback={<Fallback />}>{children}</Suspense>
}

const Fallback = () => {
  useEffect(() => {
    import('ldrs').then(({ ring }) => {
      ring.register()
    })
  }, [])

  return <l-ring size="25" speed="1.5" color="black"></l-ring>
}
```

Note: ldrs uses web components - may need to add type declaration:

```typescript
// Add to a .d.ts file or inline
declare namespace JSX {
  interface IntrinsicElements {
    'l-ring': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      size?: string
      speed?: string
      color?: string
    }, HTMLElement>
  }
}
```

**Step 4: Commit**

```bash
git add -A
git commit -m "refactor: replace @uiball/loaders with ldrs"
```

---

### Task 5.4: Remove react-slider (Use Radix)

**Files:**
- Modify: `package.json:61`
- Modify: `components/ui/rangeslider.tsx`

**Step 1: Find react-slider usage**

Run: `grep -r "react-slider\|ReactSlider" --include="*.tsx" .`

**Step 2: Refactor RangeSlider to use Radix**

```typescript
// components/ui/rangeslider.tsx
'use client'
import * as Slider from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

interface RangeSliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

const RangeSlider = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  orientation = 'horizontal',
  className,
}: RangeSliderProps) => {
  const isVertical = orientation === 'vertical'

  return (
    <Slider.Root
      className={cn(
        'relative flex touch-none select-none',
        isVertical ? 'h-full w-5 flex-col' : 'h-5 w-full',
        className
      )}
      value={value}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
      orientation={orientation}
    >
      <Slider.Track className={cn(
        'relative grow rounded-full bg-zinc-200',
        isVertical ? 'w-1' : 'h-1'
      )}>
        <Slider.Range className="absolute rounded-full bg-green-500" />
      </Slider.Track>
      {value.map((_, i) => (
        <Slider.Thumb
          key={i}
          className="block h-4 w-4 cursor-grab rounded-full bg-green-500 text-xs text-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        />
      ))}
    </Slider.Root>
  )
}

export default RangeSlider
```

**Step 3: Update components using RangeSlider**

Find all usages and update props to match new API.

**Step 4: Remove react-slider**

Run: `yarn remove react-slider @types/react-slider`

**Step 5: Commit**

```bash
git add -A
git commit -m "refactor: replace react-slider with @radix-ui/react-slider"
```

---

### Task 5.5: Final Build Validation

**Files:**
- Test: Full application

**Step 1: Type check**

Run: `yarn type-check`
Expected: No errors

**Step 2: Lint**

Run: `yarn lint`
Expected: No errors

**Step 3: Build**

Run: `yarn build`
Expected: Build succeeds

**Step 4: Full smoke test**

Run: `yarn start`

Test checklist:
- [ ] Homepage renders (both /en and /es)
- [ ] Property search works (/en/propiedades)
- [ ] Filters work (price, rooms, location)
- [ ] Property detail pages render
- [ ] Images load correctly
- [ ] Studio mounts (/studio)
- [ ] Can create/edit in Studio
- [ ] Carousel works on property pages
- [ ] Loading spinner shows during navigation

**Step 5: Final commit**

```bash
git add -A
git commit -m "chore: complete Next.js 16 + Sanity 5 upgrade"
```

---

## Rollback Plan

Each phase is a separate branch:

```
main
 └── upgrade/phase-1-sanity-cleanup
      └── upgrade/phase-2-next-15
           └── upgrade/phase-3-next-16
                └── upgrade/phase-4-sanity-ecosystem
                     └── upgrade/phase-5-dependencies
```

If any phase fails:
1. Don't merge the PR
2. Fix issues on that branch
3. Re-test before proceeding

---

## Quick Reference

```bash
# Phase 1
npx @sanity/cli codemod deskRename

# Phase 2
npx @next/codemod@canary upgrade 15

# Phase 3
npx @next/codemod upgrade 16
yarn add react@^19.2 react-dom@^19.2

# Phase 4
yarn add sanity@^5 @sanity/client@^7 next-sanity@^12

# Phase 5
yarn add embla-carousel-react@^8.6 embla-carousel-autoplay@^8.6 swr@^2.3 ldrs
yarn remove @uiball/loaders react-slider @types/react-slider

# Validation
yarn type-check && yarn lint && yarn build
```
