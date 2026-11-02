# CoolSpot — prototype UI

A React + Vite demo for a climate-aware walking route concept.

## Run locally

1. Install Node.js (LTS).
2. Extract this folder and open it in VS Code.
3. Open a terminal in the project folder.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## What's included

- Interactive OpenStreetMap map using Leaflet.
- Three illustrative walking route options.
- Route priority controls: Balanced, Coolest, Shortest.
- Sample shade coverage and route metrics.
- Toggleable rest-stop markers.
- Environmental insights page with a sample chart.
- Responsive layout for desktop and mobile.

## Important demo limitations

- Route names, paths, distances, shade percentages, weather and chart values are illustrative.
- The start and destination text fields are UI demonstration fields; changing them does not geocode locations or recalculate real routes.
- The route priority selector ranks the preloaded sample routes; it does not compute real-world paths.
- Map tiles are provided by OpenStreetMap and require an internet connection.
- This prototype does not measure actual tree shade or predict time-specific shadows.

For a real implementation, replace the sample JSON data with verified geospatial datasets, route geometry and calibrated shade estimates. Follow OpenStreetMap tile usage policies.
