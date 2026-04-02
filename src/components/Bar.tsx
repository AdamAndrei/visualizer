import { type ArrayElement, type Region } from '../domain'
import './Bar.css'

export default function Bar({ element, max, region}: { element: ArrayElement, max: number, region?: Region }) {
    const height = `${5 + (element.value / max) * 95}%`
    const regionClass = region === undefined ? '' : `region-${region.state}`
    return (
        <div className={`bar ${element.state} ${regionClass}`} style={{ height: height}}>
        </div>
    )
}