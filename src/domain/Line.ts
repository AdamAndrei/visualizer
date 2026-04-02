export const LineState = {
  Default: 'default',
  Active: 'active',
  Inactive: 'inactive',
} as const

export type LineState = typeof LineState[keyof typeof LineState]

export interface Line {
  value: string
  state: LineState
}
