// AXIS REGISTRY — used by the Heatmap to map an axis selection to a getter
// and a setter inside the store. Each axis has:
//   id, label, max, get(app, weights), path(app) → store path used by setAppField
// Some axes are read-only derived values (no setter); we surface this with
// editable: false. When the user drops a point on the plot, only axes whose
// `path` is defined get persisted.

const AXES = {
  // ─── Generic scoring fields ──────────────────────────────────────────────
  bus_value:           { label: "Business value",     max: 100, get: a => a.scoring.bva.business,    path: () => "scoring.bva.business", editable: true },
  cost_eff:            { label: "Cost efficiency",    max: 100, get: a => a.scoring.bva.cost,        path: () => "scoring.bva.cost", editable: true },
  risk:                { label: "Risk reduction",    max: 100, get: a => a.scoring.bva.risk,        path: () => "scoring.bva.risk", editable: true },
  tech_fit:            { label: "Technical fit",      max: 100, get: a => a.scoring.bva.technical,   path: () => "scoring.bva.technical", editable: true },
  bva_score:           { label: "BVA composite",      max: 100, editable: false,
                         get: (a, w) => Math.round(a.scoring.bva.business * w.business + a.scoring.bva.cost * w.cost + a.scoring.bva.risk * w.risk + a.scoring.bva.technical * w.technical) },

  // ─── Wert / Komplexität (1..5) — scaled to 100 for plotting ─────────────
  wert_value:          { label: "Wert (Value)",       max: 5, get: a => a.scoring.wert_complexity.value,      path: () => "scoring.wert_complexity.value", editable: true, step: 0.1 },
  wert_complexity:     { label: "Komplexität",        max: 5, get: a => a.scoring.wert_complexity.complexity, path: () => "scoring.wert_complexity.complexity", editable: true, step: 0.1 },

  // ─── Cloud readiness (legacy + per-layer) ───────────────────────────────
  cloud_ist:           { label: "Cloud readiness Ist",       max: 5,   get: a => a.scoring.cloud_readiness.ist,             path: () => "scoring.cloud_readiness.ist", editable: true, step: 0.1 },
  cloud_soll:          { label: "Cloud readiness Soll",      max: 5,   get: a => a.scoring.cloud_readiness.soll,            path: () => "scoring.cloud_readiness.soll", editable: true, step: 0.1 },
  layer1_ist:          { label: "Cloud Layer I · Ist (%)",   max: 100, get: a => a.scoring.cloud_readiness_layers.layer_I.ist,   path: () => "scoring.cloud_readiness_layers.layer_I.ist", editable: true },
  layer1_soll:         { label: "Cloud Layer I · Soll (%)",  max: 100, get: a => a.scoring.cloud_readiness_layers.layer_I.soll,  path: () => "scoring.cloud_readiness_layers.layer_I.soll", editable: true },
  layer2_ist:          { label: "Cloud Layer II · Ist (%)",  max: 100, get: a => a.scoring.cloud_readiness_layers.layer_II.ist,  path: () => "scoring.cloud_readiness_layers.layer_II.ist", editable: true },
  layer3_ist:          { label: "Cloud Layer III · Ist (%)", max: 100, get: a => a.scoring.cloud_readiness_layers.layer_III.ist, path: () => "scoring.cloud_readiness_layers.layer_III.ist", editable: true },
  layer4_ist:          { label: "Cloud Layer IV · Ist (%)",  max: 100, get: a => a.scoring.cloud_readiness_layers.layer_IV.ist,  path: () => "scoring.cloud_readiness_layers.layer_IV.ist", editable: true },

  // ─── Maturity & coverage ─────────────────────────────────────────────────
  scor_maturity:       { label: "SCOR maturity (L1-5)", max: 5,   get: a => a.scoring.scor_maturity, path: () => "scoring.scor_maturity", editable: true, step: 0.1 },
  scor_coverage:       { label: "SCOR coverage (avg)",  max: 3,   editable: false,
                         get: a => {
                           const vals = Object.values(a.scoring.scor_process || {});
                           return vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : 0;
                         } },

  // ─── TCO / TVO ───────────────────────────────────────────────────────────
  tco_total:           { label: "TCO total (€)",        max: 2000000, editable: true, step: 1000,
                         get: a => a.scoring.tco_tvo.tco_total || 0, path: () => "scoring.tco_tvo.tco_total" },
  tvo_score:           { label: "TVO score (1-5)",      max: 5, editable: true, step: 0.5,
                         get: a => a.scoring.tco_tvo.tvo_score || 0, path: () => "scoring.tco_tvo.tvo_score" },

  // ─── Misc ───────────────────────────────────────────────────────────────
  num_users:           { label: "Active users",         max: 2000, editable: false, get: a => a.num_users || 0 },
};

// Axis presets — one click loads two axes plus quadrant labels and (optionally)
// a quadrant→category mapping that lights up on drop.
const AXIS_PRESETS = [
  { id: "time",   label: "Gartner TIME",      x: "tech_fit",    y: "bus_value",
    quadrants: [
      { x: 0,  y: 50, label: "MIGRATE",    color: "#ea580c" },
      { x: 50, y: 50, label: "INVEST",     color: "#16a34a" },
      { x: 0,  y: 0,  label: "TOLERATE",   color: "#64748b" },
      { x: 50, y: 0,  label: "ELIMINATE",  color: "#dc2626" },
    ] },
  { id: "wert",   label: "Wert × Komplexität", x: "wert_complexity", y: "wert_value",
    quadrants: [
      { x: 0,  y: 50, label: "QUICK WIN",    color: "#16a34a" },
      { x: 50, y: 50, label: "STRATEGIC",    color: "#2563eb" },
      { x: 0,  y: 0,  label: "LOW PRIORITY", color: "#94a3b8" },
      { x: 50, y: 0,  label: "AVOID",        color: "#dc2626" },
    ] },
  { id: "cloud",  label: "Cloud Readiness",   x: "layer3_ist",  y: "bus_value", quadrants: null },
  { id: "scor",   label: "SCOR Coverage",     x: "scor_coverage", y: "scor_maturity", quadrants: null },
  { id: "tcotvo", label: "TCO ↔ TVO",          x: "tco_total",   y: "tvo_score", quadrants: null },
  { id: "bva",    label: "BVA composite",     x: "tech_fit",    y: "bva_score", quadrants: null },
];

window.AXES = AXES;
window.AXIS_PRESETS = AXIS_PRESETS;
