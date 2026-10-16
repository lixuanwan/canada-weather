const STYLE = "https://tiles.openfreemap.org/styles/fiord";
const ALERTS_URL = "https://api.weather.gc.ca/collections/weather-alerts/items?f=json&limit=1000";
const WMS = "https://geo.weather.gc.ca/geomet";

const PROVINCES = {
  AB: ["Alberta", "America/Edmonton", 49, 60],
  BC: ["British Columbia", "America/Vancouver", 48.3, 60],
  SK: ["Saskatchewan", "America/Regina", 49, 60],
  MB: ["Manitoba", "America/Winnipeg", 49, 60],
  ON: ["Ontario", "America/Toronto", 41.7, 56.9],
  QC: ["Quebec", "America/Toronto", 45, 62.6],
  NB: ["New Brunswick", "America/Halifax", 44.6, 48.1],
  NS: ["Nova Scotia", "America/Halifax", 43.4, 47.2],
  PE: ["Prince Edward Island", "America/Halifax", 45.9, 47.1],
  NL: ["Newfoundland and Labrador", "America/St_Johns", 46.6, 60.4],
  YT: ["Yukon", "America/Whitehorse", 60, 69.6],
  NT: ["Northwest Territories", "America/Yellowknife", 60, 78.5],
  NU: ["Nunavut", "America/Iqaluit", 51.5, 83],
};

const RADAR = {
  rain: { obs: "RADAR_1KM_RRAI", extra: "Radar_1km_RainPrecipRate-Extrapolation" },
  snow: { obs: "RADAR_1KM_RSNO", extra: "Radar_1km_SnowPrecipRate-Extrapolation" },
  type: { obs: "Radar_1km_SfcPrecipType", style: "SfcPrecipType_Dis", interpolate: false },
};
const MODEL = {
  temp: ["RDPS_10km_AirTemp_2m", "Temperature"],
  wind: ["RDPS_10km_WindSpeed_10m", "Wind speed"],
  gust: ["RDPS_10km_WindGust_10m", "Wind gust"],
  humidex: ["RDPS_10km_Humidex", "Humidex"],
  dew: ["RDPS_10km_DewPoint_2m", "Dew point"],
};
const WORLD = {
  temp: "GDPS_15km_AirTemp_2m",
  wind: "GDPS_15km_WindSpeed_10m",
  gust: "GDPS_15km_WindGust_10m",
  humidex: "GDPS_15km_Humidex",
  dew: "GDPS_15km_DewPoint_2m",
  rain: "GDPS_15km_PrecipRate",
  snow: "GDPS_15km_PrecipRate",
  type: "GDPS_15km_PrecipRate",
  dir: "GDPS_15km_WindDir_10m",
  speed: "GDPS_15km_WindSpeed_10m",
};
const PROBE_FIELDS = [
  ["temp", "Temperature"],
  ["wind", "Wind"],
  ["gust", "Gusts"],
  ["dew", "Dew point"],
  ["humidex", "Humidex"],
  ["rain", "Radar rain"],
];

const CITIES = [
  ["Vancouver", -123.12, 49.28, 1], ["Victoria", -123.37, 48.43, 1], ["Kelowna", -119.5, 49.89, 1],
  ["Kamloops", -120.33, 50.67, 2], ["Prince George", -122.75, 53.92, 1], ["Nanaimo", -123.94, 49.16, 2],
  ["Fort St. John", -120.85, 56.25, 2], ["Cranbrook", -115.77, 49.51, 2], ["Terrace", -128.6, 54.52, 2],
  ["Calgary", -114.07, 51.05, 1], ["Edmonton", -113.49, 53.55, 1], ["Red Deer", -113.81, 52.27, 1],
  ["Lethbridge", -112.83, 49.69, 1], ["Medicine Hat", -110.68, 50.04, 1], ["Grande Prairie", -118.8, 55.17, 1],
  ["Fort McMurray", -111.38, 56.73, 1], ["Lloydminster", -110.0, 53.28, 2], ["Airdrie", -114.01, 51.29, 2],
  ["Leduc", -113.55, 53.26, 2], ["Spruce Grove", -113.9, 53.55, 2], ["St. Albert", -113.63, 53.63, 2],
  ["Fort Saskatchewan", -113.22, 53.72, 2], ["Camrose", -112.83, 53.02, 2], ["Wetaskiwin", -113.37, 52.97, 2],
  ["Lacombe", -113.74, 52.47, 2], ["Sylvan Lake", -114.09, 52.31, 2], ["Olds", -114.09, 51.79, 3],
  ["Innisfail", -113.95, 52.03, 3], ["Brooks", -111.9, 50.56, 2], ["Taber", -112.15, 49.79, 3],
  ["Coaldale", -112.62, 49.73, 3], ["Pincher Creek", -113.95, 49.49, 3], ["Crowsnest Pass", -114.47, 49.6, 3],
  ["High River", -113.87, 50.58, 2], ["Okotoks", -113.97, 50.73, 2], ["Strathmore", -113.39, 51.04, 2],
  ["Canmore", -115.36, 51.09, 2], ["Banff", -115.57, 51.18, 2], ["Jasper", -118.08, 52.87, 2],
  ["Hinton", -117.59, 53.4, 2], ["Edson", -116.44, 53.58, 2], ["Whitecourt", -115.68, 54.14, 2],
  ["Slave Lake", -114.77, 55.28, 2], ["Athabasca", -113.29, 54.72, 2], ["Barrhead", -114.4, 54.12, 3],
  ["Westlock", -113.85, 54.15, 3], ["Cold Lake", -110.18, 54.46, 2], ["Bonnyville", -110.73, 54.27, 2],
  ["Lac La Biche", -112.01, 54.77, 2], ["St. Paul", -111.29, 53.99, 3], ["Vegreville", -112.05, 53.49, 3],
  ["Wainwright", -110.86, 52.84, 3], ["Stettler", -112.72, 52.32, 3], ["Drumheller", -112.71, 51.46, 2],
  ["Hanna", -111.93, 51.64, 3], ["Oyen", -110.47, 51.35, 3], ["Peace River", -117.29, 56.23, 2],
  ["High Level", -117.14, 58.52, 2], ["Rocky Mountain House", -114.92, 52.37, 2],
  ["Regina", -104.62, 50.45, 1], ["Saskatoon", -106.67, 52.13, 1], ["Prince Albert", -105.75, 53.2, 1],
  ["Moose Jaw", -105.55, 50.39, 1], ["Swift Current", -107.79, 50.29, 1], ["Yorkton", -102.46, 51.21, 1],
  ["North Battleford", -108.29, 52.78, 2], ["Estevan", -102.99, 49.14, 2], ["Weyburn", -103.85, 49.66, 2],
  ["Melville", -102.81, 50.93, 2], ["Melfort", -104.61, 52.86, 2], ["Humboldt", -105.12, 52.2, 2],
  ["Meadow Lake", -108.43, 54.12, 2], ["La Ronge", -105.28, 55.1, 2], ["Kindersley", -109.16, 51.47, 2],
  ["Lloydminster SK", -109.98, 53.28, 3], ["Martensville", -106.66, 52.29, 3], ["Warman", -106.58, 52.32, 3],
  ["Outlook", -107.05, 51.49, 3], ["Davidson", -105.98, 51.26, 3], ["Cupar", -104.22, 50.95, 3],
  ["Imperial", -105.42, 51.41, 3], ["Ituna", -103.45, 51.17, 3], ["Esterhazy", -102.08, 50.65, 3],
  ["Saltcoats", -102.17, 51.04, 3], ["Moosomin", -101.67, 50.14, 2], ["Whitewood", -102.27, 50.33, 3],
  ["Indian Head", -103.67, 50.53, 3], ["Fort Qu'Appelle", -103.78, 50.77, 3], ["Caronport", -105.82, 50.46, 3],
  ["Assiniboia", -105.99, 49.63, 2], ["Mossbank", -105.96, 49.94, 3], ["Gravelbourg", -106.55, 49.88, 3],
  ["Shaunavon", -108.41, 49.65, 2], ["Maple Creek", -109.48, 49.91, 2], ["Leader", -109.55, 50.89, 3],
  ["Eston", -108.76, 51.15, 3], ["Elrose", -108.04, 51.2, 3], ["Kyle", -108.04, 50.83, 3],
  ["Rosetown", -107.99, 51.55, 2], ["Biggar", -107.99, 52.06, 3], ["Unity", -109.15, 52.44, 3],
  ["Wilkie", -108.7, 52.41, 3], ["Kerrobert", -109.13, 51.92, 3], ["Coronach", -105.51, 49.11, 3],
  ["Radville", -104.29, 49.46, 3], ["Carlyle", -102.27, 49.64, 3], ["Carnduff", -101.79, 49.17, 3],
  ["Oxbow", -102.17, 49.23, 3], ["Kronau", -104.27, 50.32, 3], ["Pilot Butte", -104.42, 50.48, 3],
  ["White City", -104.36, 50.43, 3], ["Balgonie", -104.27, 50.49, 3], ["Nipawin", -104.01, 53.36, 2],
  ["Tisdale", -104.05, 52.85, 3], ["Hudson Bay", -102.39, 52.85, 3], ["Canora", -102.43, 51.63, 3],
  ["Kamsack", -101.89, 51.56, 3], ["Preeceville", -102.67, 51.95, 3], ["Wynyard", -104.18, 51.77, 3],
  ["Lanigan", -105.03, 51.85, 3], ["Watrous", -105.47, 51.67, 3],
  ["Winnipeg", -97.14, 49.9, 1], ["Brandon", -99.95, 49.85, 1], ["Steinbach", -96.68, 49.53, 2],
  ["Thompson", -97.86, 55.74, 1], ["Portage la Prairie", -98.29, 49.97, 2], ["Dauphin", -100.05, 51.15, 2],
  ["The Pas", -101.25, 53.83, 2], ["Flin Flon", -101.88, 54.77, 2], ["Selkirk", -96.88, 50.14, 2],
  ["Winkler", -97.94, 49.18, 2], ["Morden", -98.1, 49.19, 2], ["Swan River", -101.27, 52.11, 2],
  ["Toronto", -79.38, 43.65, 1], ["Ottawa", -75.7, 45.42, 1], ["Mississauga", -79.64, 43.59, 2],
  ["Hamilton", -79.87, 43.26, 1], ["London", -81.25, 42.98, 1], ["Windsor", -83.04, 42.32, 1],
  ["Kitchener", -80.49, 43.45, 1], ["Barrie", -79.69, 44.39, 1], ["Sudbury", -80.99, 46.49, 1],
  ["Thunder Bay", -89.25, 48.38, 1], ["Kingston", -76.48, 44.23, 1], ["Timmins", -81.33, 48.48, 2],
  ["Sault Ste. Marie", -84.33, 46.52, 1], ["North Bay", -79.46, 46.31, 2], ["Peterborough", -78.32, 44.3, 2],
  ["Kenora", -94.49, 49.77, 2], ["Sioux Lookout", -91.92, 50.1, 3],
  ["Montreal", -73.57, 45.5, 1], ["Quebec", -71.21, 46.81, 1], ["Laval", -73.75, 45.58, 2],
  ["Gatineau", -75.7, 45.48, 1], ["Sherbrooke", -71.9, 45.4, 1], ["Trois-Rivières", -72.54, 46.34, 1],
  ["Saguenay", -71.07, 48.43, 1], ["Rimouski", -68.52, 48.45, 1], ["Rivière-du-Loup", -69.54, 47.83, 2],
  ["Matane", -67.53, 48.85, 2], ["Mont-Joli", -68.19, 48.58, 3], ["Sainte-Anne-des-Monts", -66.49, 49.13, 2],
  ["Gaspé", -64.48, 48.83, 1], ["Percé", -64.22, 48.52, 3], ["Chandler", -64.68, 48.35, 3],
  ["Carleton-sur-Mer", -66.13, 48.1, 3], ["Bonaventure", -65.49, 48.05, 3], ["New Richmond", -65.86, 48.16, 3],
  ["Amqui", -67.43, 48.47, 3], ["Sept-Îles", -66.38, 50.2, 1], ["Baie-Comeau", -68.15, 49.22, 1],
  ["Port-Cartier", -66.86, 50.03, 2], ["Forestville", -69.09, 48.74, 3], ["Havre-Saint-Pierre", -63.6, 50.24, 2],
  ["Rouyn-Noranda", -79.02, 48.24, 1], ["Val-d'Or", -77.78, 48.1, 1], ["Chibougamau", -74.37, 49.92, 2],
  ["Kuujjuaq", -68.4, 58.1, 2], ["Alma", -71.65, 48.55, 2], ["Dolbeau-Mistassini", -72.23, 48.88, 3],
  ["Saint John", -66.06, 45.27, 1], ["Moncton", -64.78, 46.09, 1], ["Fredericton", -66.64, 45.96, 1],
  ["Bathurst", -65.65, 47.62, 2], ["Miramichi", -65.5, 47.0, 2], ["Edmundston", -68.33, 47.36, 2],
  ["Halifax", -63.57, 44.65, 1], ["Sydney", -60.18, 46.14, 1], ["Truro", -63.27, 45.37, 2],
  ["New Glasgow", -62.65, 45.59, 2], ["Yarmouth", -66.12, 43.84, 2], ["Kentville", -64.5, 45.08, 2],
  ["Charlottetown", -63.13, 46.24, 1], ["Summerside", -63.79, 46.39, 2],
  ["St. John's", -52.71, 47.56, 1], ["Mount Pearl", -52.81, 47.52, 2], ["Conception Bay South", -52.99, 47.5, 3],
  ["Corner Brook", -57.95, 48.95, 1], ["Gander", -54.58, 48.96, 1], ["Grand Falls-Windsor", -55.66, 48.93, 2],
  ["Stephenville", -58.57, 48.55, 2], ["Deer Lake", -57.43, 49.17, 3], ["Channel-Port aux Basques", -59.14, 47.57, 2],
  ["Marystown", -55.15, 47.17, 2], ["Clarenville", -53.96, 48.17, 2], ["Bonavista", -53.11, 48.65, 2],
  ["Happy Valley-Goose Bay", -60.33, 53.3, 1], ["Labrador City", -66.91, 52.95, 1], ["Churchill Falls", -64.0, 53.53, 3],
  ["Whitehorse", -135.05, 60.72, 1], ["Dawson", -139.43, 64.06, 1], ["Watson Lake", -128.71, 60.06, 2],
  ["Haines Junction", -137.51, 60.75, 2], ["Carmacks", -136.29, 62.09, 3], ["Mayo", -135.9, 63.59, 3],
  ["Faro", -133.34, 62.23, 3], ["Teslin", -132.72, 60.17, 3],
  ["Yellowknife", -114.37, 62.45, 1], ["Hay River", -115.8, 60.82, 2], ["Inuvik", -133.72, 68.36, 1],
  ["Fort Smith", -111.88, 60.0, 2], ["Norman Wells", -126.83, 65.28, 2], ["Fort Simpson", -121.35, 61.86, 2],
  ["Iqaluit", -68.52, 63.75, 1], ["Rankin Inlet", -92.08, 62.81, 1], ["Cambridge Bay", -105.05, 69.12, 1],
  ["Baker Lake", -96.02, 64.32, 2], ["Arviat", -94.06, 61.11, 2], ["Pangnirtung", -65.71, 66.15, 2],
  ["Pond Inlet", -77.96, 72.7, 2], ["Resolute", -94.83, 74.7, 2], ["Kugluktuk", -115.1, 67.83, 2],
  ["Clyde River", -68.59, 70.47, 3], ["Naujaat", -86.24, 66.53, 3],
];

