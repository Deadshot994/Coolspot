import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, ZoomControl } from 'react-leaflet'
import { MapPin } from 'lucide-react'

const center = [12.9729, 77.5957]

export default function MapView({ routes, selectedRoute, stops, showStops }) {
  return (
    <div className="map-wrap">
      <MapContainer center={center} zoom={16} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        {routes.map(route => (
          <Polyline
            key={route.id}
            positions={route.points}
            pathOptions={{
              color: route.color,
              weight: route.id === selectedRoute ? 7 : 4,
              opacity: route.id === selectedRoute ? 0.95 : 0.42,
              dashArray: route.id === selectedRoute ? undefined : '7 8'
            }}
          >
            <Popup>{route.name} · {route.shade}% estimated shade</Popup>
          </Polyline>
        ))}
        <CircleMarker center={routes[0].points[0]} radius={8} pathOptions={{ color: '#fff', weight: 3, fillColor: '#253f35', fillOpacity: 1 }}>
          <Popup>Starting point</Popup>
        </CircleMarker>
        <CircleMarker center={routes[0].points.at(-1)} radius={8} pathOptions={{ color: '#fff', weight: 3, fillColor: '#e58b54', fillOpacity: 1 }}>
          <Popup>Destination</Popup>
        </CircleMarker>
        {showStops && stops.map(stop => (
          <CircleMarker key={stop.id} center={stop.position} radius={6} pathOptions={{ color: '#fff', weight: 2, fillColor: '#26966b', fillOpacity: 1 }}>
            <Popup><strong>{stop.name}</strong><br />{stop.type}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <div className="map-legend">
        <span><i className="legend-dot start" /> Start</span>
        <span><i className="legend-dot end" /> Destination</span>
        <span><i className="legend-dot stop" /> Rest stop</span>
      </div>
      <div className="map-note"><MapPin size={13} /> Demo area · Bengaluru</div>
    </div>
  )
}