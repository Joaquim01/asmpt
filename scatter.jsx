// ScatterPlot — shared reusable plot with continuous axes, drag, jitter,
// crosshair, live tooltip. Used by Bewertung TIME, Wert and the Heatmap.
//
// Props:
//   apps          : Application[]                — points to render
//   getX(app)     : 0..xMax (raw value)
//   getY(app)     : 0..yMax (raw value)
//   xMax, yMax    : axis upper bounds (use 5 for 1-5, 100 for percent)
//   xLabel, yLabel : strings
//   quadrants     : optional [{ x, y, w, h, label, color, fill }]
//                    (x,y in % of plot area, w,h in %)
//   threshold     : { x: number, y: number } in raw units (where to draw the
//                    median split lines, e.g. 2.5 for a 1-5 scale)
//   colorFor(app) : returns a css color
//   onDrag(app, x, y) : called on every mousemove while dragging (raw values)
//   onDragEnd(app, x, y) : called once on mouseup (raw values)
//   onClick(app)  : click without drag
//   canDrag(app)  : returns boolean
//   plotHeight    : aspect-ratio shorthand, default "1 / 0.78"
//   showCrosshair : default true while dragging
//   formatX(v) / formatY(v): for tooltip formatting

const ScatterPlot = React.memo(function ScatterPlot({
  apps,
  getX, getY,
  xMax = 100, yMax = 100,
  xLabel, yLabel,
  quadrants,
  threshold,
  colorFor = () => "#0f172a",
  onDrag, onDragEnd, onClick,
  canDrag = () => true,
  jitterAmplitude = 6,
  plotAspect = "1 / 0.78",
  formatX = v => Math.round(v * 10) / 10,
  formatY = v => Math.round(v * 10) / 10,
  decorations,
  tooltipExtra,
}) {
  const plotRef = React.useRef(null);
  const [drag, setDrag] = React.useState(null); // { id, x, y, rect, didMove }
  const [hover, setHover] = React.useState(null);
  const [pulseId, setPulseId] = React.useState(null);

  function onDown(e, a) {
    if (!canDrag(a)) {
      if (onClick) onClick(a);
      return;
    }
    e.preventDefault(); e.stopPropagation();
    const rect = plotRef.current.getBoundingClientRect();
    const x = getX(a), y = getY(a);
    setDrag({ id: a.id, x, y, rect, didMove: false, startTs: Date.now() });
  }

  React.useEffect(() => {
    if (!drag) return;
    function onMove(e) {
      const rect = drag.rect;
      const nx = Math.max(0, Math.min(xMax, ((e.clientX - rect.left) / rect.width) * xMax));
      const ny = Math.max(0, Math.min(yMax, yMax - ((e.clientY - rect.top) / rect.height) * yMax));
      // Round to one decimal for smooth-but-clean storage
      const xR = Math.round(nx * 10) / 10;
      const yR = Math.round(ny * 10) / 10;
      setDrag(d => ({ ...d, x: xR, y: yR, didMove: true }));
      if (onDrag) onDrag(apps.find(a => a.id === drag.id), xR, yR);
    }
    function onUp() {
      const a = apps.find(x => x.id === drag.id);
      if (drag.didMove && onDragEnd) onDragEnd(a, drag.x, drag.y);
      else if (!drag.didMove && onClick && a) onClick(a);
      if (drag.didMove) {
        setPulseId(drag.id);
        setTimeout(() => setPulseId(null), 600);
      }
      setDrag(null);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [drag, apps, xMax, yMax, onDrag, onDragEnd, onClick]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "stretch", gap: 10 }}>
        <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", letterSpacing: ".18em", whiteSpace: "nowrap", fontWeight: 600 }}>
          {yLabel?.toUpperCase()} →
        </div>
        <div ref={plotRef} style={{ position: "relative", flex: 1, aspectRatio: plotAspect, background: "#fafbfc", border: "1px solid #cbd5e1", overflow: "hidden", userSelect: "none", cursor: drag ? "grabbing" : "default" }}>
          {/* Quadrant fills */}
          {quadrants && quadrants.map((q, i) => (
            <div key={i} style={{ position: "absolute", left: q.x + "%", top: q.y + "%", width: q.w + "%", height: q.h + "%", background: q.fill || (q.color + "10") }} />
          ))}
          {/* Threshold lines (continuous, not a fixed 50/50) */}
          {threshold && (() => {
            const xPct = (threshold.x / xMax) * 100;
            const yPct = 100 - (threshold.y / yMax) * 100;
            return (
              <>
                <div style={{ position: "absolute", left: xPct + "%", top: 0, width: 1, height: "100%", background: "#0f172a" }} />
                <div style={{ position: "absolute", top: yPct + "%", left: 0, height: 1, width: "100%", background: "#0f172a" }} />
              </>
            );
          })()}
          {/* Fine gridlines */}
          {[25, 50, 75].map(p => (
            <React.Fragment key={p}>
              <div style={{ position: "absolute", left: p + "%", top: 0, width: 1, height: "100%", background: "#f1f5f9", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: p + "%", left: 0, height: 1, width: "100%", background: "#f1f5f9", pointerEvents: "none" }} />
            </React.Fragment>
          ))}
          {/* Quadrant labels */}
          {quadrants && quadrants.map((q, i) => (
            <div key={"l" + i} style={{
              position: "absolute",
              left: q.label_x != null ? q.label_x + "%" : (q.x + 2) + "%",
              top: q.label_y != null ? q.label_y + "%" : (q.y + 2) + "%",
              right: q.label_right != null ? q.label_right + "%" : undefined,
              bottom: q.label_bottom != null ? q.label_bottom + "%" : undefined,
              fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: ".18em", color: q.color, pointerEvents: "none",
              textAlign: q.align || "left",
            }}>{q.label}</div>
          ))}

          {decorations}

          {/* Crosshair while dragging */}
          {drag && (() => {
            const xPct = (drag.x / xMax) * 100;
            const yPct = 100 - (drag.y / yMax) * 100;
            return (
              <>
                <div style={{ position: "absolute", left: xPct + "%", top: 0, width: 1, height: "100%", background: "#dc2626", opacity: .6, pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: yPct + "%", left: 0, height: 1, width: "100%", background: "#dc2626", opacity: .6, pointerEvents: "none" }} />
              </>
            );
          })()}

          {/* Points */}
          {apps.map(a => {
            const live = drag && drag.id === a.id;
            const xV = live ? drag.x : getX(a);
            const yV = live ? drag.y : getY(a);
            const xPct = (xV / xMax) * 100;
            const yPct = 100 - (yV / yMax) * 100;
            const jit = jitterAmplitude > 0 && !live ? jitterFor(a.id, jitterAmplitude) : { x: 0, y: 0 };
            const isHover = hover === a.id;
            const isPulse = pulseId === a.id;
            const r = isHover || live ? 10 : 6.5;
            const c = colorFor(a);
            return (
              <div key={a.id}
                onMouseDown={e => onDown(e, a)}
                onMouseEnter={() => setHover(a.id)}
                onMouseLeave={() => setHover(null)}
                style={{
                  position: "absolute",
                  left: `calc(${xPct}% - ${r}px + ${jit.x}px)`,
                  top: `calc(${yPct}% - ${r}px + ${jit.y}px)`,
                  width: r * 2, height: r * 2, borderRadius: "50%",
                  background: c, border: "2px solid #fff",
                  boxShadow: live ? "0 0 0 3px #dc2626, 0 6px 14px rgba(0,0,0,.25)" : isHover ? "0 0 0 2px " + c + "66" : "0 1px 3px rgba(0,0,0,.2)",
                  cursor: canDrag(a) ? (live ? "grabbing" : "grab") : "pointer",
                  zIndex: live ? 30 : isHover ? 20 : 1,
                  transition: live ? "none" : "width .12s, height .12s",
                  animation: isPulse ? "ptpulse .55s ease-out" : "none",
                }} />
            );
          })}

          {/* Tooltip — drag wins over hover */}
          {(drag || hover) && (() => {
            const a = apps.find(x => x.id === (drag ? drag.id : hover));
            if (!a) return null;
            const xV = drag ? drag.x : getX(a);
            const yV = drag ? drag.y : getY(a);
            const xPct = (xV / xMax) * 100;
            const yPct = 100 - (yV / yMax) * 100;
            const onLeft = xPct > 65;
            return (
              <div style={{
                position: "absolute",
                left: onLeft ? undefined : `calc(${xPct}% + 14px)`,
                right: onLeft ? `calc(${100 - xPct}% + 14px)` : undefined,
                top: `calc(${yPct}% - 8px)`,
                background: "#0f172a", color: "#fff", padding: "8px 12px", fontSize: 12,
                zIndex: 40, pointerEvents: "none", maxWidth: 280,
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#fca5a5", letterSpacing: ".12em", fontWeight: 600 }}>
                  {a.id}{drag ? " · DRAGGING" : ""}
                </div>
                <div style={{ fontWeight: 500, marginTop: 2 }}>{a.name}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, fontFamily: "var(--font-mono)", letterSpacing: ".04em" }}>
                  {xLabel} <strong style={{ color: "#fff" }}>{formatX(xV)}</strong> · {yLabel} <strong style={{ color: "#fff" }}>{formatY(yV)}</strong>
                </div>
                {tooltipExtra && <div style={{ fontSize: 11, color: "#cbd5e1", marginTop: 4 }}>{tooltipExtra(a)}</div>}
              </div>
            );
          })()}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748b", letterSpacing: ".18em", fontWeight: 600 }}>
        {xLabel?.toUpperCase()} →
      </div>
    </div>
  );
});

// Tiny CSS for the pulse animation — inject once
(function injectScatterCss() {
  if (document.getElementById("__scatter_css")) return;
  const s = document.createElement("style");
  s.id = "__scatter_css";
  s.textContent = `@keyframes ptpulse {
    0%   { box-shadow: 0 0 0 0   rgba(220,38,38,.45), 0 1px 3px rgba(0,0,0,.2); }
    70%  { box-shadow: 0 0 0 14px rgba(220,38,38,0),   0 1px 3px rgba(0,0,0,.2); }
    100% { box-shadow: 0 0 0 0   rgba(220,38,38,0),   0 1px 3px rgba(0,0,0,.2); }
  }`;
  document.head.appendChild(s);
})();

window.ScatterPlot = ScatterPlot;