const cities = CITIES.map(([name, lon, lat, rank]) => ({ name, lon, lat, rank }));

const state = {
  groups: [],
  selectedId: null,
  loadedAt: null,
  posterMap: null,
  insetMap: null,
  posterReady: false,
  insetReady: false,
  probeToken: 0,
  mapSubject: "forecast",
};

const field = { kind: null, key: null };
const timeCache = new Map();
const clock = {
  kind: null, key: null, wms: null, times: [], index: 0, token: 0, timer: null,
  layerIds: [], urls: [], coords: null, ready: false, moveTimer: null,
};

const $ = (id) => document.getElementById(id);

const map = new maplibregl.Map({
  container: "map",
  style: STYLE,
  center: [-96.8, 56.5],
  zoom: 3.35,
  preserveDrawingBuffer: true,
  attributionControl: false,
});
map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

map.on("load", () => {
  tuneMap(map);
  map.addLayer(wxLayer(), beforeBoundaries(map));
  const blank = document.createElement("canvas");
  blank.width = 2;
  blank.height = 2;
  map.addSource("wx-sheet", {
    type: "image",
    url: blank.toDataURL(),
    coordinates: [[-180, 75], [180, 75], [180, -60], [-180, -60]],
  });
  map.addLayer({
    id: "wx-sheet",
    type: "raster",
    source: "wx-sheet",
    layout: { visibility: "none" },
    paint: { "raster-opacity": 0.72, "raster-fade-duration": 0 },
  }, beforeBoundaries(map));
  map.addSource("alerts", { type: "geojson", data: emptyFC() });
  map.on("render", paintFlow);
  requestAnimationFrame(flowLoop);
  const underBorders = beforeBoundaries(map);
  map.addLayer({
    id: "alert-fill",
    type: "fill",
    source: "alerts",
    paint: {
      "fill-color": ["get", "color"],
      "fill-opacity": ["case", ["==", ["get", "status"], "ended"], 0.16, 0.34],
    },
  }, underBorders);
  map.addLayer({
    id: "alert-line",
    type: "line",
    source: "alerts",
    paint: {
      "line-color": ["get", "color"],
      "line-width": 1.4,
      "line-opacity": 0.95,
    },
  }, underBorders);
  syncAlertSource();
  highlight();
  if (state.pendingBadge) {
    const pending = state.pendingBadge;
    showLocationBadge(pending.place, pending.direction, pending.speed, pending.label);
  }
  const saved = readSavedPlace();
  if (saved) {
    showChosen(saved);
    const maxZoom = saved.maxZoom || 10;
    const padding = mapPadding();
    if (saved.bbox) map.fitBounds(saved.bbox, { padding, duration: 0, maxZoom });
    else map.jumpTo({ center: [saved.lon, saved.lat], zoom: saved.zoom || maxZoom, padding });
  } else map.jumpTo({ center: [-96, 56], zoom: 1.45 });
  syncGlobe();
  selectMode("model", "temp");
});

let globeOn = false;
function syncGlobe() {
  const zoom = map.getZoom();
  const next = globeOn ? zoom < 4.3 : zoom < 3.5;
  if (next === globeOn && map.getProjection && (map.getProjection() || {}).type === (next ? "globe" : "mercator")) return;
  globeOn = next;
  try { map.setProjection({ type: next ? "globe" : "mercator" }); }
  catch { globeOn = !next; return; }
  try {
    if (map.getLayer("wx")) map.setLayoutProperty("wx", "visibility", next ? "none" : "visible");
  } catch { /* the sheet still follows hiddenField */ }
  publishSheet();
  if (next) {
    try {
      map.setSky({
        "sky-color": "#24303c",
        "horizon-color": "#9eb4c6",
        "fog-color": "#3a4552",
        "sky-horizon-blend": 0.5,
        "horizon-fog-blend": 0.4,
        "fog-ground-blend": 0.2,
        "atmosphere-blend": 0.85,
      });
    } catch { /* the globe still reads without a sky */ }
  }
  map.triggerRepaint();
}

function scheduleRefresh() {
  if (!field.kind || state.mapSubject === "alerts" || !$("detail").hidden) return;
  if (!clock.ready) {
    clock.staleView = true;
    return;
  }
  clearTimeout(clock.moveTimer);
  clock.moveTimer = setTimeout(() => refreshView(), 40);
}
map.dragPan.enable();
map.scrollZoom.enable();
map.boxZoom.enable();
map.doubleClickZoom.enable();
map.touchZoomRotate.enable();
map.keyboard.enable();
map.on("zoom", () => { syncGlobe(); scheduleRefresh(); });
map.on("moveend", scheduleRefresh);

map.on("click", (event) => {
  if (!$("place").hidden && readSavedPlace()) showChosen(readSavedPlace());
  const pad = 14;
  const box = [[event.point.x - pad, event.point.y - pad], [event.point.x + pad, event.point.y + pad]];
  const layers = ["alert-fill", "alert-line"].filter((id) => map.getLayer(id));
  const hits = layers.length ? map.queryRenderedFeatures(box, { layers }) : [];
  if (hits.length) {
    selectGroup(hits[0].properties.groupId, true);
    return;
  }
  closeAlert();
});

function emptyFC() {
  return { type: "FeatureCollection", features: [] };
}

function beforeBoundaries(target) {
  const layer = target.getStyle().layers.find((item) => item.id === "boundary_state" || item.id === "boundary_3");
  return layer ? layer.id : undefined;
}

function tuneMap(target) {
  if (target.getLayer("background")) target.setPaintProperty("background", "background-color", "#6a727c");
  if (target.getLayer("water")) target.setPaintProperty("water", "fill-color", "#3a4552");
  for (const layer of target.getStyle().layers) {
    if (layer.type !== "symbol") continue;
    if (!/^(place_|water_name|waterway_line_label|label_)/.test(layer.id)) continue;
    target.setPaintProperty(layer.id, "text-color", "#f3f0ea");
    target.setPaintProperty(layer.id, "text-halo-color", "#1a1f26");
    target.setPaintProperty(layer.id, "text-halo-width", 1.35);
    target.setPaintProperty(layer.id, "text-halo-blur", 0);
    if (/^place_(country|state|city|town)/.test(layer.id)) {
      try { target.setLayoutProperty(layer.id, "text-size", ["interpolate", ["linear"], ["zoom"], 2, 11, 5, 13, 8, 15]); } catch { /* keep the style size */ }
    }
  }
  if (target.getLayer("boundary_state")) {
    target.setPaintProperty("boundary_state", "line-color", "#d7dde6");
    target.setPaintProperty("boundary_state", "line-opacity", 0.9);
    target.setPaintProperty("boundary_state", "line-width", ["interpolate", ["linear"], ["zoom"], 2, 1.4, 6, 2.2]);
    try { target.setPaintProperty("boundary_state", "line-dasharray", [1, 0]); } catch { /* dashed is still visible */ }
  }
  for (const id of ["boundary_country_z0-4", "boundary_country_z5-"]) {
    if (!target.getLayer(id)) continue;
    target.setPaintProperty(id, "line-color", "#ffffff");
    target.setPaintProperty(id, "line-opacity", 0.85);
  }
}

function applyLayers() {
  renderLegend();
  syncPlayer(false);
}

function mercator(lng, lat) {
  const x = (lng * 20037508.34) / 180;
  const y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
  return [x, (y * 20037508.34) / 180];
}

function frameRequest(layer, time, west, south, east, north, width, height) {
  const [minx, miny] = mercator(west, south);
  const [maxx, maxy] = mercator(east, north);
  const smooth = clock.interpolate === false ? "" : "&INTERPOLATION=TRUE";
  const style = clock.styleName ? `&STYLES=${encodeURIComponent(clock.styleName)}` : "";
  return `${WMS}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=${encodeURIComponent(layer)}&FORMAT=image/png&TRANSPARENT=TRUE&CRS=EPSG:3857&WIDTH=${width}&HEIGHT=${height}&BBOX=${minx},${miny},${maxx},${maxy}${smooth}${style}&TIME=${encodeURIComponent(time)}`;
}

function retireUrls(urls) {
  for (const url of urls || []) URL.revokeObjectURL(url);
}

function clearFrames() {
  stopPlay();
  retireUrls(clock.urls);
  clock.urls = [];
  clock.images = [];
  clock.grids = [];
  clock.holdImage = null;
  clock.holdCoords = null;
  clock.ready = false;
  clock.mode = "off";
  map.triggerRepaint();
}

function firstPlaceLabel(target) {
  const layer = target.getStyle().layers.find((item) => item.id.startsWith("place_"));
  return layer ? layer.id : undefined;
}

function addWindArrow(target) {
  const canvas = document.createElement("canvas");
  canvas.width = 48;
  canvas.height = 48;
  const context = canvas.getContext("2d");
  context.translate(24, 24);
  context.strokeStyle = "#f7f4ee";
  context.fillStyle = "#f7f4ee";
  context.lineWidth = 3.2;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();
  context.moveTo(0, 12);
  context.lineTo(0, -8);
  context.stroke();
  context.beginPath();
  context.moveTo(0, -16);
  context.lineTo(-8, -3);
  context.lineTo(8, -3);
  context.closePath();
  context.fill();
  if (!target.hasImage("wind-arrow")) target.addImage("wind-arrow", context.getImageData(0, 0, 48, 48), { pixelRatio: 2 });
}

function mapPoint(lng, lat) {
  const x = (lng + 180) / 360;
  const clamped = Math.max(-85, Math.min(85, lat));
  const sine = Math.sin((clamped * Math.PI) / 180);
  const y = 0.5 - Math.log((1 + sine) / (1 - sine)) / (4 * Math.PI);
  return [x, y];
}

const MESH_COLS = 72;
const MESH_ROWS = 36;

function sheetMesh(coords) {
  const west = coords[0][0];
  const north = coords[0][1];
  const east = coords[1][0];
  const south = coords[2][1];
  const verts = new Float32Array((MESH_COLS + 1) * (MESH_ROWS + 1) * 4);
  let offset = 0;
  for (let row = 0; row <= MESH_ROWS; row++) {
    const ty = row / MESH_ROWS;
    const lat = north + (south - north) * ty;
    for (let col = 0; col <= MESH_COLS; col++) {
      const tx = col / MESH_COLS;
      const point = mapPoint(west + (east - west) * tx, lat);
      verts[offset++] = point[0];
      verts[offset++] = point[1];
      verts[offset++] = tx;
      verts[offset++] = 1 - ty;
    }
  }
  return verts;
}

function sheetIndices() {
  const indices = new Uint16Array(MESH_COLS * MESH_ROWS * 6);
  let offset = 0;
  for (let row = 0; row < MESH_ROWS; row++) {
    for (let col = 0; col < MESH_COLS; col++) {
      const index = row * (MESH_COLS + 1) + col;
      indices[offset++] = index;
      indices[offset++] = index + MESH_COLS + 1;
      indices[offset++] = index + 1;
      indices[offset++] = index + 1;
      indices[offset++] = index + MESH_COLS + 1;
      indices[offset++] = index + MESH_COLS + 2;
    }
  }
  return indices;
}

function wxLayer() {
  return {
    id: "wx",
    type: "custom",
    renderingMode: "2d",
    onAdd(mapInstance, gl) {
      this.gl = gl;
      const gl2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
      const compile = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      };
      const program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, gl2
        ? "#version 300 es\nin vec2 a_pos; in vec2 a_uv; uniform mat4 u_matrix; out vec2 v_uv; void main(){ gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0); v_uv = a_uv; }"
        : "attribute vec2 a_pos; attribute vec2 a_uv; uniform mat4 u_matrix; varying vec2 v_uv; void main(){ gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0); v_uv = a_uv; }"));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, gl2
        ? "#version 300 es\nprecision mediump float; uniform sampler2D u_tex; uniform float u_opacity; in vec2 v_uv; out vec4 outColor; void main(){ vec4 c = texture(u_tex, v_uv); outColor = vec4(c.rgb, c.a * u_opacity); }"
        : "precision mediump float; uniform sampler2D u_tex; uniform float u_opacity; varying vec2 v_uv; void main(){ vec4 c = texture2D(u_tex, v_uv); gl_FragColor = vec4(c.rgb, c.a * u_opacity); }"));
      gl.linkProgram(program);
      this.dead = !gl.getProgramParameter(program, gl.LINK_STATUS);
      this.program = program;
      this.uMatrix = gl.getUniformLocation(program, "u_matrix");
      this.uOpacity = gl.getUniformLocation(program, "u_opacity");
      this.buf = gl.createBuffer();
      this.indexBuffer = gl.createBuffer();
      this.meshIndex = sheetIndices();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.meshIndex, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      this.tex = gl.createTexture();
      this.meshKey = "";
      mapInstance.triggerRepaint();
    },
    render(gl, args) {
      if (this.dead || globeOn) return;
      const live = clock.images && clock.images[clock.index];
      const image = live || clock.holdImage;
      const coords = live ? clock.coords : clock.holdCoords;
      if (!image || !coords) return;
      const matrix = args && args.defaultProjectionData ? args.defaultProjectionData.mainMatrix : args;
      if (!matrix || matrix.length !== 16) return;
      const blend = gl.isEnabled(gl.BLEND);
      try {
      const key = coords.map((corner) => corner[0].toFixed(3) + "," + corner[1].toFixed(3)).join(" ");
      gl.useProgram(this.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
      if (key !== this.meshKey) {
        gl.bufferData(gl.ARRAY_BUFFER, sheetMesh(coords), gl.DYNAMIC_DRAW);
        this.meshKey = key;
      }
      const pos = gl.getAttribLocation(this.program, "a_pos");
      const uv = gl.getAttribLocation(this.program, "a_uv");
      gl.enableVertexAttribArray(pos);
      gl.enableVertexAttribArray(uv);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 16, 0);
      gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 16, 8);
      gl.uniformMatrix4fv(this.uMatrix, false, matrix);
      gl.uniform1f(this.uOpacity, clock.hiddenField ? 0 : (clock.opacity || 0.8));
      gl.bindTexture(gl.TEXTURE_2D, this.tex);
      if (this.image !== image) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.image = image;
      }
      if (clock.hiddenField) gl.disable(gl.BLEND);
      else {
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      }
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.drawElements(gl.TRIANGLES, this.meshIndex.length, gl.UNSIGNED_SHORT, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      if (blend) gl.enable(gl.BLEND);
      else gl.disable(gl.BLEND);
      } catch { this.dead = true; }
    },
  };
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    if (!url.startsWith("blob:")) image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

function expandTimes(raw) {
  const out = [];
  for (const part of raw.split(",")) {
    const bits = part.trim().split("/");
    if (!bits[0]) continue;
    if (bits.length < 3) {
      out.push(bits[0]);
      continue;
    }
    const start = Date.parse(bits[0]);
    const end = Date.parse(bits[1]);
    const match = bits[2].match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const step = (((Number(match?.[1]) || 0) * 60 + (Number(match?.[2]) || 0)) * 60 + (Number(match?.[3]) || 0)) * 1000;
    if (!step) continue;
    for (let t = start; t <= end + 1; t += step) out.push(new Date(t).toISOString().replace(".000Z", "Z"));
  }
  return out;
}

