import AlgorithmDisplay from "./AlgorithmDisplay";

export default function BubbleSort() {
    return (
        <>
            <h1>Bubble Sort</h1>
            <section>
                <h2>A Friendly Introduction</h2>
                <p>
                    Bubble sort is one of the simplest sorting algorithms out there, and a great starting point for understanding how computers think about ordering data.
                    The idea is straightforward: go through the array and compare each pair of neighboring elements. If they're in the wrong order, swap them. Repeat this process until no more swaps are needed — at that point, the array is sorted.
                    The name comes from the way larger values gradually "bubble up" toward the end of the array with each pass. After the first pass, the largest element is guaranteed to be in its correct position at the very end. After the second pass, the second largest is in place too. And so on, until everything is sorted.
                </p>
            </section>
            <AlgorithmDisplay />

            <section>
                <h2>How fast is it?</h2>
                <p>
                    With an array of n elements, bubble sort does roughly n²/2 comparisons in the worst case. In Big-O terms, we write this as O(n²). That means if you double the size of your input, the work roughly quadruples. For small arrays this is fine, but it becomes slow quickly as the data grows.
                    There is one silver lining: if the array is already sorted, a slightly optimised version of bubble sort can detect this after a single pass and stop immediately — making it O(n) in the best case.
                </p>
            </section>

            <section>
                <h2>Pros and cons</h2>
                <p>
                    Bubble sort is easy to understand and easy to implement, which makes it a fantastic teaching tool. It also sorts in-place, meaning it needs no extra memory beyond the original array. On top of that, it's a stable sort — equal elements always stay in their original relative order.
                    The downside is performance. O(n²) is simply too slow for large datasets, and algorithms like merge sort or quick sort will leave it far behind in practice. Bubble sort is rarely used outside of educational contexts for exactly this reason — but as a first algorithm to learn, it's hard to beat.
                </p>
            </section>
        </>
    )
}