export const RegionState = {
  Default: 'default',
  Active: 'active',
  Inactive: 'inactive',
  Sorted: 'sorted',
} as const

export type RegionState = typeof RegionState[keyof typeof RegionState]

export interface Region {
  indexes: number[]
  state: RegionState
}
