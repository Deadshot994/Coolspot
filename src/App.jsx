import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowDownUp, ArrowRight, ChevronDown, Clock3, Compass, Leaf, MapPin, Menu, Navigation, Search, Settings2, ShieldCheck, Sun, TreePine } from 'lucide-react'
import MapView from './components/MapView'
import RouteCard from './components/RouteCard'
import { demoRoutes, insights, restStops } from './data/demoData'
import { rankRoutes } from './utils/routeScoring'

const chartData = [
  { time: '9 AM', shade: 58, exposure: 42 },
  { time: '10 AM', shade: 62, exposure: 38 },
  { time: '11 AM', shade: 68, exposure: 32 },
  { time: '12 PM', shade: 75, exposure: 25 },
  { time: '1 PM', shade: 70, exposure: 30 },
  { time: '2 PM', shade: 64, exposure: 36 },
  { time: '3 PM', shade: 55, exposure: 45 }
]

export default function App() {
  const [selectedRoute, setSelectedRoute] = useState('coolest')
  const [preference, setPreference] = useState('balanced')
  const [showStops, setShowStops] = useState(true)
  const [origin, setOrigin] = useState('Cubbon Park Metro')
  const [destination, setDestination] = useState('Bengaluru Palace Road')
  const [activeTab, setActiveTab] = useState('Explore')
  const routes = useMemo(() => rankRoutes(demoRoutes, preference), [preference])
  const selected = demoRoutes.find(route => route.id === selectedRoute) || demoRoutes[1]

  const handleFindRoutes = () => {
    const best = rankRoutes(demoRoutes, preference)[0]
    setSelectedRoute(best.id)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><TreePine size={21} /></div><span>coolspot<span className="brand-period">.</span></span></div>
        <div className="side-label">WORKSPACE</div>
        {['Explore', 'Insights'].map(tab => (
          <button key={tab} className={`nav-item ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'Explore' ? <Compass size={18} /> : <AreaChartIcon />}
            {tab}
          </button>
        ))}
        <div className="sidebar-bottom">
          <div className="climate-card">
            <div className="climate-icon"><Sun size={18} /></div>
            <strong>Plan a cooler walk</strong>
            <p>Choose routes that make outdoor journeys more comfortable.</p>
          </div>
          <div className="profile"><div className="avatar">G</div><div><strong>Guest user</strong><small>Demo workspace</small></div><ChevronDown size={15} /></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span>/</span><strong>{activeTab}</strong></div>
          <div className="top-actions"><span className="demo-pill"><span /> Prototype mode</span><button className="icon-button"><Settings2 size={18} /></button></div>
        </header>

        {activeTab === 'Explore' ? (
          <div className="page">
            <div className="page-heading">
              <div><div className="eyebrow"><Leaf size={14} /> CLIMATE-AWARE WALKING</div><h1>Find the cooler way.</h1><p>Compare walking routes by distance, shade and estimated outdoor comfort.</p></div>
              <div className="weather-chip"><Sun size={18} /><div><strong>Sunny conditions</strong><small>Sample weather · 31°C</small></div></div>
            </div>

            <section className="search-panel">
              <div className="location-field"><span className="field-icon origin"><MapPin size={17} /></span><div><label>STARTING POINT</label><input value={origin} onChange={e => setOrigin(e.target.value)} /></div></div>
              <button className="swap-button" onClick={() => { setOrigin(destination); setDestination(origin) }} aria-label="Swap locations"><ArrowDownUp size={17} /></button>
              <div className="location-field"><span className="field-icon destination"><MapPin size={17} /></span><div><label>DESTINATION</label><input value={destination} onChange={e => setDestination(e.target.value)} /></div></div>
              <button className="find-button" onClick={handleFindRoutes}><Search size={16} /> Find routes</button>
            </section>

            <div className="content-grid">
              <section className="map-section">
                <div className="section-heading"><div><h2>Route map</h2><p>Explore alternative paths around your destination</p></div><button className={`toggle-button ${showStops ? 'on' : ''}`} onClick={() => setShowStops(!showStops)}><MapPin size={15} /> Rest stops <span className="toggle-dot" /></button></div>
                <MapView routes={demoRoutes} selectedRoute={selectedRoute} stops={restStops} showStops={showStops} />
                <div className="map-caption"><span><ShieldCheck size={15} /> Shade estimates are illustrative</span><span>Map data © OpenStreetMap</span></div>
              </section>

              <aside className="route-panel">
                <div className="section-heading"><div><h2>Your routes</h2><p>3 options for this journey</p></div><button className="sort-button"><Settings2 size={15} /> Sort</button></div>
                <div className="preference-control"><label>ROUTE PRIORITY</label><div className="segmented">
                  {[['balanced', 'Balanced'], ['coolest', 'Coolest'], ['shortest', 'Shortest']].map(([value, label]) => <button key={value} className={preference === value ? 'chosen' : ''} onClick={() => setPreference(value)}>{label}</button>)}
                </div></div>
                <div className="route-list">
                  {routes.map((route, index) => <RouteCard key={route.id} route={route} selected={selectedRoute === route.id} onSelect={() => setSelectedRoute(route.id)} recommended={preference === 'coolest' ? route.id === 'coolest' : index === 0} />)}
                </div>
                <div className="selected-summary"><div className="summary-icon"><Leaf size={18} /></div><div><strong>{selected.name} selected</strong><p>{selected.shade}% estimated shade coverage · {selected.distance}</p></div><ArrowRight size={17} /></div>
              </aside>
            </div>

            <section className="insights-strip">
              <div className="insight-intro"><div className="insight-icon"><TreePine size={19} /></div><div><h2>Comfort snapshot</h2><p>Estimated environmental profile for the selected route</p></div></div>
              <div className="insight-stat"><span>SHADE COVERAGE</span><strong>{selected.shade}%</strong><small>Along selected route</small></div>
              <div className="insight-stat"><span>WALKING DISTANCE</span><strong>{selected.distance}</strong><small>Approximate distance</small></div>
              <div className="insight-stat"><span>ESTIMATED TIME</span><strong>{selected.duration}</strong><small>At a relaxed pace</small></div>
            </section>
          </div>
        ) : (
          <div className="page insights-page">
            <div className="page-heading"><div><div className="eyebrow"><Leaf size={14} /> ENVIRONMENTAL OVERVIEW</div><h1>Small insights. Cooler cities.</h1><p>Explore the sample environmental indicators behind CoolSpot recommendations.</p></div></div>
            <div className="insight-cards">
              <div className="metric-card"><span>AVERAGE SHADE SCORE</span><strong>75%</strong><small><Leaf size={14} /> Illustrative sample</small></div>
              <div className="metric-card"><span>REST STOPS NEAR ROUTE</span><strong>3</strong><small><MapPin size={14} /> Sample locations</small></div>
              <div className="metric-card"><span>ROUTES COMPARED</span><strong>3</strong><small><Compass size={14} /> Alternative paths</small></div>
            </div>
            <div className="analytics-grid">
              <div className="analytics-card"><h2>Estimated shade through the day</h2><p>Illustrative shade profile for a sample walking corridor</p><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="shadeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#26966b" stopOpacity={0.25}/><stop offset="100%" stopColor="#26966b" stopOpacity={0.02}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9eee8"/><XAxis dataKey="time" axisLine={false} tickLine={false}/><YAxis domain={[0,100]} axisLine={false} tickLine={false}/><Tooltip/><Area type="monotone" dataKey="shade" stroke="#26966b" fill="url(#shadeFill)" strokeWidth={3}/></AreaChart></ResponsiveContainer></div></div>
              <div className="analytics-card"><h2>What contributes to shade?</h2><p>Illustrative model composition</p>{insights.map(item => <div className="contribution" key={item.label}><div><span>{item.label}</span><strong>{item.value}%</strong></div><div className="shade-track"><span style={{ width: `${item.value}%`, background: item.label === 'Open exposure' ? '#e5a33b' : '#26966b' }}/></div></div>)}<div className="data-disclaimer"><ShieldCheck size={16}/> These figures are mock data for demonstrating the interface, not measured conditions.</div></div>
            </div>
          </div>
        )}
        <footer className="footer"><span>COOLSPOT <b>·</b> A climate-action concept prototype</span><span>Designed to make everyday walking more comfortable</span></footer>
      </main>
    </div>
  )
}

function AreaChartIcon() { return <span className="nav-chart"><span/><span/><span/></span> }