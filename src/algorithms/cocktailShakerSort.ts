import { type Region, type Step, type VisualArray, ElementState, RegionState } from '../domain'
import { changeElementsState, swap, toVisualArray, copyVisualArray, copyRegionList } from './utils/domainUtils';

function cocktailShakerSort(list: number[]) {
    let arr: number[] = [...list]
    let start: number = 0
    let end: number = arr.length
    while (start < end) {
        let a: boolean = moveForward(arr, start, end)
        console.log(JSON.stringify(arr))
        end--
        let b: boolean = moveBackward(arr, start, end)
        console.log(JSON.stringify(arr))
        start++

        if (a && b) {
            return arr
        }
    }

    return arr
}

function moveForward(list: number[], start: number, end: number): boolean {
    let swapped: boolean = false

    for (let j = start; j < end - 1; j++) {
        if (list[j] > list[j + 1]) {
            swap(list, j, j + 1)
            swapped = true;
        }
    }

    return !swapped
}

function moveBackward(list: number[], start: number, end: number): boolean {
    let swapped: boolean = false

    for (let j = end; j > start; j--) {
        if (list[j - 1] > list[j]) {
            swap(list, j - 1, j)
            swapped = true;
        }
    }

    return !swapped
}

export function visualCocktailShakerSort(list: number[]): Step[] {
    let arr: number[] = [...list]
    let steps: Step[] = []
    let start: number = 0
    let end: number = arr.length

    let previousStep: Step = {
        array: toVisualArray(arr),
        regions: [],
        labels: [],
        code: { lines: [] },
        description: "Initial list"
    }

    steps.push(previousStep)


    while (start < end) {
        let previousComparingIndeces: number[] = []
        let swappedMovingForward: boolean = false

        for (let j = start; j < end - 1; j++) {
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

            if (arr[j] > arr[j + 1]) {
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
                swap(arr, j, j + 1)
                swappedMovingForward = true;
            }

            previousComparingIndeces = currentComparingIndexes
        }

        let forwardSortedElementsArray: VisualArray = copyVisualArray(steps[steps.length - 1].array)

        changeElementsState(forwardSortedElementsArray, previousComparingIndeces, ElementState.Default)
        let forwardSortedRegions: Region[] = copyRegionList(steps[steps.length - 1].regions
            .filter(v => v.state === RegionState.Sorted))

        if (swappedMovingForward) {
            forwardSortedRegions.push(
                {
                    indexes: [end - 1],
                    state: RegionState.Sorted
                }
            )
            changeElementsState(forwardSortedElementsArray, [end - 1], ElementState.Sorted)
            steps.push({
                array: forwardSortedElementsArray,
                regions: forwardSortedRegions,
                labels: [],
                code: { lines: [] },
                description: "Element at index " + (end - 1) + " is now sorted."
            })
        } else {
            forwardSortedRegions.push(
                {
                    indexes: Array.from({ length: arr.length }, (_, k) => k),
                    state: RegionState.Sorted
                }
            )
            changeElementsState(forwardSortedElementsArray, Array.from({ length: arr.length }, (_, k) => k), ElementState.Sorted)
            steps.push({
                array: forwardSortedElementsArray,
                regions: forwardSortedRegions,
                labels: [],
                code: { lines: [] },
                description: "The list is now sorted."
            })
            break;
        }
        end--

        let swappedMovingBackward: boolean = false
        previousComparingIndeces = []

        for (let j = end - 1; j > start; j--) {
            let comparingArray: VisualArray = copyVisualArray(steps[steps.length - 1].array)
            let currentComparingIndexes: number[] = [j - 1, j]

            changeElementsState(comparingArray, previousComparingIndeces, ElementState.Default)
            changeElementsState(comparingArray, currentComparingIndexes, ElementState.Comparing)

            let sortedRegions: Region[] = steps[steps.length - 1].regions
                .filter(v => v.state === RegionState.Sorted)
            let regionsForComparing: Region[] = copyRegionList(sortedRegions)
            regionsForComparing.push(
                {
                    indexes: [j - 1, j],
                    state: RegionState.Active
                }
            )

            let comparingStep: Step = {
                array: comparingArray,
                regions: regionsForComparing,
                labels: [],
                code: { lines: [] },
                description: "Comparing elements from indexes: " + (j - 1)
                    + " and " + j + "."
            }
            steps.push(comparingStep)

            if (arr[j - 1] > arr[j]) {
                let swappingArray = copyVisualArray(comparingArray)
                swap(swappingArray.elements, j - 1, j)
                changeElementsState(swappingArray, [j - 1], ElementState.Swapping)
                let regionsForSwapping: Region[] = copyRegionList(sortedRegions)
                regionsForSwapping.push(
                    {
                        indexes: [j - 1, j],
                        state: RegionState.Active
                    }
                )
                let swappingStep: Step = {
                    array: swappingArray,
                    regions: regionsForSwapping,
                    labels: [],
                    code: { lines: [] },
                    description: "Swapping elements from indexes: " + (j - 1)
                        + " and " + j + "."
                }
                steps.push(swappingStep)
                swap(arr, j - 1, j)
                swappedMovingBackward = true;
            }

            previousComparingIndeces = currentComparingIndexes
        }

        let backwartdSortedElementsArray: VisualArray = copyVisualArray(steps[steps.length - 1].array)

        changeElementsState(backwartdSortedElementsArray, previousComparingIndeces, ElementState.Default)
        let backwardSortedRegions: Region[] = copyRegionList(steps[steps.length - 1].regions
            .filter(v => v.state === RegionState.Sorted))

        if (swappedMovingBackward) {
            backwardSortedRegions.push(
                {
                    indexes: [start],
                    state: RegionState.Sorted
                }
            )
            changeElementsState(backwartdSortedElementsArray, [start], ElementState.Sorted)
            steps.push({
                array: backwartdSortedElementsArray,
                regions: backwardSortedRegions,
                labels: [],
                code: { lines: [] },
                description: "Element at index " + start + " is now sorted."
            })
        } else {
            backwardSortedRegions.push(
                {
                    indexes: Array.from({ length: arr.length }, (_, k) => k),
                    state: RegionState.Sorted
                }
            )
            changeElementsState(backwartdSortedElementsArray, Array.from({ length: arr.length }, (_, k) => k), ElementState.Sorted)
            steps.push({
                array: backwartdSortedElementsArray,
                regions: backwardSortedRegions,
                labels: [],
                code: { lines: [] },
                description: "The list is now sorted."
            })
            break;
        }

        start++
    }

    return steps
}


function test() {
    let list: number[] = [5, 3, 14, 4, 2, 8, 6, 7, 10, 9]

    console.log(JSON.stringify(cocktailShakerSort(list)))
}

test()