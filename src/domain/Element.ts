export const ElementState = {
  Default: 'default',
  Comparing: 'comparing',
  Swapping: 'swapping',
  Sorted: 'sorted',
  Pivot: 'pivot',
} as const

export type ElementState = typeof ElementState[keyof typeof ElementState]

export interface ArrayElement {
  value: number
  state: ElementState
}