async function loadTimes(layer) {
  if (timeCache.has(layer)) return timeCache.get(layer);
  const response = await fetch(`${WMS}?service=WMS&version=1.3.0&request=GetCapabilities&layer=${encodeURIComponent(layer)}`, {
    signal: AbortSignal.timeout(8000),
  });
  const xml = await response.text();
  const found = xml.match(/<Dimension name="time"[^>]*>([^<]+)<\/Dimension>/);
  const times = found ? expandTimes(found[1]) : [];
  timeCache.set(layer, times);
  return times;
}

function nearestIndex(times) {
  const now = Date.now();
  let best = 0;
  let bestDistance = Infinity;
  times.forEach((stamp, index) => {
    const distance = Math.abs(Date.parse(stamp) - now);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = index;
    }
  });
  return best;
}

function clockText(iso) {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "short", hour: "numeric", minute: "2-digit",
  }).format(new Date(iso));
}

function relativeText(iso, kind) {
  const when = Date.parse(iso);
  const minutes = Math.round((when - Date.now()) / 60000);
  if (Math.abs(minutes) < 4) return "Now";
  if (kind === "model" && Math.abs(minutes) < 40) return "Now";
  if (minutes < 0) {
    const ago = Math.abs(minutes);
    return ago < 90 ? ago + " min ago" : Math.round(ago / 60) + " h ago";
  }
  return minutes < 90 ? "in " + minutes + " min" : "in " + Math.round(minutes / 60) + " h";
}

function sameView(a, b) {
  if (!a || !b) return false;
  const span = Math.max(0.5, Math.abs(a.east - a.west));
  return Math.abs(a.west - b.west) < span * 0.12
    && Math.abs(a.east - b.east) < span * 0.12
    && Math.abs(a.south - b.south) < span * 0.12
    && Math.abs(a.north - b.north) < span * 0.12;
}

function wideView() {
  try {
    const bounds = map.getBounds();
    return map.getZoom() < 3 || bounds.getEast() - bounds.getWest() > 100;
  } catch {
    return map.getZoom() < 3;
  }
}

function randomInView() {
  try {
    const bounds = map.getBounds();
    let west = bounds.getWest();
    let east = bounds.getEast();
    let south = bounds.getSouth();
    let north = bounds.getNorth();
    if (!(east > west)) east += 360;
    if (north < south) [south, north] = [north, south];
    let lng = west + Math.random() * (east - west);
    lng = ((lng + 540) % 360) - 180;
    return { lng, lat: south + Math.random() * Math.max(0.01, north - south) };
  } catch {
    return { lng: -100, lat: 52 };
  }
}

function viewBox() {
  let bounds;
  try { bounds = map.getBounds(); } catch { return { west: -140, south: 42, east: -50, north: 72 }; }
  let west = bounds.getWest();
  let east = bounds.getEast();
  const wide = map.getZoom() < 3.5;
  const southCap = wide ? -85 : -75;
  const northCap = wide ? 85 : 80;
  let south = Math.max(southCap, bounds.getSouth());
  let north = Math.min(northCap, bounds.getNorth());
  const padX = Math.abs(east - west) * 0.2;
  const padY = Math.abs(north - south) * 0.2;
  west -= padX;
  east += padX;
  south = Math.max(southCap, south - padY);
  north = Math.min(northCap, north + padY);
  if (east - west > 300 || west > east) {
    west = -180;
    east = 180;
  }
  return { west, south, east, north };
}

function fieldName() {
  if (clock.global && field.kind === "radar") return "Precipitation";
  if (field.kind === "radar") return { rain: "Rain radar", snow: "Snow radar", type: "Precipitation type" }[field.key];
  if (field.kind === "model") return MODEL[field.key][1];
  return "";
}

function stopPlay() {
  clock.playing = false;
  if (clock.timer) cancelAnimationFrame(clock.timer);
  clock.timer = null;
  const button = $("play");
  if (!button) return;
  button.classList.remove("is-playing");
  button.setAttribute("aria-label", "Play");
}

function hourlyTimes(hours) {
  const start = new Date();
  start.setUTCMinutes(0, 0, 0);
  const out = [];
  for (let i = 0; i <= hours; i++) out.push(new Date(start.getTime() + i * 3600000).toISOString().replace(".000Z", "Z"));
  return out;
}

function hoursFromNow(iso) {
  return (Date.parse(iso) - Date.now()) / 3600000;
}

function hoursToPos(hours) {
  const h = Math.max(0, hours);
  if (h <= 2) return (h / 2) * 0.42;
  if (h <= 12) return 0.42 + ((h - 2) / 10) * 0.33;
  return Math.min(1, 0.75 + ((h - 12) / 24) * 0.25);
}

function buildTimeline(times) {
  const now = Date.now();
  const sorted = [...times].sort((a, b) => Date.parse(a) - Date.parse(b));
  const chosen = [];
  const add = (iso) => {
    if (iso && !chosen.includes(iso)) chosen.push(iso);
  };
  const nearest = (target, limitHours) => {
    let best = null;
    let bestDistance = Infinity;
    for (const iso of sorted) {
      const distance = Math.abs(Date.parse(iso) - target);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = iso;
      }
    }
    return best && bestDistance <= limitHours * 3600000 ? best : null;
  };
  sorted.forEach((iso) => {
    const hours = (Date.parse(iso) - now) / 3600000;
    if (hours >= -0.2 && hours <= 12.25) add(iso);
  });
  for (let hour = 14; hour <= 36; hour += 2) add(nearest(now + hour * 3600000, 1.6));
  return chosen.sort((a, b) => Date.parse(a) - Date.parse(b));
}

function framePos(iso) {
  if (clock.kind === "radar" && clock.times.length > 1) {
    const start = Date.parse(clock.times[0]);
    const end = Date.parse(clock.times[clock.times.length - 1]);
    if (end > start) return Math.max(0, Math.min(1, (Date.parse(iso) - start) / (end - start)));
  }
  return hoursToPos(Math.max(0, hoursFromNow(iso)));
}

function indexForPos(pos) {
  let best = 0;
  let bestDistance = Infinity;
  clock.times.forEach((iso, index) => {
    const distance = Math.abs(framePos(iso) - pos);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = index;
    }
  });
  return best;
}

function layoutTicks() {
  const box = $("ticks");
  if (!box) return;
  box.replaceChildren();
  const add = (pos, text, edge) => {
    const span = document.createElement("span");
    span.style.left = `${Math.max(0, Math.min(1, pos)) * 100}%`;
    span.textContent = text;
    if (edge) span.className = edge;
    box.append(span);
  };
  if (clock.kind === "radar" && clock.times.length > 1) {
    add(0, relativeText(clock.times[0], "radar"), "tick-start");
    const nowPos = framePos(new Date().toISOString());
    if (nowPos > 0.08 && nowPos < 0.92) add(nowPos, "Now");
    add(1, relativeText(clock.times[clock.times.length - 1], "radar"), "tick-end");
    return;
  }
  add(0, "Now", "tick-start");
  add(0.42, "2h");
  add(0.75, "12h");
  add(1, "36h", "tick-end");
}

function loadedCount() {
  const slots = clock.mode === "wind" ? clock.grids : clock.images;
  return (slots || []).filter(Boolean).length;
}

function placePlayhead(pos) {
  const head = $("playhead");
  const clamped = Math.max(0, Math.min(1, pos));
  head.style.left = `${clamped * 100}%`;
  head.style.transform = "translate(-50%, -50%)";
}

function showFrame(index) {
  if (!clock.times.length) return;
  clock.index = Math.max(0, Math.min(clock.times.length - 1, index));
  const iso = clock.times[clock.index];
  if (map.getLayer("wx")) map.triggerRepaint();
  publishSheet();
  const pos = framePos(iso);
  $("scrub").value = String(Math.round(pos * 1000));
  placePlayhead(pos);
  $("player-title").textContent = relativeText(iso, clock.kind);
  $("player-sub").textContent = clock.ready
    ? fieldName() + " · " + clockText(iso)
    : fieldName() + " · loading " + loadedCount() + "/" + clock.times.length;
  $("play").disabled = !clock.ready;
}

async function syncPlayer(preserveIndex) {
  const token = ++clock.token;
  const kept = clock.index;
  stopPlay();
  const previousUrls = clock.urls || [];
  if (clock.mode === "sheet" && clock.images && clock.images[clock.index]) {
    clock.holdImage = clock.images[clock.index];
    clock.holdCoords = clock.coords;
  }
  clock.ready = false;
  if (!field.kind) {
    clearFrames();
    $("player").hidden = true;
    return;
  }
  const globe = wideView();
  clock.global = globe;
  const spec = !globe && field.kind === "radar" ? RADAR[field.key] : null;
  const wms = spec ? spec.obs : (globe ? WORLD[field.key] : MODEL[field.key][0]);
  clock.dirLayer = globe ? WORLD.dir : "RDPS_10km_WindDir_10m";
  clock.speedLayer = globe ? WORLD.speed : "RDPS_10km_WindSpeed_10m";
  $("player").hidden = false;
  $("player").classList.toggle("is-radar", field.kind === "radar" && !globe);
  $("play").disabled = false;
  placePlayhead(0);
  $("player-title").textContent = "Now";
  $("player-sub").textContent = fieldName();
  try {
    let times = [];
    let layers = [];
    try {
      if (field.kind === "model" || globe) {
        times = buildTimeline(hourlyTimes(40));
        layers = times.map(() => wms);
        clock.interpolate = true;
        clock.styleName = "";
      } else {
        const sequence = await loadRadarSequence(spec);
        times = sequence.times;
        layers = sequence.layers;
        clock.interpolate = spec.interpolate !== false;
        clock.styleName = spec.style || "";
      }
    } catch (error) {
      if (field.kind !== "model") throw error;
      times = buildTimeline(hourlyTimes(40));
      layers = times.map(() => wms);
      clock.interpolate = true;
      clock.styleName = "";
    }
    if (token !== clock.token) return;
    clock.kind = globe ? "model" : field.kind;
    clock.key = field.key;
    clock.wms = wms;
    clock.times = times;
    clock.layers = layers;
    layoutTicks();
    clock.mode = field.key === "wind" ? "wind" : "sheet";
    clock.opacity = field.key === "wind" ? 0.38 : field.kind === "radar" ? 0.88 : 0.72;
    clock.urls = [];
    clock.images = new Array(times.length);
    clock.grids = new Array(times.length);
    if (!times.length) {
      $("player-title").textContent = "No times";
      $("player-sub").textContent = fieldName();
      return;
    }
    clock.index = preserveIndex ? Math.min(kept, times.length - 1) : 0;
    const box = viewBox();
    const west = box.west;
    const south = box.south;
    const east = box.east;
    const north = box.north;
    clock.coords = [[west, north], [east, north], [east, south], [west, south]];
    clock.loadedBox = { west, south, east, north };
    clock.loadedZoom = map.getZoom();
    if (clock.mode === "wind") {
      await Promise.all([
        loadRasterFrames(times, token, wms, west, south, east, north),
        loadWindFrames(times, token, west, south, east, north),
      ]);
    } else await loadRasterFrames(times, token, wms, west, south, east, north);
    if (token !== clock.token) return;
    clock.ready = loadedCount() > 0;
    if (clock.ready) {
      clock.holdImage = null;
      clock.holdCoords = null;
    }
    resetParticles();
    $("play").disabled = !clock.ready;
    showFrame(clock.index);
    if (clock.staleView) {
      clock.staleView = false;
      syncPlayer(true);
      return;
    }
    if (clock.ready) startLoop();
    else {
      $("player-title").textContent = "Couldn't load";
      $("player-sub").textContent = fieldName();
    }
  } catch (error) {
    if (token !== clock.token) return;
    console.error(error);
    $("player-title").textContent = "Couldn't load";
    $("player-sub").textContent = fieldName();
  } finally {
    if (token === clock.token) retireUrls(previousUrls);
  }
}

function frameSize() {
  const canvas = map.getCanvas();
  const zoom = map.getZoom();
  const ratio = Math.min(2, window.devicePixelRatio || 1);
  const boost = zoom >= 8 ? 1.4 : zoom >= 5 ? 1.15 : 1;
  let width = Math.round(Math.max(canvas.clientWidth || 800, 640) * ratio * boost);
  let height = Math.round(Math.max(canvas.clientHeight || 500, 400) * ratio * boost);
  const cap = zoom >= 8 ? 2048 : zoom >= 5 ? 1600 : 1280;
  const longest = Math.max(width, height);
  if (longest > cap) {
    const scale = cap / longest;
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }
  return { width: Math.max(320, width), height: Math.max(240, height) };
}

function windGridSize() {
  const zoom = map.getZoom();
  const { width, height } = frameSize();
  const fraction = zoom >= 8 ? 0.42 : zoom >= 5 ? 0.32 : 0.24;
  return {
    width: Math.max(140, Math.min(320, Math.round(width * fraction))),
    height: Math.max(90, Math.min(210, Math.round(height * fraction))),
  };
}

async function loadRadarSequence(spec) {
  const obs = await loadTimes(spec.obs);
  let extra = [];
  if (spec.extra) {
    try { extra = await loadTimes(spec.extra); } catch { extra = []; }
  }
  const now = Date.now();
  const hours = (iso) => (Date.parse(iso) - now) / 3600000;
  const past = obs.filter((iso) => hours(iso) >= -3.3 && hours(iso) <= 0.25)
    .sort((a, b) => Date.parse(a) - Date.parse(b));
  const source = past.length ? past : [...obs].sort((a, b) => Date.parse(a) - Date.parse(b));
  const last = source.length ? Date.parse(source[source.length - 1]) : now;
  const future = extra.filter((iso) => Date.parse(iso) > last + 60000 && hours(iso) <= 2)
    .sort((a, b) => Date.parse(a) - Date.parse(b));
  const times = [];
  const layers = [];
  source.forEach((iso) => {
    times.push(iso);
    layers.push(spec.obs);
  });
  future.forEach((iso) => {
    times.push(iso);
    layers.push(spec.extra);
  });
  return { times, layers };
}

async function loadOneSheet(index, token, wms, west, south, east, north, width, height) {
  const layer = (clock.layers && clock.layers[index]) || wms;
  const response = await fetch(frameRequest(layer, clock.times[index], west, south, east, north, width, height), {
    signal: AbortSignal.timeout(20000),
  });
  const type = response.headers.get("content-type") || "";
  if (!response.ok || token !== clock.token || !type.includes("image")) return;
  const blob = await response.blob();
  if (token !== clock.token) return;
  const url = URL.createObjectURL(blob);
  clock.urls.push(url);
  const image = await loadImage(url);
  if (token !== clock.token) return;
  clock.images[index] = image;
  clock.ready = true;
  $("play").disabled = false;
  if (clock.pendingCoords && index === clock.index) {
    clock.coords = clock.pendingCoords;
    clock.holdImage = null;
    clock.holdCoords = null;
    if (map.getLayer("wx")) map.triggerRepaint();
    publishSheet();
  }
  if (clock.playing) return;
  showFrame(clock.index);
  if (index === clock.index) startLoop();
}

