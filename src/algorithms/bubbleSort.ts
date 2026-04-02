import { type Region, type Step, type VisualArray, ElementState, RegionState } from '../domain'
import { changeElementsState, swap, toVisualArray, copyVisualArray, copyRegionList } from './utils/domainUtils';


export function bubbleSort(list: number[]): void {
    for (let i = 0; i < list.length - 1; i++) {
        let swapped: boolean = false

        for (let j = 0; j < list.length - i - 1; j++) {
            console.log("i: " + i + " j: " + j + ": " + JSON.stringify(list))
            if (list[j] > list[j + 1]) {
                console.log("swapped: " + list[j] + " and " + list[j + 1])
                swap(list, j, j + 1)
                swapped = true;
            }
        }

        if (!swapped) {
            return
        }
    }
}

export function visualBubbleSort(list: number[]): Step[] {
    let steps: Step[] = []
    let previousStep: Step = {
        array: toVisualArray(list),
        regions: [],
        labels: [],
        code: { lines: [] },
        description: "Initial list"
    }

    steps.push(previousStep)

    for (let i = 0; i < list.length; i++) {
        let previousComparingIndeces: number[] = []
        let swapped: boolean = false

        for (let j = 0; j < list.length - i - 1; j++) {
            let comparingArray: VisualArray = copyVisualArray(steps[steps.length - 1].array)
            let currentComparingIndexes: number[] = [j, j + 1]

            changeElementsState(comparingArray, previousComparingIndeces, ElementState.Default)
            changeElementsState(comparingArray, currentComparingIndexes, ElementState.Comparing)

            let sortedRegions: Region[] = steps[steps.length - 1].regions
                .filter(v => v.state === RegionState.Sorted)

            let regionsForComparing: Region[] = copyRegionList(sortedRegions)
            regionsForComparing.push(
                {
                    indexes: [j, j + 1],
                    state: RegionState.Active
                }
            )

            let comparingStep: Step = {
                array: comparingArray,
                regions: regionsForComparing,
                labels: [],
                code: { lines: [] },
                description: "Comparing elements from indexes: " + j
                    + " and " + (j + 1) + "."
            }
            steps.push(comparingStep)

            if (list[j] > list[j + 1]) {
                let swappingArray = copyVisualArray(comparingArray)
                swap(swappingArray.elements, j, j + 1)
                changeElementsState(swappingArray, [j + 1], ElementState.Swapping)
                let regionsForSwapping: Region[] = copyRegionList(sortedRegions)
                regionsForSwapping.push(
                    {
                        indexes: [j, j + 1],
                        state: RegionState.Active
                    }
                )
                let swappingStep: Step = {
                    array: swappingArray,
                    regions: regionsForSwapping,
                    labels: [],
                    code: { lines: [] },
                    description: "Swapping elements from indexes: " + j
                        + " and " + (j + 1) + "."
                }
                steps.push(swappingStep)

                swap(list, j, j + 1)
                swapped = true;
            }

            previousComparingIndeces = currentComparingIndexes
        }

        let sortedElementsArray: VisualArray = copyVisualArray(steps[steps.length - 1].array)

        changeElementsState(sortedElementsArray, previousComparingIndeces, ElementState.Default)
        let sortedRegions: Region[] = copyRegionList(steps[steps.length - 1].regions
            .filter(v => v.state === RegionState.Sorted))

        if (swapped) {
            sortedRegions.push(
                {
                    indexes: [list.length - i - 1],
                    state: RegionState.Sorted
                }
            )
            changeElementsState(sortedElementsArray, [list.length - i - 1], ElementState.Sorted)
            steps.push({
                array: sortedElementsArray,
                regions: sortedRegions,
                labels: [],
                code: { lines: [] },
                description: "Element at index " + (list.length - i - 1) + " is now sorted."
            })
        } else {
            sortedRegions.push(
                {
                    indexes: Array.from({ length: list.length - i }, (_, k) => k),
                    state: RegionState.Sorted
                }
            )
            changeElementsState(sortedElementsArray, Array.from({ length: list.length - i }, (_, k) => k), ElementState.Sorted)
            steps.push({
                array: sortedElementsArray,
                regions: sortedRegions,
                labels: [],
                code: { lines: [] },
                description: "The list is now sorted."
            })
            break;
        }
    }

    return steps
}