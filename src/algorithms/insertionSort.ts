import { swap } from "./utils/domainUtils"

function insertionSort(list: number[], leaveEarly: boolean): number[] {
    let arr: number[] = [...list]

    let count: number = 0
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j > 0; j--) {
            count++
            if (arr[j - 1] > arr[j]) {
                swap(arr, j - 1, j)
            } else {
                if (leaveEarly){
                    break
                }
            }
        }
        console.log("i: " + i + " -> " + JSON.stringify(arr))
    }

    console.log("count: " + count)
    return arr
}

function test() {
    let list: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    insertionSort(list, false)
    insertionSort(list, true)
}

test()