async function refreshView() {
  if (!field.kind || !clock.times.length) return syncPlayer(true);
  const token = ++clock.token;
  const globe = wideView();
  const switched = globe !== !!clock.global;
  clock.global = globe;
  const wms = globe ? WORLD[field.key] : (field.kind === "radar" ? RADAR[field.key].obs : MODEL[field.key][0]);
  clock.dirLayer = globe ? WORLD.dir : "RDPS_10km_WindDir_10m";
  clock.speedLayer = globe ? WORLD.speed : "RDPS_10km_WindSpeed_10m";
  if (clock.images && clock.images[clock.index]) {
    clock.holdImage = clock.images[clock.index];
    clock.holdCoords = clock.coords;
  }
  if (switched && field.kind === "radar") {
    clock.kind = globe ? "model" : "radar";
    clock.times = globe ? buildTimeline(hourlyTimes(40)) : clock.times;
    clock.layers = clock.times.map(() => wms);
    layoutTicks();
    $("player").classList.toggle("is-radar", field.kind === "radar" && !globe);
  } else if (globe || field.kind === "model") {
    clock.layers = clock.times.map(() => wms);
  }
  const box = viewBox();
  clock.pendingCoords = [[box.west, box.north], [box.east, box.north], [box.east, box.south], [box.west, box.south]];
  clock.images = new Array(clock.times.length);
  clock.loadedBox = { west: box.west, south: box.south, east: box.east, north: box.north };
  clock.loadedZoom = map.getZoom();
  const { width, height } = frameSize();
  const order = clock.times.map((_, index) => index).sort((a, b) => Math.abs(a - clock.index) - Math.abs(b - clock.index));
  const paint = async (index) => {
    try {
      await loadOneSheet(index, token, wms, box.west, box.south, box.east, box.north, width, height);
    } catch { /* keep the picture already on screen */ }
  };
  if (clock.mode === "wind") loadWindFrames(clock.times, token, box.west, box.south, box.east, box.north).catch(() => {});
  await paint(order[0]);
  if (token !== clock.token) return;
  let cursor = 1;
  async function worker() {
    while (cursor < order.length && token === clock.token) {
      const index = order[cursor++];
      await paint(index);
    }
  }
  await Promise.all([worker(), worker()]);
}

async function loadRasterFrames(times, token, wms, west, south, east, north) {
  const { width, height } = frameSize();
  try {
    await loadOneSheet(clock.index, token, wms, west, south, east, north, width, height);
  } catch (error) {
    console.error(error);
  }
  if (token !== clock.token) return;
  const rest = times.map((_, index) => index).filter((index) => index !== clock.index);
  let cursor = 0;
  async function worker() {
    while (cursor < rest.length && token === clock.token) {
      const index = rest[cursor++];
      try {
        await loadOneSheet(index, token, wms, west, south, east, north, width, height);
      } catch { /* one hour can fail without stopping the rest */ }
    }
  }
  await Promise.all([worker(), worker(), worker()]);
}

function hueDegrees(red, green, blue) {
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  if (max === min) return 0;
  const delta = max - min;
  let hue = max === red ? ((green - blue) / delta) % 6 : max === green ? (blue - red) / delta + 2 : (red - green) / delta + 4;
  hue *= 60;
  return hue < 0 ? hue + 360 : hue;
}

function pixelsOf(image) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height).data;
}

function sheetUrl(layer, time, west, south, east, north, width, height) {
  return `${WMS}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=${encodeURIComponent(layer)}&FORMAT=image/png&TRANSPARENT=TRUE&CRS=EPSG:4326&BBOX=${south},${west},${north},${east}&WIDTH=${width}&HEIGHT=${height}&INTERPOLATION=TRUE&TIME=${encodeURIComponent(time)}`;
}

async function loadWindFrames(times, token, west, south, east, north) {
  const { width, height } = windGridSize();
  const order = times.map((_, index) => index).sort((a, b) => Math.abs(a - clock.index) - Math.abs(b - clock.index));
  let cursor = 0;
  async function worker() {
    while (cursor < order.length && token === clock.token) {
      const index = order[cursor++];
      try {
        const [dirImage, speedImage] = await Promise.all([
          loadImage(sheetUrl(clock.dirLayer, times[index], west, south, east, north, width, height)),
          loadImage(sheetUrl(clock.speedLayer, times[index], west, south, east, north, width, height)),
        ]);
        if (token !== clock.token) return;
        const dirs = pixelsOf(dirImage);
        const speeds = pixelsOf(speedImage);
        const direction = new Float32Array(width * height);
        const speed = new Float32Array(width * height);
        for (let i = 0; i < width * height; i++) {
          const alpha = dirs[i * 4 + 3];
          direction[i] = alpha < 16 ? NaN : hueDegrees(dirs[i * 4], dirs[i * 4 + 1], dirs[i * 4 + 2]);
          const speedAlpha = speeds[i * 4 + 3];
          const hue = hueDegrees(speeds[i * 4], speeds[i * 4 + 1], speeds[i * 4 + 2]);
          const bright = Math.max(speeds[i * 4], speeds[i * 4 + 1], speeds[i * 4 + 2]) / 255;
          speed[i] = speedAlpha < 16 ? 0 : hue >= 230 ? Math.max(0.4, (bright - 0.4) * 8) : Math.max(0.6, (245 - hue) / 6);
        }
        clock.grids[index] = { direction, speed, width, height, west, south, east, north };
        clock.ready = true;
        $("play").disabled = false;
        if (clock.playing) continue;
        showFrame(clock.index);
        if (index === clock.index) startLoop();
      } catch { /* skip a failed hour */ }
    }
  }
  await Promise.all([worker(), worker()]);
}

const particles = [];

function resetParticles() {
  particles.length = 0;
  const canvas = map.getCanvas();
  const count = Math.max(700, Math.min(2200, Math.round((canvas.clientWidth * canvas.clientHeight) / 1400)));
  for (let i = 0; i < count; i++) {
    const spot = randomInView();
    particles.push({ lng: spot.lng, lat: spot.lat, life: Math.random() * 70, trail: [] });
  }
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16)];
}

function colorOnScale(key, amount) {
  const stops = (SCALES[key] && SCALES[key].stops) || SCALES.wind.stops;
  let lower = stops[0];
  let upper = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (amount >= stops[i][0] && amount <= stops[i + 1][0]) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }
  const span = upper[0] - lower[0] || 1;
  const t = Math.max(0, Math.min(1, (amount - lower[0]) / span));
  const a = hexToRgb(lower[1]);
  const b = hexToRgb(upper[1]);
  const mix = a.map((channel, index) => Math.round(channel + (b[index] - channel) * t));
  return `rgba(${mix[0]}, ${mix[1]}, ${mix[2]}, 0.9)`;
}

function sampleWind(grid, lng, lat) {
  if (lng < grid.west || lng > grid.east || lat < grid.south || lat > grid.north) return null;
  const x = ((lng - grid.west) / (grid.east - grid.west)) * (grid.width - 1);
  const y = ((grid.north - lat) / (grid.north - grid.south)) * (grid.height - 1);
  const ix = Math.max(0, Math.min(grid.width - 1, Math.round(x)));
  const iy = Math.max(0, Math.min(grid.height - 1, Math.round(y)));
  const index = iy * grid.width + ix;
  if (Number.isNaN(grid.direction[index])) return null;
  return { dir: grid.direction[index], spd: grid.speed[index] };
}

function paintFlow() {
  const canvas = $("flow");
  if (!canvas) return;
  const width = map.getCanvas().clientWidth;
  const height = map.getCanvas().clientHeight;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const context = canvas.getContext("2d");
  if (clock.mode !== "wind") {
    context.clearRect(0, 0, width, height);
  }
}

function windRgb(kmh) {
  const stops = SCALES.wind.stops;
  let lower = stops[0];
  let upper = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (kmh >= stops[i][0] && kmh <= stops[i + 1][0]) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }
  const span = upper[0] - lower[0] || 1;
  const t = Math.max(0, Math.min(1, (kmh - lower[0]) / span));
  const a = hexToRgb(lower[1]);
  const b = hexToRgb(upper[1]);
  return a.map((channel, index) => Math.round(channel + (b[index] - channel) * t));
}

let flowStamp = 0;
function flowLoop(now) {
  requestAnimationFrame(flowLoop);
  const dt = flowStamp ? Math.min(0.05, (now - flowStamp) / 1000) : 0.016;
  flowStamp = now || 0;
  const canvas = $("flow");
  if (!canvas || clock.hiddenField || clock.mode !== "wind") return;
  const grid = clock.grids && clock.grids[clock.index];
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (!grid) return;
  if (!particles.length) resetParticles();
  const bounds = map.getBounds();
  context.lineCap = "round";
  context.lineJoin = "round";
  for (const particle of particles) {
    const sample = sampleWind(grid, particle.lng, particle.lat);
    if (!sample) {
      const spot = randomInView();
      particle.lng = spot.lng;
      particle.lat = spot.lat;
      particle.life = 0;
      particle.trail = [];
      continue;
    }
    const toward = ((sample.dir + 180) * Math.PI) / 180;
    const origin = map.project([particle.lng, particle.lat]);
    const kmh = Math.max(0, sample.spd * 3.6);
    const pace = 90 + Math.min(kmh, 100) * 1.4;
    const next = map.unproject([
      origin.x + Math.sin(toward) * dt * pace,
      origin.y - Math.cos(toward) * dt * pace,
    ]);
    particle.trail.push([next.lng, next.lat]);
    if (particle.trail.length > 36) particle.trail.shift();
    const [r, g, b] = windRgb(kmh);
    const points = particle.trail.map((spot) => map.project(spot));
    context.lineWidth = 1.15;
    for (let i = 1; i < points.length; i++) {
      const fade = i / (points.length - 1);
      context.strokeStyle = `rgba(${r},${g},${b},${fade * 0.55})`;
      context.beginPath();
      context.moveTo(points[i - 1].x, points[i - 1].y);
      context.lineTo(points[i].x, points[i].y);
      context.stroke();
    }
    particle.lng = next.lng;
    particle.lat = next.lat;
    particle.life += 1;
    const wrapped = bounds.getEast() > bounds.getWest();
    const outside = next.lng < bounds.getWest() || next.lng > bounds.getEast() || next.lat < bounds.getSouth() || next.lat > bounds.getNorth();
    if (particle.life > 140 || (wrapped && outside)) {
      const spot = randomInView();
      particle.lng = spot.lng;
      particle.lat = spot.lat;
      particle.life = 0;
      particle.trail = [];
    }
  }
}

function indexAtOrBefore(pos) {
  let best = 0;
  for (let index = 0; index < clock.times.length; index++) {
    if (framePos(clock.times[index]) <= pos + 0.0001) best = index;
    else break;
  }
  return best;
}

function followPlayhead(pos) {
  const clamped = Math.max(0, Math.min(1, pos));
  placePlayhead(clamped);
  $("scrub").value = String(Math.round(clamped * 1000));
  const slots = clock.mode === "wind" ? clock.grids : clock.images;
  const index = indexAtOrBefore(clamped);
  if (!slots || !slots[index] || index === clock.index) return;
  clock.index = index;
  const iso = clock.times[index];
  if (map.getLayer("wx")) map.triggerRepaint();
  $("player-title").textContent = relativeText(iso, clock.kind);
  $("player-sub").textContent = fieldName() + " · " + clockText(iso);
}

function startLoop() {
  if (clock.playing || !clock.ready || !clock.times.length) return;
  clock.playing = true;
  $("play").classList.add("is-playing");
  $("play").setAttribute("aria-label", "Pause");
  const duration = 16000;
  clock.playFrom = framePos(clock.times[clock.index]);
  clock.playAt = performance.now();
  const tick = (now) => {
    if (!clock.playing) return;
    let pos = clock.playFrom + (now - clock.playAt) / duration;
    if (pos >= 1) {
      pos -= Math.floor(pos);
      clock.playFrom = 0;
      clock.playAt = now - pos * duration;
    }
    followPlayhead(pos);
    clock.timer = requestAnimationFrame(tick);
  };
  clock.timer = requestAnimationFrame(tick);
}

function togglePlay() {
  if (clock.playing) stopPlay();
  else startLoop();
}

const SCALES = {
  temp: { unit: "°C", min: -60, max: 50, stops: [[-60, "#14082e"], [-50, "#241e78"], [-40, "#2c4ea8"], [-30, "#3a6fd8"], [-20, "#4aa0e0"], [-10, "#67c7e8"], [0, "#e7f6f1"], [10, "#8fd18a"], [20, "#f0d15a"], [30, "#ef8a2f"], [40, "#d23b3b"], [50, "#7a1428"]] },
  rain: { unit: "mm/h", stops: [[0, "#d5e4ee"], [1, "#7eb6e8"], [5, "#3c78d8"], [15, "#f0c84a"], [40, "#d8452f"]] },
  snow: { unit: "cm/h", stops: [[0, "#d5e4ee"], [0.2, "#b9d4ea"], [1, "#7ea6d4"], [3, "#d8e2ee"], [6, "#f7f4ee"]] },
  wind: { unit: "km/h", stops: [[0, "#d5dde6"], [20, "#8fb7d8"], [40, "#f0d15a"], [70, "#ef8a2f"], [100, "#d23b3b"]] },
  gust: { unit: "km/h", stops: [[0, "#d5dde6"], [30, "#8fb7d8"], [60, "#f0d15a"], [90, "#ef8a2f"], [120, "#d23b3b"]] },
  humidex: { unit: "", stops: [[15, "#8fd18a"], [25, "#f0d15a"], [30, "#ef8a2f"], [40, "#d23b3b"], [45, "#7a1f4b"]] },
  dew: { unit: "°C", stops: [[-30, "#241e78"], [-10, "#3a6fd8"], [0, "#8fd18a"], [10, "#f0d15a"], [20, "#ef8a2f"]] },
  type: { key: [["#3c78d8", "Rain"], ["#d8e6f2", "Snow"], ["#e45b9a", "Freezing"], ["#8d6ad8", "Ice"]] },
};

function renderLegend() {
  const box = $("legend");
  box.replaceChildren();
  const key = field.kind === "radar" ? field.key : field.key;
  const spec = SCALES[key];
  if (!spec) return;
  const scale = document.createElement("div");
  scale.className = "scale";
  if (spec.key) {
    spec.key.forEach(([color, name]) => {
      const item = document.createElement("span");
      const swatch = document.createElement("i");
      swatch.style.background = color;
      item.append(swatch, document.createTextNode(name));
      scale.append(item);
    });
  } else if (key === "temp") {
    const min = spec.min;
    const max = spec.max;
    const at = (value) => ((value - min) / (max - min)) * 100;
    const wrap = document.createElement("div");
    wrap.className = "temp-scale";
    const bar = document.createElement("i");
    bar.className = "bar";
    bar.style.background = `linear-gradient(90deg, ${spec.stops.map(([value, color]) => `${color} ${at(value)}%`).join(", ")})`;
    wrap.append(bar);
    for (let value = min; value <= max; value += 5) {
      const tick = document.createElement("i");
      tick.className = "tick" + (value % 10 === 0 ? " major" : " minor");
      tick.style.left = `${at(value)}%`;
      if (value % 10 === 0) {
        const label = document.createElement("span");
        label.textContent = String(value);
        tick.append(label);
      }
      wrap.append(tick);
    }
    scale.append(wrap);
  } else {
    const bar = document.createElement("i");
    bar.style.background = `linear-gradient(90deg, ${spec.stops.map(([value, color], index) => {
      const pct = (index / (spec.stops.length - 1)) * 100;
      return `${color} ${pct}%`;
    }).join(", ")})`;
    const low = document.createElement("span");
    const high = document.createElement("span");
    low.textContent = String(spec.stops[0][0]);
    high.textContent = `${spec.stops[spec.stops.length - 1][0]}${spec.unit ? " " + spec.unit : ""}`;
    scale.append(low, bar, high);
  }
  box.append(scale);
}

