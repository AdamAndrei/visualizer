import { shuffle } from "../algorithms/utils/domainUtils"




function randomNormal(mean: number, std: number): number {
    const r1 = Math.random()
    const r2 = Math.random()

    const r = Math.sqrt(-2 * Math.log(r1)) * Math.cos(2 * Math.PI * r2)
    return Math.round(mean + r * std)
}

function generateList(size: number): number[] {
    const mean = size / 2
    const std = size / 6

    return Array.from({ length: size }, () => Math.min(Math.max(randomNormal(mean, std), 1), size))
}


function valueToIdexes(list: number[]): Map<number, number[]> {
    const map = new Map<number, number[]>()

    for (let i = 0; i < list.length; i++) {
        if (!map.has(list[i])) {
            map.set(list[i], [i])
        } else {
            map.get(list[i])?.push(i)
        }
    }

    return map
}

function removeDuplicates(list: number[], numberOfAcceptedDuplicates: number): void {
    const map: Map<number, number[]> = valueToIdexes(list)

    const unusedNumbers: number[] = []

    for (let i = 1; i <= list.length; i++) {
        if (!map.has(i)) {
            unusedNumbers.push(i)
        }
    }

    let start: number = -1
    let end: number = unusedNumbers.length
    for (const [_, indexes] of map) {
        if (indexes.length > numberOfAcceptedDuplicates) {
            while (start != end && indexes.length > numberOfAcceptedDuplicates) {
                const unusedNumber: number = Math.random() < 0.5 ? unusedNumbers[++start] : unusedNumbers[--end]
                const index = indexes.pop()
                if (index === undefined) throw new Error('Expected an index but got undefined')

                list[index] = unusedNumber
            }
        }
    }
}

export function expandList(list: number[], n: number): number[] {
    const arr: number[] = [...list]

    const newValues: number[] = generateList(n).map(el => el + arr.length - 1)
    removeDuplicates(newValues, 3)

    for (let i = 0; i < newValues.length; i++) {
        const index: number = Math.min(Math.max(0, Math.floor(Math.random() * (arr.length - 1))), arr.length - 1)
        console.log(index)
        arr.splice(index, 0, newValues[i])
    }
    return arr
}

export function contractList(list: number[], n: number): number[] {
    const arr: number[] = [...list]

    const nm: number = Math.min(n, arr.length)
    for (let i = 0; i < nm; i++) {
        const index: number = Math.min(Math.max(0, Math.floor(Math.random() * (arr.length - 1))), arr.length - 1)
        arr.splice(index, 1)
    }
    return arr
}


export function generateRandomList(size: number): number[] {
    const list: number[] = generateList(size)
    removeDuplicates(list, 2)
    return shuffle(list)
}