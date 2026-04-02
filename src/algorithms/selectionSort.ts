import { swap } from "./utils/domainUtils"

function selectionSort(list: number[]): number[] {
    let arr: number[] = [...list]

    for (let i = 0; i < arr.length; i++) {
        let min: number = arr[i]
        let minIndex: number = i
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < min) {
                min = arr[j]
                minIndex = j
            }
        }
        swap(arr, i, minIndex)
        console.log("i: " + i + " minindex: " + minIndex + " -> " + JSON.stringify(arr))
    }

    return arr
}


function selectionSortEarlyExit(list: number[]): number[] {
    let arr: number[] = [...list]

    for (let i = 0; i < arr.length; i++) {
        let min: number = arr[i]
        let minIndex: number = i
        let sorted = true
        for (let j = i; j < arr.length; j++) {
            if (j < arr.length - 1 && arr[j + 1] < arr[j]) {
                sorted = false
            }
            if (arr[j] < min) {
                min = arr[j]
                minIndex = j
            }
        }
        if (sorted) {
            return arr
        }
        swap(arr, i, minIndex)
        console.log("i: " + i + " minindex: " + minIndex + " -> " + JSON.stringify(arr))
    }

    return arr
}

function test() {
    let list: number[] = [1, 2, 11, 7, 8, 9, 10, 12, 13, 14, 15, 16]

    console.log("No early exit:")
    console.log("=====================================")
    console.log(JSON.stringify(selectionSort(list)))
    console.log("=====================================")
    console.log("Early exit:")
    console.log(JSON.stringify(selectionSortEarlyExit(list)))
    console.log("=====================================")
}

test()