async function loadAlerts() {
  $("alert-note").textContent = "Checking alerts…";
  const response = await fetch(ALERTS_URL);
  if (!response.ok) throw new Error("Alert feed returned " + response.status);
  const data = await response.json();
  const buckets = new Map();
  for (const feature of data.features || []) {
    const props = feature.properties || {};
    if (!feature.geometry) continue;
    const text = props.alert_text_en || "";
    const key = String(feature.id || props.id || props.feature_id || "") + "|" + (props.feature_name_en || "") + "|" + text;
    if (!buckets.has(key)) {
      buckets.set(key, {
        id: hash(key),
        province: props.province || "",
        type: props.alert_type || "warning",
        name: props.alert_name_en || "Weather alert",
        short: props.alert_short_name_en || "",
        text,
        status: props.status_en || "",
        risk: (props.risk_colour_en || "").toLowerCase(),
        color: alertColor(props),
        issued: props.publication_datetime,
        until: props.expiration_datetime,
        ends: props.event_end_datetime,
        areas: [],
        features: [],
      });
    }
    const group = buckets.get(key);
    group.features.push(feature);
    if (props.feature_name_en && !group.areas.includes(props.feature_name_en)) group.areas.push(props.feature_name_en);
    if (props.publication_datetime && (!group.issued || props.publication_datetime > group.issued)) group.issued = props.publication_datetime;
    if (props.expiration_datetime && (!group.until || props.expiration_datetime > group.until)) group.until = props.expiration_datetime;
    if (isActiveStatus(props.status_en)) group.status = props.status_en;
  }
  state.groups = [...buckets.values()].map((group) => {
    const bounds = boundsOf(group.features);
    group.bounds = bounds;
    group.centroid = [(bounds.west + bounds.east) / 2, (bounds.south + bounds.north) / 2];
    group.active = isActiveStatus(group.status);
    return group;
  });
  state.groups.sort((a, b) => Number(b.active) - Number(a.active) || String(b.issued).localeCompare(String(a.issued)));
  state.loadedAt = new Date();
  state.featureCollection = {
    type: "FeatureCollection",
    features: state.groups.flatMap((group) =>
      group.features.map((feature) => ({
        type: "Feature",
        geometry: feature.geometry,
        properties: {
          groupId: group.id,
          color: group.color,
          status: group.active ? group.status : "ended",
          name: group.name,
          area: feature.properties.feature_name_en || "",
        },
      }))
    ),
  };
  syncAlertSource();
  fillProvinces();
  renderList();
}

function isActiveStatus(status) {
  return status && status !== "ended" && status !== "cancelled";
}

function alertColor(props) {
  const type = props.alert_type;
  const risk = (props.risk_colour_en || "").toLowerCase();
  if (type === "statement") return "#b7c0c8";
  if (type === "advisory") return "#8ea4bc";
  if (type === "watch") return "#f0c43a";
  if (risk === "orange") return "#e36a22";
  if (risk === "yellow" && type !== "warning") return "#f0c43a";
  return "#d42c2c";
}

function hash(value) {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = Math.imul(31, h) + value.charCodeAt(i) | 0;
  return "g" + (h >>> 0).toString(36);
}

function boundsOf(features) {
  let west = Infinity, south = Infinity, east = -Infinity, north = -Infinity;
  const walk = (coords) => {
    if (typeof coords[0] === "number") {
      west = Math.min(west, coords[0]);
      east = Math.max(east, coords[0]);
      south = Math.min(south, coords[1]);
      north = Math.max(north, coords[1]);
      return;
    }
    coords.forEach(walk);
  };
  for (const feature of features) walk(feature.geometry.coordinates);
  return { west, south, east, north };
}

function fillProvinces() {
  const select = $("province");
  if (!select) return;
  const previous = select.value;
  const present = [...new Set(state.groups.map((group) => group.province).filter(Boolean))].sort();
  select.replaceChildren();
  const all = document.createElement("option");
  all.value = "";
  all.textContent = "All";
  select.append(all);
  for (const code of present) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = code;
    select.append(option);
  }
  if (present.includes(previous)) select.value = previous;
}

function syncAlertSource() {
  if (!map.getSource("alerts") || !state.featureCollection) return;
  const showEnded = $("show-ended").checked;
  const features = state.featureCollection.features.filter((feature) => showEnded || feature.properties.status !== "ended");
  map.getSource("alerts").setData({ type: "FeatureCollection", features });
}

function visibleGroups() {
  const showEnded = $("show-ended") && $("show-ended").checked;
  return state.groups.filter((group) => showEnded || group.active);
}

function pointInRing(lng, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const crosses = (yi > lat) !== (yj > lat) && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
}

function geometryContains(geometry, lng, lat) {
  if (!geometry) return false;
  if (geometry.type === "Polygon") {
    const [outer, ...holes] = geometry.coordinates;
    if (!pointInRing(lng, lat, outer)) return false;
    return !holes.some((hole) => pointInRing(lng, lat, hole));
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.some((polygon) => geometryContains({ type: "Polygon", coordinates: polygon }, lng, lat));
  }
  return false;
}

function kmBetween(aLng, aLat, bLng, bLat) {
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const step = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(step)));
}

function distanceToBounds(lng, lat, bounds) {
  const nearLng = Math.max(bounds.west, Math.min(lng, bounds.east));
  const nearLat = Math.max(bounds.south, Math.min(lat, bounds.north));
  return kmBetween(lng, lat, nearLng, nearLat);
}

function bearing(fromLng, fromLat, toLng, toLat) {
  const toRad = (value) => (value * Math.PI) / 180;
  const y = Math.sin(toRad(toLng - fromLng)) * Math.cos(toRad(toLat));
  const x = Math.cos(toRad(fromLat)) * Math.sin(toRad(toLat)) - Math.sin(toRad(fromLat)) * Math.cos(toRad(toLat)) * Math.cos(toRad(toLng - fromLng));
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

function angleDiff(a, b) {
  const delta = Math.abs(a - b) % 360;
  return delta > 180 ? 360 - delta : delta;
}

function compassName(degrees) {
  return ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round(degrees / 45) % 8];
}

function placeAlerts(place) {
  if (!place || !Number.isFinite(place.lon)) return [];
  const hits = [];
  for (const group of state.groups) {
    if (!group.active || !group.bounds) continue;
    const covers = group.features.some((feature) => geometryContains(feature.geometry, place.lon, place.lat));
    const nearKm = distanceToBounds(place.lon, place.lat, group.bounds);
    let relation = "";
    if (covers) relation = "here";
    else if (nearKm <= 100) relation = "near";
    else if (nearKm <= 400 && Number.isFinite(state.windFrom)) {
      const toward = bearing(place.lon, place.lat, group.centroid[0], group.centroid[1]);
      if (angleDiff(toward, state.windFrom) <= 55) relation = "coming";
    }
    if (relation) hits.push({ group, relation, nearKm, toward: bearing(place.lon, place.lat, group.centroid[0], group.centroid[1]) });
  }
  const rank = { here: 0, near: 1, coming: 2 };
  hits.sort((a, b) => rank[a.relation] - rank[b.relation] || a.nearKm - b.nearKm);
  return hits.slice(0, 3);
}

function renderList() {
  const groups = visibleGroups();
  const note = $("alert-note");
  const place = readSavedPlace();
  const hits = placeAlerts(place);
  if (note) {
    note.replaceChildren();
    if (!state.loadedAt) {
      note.textContent = "Checking alerts…";
    } else if (!place) {
      note.textContent = groups.length ? `${groups.length} alerts on the map. Select one.` : "No alerts on the map.";
    } else if (!hits.length) {
      note.textContent = `No alerts for ${place.name}.`;
    } else {
      hits.forEach((hit) => {
        const extra = hit.relation === "here"
          ? `Covers ${place.name}`
          : hit.relation === "near"
            ? `Nearby, ${compassName(hit.toward)}`
            : `Upwind of ${place.name}`;
        note.append(alertButton(hit.group, { extra, km: hit.relation === "here" ? null : Math.round(hit.nearKm) }));
      });
    }
  }
  const list = $("alert-list");
  if (!list) return;
  list.replaceChildren();
  if (state.mapSubject !== "alerts" || !state.loadedAt) return;
  const shown = new Set(hits.map((hit) => hit.group.id));
  const nearest = groups
    .filter((group) => group.active && group.centroid && !shown.has(group.id))
    .sort((a, b) => {
      if (!place) return 0;
      return kmBetween(place.lon, place.lat, a.centroid[0], a.centroid[1]) - kmBetween(place.lon, place.lat, b.centroid[0], b.centroid[1]);
    })
    .slice(0, 6);
  if (!nearest.length) return;
  const label = document.createElement("p");
  label.className = "alert-kicker";
  label.textContent = hits.length ? "Other alerts" : "Closest";
  list.append(label);
  nearest.forEach((group) => {
    const km = place ? Math.round(kmBetween(place.lon, place.lat, group.centroid[0], group.centroid[1])) : null;
    const where = group.areas[0] || PROVINCES[group.province]?.[0] || group.province || "Canada";
    list.append(alertButton(group, { extra: where, km }));
  });
}

function alertButton(group, { extra, km }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "alert-row" + (group.id === state.selectedId ? " here" : "");
  const symbol = document.createElement("span");
  symbol.className = "alert-sym";
  symbol.innerHTML = iconSvg(iconKind(group));
  const copy = document.createElement("span");
  copy.className = "alert-copy";
  const title = document.createElement("strong");
  title.textContent = titleCase(group.name);
  const detail = document.createElement("em");
  detail.textContent = extra || "";
  copy.append(title, detail);
  button.append(symbol, copy);
  if (km != null) {
    const distance = document.createElement("span");
    distance.className = "alert-km";
    distance.textContent = `${km.toLocaleString("en-CA")} km`;
    button.append(distance);
  }
  button.addEventListener("click", () => selectGroup(group.id, true));
  return button;
}

function setFieldVisible(on) {
  clock.hiddenField = !on;
  const flow = $("flow");
  if (flow) flow.style.visibility = on ? "" : "hidden";
  if (map.getLayer("wx")) map.triggerRepaint();
  publishSheet();
}

function publishSheet() {
  const source = map.getSource("wx-sheet");
  if (!map.getLayer("wx-sheet") || !source) return;
  const live = clock.images && clock.images[clock.index];
  const image = live || clock.holdImage;
  const coords = live ? clock.coords : (clock.holdCoords || clock.coords);
  if (!globeOn || clock.hiddenField || !image || !image.src || !coords) {
    map.setLayoutProperty("wx-sheet", "visibility", "none");
    return;
  }
  map.setLayoutProperty("wx-sheet", "visibility", "visible");
  map.setPaintProperty("wx-sheet", "raster-opacity", clock.opacity || 0.72);
  const key = image.src + "|" + coords.map((corner) => corner.join(",")).join(" ");
  if (key === clock.sheetKey) return;
  clock.sheetKey = key;
  source.updateImage({ url: image.src, coordinates: coords });
}

function closeAlert() {
  if ($("detail").hidden) return;
  state.selectedId = null;
  $("detail").hidden = true;
  highlight();
  if (state.mapSubject !== "alerts" && field.kind) {
    setFieldVisible(true);
    $("player").hidden = false;
    if (clock.ready && !clock.playing) startLoop();
  }
}

function openMap(subject) {
  $("app").classList.add("map-open");
  $("map-screen").hidden = false;
  requestAnimationFrame(() => map.resize());
  if (!field.kind) selectMode("model", subject === "alerts" ? "temp" : "temp");
  if (subject === "alerts") showAlertsMap();
  else showForecastMap();
}

function closeMap() {
  $("app").classList.remove("map-open");
  $("map-screen").hidden = true;
  stopPlay();
}

function showForecastMap() {
  state.mapSubject = "forecast";
  setFieldVisible(true);
  $("fit-alerts").setAttribute("aria-pressed", "false");
  closeAlert();
  renderList();
  if (field.kind && $("detail").hidden) {
    $("player").hidden = false;
    if (clock.ready && !clock.playing) startLoop();
  }
}

function showAlertsMap() {
  state.mapSubject = "alerts";
  setFieldVisible(false);
  stopPlay();
  $("player").hidden = true;
  $("fit-alerts").setAttribute("aria-pressed", "true");
  renderList();
  const panel = $("alerts-panel");
  if (panel) panel.scrollIntoView({ block: "start" });
  const place = readSavedPlace();
  const ranked = visibleGroups().filter((group) => group.active && group.bounds && Number.isFinite(group.bounds.west));
  if (place) {
    ranked.sort((a, b) => kmBetween(place.lon, place.lat, a.centroid[0], a.centroid[1]) - kmBetween(place.lon, place.lat, b.centroid[0], b.centroid[1]));
  }
  const target = ranked[0];
  if (!target) return;
  map.fitBounds(
    [[target.bounds.west, target.bounds.south], [target.bounds.east, target.bounds.north]],
    { padding: mapPadding(), duration: 700, maxZoom: 6.4 }
  );
}

function selectGroup(id, fly) {
  state.selectedId = id;
  state.mapSubject = "alerts";
  setFieldVisible(false);
  stopPlay();
  $("player").hidden = true;
  $("fit-alerts").setAttribute("aria-pressed", "true");
  highlight();
  renderList();
  const group = state.groups.find((item) => item.id === id);
  if (!group) return;
  $("detail").hidden = false;
  $("detail-kicker").textContent = posterTitle(group).replace("\n", " ");
  $("detail-title").textContent = group.name;
  $("detail-when").textContent = `${formatStamp(group.issued, group.province)}  ·  until ${formatStamp(group.until, group.province)}`;
  $("detail-areas").textContent = group.areas.join(" · ");
  $("detail-text").textContent = group.text;
  $("detail").scrollIntoView({ block: "nearest" });
  if (fly && group.bounds && Number.isFinite(group.bounds.west)) {
    try {
      map.fitBounds(
        [[group.bounds.west, group.bounds.south], [group.bounds.east, group.bounds.north]],
        { padding: mapPadding(), duration: 700, maxZoom: 6.4 }
      );
    } catch { /* keep the alert text open even if the outline cannot be framed */ }
  }
}

function highlight() {
  if (!map.getLayer("alert-line")) return;
  const id = state.selectedId || "";
  map.setPaintProperty("alert-line", "line-width", ["case", ["==", ["get", "groupId"], id], 3.2, 1.15]);
  map.setPaintProperty("alert-fill", "fill-opacity", [
    "case",
    ["==", ["get", "groupId"], id],
    0.48,
    ["==", ["get", "status"], "ended"],
    0.14,
    0.3,
  ]);
}

function fitGroup(target, group, padding) {
  target.fitBounds(
    [[group.bounds.west, group.bounds.south], [group.bounds.east, group.bounds.north]],
    { padding, duration: 700, maxZoom: 6.4 }
  );
}

function fitCanada() {
  map.fitBounds([[-141, 41.6], [-52.5, 72]], { padding: 24, duration: 700 });
}

