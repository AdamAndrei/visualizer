import type { VisualArray } from './VisualArray'
import type { Region } from './Region'
import type { Label } from './Label'
import type { Code } from './Code'

export interface Step {
  array: VisualArray
  regions: Region[]
  labels: Label[]
  code: Code
  description: string
}
