// Simple illustrative route ranking for the prototype.
// In a real system, segment-level canopy and time-specific shadow estimates
// would replace these sample values.
export function getRouteScore(route, preference = 'balanced') {
  const distance = Number.parseInt(route.distance, 10)
  const shadePenalty = 100 - route.shade

  if (preference === 'shortest') return distance
  if (preference === 'coolest') return shadePenalty
  return distance * 0.45 + shadePenalty * 2.2
}

export function rankRoutes(routes, preference = 'balanced') {
  return [...routes].sort(
    (a, b) => getRouteScore(a, preference) - getRouteScore(b, preference)
  )
}