async function featureValue(layer, lngLat, time) {
  const dLat = 0.12;
  const dLon = 0.22;
  const bbox = `${lngLat.lat - dLat},${lngLat.lng - dLon},${lngLat.lat + dLat},${lngLat.lng + dLon}`;
  const stamp = time ? `&TIME=${encodeURIComponent(time)}` : "";
  const url = `${WMS}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=${encodeURIComponent(layer)}&QUERY_LAYERS=${encodeURIComponent(layer)}&CRS=EPSG:4326&BBOX=${bbox}&WIDTH=101&HEIGHT=101&I=50&J=50&INFO_FORMAT=application/json${stamp}`;
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    const feature = data.features && data.features[0];
    if (!feature) return null;
    const value = feature.properties.value;
    return Number.isFinite(Number(value)) ? Number(value) : null;
  } catch {
    return null;
  }
}

function formatProbe(key, value) {
  if (value == null || Number.isNaN(value)) return "—";
  if (key === "rain") {
    if (value <= 0) return "No echo";
    return value.toFixed(1) + " mm/h";
  }
  if (key === "wind" || key === "gust") return Math.round(value * 3.6) + " km/h";
  if (key === "humidex") {
    const index = value > 200 ? value - 273.15 : value;
    return Math.round(index).toString();
  }
  return Math.round(value) + "°C";
}

function nearestCity(lon, lat) {
  let best = null;
  let bestDistance = Infinity;
  for (const city of cities) {
    const distance = (city.lon - lon) ** 2 + (city.lat - lat) ** 2;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = city;
    }
  }
  return Math.sqrt(bestDistance) < 2.4 ? best : null;
}

