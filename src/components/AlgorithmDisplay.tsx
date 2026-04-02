import { useEffect, useMemo, useState } from 'react'
// import { visualBubbleSort } from '../algorithms/bubbleSort'
import ArrayDisplay from './ArrayDisplay'
import './AlgorithmDisplay.css'
import { contractList, expandList, generateRandomList } from '../helpers/listGenerator'
import { shuffle } from '../algorithms/utils/domainUtils'
import { visualCocktailShakerSort } from '../algorithms/cocktailShakerSort'

const INITIAL_SIZE: number = 14

export default function AlgorithmDisplay() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [playing, setPlaying] = useState(false)

    const [size, setSize] = useState(INITIAL_SIZE)
    const [list, setList] = useState(() => generateRandomList(INITIAL_SIZE))
    // const steps = useMemo(() => visualBubbleSort([...list]), [list])
    const steps = useMemo(() => visualCocktailShakerSort(list), [list])

    const [speed, setSpeed] = useState(10)
    const timer = (list.length < 15 ? 200 : 150) / (speed / 10)

    useEffect(() => {
        if (!playing) return

        const interval = setInterval(() => {
            setCurrentIndex(i => {
                if (i >= steps.length - 1) {
                    setPlaying(false)
                    return i
                }

                return i + 1
            })
        }, timer)

        return () => clearInterval(interval)
    }, [playing, speed])

    return (
        <>
            <div className='algorithm-container'>
                <div className='button-container-container'>
                    <div className='button-container'>
                        <button className='control-button' onClick={() => setCurrentIndex(currentIndex - 1)} disabled={currentIndex === 0}>
                            Previous
                        </button>

                        <button className='control-button' onClick={() => setCurrentIndex(currentIndex + 1)} disabled={currentIndex === steps.length - 1}>
                            Next
                        </button>
                    </div>

                    <div className='button-container'>
                        <div className='slider'>
                            <input
                                type='range'
                                min={5}
                                max={50}
                                value={size}
                                onChange={e => {
                                    const newSize = Number(e.target.value)
                                    setSize(newSize)
                                    setCurrentIndex(0)
                                    setPlaying(false)
                                    setList(l => newSize > l.length
                                        ? expandList(l, newSize - l.length)
                                        : contractList(l, l.length - newSize)
                                    )
                                }}
                            />
                            <span>Size: {list.length}</span>
                        </div>
                        <div className='slider'>
                            <input
                                type='range'
                                min={1}
                                max={50}
                                value={speed}
                                onChange={e => {
                                    const newSpeed = Number(e.target.value)
                                    setSpeed(newSpeed)
                                }}
                            />
                            <span>Speed: {speed / 10}</span>
                        </div>
                    </div>

                    <div className='button-container'>
                        <button className='control-button' onClick={() => {
                            if (currentIndex === steps.length - 1) {
                                setCurrentIndex(0)
                                setPlaying(false)
                            } else setPlaying(!playing)
                        }}>
                            {playing ? 'Pause' : (currentIndex === steps.length - 1 ? 'Restart' : 'Play')}
                        </button>

                        <button className='control-button' onClick={() => {
                            setList(l => shuffle(l))
                            setCurrentIndex(0)
                            setPlaying(false)
                        }}>
                            Shuffle
                        </button>
                    </div>
                </div>


                <div className='array-container'>
                    <ArrayDisplay step={steps[currentIndex]} />
                </div>

                <p>Current step: {currentIndex + 1} form {steps.length}</p>
            </div>
        </>
    )
}
