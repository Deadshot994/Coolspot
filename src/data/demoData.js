// All scores and route metrics below are illustrative demo values.
export const demoRoutes = [
  {
    id: 'fastest',
    name: 'Fastest route',
    subtitle: 'The direct way',
    distance: '500 m',
    duration: '6 min',
    shade: 20,
    comfort: 'More sun exposure',
    color: '#e5a33b',
    points: [
      [12.97182, 77.59420],
      [12.97230, 77.59500],
      [12.97282, 77.59578],
      [12.97340, 77.59640],
      [12.97408, 77.59710]
    ]
  },
  {
    id: 'coolest',
    name: 'Coolest route',
    subtitle: 'Follow the shade',
    distance: '650 m',
    duration: '8 min',
    shade: 75,
    comfort: 'More estimated shade',
    color: '#26966b',
    points: [
      [12.97182, 77.59420],
      [12.97155, 77.59505],
      [12.97188, 77.59582],
      [12.97245, 77.59640],
      [12.97305, 77.59688],
      [12.97355, 77.59735],
      [12.97408, 77.59710]
    ]
  },
  {
    id: 'balanced',
    name: 'Balanced route',
    subtitle: 'A little of both',
    distance: '570 m',
    duration: '7 min',
    shade: 48,
    comfort: 'Moderate shade',
    color: '#6f8cce',
    points: [
      [12.97182, 77.59420],
      [12.97205, 77.59502],
      [12.97248, 77.59582],
      [12.97295, 77.59645],
      [12.97352, 77.59685],
      [12.97408, 77.59710]
    ]
  }
]

export const restStops = [
  { id: 1, name: 'Cubbon Park entrance', type: 'Green space', position: [12.97305, 77.59688] },
  { id: 2, name: 'Shaded seating area', type: 'Rest stop', position: [12.97245, 77.59640] },
  { id: 3, name: 'Neighbourhood park', type: 'Green space', position: [12.97188, 77.59582] }
]

export const insights = [
  { label: 'Tree shade', value: 75 },
  { label: 'Building shade', value: 18 },
  { label: 'Open exposure', value: 7 }
]