function formatCoord(lat, lon) {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}°${ns}  ${Math.abs(lon).toFixed(2)}°${ew}`;
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function firstParagraph(text) {
  return (text || "").split(/\n+/).map((line) => line.trim()).find(Boolean) || "";
}

function posterTitle(group) {
  if (group.type === "statement") return "SPECIAL WEATHER\nSTATEMENT";
  if (group.type === "watch") return "WEATHER\nWATCH";
  if (group.type === "advisory") return "WEATHER\nADVISORY";
  const short = (group.short || group.name).replace(/warning/i, "").trim() || "Weather";
  return `${short}\nWARNING`.toUpperCase();
}

function regionLabel(group) {
  const meta = PROVINCES[group.province];
  const name = meta ? meta[0] : group.province || "Canada";
  if (!meta) return name.toUpperCase();
  const span = meta[3] - meta[2];
  const t = (group.centroid[1] - meta[2]) / span;
  const band = t < 0.38 ? "Southern " : t > 0.72 ? "Northern " : "";
  return (band + name).toUpperCase();
}

function zoneAbbr(iso, province) {
  const zone = PROVINCES[province]?.[1] || "America/Winnipeg";
  const date = new Date(iso);
  const name = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "short" })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value || "";
  if (name && !name.startsWith("GMT")) return name;
  const fixed = { "America/Whitehorse": "MST", "America/Regina": "CST" };
  return fixed[zone] || name;
}

function formatStamp(iso, province) {
  if (!iso) return "—";
  const zone = PROVINCES[province]?.[1] || "America/Winnipeg";
  const date = new Date(iso);
  const time = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone, hour: "numeric", minute: "2-digit", hour12: true,
  }).format(date);
  const day = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone, weekday: "short", month: "short", day: "numeric", year: "numeric",
  }).format(date);
  return `${time} ${zoneAbbr(iso, province)}  ·  ${day}`;
}

function formatStampPoster(iso, province) {
  if (!iso) return "—";
  const zone = PROVINCES[province]?.[1] || "America/Winnipeg";
  const date = new Date(iso);
  const clock = new Intl.DateTimeFormat("en-US", {
    timeZone: zone, hour: "numeric", minute: "2-digit", hour12: true,
  }).format(date).toUpperCase();
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: zone, weekday: "short", month: "short", day: "numeric", year: "numeric",
  }).format(date);
  return `${clock} ${zoneAbbr(iso, province)} - ${day}`;
}

function iconKind(group) {
  const name = (group.name || "").toLowerCase();
  const text = (group.text || "").toLowerCase();
  if (group.type === "statement") return "statement";
  if (group.type === "watch") return "watch";
  if (/blizzard/.test(name)) return "blizzard";
  if (/wind/.test(name)) return "wind";
  if (/snow|freezing rain|ice|flurr/.test(name)) return "snow";
  if (/thunder|tornado|severe storm/.test(name)) return "storm";
  if (/rain|shower/.test(name)) return "rain";
  if (/heat|humidex/.test(name)) return "heat";
  if (/fog|visibility/.test(name)) return "fog";
  if (/blizzard/.test(text)) return "blizzard";
  if (/wind/.test(text)) return "wind";
  if (/snow|freezing/.test(text)) return "snow";
  if (group.type === "advisory") return "advisory";
  return "statement";
}

const ICON_ROOT = "https://cdn.jsdelivr.net/npm/@meteocons/svg-static@0.1.0/fill/";
const ICON_FILE = {
  wind: "wind",
  blizzard: "wind-snow",
  snow: "snow",
  rain: "rain",
  storm: "thunderstorms",
  heat: "sun-hot",
  fog: "fog",
  statement: "weather-alert",
  watch: "extreme",
  advisory: "weather-alert",
  sun: "clear-day",
  cloud: "cloudy",
  partly: "partly-cloudy-day",
};

function iconUrl(kind) {
  return ICON_ROOT + (ICON_FILE[kind] || "cloudy") + ".svg";
}

function iconSvg(kind) {
  return `<img src="${iconUrl(kind)}" alt="" draggable="false">`;
}

function openReport() {
  const group = state.groups.find((item) => item.id === state.selectedId) || visibleGroups()[0];
  if (!group) return;
  state.selectedId = group.id;
  $("modal").hidden = false;
  $("poster-title").textContent = titleCase(group.name);
  $("report-place").textContent = group.areas[0] || regionLabel(group);
  $("report-status").textContent = group.active ? "Active" : "Ended";
  $("poster-mark").innerHTML = iconSvg(iconKind(group));
  $("poster-issued").textContent = formatStampPoster(group.issued, group.province);
  $("poster-until").textContent = formatStampPoster(group.until, group.province);
  $("poster-details").textContent = summaryText(group);
  $("inset-label").textContent = regionLabel(group);
  $("save-png").disabled = true;
  ensurePosterMaps(() => showGroupOnPoster(group));
}

function summaryText(group) {
  const parts = (group.text || "").split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const body = parts.slice(0, 3).join(" ");
  return body.length > 420 ? body.slice(0, 417).replace(/\s+\S*$/, "") + "…" : body;
}

function escapeHtml(value) {
  return value.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char]));
}

function ensurePosterMaps(done) {
  if (!state.posterMap) {
    state.posterMap = new maplibregl.Map({
      container: "poster-map",
      style: STYLE,
      center: [-104.6, 50.4],
      zoom: 5,
      preserveDrawingBuffer: true,
      canvasContextAttributes: { preserveDrawingBuffer: true, antialias: true },
      attributionControl: false,
      interactive: false,
    });
    state.posterMap.dragPan.disable();
    state.posterMap.scrollZoom.disable();
    state.posterMap.doubleClickZoom.disable();
    state.posterMap.boxZoom.disable();
    state.posterMap.keyboard.disable();
    state.posterMap.touchZoomRotate.disable();
    state.posterMap.dragRotate.disable();
    state.posterMap.on("load", () => {
      tuneMap(state.posterMap);
      quietLabels(state.posterMap);
      state.posterMap.addSource("area", { type: "geojson", data: emptyFC() });
      state.posterMap.addLayer({
        id: "area-fill", type: "fill", source: "area",
        paint: { "fill-color": "#7f8b99", "fill-opacity": 0.55 },
      });
      state.posterMap.addLayer({
        id: "area-line", type: "line", source: "area",
        paint: { "line-color": "#e7edf3", "line-width": 2.4 },
      });
      state.posterMap.addSource("cities", { type: "geojson", data: emptyFC() });
      state.posterMap.addLayer({
        id: "city-dot", type: "circle", source: "cities",
        paint: { "circle-radius": 3.2, "circle-color": "#f4f7fb", "circle-stroke-width": 1, "circle-stroke-color": "#2c3238" },
      });
      state.posterMap.addLayer({
        id: "city-label", type: "symbol", source: "cities",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Regular"],
          "text-size": 13,
          "text-offset": [0, 0.75],
          "text-anchor": "top",
          "text-max-width": 8,
          "text-padding": 4,
        },
        paint: { "text-color": "#f4f7fb", "text-halo-color": "#2c3238", "text-halo-width": 1.3 },
      });
      state.posterReady = true;
      finish();
    });
  }
  if (!state.insetMap) {
    state.insetMap = new maplibregl.Map({
      container: "inset-map",
      style: STYLE,
      center: [-106, 52],
      zoom: 3.2,
      preserveDrawingBuffer: true,
      canvasContextAttributes: { preserveDrawingBuffer: true, antialias: true },
      attributionControl: false,
      interactive: false,
    });
    state.insetMap.on("load", () => {
      tuneMap(state.insetMap);
      quietLabels(state.insetMap);
      state.insetMap.addSource("area", { type: "geojson", data: emptyFC() });
      state.insetMap.addLayer({
        id: "area-fill", type: "fill", source: "area",
        paint: { "fill-color": "#8b97a4", "fill-opacity": 0.72 },
      });
      state.insetMap.addLayer({
        id: "area-line", type: "line", source: "area",
        paint: { "line-color": "#d5dde6", "line-width": 1.4 },
      });
      state.insetMap.addSource("cities", { type: "geojson", data: emptyFC() });
      state.insetMap.addLayer({
        id: "city-dot", type: "circle", source: "cities",
        paint: { "circle-radius": 2.6, "circle-color": "#f4f7fb", "circle-stroke-width": 1, "circle-stroke-color": "#2c3238" },
      });
      state.insetMap.addLayer({
        id: "city-label", type: "symbol", source: "cities",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Regular"],
          "text-size": 12,
          "text-offset": [0, 0.7],
          "text-anchor": "top",
          "text-allow-overlap": true,
        },
        paint: { "text-color": "#f4f7fb", "text-halo-color": "#2c3238", "text-halo-width": 1.2 },
      });
      state.insetReady = true;
      finish();
    });
  }
  function finish() {
    if (state.posterReady && state.insetReady) {
      state.posterMap.resize();
      state.insetMap.resize();
      done();
    }
  }
  if (state.posterReady && state.insetReady) {
    state.posterMap.resize();
    state.insetMap.resize();
    done();
  }
}

function quietLabels(target) {
  for (const layer of target.getStyle().layers) {
    if (layer.type !== "symbol") continue;
    if (/^(label_|place_|highway-name|highway_name|highway-shield|water_name|waterway_line_label|road_shield|road_oneway)/.test(layer.id)) {
      target.setLayoutProperty(layer.id, "visibility", "none");
    }
  }
}

function showGroupOnPoster(group) {
  const collection = {
    type: "FeatureCollection",
    features: group.features.map((feature) => ({ type: "Feature", geometry: feature.geometry, properties: {} })),
  };
  state.posterMap.getSource("area").setData(collection);
  state.insetMap.getSource("area").setData(collection);
  const color = group.color || "#d42c2c";
  for (const target of [state.posterMap, state.insetMap]) {
    target.setPaintProperty("area-fill", "fill-color", color);
    target.setPaintProperty("area-fill", "fill-opacity", 0.38);
    target.setPaintProperty("area-line", "line-color", color);
    target.setPaintProperty("area-line", "line-width", target === state.posterMap ? 2.4 : 1.6);
  }
  const padBounds = expand(group.bounds, 0.14);
  state.posterMap.getSource("cities").setData(cityFC(pickCities(padBounds, group.centroid, true)));
  state.insetMap.getSource("cities").setData(cityFC(pickCities(expand(group.bounds, 0.45), group.centroid, false).filter((city) => city.rank === 1).slice(0, 8)));
  const fit = () => {
    fitGroup(state.posterMap, group, 64);
    state.insetMap.fitBounds(
      [[group.bounds.west, group.bounds.south], [group.bounds.east, group.bounds.north]],
      { padding: 70, duration: 0, maxZoom: 5.2 }
    );
  };
  state.posterMap.resize();
  state.insetMap.resize();
  fit();
  state.posterMap.once("idle", () => {
    $("save-png").disabled = false;
  });
}

function expand(bounds, amount) {
  const dx = (bounds.east - bounds.west) * amount;
  const dy = (bounds.north - bounds.south) * amount;
  return {
    west: bounds.west - dx,
    east: bounds.east + dx,
    south: bounds.south - dy,
    north: bounds.north + dy,
  };
}

function pickCities(bounds, centroid, detailed) {
  const span = Math.max(bounds.east - bounds.west, bounds.north - bounds.south);
  const maxRank = !detailed ? 1 : span < 6 ? 3 : span < 14 ? 2 : 1;
  const cap = !detailed ? 8 : span < 6 ? 32 : span < 14 ? 20 : 12;
  return cities
    .filter((city) => city.lon >= bounds.west && city.lon <= bounds.east && city.lat >= bounds.south && city.lat <= bounds.north && city.rank <= maxRank)
    .sort((a, b) => a.rank - b.rank || distance(a, centroid) - distance(b, centroid))
    .slice(0, cap);
}

function distance(city, centroid) {
  return (city.lon - centroid[0]) ** 2 + (city.lat - centroid[1]) ** 2;
}

function cityFC(list) {
  return {
    type: "FeatureCollection",
    features: list.map((city) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [city.lon, city.lat] },
      properties: { name: city.name },
    })),
  };
}

function grabMapCanvas(target) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      requestAnimationFrame(() => resolve(target.getCanvas()));
    };
    target.once("idle", finish);
    target.triggerRepaint();
    setTimeout(finish, 1500);
  });
}

function symbolImage(kind) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = iconUrl(kind);
  });
}

async function savePng() {
  const button = $("save-png");
  button.disabled = true;
  try {
    const group = state.groups.find((item) => item.id === state.selectedId);
    if (!group) return;
    const posterCanvas = await grabMapCanvas(state.posterMap);
    const mark = await symbolImage(iconKind(group));
    const canvas = document.createElement("canvas");
    const width = 1080;
    const height = 1280;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1c2026";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(mark, 56, 48, 88, 88);
    ctx.fillStyle = "#b7bec6";
    ctx.font = "500 22px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText($("report-place").textContent, 176, 86);
    ctx.fillStyle = "#e8ebef";
    ctx.font = "600 48px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText($("poster-title").textContent, 176, 136);
    const facts = [
      ["Issued", $("poster-issued").textContent],
      ["Until", $("poster-until").textContent],
      ["Status", $("report-status").textContent],
    ];
    facts.forEach(([label, value], index) => {
      const x = 56 + index * 332;
      roundRect(ctx, x, 184, 316, 84, 18, "#12161b");
      ctx.fillStyle = "#b7bec6";
      ctx.font = "500 18px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(label, x + 18, 216);
      ctx.fillStyle = "#e8ebef";
      ctx.font = "600 22px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(value, x + 18, 248);
    });
    const mapX = 56;
    const mapY = 292;
    const mapW = width - 112;
    const mapH = 640;
    ctx.save();
    roundRect(ctx, mapX, mapY, mapW, mapH, 24, "#5c656e");
    ctx.clip();
    ctx.drawImage(posterCanvas, mapX, mapY, mapW, mapH);
    ctx.restore();
    ctx.fillStyle = "#e8ebef";
    ctx.font = "500 26px -apple-system, BlinkMacSystemFont, sans-serif";
    const lines = wrap(ctx, $("poster-details").textContent, mapW).slice(0, 4);
    lines.forEach((line, index) => ctx.fillText(line, 56, 980 + index * 36));
    ctx.fillStyle = "#b7bec6";
    ctx.font = "500 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Environment Canada", 56, height - 48);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const link = document.createElement("a");
    const slug = (group.name || "alert").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    link.href = URL.createObjectURL(blob);
    link.download = `canada-weather-${group.province.toLowerCase()}-${slug}.png`;
    link.click();
    URL.revokeObjectURL(link.href);
  } finally {
    button.disabled = false;
  }
}

function roundRect(ctx, x, y, w, h, r, color) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function wrap(ctx, text, maxWidth) {
  const words = (text || "").split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function selectMode(kind, key) {
  field.kind = kind;
  field.key = key;
  for (const item of $("modes").querySelectorAll("button")) {
    const [itemKind, itemKey] = item.dataset.value.split(":");
    item.setAttribute("aria-pressed", String(itemKind === kind && itemKey === key));
  }
  applyLayers();
}

$("modes").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const [kind, key] = button.dataset.value.split(":");
  if (field.kind === kind && field.key === key) return;
  selectMode(kind, key);
});
$("play").addEventListener("click", togglePlay);
$("scrub").addEventListener("input", () => {
  stopPlay();
  showFrame(indexForPos(Number($("scrub").value) / 1000));
});
const PLACE_KEY = "canada-weather-place";
let placeToken = 0;

function readSavedPlace() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PLACE_KEY) || "null");
    if (!parsed || !Number.isFinite(parsed.lon) || !Number.isFinite(parsed.lat)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function placeLabel(place) {
  if (place.label) return place.label;
  return place.region ? `${place.name}, ${place.region}` : place.name;
}

function showChosen(place) {
  const chosen = $("place-chosen");
  if (!place) {
    chosen.hidden = true;
    $("place").hidden = false;
    return;
  }
  $("place-chosen-name").textContent = place.name || placeLabel(place);
  chosen.hidden = false;
  $("place").hidden = true;
  $("place-results").replaceChildren();
}

function openSearch() {
  const place = readSavedPlace();
  $("place-chosen").hidden = true;
  $("place").hidden = false;
  $("place").value = "";
  $("place").focus();
  if (!place) return;
}

function mapPadding() {
  const panel = $("sidebar");
  const width = panel ? Math.round(panel.getBoundingClientRect().width) + 48 : 460;
  return { top: 48, right: 48, bottom: 120, left: width };
}

function focusPlace(place, animate) {
  showChosen(place);
  loadForecast(place);
  const maxZoom = place.maxZoom || 10;
  const padding = mapPadding();
  if (place.bbox) {
    map.fitBounds(place.bbox, { padding, duration: animate ? 800 : 0, maxZoom });
  } else if (animate) {
    map.flyTo({ center: [place.lon, place.lat], zoom: place.zoom || maxZoom, padding, duration: 800 });
  } else {
    map.jumpTo({ center: [place.lon, place.lat], zoom: place.zoom || maxZoom, padding });
  }
}

function showSavedPlace(place) {
  focusPlace(place, false);
}

function choosePlace(place) {
  localStorage.setItem(PLACE_KEY, JSON.stringify(place));
  $("place-results").replaceChildren();
  focusPlace(place, true);
  renderList();
}

function appendPlaceHit(box, hit) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "place-hit";
  const title = document.createElement("span");
  title.textContent = hit.name;
  button.append(title);
  if (hit.region) {
    const meta = document.createElement("small");
    meta.textContent = hit.region;
    button.append(meta);
  }
  button.addEventListener("click", () => choosePlace(hit));
  box.append(button);
}

async function searchPlaces(raw) {
  const box = $("place-results");
  const token = ++placeToken;
  if (placeAbort) placeAbort.abort();
  placeAbort = new AbortController();
  const signal = placeAbort.signal;
  box.replaceChildren();
  if (raw.length < 2) return;
  const query = raw.replace(/^(?:r\.?\s*m\.?|rural municipality|hamlet|village|town|city)\s+(?:of\s+)?/i, "").trim() || raw;
  const wantsRM = /\br\.?\s*m\b|rural municipality/i.test(raw);
  let remote = [];
  let fromCanada = false;
  try {
    const response = await fetch(`https://geogratis.gc.ca/services/geolocation/en/locate?q=${encodeURIComponent(query)}`, {
      signal,
    });
    if (response.ok) {
      remote = await response.json();
      fromCanada = true;
    }
  } catch (error) {
    if (signal.aborted) return;
    remote = [];
  }
  if (signal.aborted || token !== placeToken) return;
  if (!fromCanada) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=8&q=${encodeURIComponent(query)}`, {
        signal,
      });
      if (response.ok) remote = await response.json();
    } catch (error) {
      if (signal.aborted) return;
      remote = [];
    }
  }
  if (token !== placeToken) return;
  if (fromCanada) {
    const hits = [];
    const seen = new Set();
    const junk = /\b(route|highway|hwy|street|avenue|ave\.?|road|trail|range road|grid|township road)\b/i;
    const places = remote.filter((item) => {
      if (junk.test(item.title || "")) return false;
      if (item.qualifier && item.qualifier !== "LOCATION") return false;
      return String(item.type || "").includes("Geoname");
    });
    places.slice(0, 6).forEach((item) => {
      const clean = String(item.title || "").replace(/\s*\([^)]*\)\s*$/, "");
      const parts = clean.split(",").map((part) => part.trim()).filter(Boolean);
      const name = parts[0];
      const region = parts.slice(1).join(", ");
      if (!name || seen.has(name.toLowerCase() + region)) return;
      seen.add(name.toLowerCase() + region);
      const [x, y] = (item.geometry && item.geometry.coordinates) || [];
      const boxn = item.bbox || [];
      hits.push({
        name,
        region,
        label: region ? `${name}, ${region}` : name,
        lon: Number(x),
        lat: Number(y),
        bbox: boxn.length === 4 ? [[boxn[0], boxn[1]], [boxn[2], boxn[3]]] : null,
        maxZoom: 11,
      });
    });
    box.replaceChildren();
    hits.forEach((hit) => appendPlaceHit(box, hit));
    return;
  }
  const keep = new Set(["city", "town", "village", "hamlet", "municipality", "county", "administrative", "locality", "suburb", "isolated_dwelling", "farm", "neighbourhood"]);
  const hits = [];
  const seen = new Set();
  for (const item of remote) {
    const type = item.addresstype || item.type || "";
    const category = item.category || item.class || "";
    if (category && !["place", "boundary"].includes(category)) continue;
    if (!keep.has(type) && category !== "boundary") continue;
    const name = (item.display_name || "").split(",")[0];
    const region = (item.address && (item.address.state || item.address.country)) || "";
    const country = (item.address && item.address.country) || "";
    const key = `${name.toLowerCase()}|${region.toLowerCase()}`;
    if (!name || seen.has(key)) continue;
    seen.add(key);
    const boxn = (item.boundingbox || []).map(Number);
    const broad = type === "county" || type === "administrative" || type === "municipality";
    hits.push({
      name,
      region,
      country,
      label: region ? `${name}, ${region}` : name,
      lon: Number(item.lon),
      lat: Number(item.lat),
      bbox: boxn.length === 4 ? [[boxn[2], boxn[0]], [boxn[3], boxn[1]]] : null,
      maxZoom: broad ? 9 : type === "city" || type === "town" ? 10 : 12,
    });
  }
  hits.sort((a, b) => {
    if (wantsRM) return (a.maxZoom === 9 ? 0 : 1) - (b.maxZoom === 9 ? 0 : 1);
    return (a.country === "Canada" ? 0 : 1) - (b.country === "Canada" ? 0 : 1);
  });
  if (!hits.length) {
    cities.filter((city) => city.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5).forEach((city) => {
      hits.push({ name: city.name, region: "", label: city.name, lon: city.lon, lat: city.lat, bbox: null, maxZoom: 8, zoom: 8 });
    });
  }
  box.replaceChildren();
  hits.slice(0, 8).forEach((hit) => appendPlaceHit(box, hit));
}

let placeAbort = null;
$("place-search").addEventListener("click", openSearch);
document.addEventListener("pointerdown", (event) => {
  if ($("place").hidden || !readSavedPlace()) return;
  const panel = document.querySelector(".place-panel");
  if (panel && panel.contains(event.target)) return;
  showChosen(readSavedPlace());
});
$("close-detail").addEventListener("click", closeAlert);
$("place").addEventListener("keydown", (event) => {
  if (event.key === "Escape" && readSavedPlace()) showChosen(readSavedPlace());
});
$("place").addEventListener("focus", () => $("place").select());
$("place").addEventListener("input", () => {
  searchPlaces($("place").value.trim());
});
$("show-ended").addEventListener("change", () => {
  syncAlertSource();
  renderList();
});
$("open-map").addEventListener("click", () => openMap("forecast"));
$("close-map").addEventListener("click", closeMap);
$("fit-alerts").addEventListener("click", () => openMap("alerts"));
$("open-report").addEventListener("click", openReport);
$("close-report").addEventListener("click", () => { $("modal").hidden = true; });
$("save-png").addEventListener("click", () => savePng().catch((error) => {
  console.error(error);
  $("save-png").textContent = "Could not save";
}));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") $("modal").hidden = true;
});

function bindFingerScroll() {
  const panel = $("sidebar");
  const hours = $("hourly");
  let drag = null;

  panel.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    if (event.target.closest("button, a, input, select, textarea, label")) return;
    drag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: hours.scrollLeft,
      top: panel.scrollTop,
      onHours: Boolean(event.target.closest("#hourly")),
      axis: "",
      moved: false,
    };
    try { panel.setPointerCapture(event.pointerId); } catch { /* a real pointer still drags without capture */ }
  });

  panel.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
    drag.moved = true;
    if (!drag.axis) drag.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    if (drag.axis === "x" && drag.onHours) hours.scrollLeft = drag.left - dx;
    if (drag.axis === "y") panel.scrollTop = drag.top - dy;
  });

  const end = (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const moved = drag.moved;
    drag = null;
    if (!moved) return;
    const block = (click) => {
      panel.removeEventListener("click", block, true);
      if (click.target.closest("button, a, input, label")) return;
      click.preventDefault();
      click.stopPropagation();
    };
    panel.addEventListener("click", block, true);
  };
  panel.addEventListener("pointerup", end);
  panel.addEventListener("pointercancel", end);

  hours.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    if (hours.scrollWidth <= hours.clientWidth + 2) return;
    hours.scrollLeft += event.deltaX;
    event.preventDefault();
  }, { passive: false });
}
bindFingerScroll();

const GLYPH = {
  sun: '<circle cx="9" cy="9" r="3.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M9 2.2v1.6M9 14.2v1.6M2.2 9h1.6M14.2 9h1.6M4.2 4.2l1.1 1.1M12.7 12.7l1.1 1.1M13.8 4.2l-1.1 1.1M5.3 12.7l-1.1 1.1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  cloud: '<path d="M5 12.5h7.2a2.6 2.6 0 0 0 .4-5.2 3.3 3.3 0 0 0-6.3-1A2.4 2.4 0 0 0 5 12.5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
  partly: '<path d="M9.5 3.2v1.2M13.6 4.6l-.8.8M14.8 8.4h-1.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M4.5 13h6.4a2.3 2.3 0 0 0 .3-4.6 2.9 2.9 0 0 0-5.5-.8 2.1 2.1 0 0 0-1.2 5.4z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
  fog: '<path d="M3 7.2h12M3 10h12M4 12.8h10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  rain: '<path d="M4.8 8.2h7a2.2 2.2 0 0 0 .3-4.4A2.8 2.8 0 0 0 6.4 2.6 2 2 0 0 0 4.8 8.2z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 10.2l-.7 2.2M9 10.2l-.7 2.2M12 10.2l-.7 2.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
  snow: '<path d="M4.8 8.2h7a2.2 2.2 0 0 0 .3-4.4A2.8 2.8 0 0 0 6.4 2.6 2 2 0 0 0 4.8 8.2z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6.2 11.2h1.6M7 10.4v1.6M9.2 11.2h1.6M10 10.4v1.6M12.2 11.2h1.6M13 10.4v1.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>',
  storm: '<path d="M4.6 8h6.6a2.1 2.1 0 0 0 .2-4.2A2.6 2.6 0 0 0 6 2.4 1.9 1.9 0 0 0 4.6 8z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M8.2 9.2L6.4 12.4h2.2L7.2 15.2" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"/>',
};

function weatherKind(code) {
  const value = Number(code);
  if (value === 0) return "sun";
  if (value <= 2) return "partly";
  if (value === 3) return "cloud";
  if (value === 45 || value === 48) return "fog";
  if ((value >= 71 && value <= 77) || value === 85 || value === 86) return "snow";
  if (value >= 95) return "storm";
  if (value >= 51) return "rain";
  return "cloud";
}

function weatherWords(code) {
  return {
    sun: "Clear",
    partly: "Partly cloudy",
    cloud: "Cloudy",
    fog: "Fog",
    rain: "Rain",
    snow: "Snow",
    storm: "Thunderstorm",
  }[weatherKind(code)];
}

function paintSky(kind) {
  const skies = {
    sun: "linear-gradient(180deg, #5aa6e8 0%, #2f78c4 38%, #1a4f86 100%)",
    partly: "linear-gradient(180deg, #6a93c4 0%, #3d6ea3 40%, #1d4a78 100%)",
    cloud: "linear-gradient(180deg, #6d7c8b 0%, #465463 42%, #2a3540 100%)",
    rain: "linear-gradient(180deg, #4d6274 0%, #314554 45%, #1c2a34 100%)",
    snow: "linear-gradient(180deg, #8aa0b3 0%, #5d7386 42%, #334554 100%)",
    storm: "linear-gradient(180deg, #3a4458 0%, #232a38 50%, #141820 100%)",
    fog: "linear-gradient(180deg, #8b9398 0%, #5e666c 45%, #3a4146 100%)",
  };
  document.body.style.background = skies[kind] || skies.cloud;
}

function kindFromWords(text) {
  const words = (text || "").toLowerCase();
  if (words.includes("thunder")) return "storm";
  if (words.includes("snow") || words.includes("flurr")) return "snow";
  if (words.includes("rain") || words.includes("shower") || words.includes("drizzle")) return "rain";
  if (words.includes("fog") || words.includes("mist")) return "fog";
  if (words.includes("sunny") || words.includes("clear")) return "sun";
  if (words.includes("few") || words.includes("partly") || words.includes("mix")) return "partly";
  return "cloud";
}

function weatherIcon(code) {
  const kind = typeof code === "string" && ICON_FILE[code] ? code : weatherKind(code);
  const image = document.createElement("img");
  image.src = iconUrl(kind);
  image.alt = "";
  image.draggable = false;
  image.width = 22;
  image.height = 22;
  return image;
}

function en(value) {
  if (value && typeof value === "object" && "en" in value) return value.en;
  return value;
}

function showLocationBadge() {
  if (state.locMarker) {
    state.locMarker.remove();
    state.locMarker = null;
  }
  const badge = document.getElementById("loc-badge");
  if (badge) badge.remove();
}

function placeBadge() {}

function compass(degrees) {
  const names = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return names[Math.round(((degrees % 360) + 360) % 360 / 45) % 8];
}

let forecastToken = 0;

async function nearestCityPage(lon, lat) {
  const pad = 2.2;
  const url = `https://api.weather.gc.ca/collections/citypageweather-realtime/items?f=json&limit=20&bbox=${lon - pad},${lat - pad},${lon + pad},${lat + pad}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
  if (!response.ok) throw new Error("City forecast returned " + response.status);
  const data = await response.json();
  let best = null;
  let bestKm = Infinity;
  for (const feature of data.features || []) {
    const [x, y] = feature.geometry.coordinates;
    const km = kmBetween(lon, lat, x, y);
    if (km < bestKm) {
      bestKm = km;
      best = feature;
    }
  }
  return best && bestKm <= 220 ? best : null;
}

