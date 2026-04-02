import { type VisualArray, type ArrayElement, ElementState, type Region } from '../../domain'

export function changeElementsState(array: VisualArray, indexes: number[], state: ElementState, doNotChangeState?: ElementState): void {
    for (const i of indexes) {
        if (doNotChangeState === undefined || array.elements[i].state !== doNotChangeState) {
            array.elements[i].state = state
        }
    }
}

export function swap<T>(array: T[], i: number, j: number): void {
    let aux: T = array[i]
    array[i] = array[j]
    array[j] = aux
}

export function shuffle<T>(list: T[]): T[] {
    const array = [...list]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        swap(array, i, j)
    }
    return array
}

export function toArrayElementList(values: number[]): ArrayElement[] {
    return values.map(n => ({
        value: n,
        state: ElementState.Default
    }) as ArrayElement)
}

export function copyArrayElementsList(values: ArrayElement[]): ArrayElement[] {
    return values.map(el => ({ ...el }) as ArrayElement)
}

export function toVisualArray(values: number[]): VisualArray {
    const min: number = Math.min(...values)
    const max: number = Math.max(...values)

    return {
        elements: toArrayElementList(values),
        size: values.length,
        min: min,
        max: max
    }
}

export function copyVisualArray(value: VisualArray): VisualArray {
    return {
        elements: copyArrayElementsList(value.elements),
        size: value.size,
        min: value.min,
        max: value.max
    }
}

export function copyRegion(value: Region): Region {
    return {
        indexes: [...value.indexes],
        state: value.state
    }
}

export function copyRegionList(value: Region[]): Region[] {
    return value.map(v => copyRegion(v))
}

