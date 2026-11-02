import { Clock3, Footprints, Leaf, Sun } from 'lucide-react'

export default function RouteCard({ route, selected, onSelect, recommended }) {
  return (
    <button className={`route-card ${selected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="route-card-top">
        <span className="route-line" style={{ background: route.color }} />
        <div className="route-name">
          <strong>{route.name}</strong>
          <small>{route.subtitle}</small>
        </div>
        {recommended && <span className="recommended">Best shade</span>}
      </div>
      <div className="route-metrics">
        <span><Footprints size={15} /> {route.distance}</span>
        <span><Clock3 size={15} /> {route.duration}</span>
        <span><Leaf size={15} /> {route.shade}% shade</span>
      </div>
      <div className="shade-track"><span style={{ width: `${route.shade}%`, background: route.color }} /></div>
      <div className="route-foot">
        <span>{route.comfort}</span>
        <span>{selected ? 'Selected' : 'View route'}</span>
      </div>
    </button>
  )
}