# ng2

An Angular starter with a map. It began in 2016 as an Angular 2 seed (Gulp, JSPM, SystemJS,
MaterializeCSS, Leaflet and Mapbox) and is now an Angular 22 app: standalone components,
signals, zoneless change detection, and a [MapLibre GL](https://maplibre.org/) map with five
free OpenStreetMap-based themes and a 3D view. No API keys, no paid services.

| Route | What it is |
| --- | --- |
| `/` | Home |
| `/map` | The full-screen map: themes, 3D view, fly-to places, place search, start and end pins |
| `/ws` | The **ws** component library, one demo per component |

## Run it

Node `^22.22.3`, `^24.15.0` or `>=26`.

```sh
npm install
npm start          # http://localhost:4300
```

| Command | What it does |
| --- | --- |
| `npm start` | Dev server on port 4300 |
| `npm run build` | Production build into `dist/ng2/browser` |
| `npm test` | Unit tests (Vitest, through `ng test`) |
| `npm run e2e` | Playwright tests on desktop Chromium and a Pixel 7. Serves a production build on port 4310 itself |

Playwright's browser is a one-off: `npx playwright install chromium`. The e2e tests answer
every map style, tile and geocoder request with a local fixture, so they need no network.
Headless Chromium has no GPU, so the config starts it with SwiftShader (software WebGL).

## Map themes

The theme switch on `/map` offers **Auto** (follows the app's light or dark theme) and five
themes. None needs a key; each is used within its provider's terms.

| Theme | Source | Style |
| --- | --- | --- |
| Light | [CARTO](https://carto.com/basemaps) Positron | `https://basemaps.cartocdn.com/gl/positron-gl-style/style.json` |
| Dark | CARTO Dark Matter | `https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json` |
| Street | [OpenFreeMap](https://openfreemap.org) Liberty (OpenMapTiles schema) | `https://tiles.openfreemap.org/styles/liberty` |
| Colour | CARTO Voyager | `https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json` |
| Satellite | [Esri World Imagery](https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9), with Esri's World Transportation and World Boundaries and Places reference layers for roads and names | Built in code: `satelliteStyle()` in `map-themes.ts` |

The **Place labels** switch shows or hides the satellite roads and names. They come from
Esri's reference layers because CARTO's keyless raster label tiles now carry an
"API key required" watermark.

Credits show in the map's attribution control:

- Map data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) (ODbL).
- CARTO basemaps © CARTO, under the [CARTO terms](https://carto.com/legal). Check them before
  heavy commercial use.
- OpenFreeMap tiles © OpenMapTiles.
- Satellite imagery © Esri, Maxar, Earthstar Geographics and the GIS User Community; reference
  layers © Esri, HERE, Garmin and OpenStreetMap contributors, under
  [Esri's terms](https://www.esri.com/en-us/legal/terms/full-master-agreement).
- Terrain: [Mapzen Terrain Tiles](https://github.com/tilezen/joerd/blob/master/docs/attribution.md)
  on the AWS Open Data registry (SRTM, GMTED, NED, ETOPO1 and others).
- Place search: [OpenStreetMap Nominatim](https://nominatim.org/), under its
  [usage policy](https://operations.osmfoundation.org/policies/nominatim/) (at most one request
  a second; the search box waits 700 ms after typing and needs three characters).

## 3D view

The **3D view** switch works on every theme. It:

1. adds keyless Terrarium elevation tiles
   (`https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png`) as a
   `raster-dem` source and turns on MapLibre terrain (exaggeration 1.4);
2. adds a hillshade layer and a sky with fog, coloured for light or dark themes;
3. extrudes buildings: the CARTO themes get a `fill-extrusion` layer on their own building
   source (`render_height`, then `height`, then 6 m); Liberty already draws its own; satellite
   has no building data, so it gets terrain only;
4. tilts the camera to a 60° pitch and a -20° bearing.

Switching themes keeps the view and re-applies 3D on the new style. The theme, 3D and labels
choices and the last view are kept in `localStorage` (`ws-map-settings`); the app theme is kept
under `ws-ui-theme`.

## Look and theme

The app is styled with [midnite-ui](https://github.com/bilo-io/midnite-ui), the owner's React
design system. Its tokens, brand styles and Tailwind theme are vendored in
`src/vendor/midnite-ui/` (see its README for the pinned commit), and Tailwind 3 builds on them.
Every colour comes from a token, so light and dark read the same way midnite-ui does.

| Piece | Where | Notes |
| --- | --- | --- |
| Button | `button[mnButton]`, `a[mnButton]` | Variants `default`, `secondary`, `ghost`, `outline`, `destructive`, `success`; sizes `default`, `sm`, `lg`, `icon` |
| Card | `[mnCard]` | `solid` or `glass` |
| Chip | `[mnChip]` | Small pill, optionally interactive and `active` |
| Icon | `mn-icon` | Lucide icons by name |
| Segmented | `mn-segmented` | Radio group drawn as a segmented control |
| Panel | `mn-panel` | Glass collapsible panel (the map controls) |
| Theme menu | `mn-theme-toggle` | Light, Dark or System |

The theme is the `dark` class on `<html>`. An inline script in `index.html` applies the saved
choice before the app loads, so there is no flash. Under **Auto** the map follows the app theme;
picking a map theme overrides it. Motion is CSS only and stops under `prefers-reduced-motion`.

## The ws library

`src/app/shared/ws/` holds the reusable components, all standalone, `OnPush` and signal-based.

| Component | Selector | Notes |
| --- | --- | --- |
| Map | `ws-map` | MapLibre map. Inputs `center` ([lng, lat]), `zoom`, `theme`, `threeD`, `satelliteLabels`; outputs `mapClick`, `moveEnd`, `styleLoad` |
| Map service | `WsMapService` | Points, lines, polygons and start/end pins to draw; `panTo`, `fitBounds`; `clicked$`, `moved$`, `markerMoved$`, `markerClicked$` |
| Point picker | `ws-point` | Finds a place by name (Nominatim) or by coordinates |
| Autocomplete | `ws-autocomplete` | Filters `WsItem`s as you type |
| Input | `ws-input` | Labelled text or number input with two-way `value` |
| List | `ws-list` | Single or multiple choice list; can remember its state |
| Select | `ws-select` | Drop-down on top of `ws-list`, single or multiple |
| Tabs | `ws-tabs` | Segmented tab bar with two-way `active` and arrow-key focus |
| Toggle | `ws-toggle` | Accessible switch (replaces the old `ws-toggle` and `ws-switch`) |
| Loader | `ws-loader` | Spinner with an optional label (replaces `ws-spinner` and `ws-loader-label`) |
| Toast | `WsToastService` + `ws-toast` | `success`, `warning`, `error`, `show` and `notify` |
| Modal | `WsModalService` + `ws-modal` | `show()` returns a `Promise<boolean>` |
| Navbar, sidenav | `ws-navbar`, `ws-sidenav` | Glass top bar with links, menu and the theme menu |

Drawing on the map from anywhere:

```ts
const map = inject(WsMapService);
map.showPoints([{ name: 'Midrand', point: new Point([28.1821, -25.9518]), color: '#00adee' }]);
map.panTo(new Point([18.4038, -33.9628]), 13);
map.clicked$.subscribe((point) => console.log(point.latitude, point.longitude));
```

## What changed from the Angular 2 version

- Gulp, JSPM, SystemJS and Karma are replaced by the Angular CLI (`@angular/build`), Vitest
  and Playwright.
- Leaflet, Mapbox and the Google geocoder are replaced by MapLibre GL and Nominatim.
- MaterializeCSS and Material Icons are replaced by midnite-ui's tokens and Tailwind theme, with
  light and dark themes (`src/styles.css`, `src/vendor/midnite-ui/`).
- The WhereIsMyTransport, Uber and principal API clients, the transit models and the `.ng2`
  blueprints are removed: they needed private keys, and those APIs have since changed.
