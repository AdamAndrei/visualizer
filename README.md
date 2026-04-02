# Algorithm & Data Structure Visualizer — Project Handoff

## App idea

A portfolio web app to visually demonstrate algorithms and data structures, aimed at a backend Java dev expanding into fullstack.

Two sections — algorithms (sorting, searching) and data structures (linked list, stack, tree, etc.). Each has three modes:

- **Fast mode** — plays through steps quickly
- **Slow/step mode** — advances one step at a time with labels
- **Code-sync mode** — side panel shows the algorithm's code, highlighted line by line in sync with the visual

## Key architecture decision

Every algorithm and data structure produces a `Step[]` array — pure logic, no UI. The UI just consumes that array. The three modes are different playback strategies for the same data.

## Tech stack

- React + TypeScript, scaffolded with Vite
- No backend for now, frontend only to start

```bash
npm create vite@latest my-visualizer -- --template react-ts
```

## Folder structure

```
src/
  domain/       ← data contracts (Step, VisualArray, Element, ...)
  algorithms/   ← pure TS logic, no React
  structures/   ← pure TS logic, no React
  components/   ← React UI
```

- `.ts` for pure logic files (no JSX)
- `.tsx` for React component files (contains JSX)
- `domain/index.ts` exports everything so imports stay clean: `import type { Step } from '../domain'`

## Domain entities

Algorithms and data structures operate on either a classic array (elements are rectangles whose height equals their value) or node-based structures (graphs, trees, linked lists). For now the domain covers the array case only; node-based structures will be added later.

> Note: the project uses `erasableSyntaxOnly: true`, so TypeScript enums are replaced with `as const` objects + a derived union type. Usage is identical (`ElementState.Comparing`, etc.).

### `Element.ts` — `ElementState` + `ArrayElement`

`ElementState` marks the visual state of an element:

```typescript
const ElementState = {
  Default:   'default',
  Comparing: 'comparing',
  Sorted:    'sorted',
  Pivot:     'pivot',
} as const
type ElementState = typeof ElementState[keyof typeof ElementState]
```

`ArrayElement` represents one bar in the array visualisation. `value` is both the data and the bar height:

```typescript
interface ArrayElement {
  value: number
  state: ElementState
}
```

When node-based structures are added, `NodeElement` and the union `type VisualElement = ArrayElement | NodeElement` will live in this same file.

### `VisualArray.ts` — `VisualArray`

Represents the full array the algorithm runs on:

```typescript
interface VisualArray {
  elements: ArrayElement[]
  size: number
  min: number
  max: number
}
```

### `Region.ts` — `RegionState` + `Region`

Marks a contiguous or arbitrary slice of the array with a visual state (e.g. sorted partition, active subarray). Uses indexes into `VisualArray`, not embedded elements:

```typescript
const RegionState = { Default: 'default', Active: 'active', Inactive: 'inactive' } as const
type RegionState = typeof RegionState[keyof typeof RegionState]

interface Region {
  indices: number[]
  state: RegionState
}
```

### `Label.ts` — `LabelPosition` + `Label`

A text annotation attached to a specific element:

```typescript
const LabelPosition = { Above: 'above', Below: 'below' } as const
type LabelPosition = typeof LabelPosition[keyof typeof LabelPosition]

interface Label {
  text: string
  targetIndex: number
  position: LabelPosition
}
```

### `Line.ts` — `LineState` + `Line`

One line of code in the code-sync panel:

```typescript
const LineState = { Default: 'default', Active: 'active', Inactive: 'inactive' } as const
type LineState = typeof LineState[keyof typeof LineState]

interface Line {
  value: string
  state: LineState
}
```

> **Highlight rendering note:** when multiple consecutive lines are active, they should be highlighted as a single block — the shared boundary between touching active lines must not show a dividing highlight edge. Only the outer edges of the block are highlighted.

### `Code.ts` — `Code`

The full code listing shown in the side panel during code-sync mode:

```typescript
interface Code {
  lines: Line[]
}
```

### `Step.ts` — `Step`

The central entity. Each step in an algorithm's execution is one `Step`. The UI renders exactly one `Step` at a time:

```typescript
interface Step {
  array:       VisualArray
  regions:     Region[]
  labels:      Label[]
  code:        Code
  description: string   // human-readable explanation, e.g. "Comparing index 2 and 4"
}
```

### Node-based structures

Deferred. The plan is to nail array-based algorithms (sorting, searching) first to validate the full pipeline, then revisit tree/graph/linked-list rendering, which requires a different visual approach.
