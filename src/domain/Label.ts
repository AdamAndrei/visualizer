export const LabelPosition = {
  Above: 'above',
  Below: 'below',
} as const

export type LabelPosition = typeof LabelPosition[keyof typeof LabelPosition]

export interface Label {
  text: string
  targetIndex: number
  position: LabelPosition
}
