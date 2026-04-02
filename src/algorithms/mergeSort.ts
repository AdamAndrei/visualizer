function mergeSort(list: number[]): number[] {
    let arr: number[] = [...list]
    let aux: number[] = new Array(arr.length)
    sort(aux, arr, 0, arr.length)
    return arr
}




function sort(aux: number[], list: number[], left: number, right: number) {
    if (right - left <= 1) {
        return
    }

    let mid: number = Math.floor((left + right) / 2)
    sort(aux, list, left, mid)
    sort(aux, list, mid, right)

    let l: number = left
    let r: number = mid
    let k: number = left

    while (l < mid || r < right) {
        if (l >= mid) {
            aux[k] = list[r++]
        } else if (r >= right) {
            aux[k] = list[l++]
        } else if (list[l] <= list[r]) {
            aux[k] = list[l++]
        } else {
            aux[k] = list[r++]
        }
        k++
    }

    for (let i = left; i < k; i++) {
        list[i] = aux[i]
    }
}


function test() {
    let list: number[] = [5, 4, 3, 2, 1, 9, 8, 7]

    console.log(JSON.stringify(mergeSort(list)))
}

test()