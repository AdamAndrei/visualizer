import { type Step } from '../domain'
import Bar from './Bar'
import './ArrayDisplay.css'

export default function ArrayDisplay({ step }: { step: Step }) {
    return (
        <>
            <h2>{step.description}</h2>
            <div className='array-display'>
                {step.array.elements.map((element, index) => {
                    const regionForIndex = step.regions.find(r => r.indexes.includes(index))
                    return <Bar key={index} element={element} max={step.array.max} region={regionForIndex} />
                })}
            </div>
        </>
    )
}