async function loadForecast(place) {
  if (!place || !Number.isFinite(place.lat) || !Number.isFinite(place.lon)) {
    $("forecast").hidden = false;
    $("forecast-condition").textContent = "Forecast unavailable";
    $("forecast-temp").textContent = "";
    return;
  }
  const token = ++forecastToken;
  const modelUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m,precipitation&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=10&wind_speed_unit=kmh`;
  const modelTask = fetch(modelUrl, { signal: AbortSignal.timeout(12000) }).then((response) => {
    if (!response.ok) throw new Error("Forecast returned " + response.status);
    return response.json();
  });
  let feature = null;
  try {
    feature = await nearestCityPage(place.lon, place.lat);
  } catch (error) {
    console.error(error);
  }
  let model = null;
  try {
    model = await modelTask;
  } catch (error) {
    console.error(error);
  }
  if (token !== forecastToken) return;
  try {
    if (feature) renderCityForecast(place, feature.properties, true);
    else if (model) renderForecast(place, model);
    else throw new Error("No forecast");
    if (feature && model) renderModelDays(model);
    const saved = { lat: place.lat, lon: place.lon, source: feature ? "city" : "backup", properties: feature && feature.properties, model, data: feature ? null : model };
    try { localStorage.setItem("canada-weather-forecast-cache", JSON.stringify(saved)); } catch { /* the forecast is already on screen */ }
    return;
  } catch (error) {
    if (token !== forecastToken) return;
    console.error(error);
    $("forecast").hidden = false;
    $("forecast-condition").textContent = "Forecast unavailable";
    $("forecast-temp").textContent = "";
  }
}

function renderModelDays(data) {
  const daily = data.daily || {};
  const times = daily.time || [];
  const lows = daily.temperature_2m_min || [];
  const highs = daily.temperature_2m_max || [];
  const codes = daily.weather_code || [];
  if (!times.length) return;
  const dayRow = $("daily");
  dayRow.replaceChildren();
  const weekMin = Math.min(...lows);
  const weekMax = Math.max(...highs);
  const span = weekMax - weekMin || 1;
  times.forEach((day, index) => {
    const row = document.createElement("div");
    row.className = "day";
    const name = document.createElement("span");
    const parts = day.split("-").map(Number);
    const label = new Intl.DateTimeFormat("en-CA", { weekday: "short", timeZone: "UTC" }).format(new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])));
    name.textContent = index === 0 ? "Today" : label;
    const track = document.createElement("div");
    track.className = "range";
    const bar = document.createElement("i");
    bar.style.left = `${((lows[index] - weekMin) / span) * 100}%`;
    bar.style.right = `${((weekMax - highs[index]) / span) * 100}%`;
    track.append(bar);
    const low = document.createElement("span");
    low.className = "low";
    low.textContent = Math.round(lows[index]) + "°";
    const high = document.createElement("span");
    high.className = "high";
    high.textContent = Math.round(highs[index]) + "°";
    row.append(name, weatherIcon(codes[index]), low, track, high);
    dayRow.append(row);
  });
}

function readSpokenTemp(text, word) {
  const match = String(text || "").match(new RegExp("\\b" + word + "\\s+(minus\\s+|plus\\s+)?(zero|\\d+)", "i"));
  if (!match) return null;
  const number = /zero/i.test(match[2]) ? 0 : Number(match[2]);
  return /minus/i.test(match[1] || "") ? -number : number;
}

function renderCityForecast(place, properties, fromCache) {
  const current = properties.currentConditions || {};
  const temp = Number(en(current.temperature && current.temperature.value));
  const feels = Number(en(current.windChill && current.windChill.value));
  const wind = current.wind || {};
  const bearing = Number(en(wind.bearing && wind.bearing.value));
  const speed = Number(en(wind.speed && wind.speed.value));
  const humidity = en(current.relativeHumidity && current.relativeHumidity.value);
  const condition = en(current.condition) || "Clear";
  $("forecast").hidden = false;
  state.windFrom = bearing;
  $("forecast-condition").textContent = condition;
  const symbol = $("now-symbol");
  if (symbol) symbol.replaceChildren(weatherIcon(kindFromWords(condition)));
  $("forecast-temp").textContent = Number.isFinite(temp) ? Math.round(temp) + "°" : "";
  const periods = (properties.forecastGroup && properties.forecastGroup.forecasts) || [];
  const days = [];
  periods.forEach((period, index) => {
    const rawReadings = period.temperatures && period.temperatures.temperature;
    const readings = Array.isArray(rawReadings) ? rawReadings : rawReadings ? [rawReadings] : [];
    const high = readings.find((item) => en(item.class) === "high");
    const low = readings.find((item) => en(item.class) === "low");
    const blurb = [en(period.textSummary), en(period.temperatures && period.temperatures.textSummary)].filter(Boolean).join(" ");
    const name = String(en(period.period && period.period.textForecastName) || "");
    const summary = en(period.abbreviatedForecast && period.abbreviatedForecast.textSummary) || en(period.cloudPrecip);
    if (!high && !readSpokenTemp(blurb, "High")) return;
    const next = periods[index + 1];
    const nextRaw = next && next.temperatures && next.temperatures.temperature;
    const nextReadings = Array.isArray(nextRaw) ? nextRaw : nextRaw ? [nextRaw] : [];
    const nextLow = nextReadings.find((item) => en(item.class) === "low");
    const nextBlurb = next ? [en(next.textSummary), en(next.temperatures && next.temperatures.textSummary)].filter(Boolean).join(" ") : "";
    const highN = high ? Number(en(high.value)) : readSpokenTemp(blurb, "High");
    const lowN = low ? Number(en(low.value)) : readSpokenTemp(blurb, "Low") ?? (nextLow ? Number(en(nextLow.value)) : readSpokenTemp(nextBlurb, "Low"));
    days.push({ name, high: highN, low: lowN, kind: kindFromWords(summary) });
  });
  const today = days[0];
  const feel = Number.isFinite(feels) ? feels : temp;
  $("forecast-range").textContent = today
    ? `H:${Math.round(today.high)}°  L:${today.low == null ? "—" : Math.round(today.low) + "°"}`
    : "";
  paintSky(kindFromWords(condition));
  const hours = (properties.hourlyForecastGroup && properties.hourlyForecastGroup.hourlyForecasts) || [];
  const hourRow = $("hourly");
  hourRow.replaceChildren();
  hours.slice(0, 24).forEach((hour) => {
    const cell = document.createElement("div");
    cell.className = "hour";
    const when = document.createElement("span");
    const stamp = en(hour.timestamp) || hour.timestamp;
    const at = new Date(stamp);
    when.textContent = Number.isNaN(at.getTime()) ? "" : new Intl.DateTimeFormat("en-CA", { hour: "numeric" }).format(at);
    const reading = document.createElement("strong");
    reading.textContent = Math.round(Number(en(hour.temperature && hour.temperature.value))) + "°";
    cell.append(when, weatherIcon(kindFromWords(en(hour.condition))), reading);
    hourRow.append(cell);
  });
  const dayRow = $("daily");
  dayRow.replaceChildren();
  const lows = days.map((day) => day.low == null ? day.high : day.low);
  const highs = days.map((day) => day.high == null ? day.low : day.high);
  const weekMin = Math.min(...lows.filter(Number.isFinite));
  const weekMax = Math.max(...highs.filter(Number.isFinite));
  const span = weekMax - weekMin || 1;
  days.forEach((day, index) => {
    const row = document.createElement("div");
    row.className = "day";
    const name = document.createElement("span");
    name.textContent = index === 0 ? "Today" : day.name.replace(" night", "").slice(0, 3);
    const lowValue = day.low == null ? weekMin : day.low;
    const highValue = day.high == null ? weekMax : day.high;
    const track = document.createElement("div");
    track.className = "range";
    const bar = document.createElement("i");
    bar.style.left = `${((lowValue - weekMin) / span) * 100}%`;
    bar.style.right = `${((weekMax - highValue) / span) * 100}%`;
    track.append(bar);
    const low = document.createElement("span");
    low.className = "low";
    low.textContent = day.low == null ? "—" : Math.round(day.low) + "°";
    const high = document.createElement("span");
    high.className = "high";
    high.textContent = day.high == null ? "—" : Math.round(day.high) + "°";
    row.append(name, weatherIcon(day.kind), low, track, high);
    dayRow.append(row);
  });
  const facts = $("facts");
  facts.replaceChildren();
  const dir = en(wind.direction && wind.direction.value) || compass(bearing);
  const windLine = document.createElement("span");
  const windValue = document.createElement("b");
  windValue.textContent = `${Math.round(speed)} km/h ${dir}`;
  windLine.append(document.createTextNode("Wind "), windValue);
  const humid = document.createElement("span");
  humid.append(document.createTextNode("Humidity "), Object.assign(document.createElement("b"), { textContent: `${humidity}%` }));
  const chance = hours[0] && en(hours[0].lop && hours[0].lop.value);
  const precip = document.createElement("span");
  precip.append(document.createTextNode("Precip "), Object.assign(document.createElement("b"), { textContent: chance == null ? "—" : `${chance}%` }));
  facts.append(windLine, humid, precip);
  showLocationBadge(place, bearing, speed, dir);
  renderList();
  if (!fromCache) {
    try {
      localStorage.setItem("canada-weather-forecast-cache", JSON.stringify({ lat: place.lat, lon: place.lon, source: "city", properties }));
    } catch { /* a full forecast can exceed storage; the live one is already on screen */ }
  }
}

function renderForecast(place, data) {
  const current = data.current || {};
  const daily = data.daily || {};
  const hourly = data.hourly || {};
  $("forecast").hidden = false;
  state.windFrom = Number(current.wind_direction_10m);
  $("forecast-condition").textContent = weatherWords(current.weather_code);
  const symbol = $("now-symbol");
  if (symbol) symbol.replaceChildren(weatherIcon(current.weather_code));
  $("forecast-temp").textContent = Math.round(current.temperature_2m) + "°";
  const high = daily.temperature_2m_max && daily.temperature_2m_max[0];
  const low = daily.temperature_2m_min && daily.temperature_2m_min[0];
  $("forecast-range").textContent = `H:${Math.round(high)}°  L:${Math.round(low)}°`;
  paintSky(weatherKind(current.weather_code));

  const offset = data.utc_offset_seconds || 0;
  const stampMillis = (stamp) => Date.parse(stamp + ":00Z") - offset * 1000;
  const hours = (hourly.time || []).map((stamp, index) => ({ stamp, index }))
    .filter((hour) => stampMillis(hour.stamp) >= Date.now() - 45 * 60 * 1000)
    .slice(0, 24);
  const hourRow = $("hourly");
  hourRow.replaceChildren();
  hours.forEach((hour) => {
    const cell = document.createElement("div");
    cell.className = "hour";
    const when = document.createElement("span");
    const at = stampMillis(hour.stamp);
    when.textContent = new Intl.DateTimeFormat("en-CA", { hour: "numeric" }).format(new Date(at));
    const icon = weatherIcon(hourly.weather_code[hour.index]);
    const temp = document.createElement("strong");
    temp.textContent = Math.round(hourly.temperature_2m[hour.index]) + "°";
    cell.append(when, icon, temp);
    hourRow.append(cell);
  });

  const dayRow = $("daily");
  dayRow.replaceChildren();
  const lows = daily.temperature_2m_min || [];
  const highs = daily.temperature_2m_max || [];
  const weekMin = Math.min(...lows);
  const weekMax = Math.max(...highs);
  const span = weekMax - weekMin || 1;
  (daily.time || []).forEach((day, index) => {
    const row = document.createElement("div");
    row.className = "day";
    const name = document.createElement("span");
    const parts = day.split("-").map(Number);
    const label = new Intl.DateTimeFormat("en-CA", { weekday: "short", timeZone: "UTC" }).format(new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])));
    name.textContent = index === 0 ? "Today" : label;
    const track = document.createElement("div");
    track.className = "range";
    const bar = document.createElement("i");
    bar.style.left = `${((lows[index] - weekMin) / span) * 100}%`;
    bar.style.right = `${((weekMax - highs[index]) / span) * 100}%`;
    track.append(bar);
    const low = document.createElement("span");
    low.className = "low";
    low.textContent = Math.round(lows[index]) + "°";
    const high = document.createElement("span");
    high.className = "high";
    high.textContent = Math.round(highs[index]) + "°";
    row.append(name, weatherIcon(daily.weather_code[index]), low, track, high);
    dayRow.append(row);
  });

  const facts = $("facts");
  facts.replaceChildren();
  const wind = document.createElement("span");
  const windValue = document.createElement("b");
  windValue.textContent = `${Math.round(current.wind_speed_10m)} km/h ${compass(current.wind_direction_10m)}`;
  showLocationBadge(place, current.wind_direction_10m, current.wind_speed_10m);
  wind.append(document.createTextNode("Wind "), windValue);
  const humidity = document.createElement("span");
  humidity.append(document.createTextNode("Humidity "), Object.assign(document.createElement("b"), { textContent: `${Math.round(current.relative_humidity_2m)}%` }));
  const precip = document.createElement("span");
  precip.append(document.createTextNode("Precip "), Object.assign(document.createElement("b"), { textContent: `${current.precipitation} mm` }));
  facts.append(wind, humidity, precip);
  renderList();
  try {
    localStorage.setItem("canada-weather-forecast-cache", JSON.stringify({ lat: place.lat, lon: place.lon, source: "backup", data }));
  } catch { /* keep the forecast on screen even if it cannot be stored */ }
}

function showLoadError(error) {
  $("alert-note").textContent = "Could not load alerts. " + error.message;
}

const earlyPlace = readSavedPlace();
if (earlyPlace) {
  showChosen(earlyPlace);
  try {
    const cached = JSON.parse(localStorage.getItem("canada-weather-forecast-cache") || "null");
    if (cached && Math.abs(cached.lat - earlyPlace.lat) < 0.05 && Math.abs(cached.lon - earlyPlace.lon) < 0.05) {
      if (cached.source === "city" && cached.properties) renderCityForecast(earlyPlace, cached.properties, true);
      else if (cached.data) renderForecast(earlyPlace, cached.data);
      if (cached.model) renderModelDays(cached.model);
    }
  } catch { /* a stale cache should not block the fresh forecast */ }
  loadForecast(earlyPlace);
}
loadAlerts().catch(showLoadError);
setInterval(() => loadAlerts().catch(showLoadError), 5 * 60 * 1000);
setInterval(() => {
  const place = readSavedPlace();
  if (place) loadForecast(place);
}, 10 * 60 * 1000);
